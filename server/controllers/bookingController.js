import { supabase } from '../services/supabaseClient.js';
import { verifyTransaction } from '../services/flutterwaveClient.js';
import { sendEmail } from '../services/resendClient.js';
import {
  clientBookingConfirmation,
  counsellorBookingNotification,
  scheduleRequestNotification,
  sessionConfirmedEmail,
  postSessionSurveyEmail
} from '../services/emailTemplates.js';

function shortRef(id) {
  return `AC-${id.split('-')[0].toUpperCase()}`;
}

/**
 * Step 1 — create the booking record BEFORE payment.
 * Frontend uses booking.id as the Flutterwave tx_ref.
 */
export async function createBooking(req, res, next) {
  try {
    const { fullName, email, phone, country, brief, currency, leadId } = req.body;

    if (!fullName || !email || !phone || !currency) {
      return res.status(400).json({ error: 'Full name, email, phone and currency are required' });
    }

    const { data: settingsRows } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['consultation_fee_ngn', 'consultation_fee_usd']);

    const settings = Object.fromEntries((settingsRows || []).map((r) => [r.key, r.value]));
    const fee =
      currency === 'NGN'
        ? Number(settings.consultation_fee_ngn || 20000)
        : Number(settings.consultation_fee_usd || 25);

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          lead_id: leadId || null,
          full_name: fullName,
          email,
          phone,
          country,
          brief,
          currency,
          consultation_fee: fee,
          payment_status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ booking: data });
  } catch (err) {
    next(err);
  }
}

/**
 * Step 2 — verify the Flutterwave transaction after the inline
 * checkout succeeds on the frontend, then confirm the booking.
 */
export async function verifyBookingPayment(req, res, next) {
  try {
    const { id } = req.params;
    const { transactionId } = req.body;

    if (!transactionId) {
      return res.status(400).json({ error: 'transactionId is required' });
    }

    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const flwResponse = await verifyTransaction(transactionId);
    const txData = flwResponse?.data;

    const amountMatches = Number(txData?.amount) >= Number(booking.consultation_fee);
    const currencyMatches = txData?.currency === booking.currency;
    const statusOk = txData?.status === 'successful' && flwResponse?.status === 'success';

    if (!statusOk || !amountMatches || !currencyMatches) {
      await supabase.from('bookings').update({ payment_status: 'failed' }).eq('id', id);
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    const { data: updated, error: updateError } = await supabase
      .from('bookings')
      .update({
        payment_status: 'paid',
        payment_reference: String(transactionId),
        confirmed: true
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;

    const bookingRef = shortRef(updated.id);
    const frontendUrl = process.env.PUBLIC_APP_URL;
    const scheduleUrl = `${frontendUrl}/schedule?ref=${updated.id}`;

    await sendEmail({
      to: updated.email,
      subject: 'Your Aome Consults booking is confirmed',
      html: clientBookingConfirmation({
        fullName: updated.full_name,
        bookingRef,
        currency: updated.currency,
        amount: updated.consultation_fee,
        scheduleUrl
      })
    }).catch((e) => console.error('[verifyBookingPayment] client email failed:', e.message));

    const counsellorEmail = process.env.COUNSELLOR_EMAIL;
    const vaEmail = process.env.VA_EMAIL;
    const notifyHtml = counsellorBookingNotification({
      fullName: updated.full_name,
      email: updated.email,
      phone: updated.phone,
      brief: updated.brief,
      bookingRef
    });

    await Promise.all(
      [counsellorEmail, vaEmail]
        .filter(Boolean)
        .map((to) =>
          sendEmail({ to, subject: 'New paid consultation booking', html: notifyHtml }).catch((e) =>
            console.error('[verifyBookingPayment] notify failed:', e.message)
          )
        )
    );

    res.json({ booking: updated, bookingRef });
  } catch (err) {
    next(err);
  }
}

export async function getBooking(req, res, next) {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('bookings').select('*').eq('id', id).single();

    if (error || !data) return res.status(404).json({ error: 'Booking not found' });
    res.json({ booking: data });
  } catch (err) {
    next(err);
  }
}

/**
 * Submitted from the unlisted /schedule page.
 */
export async function requestSchedule(req, res, next) {
  try {
    const { id } = req.params;
    const { preferredDate, preferredTime } = req.body;

    if (!preferredDate || !preferredTime) {
      return res.status(400).json({ error: 'Preferred date and time are required' });
    }

    const { data: updated, error } = await supabase
      .from('bookings')
      .update({
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        schedule_status: 'requested'
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !updated) return res.status(404).json({ error: 'Booking not found' });

    const counsellorEmail = process.env.COUNSELLOR_EMAIL;
    const vaEmail = process.env.VA_EMAIL;
    const frontendUrl = process.env.PUBLIC_APP_URL;

    const html = scheduleRequestNotification({
      fullName: updated.full_name,
      email: updated.email,
      preferredDate,
      preferredTime,
      bookingRef: shortRef(updated.id),
      adminUrl: `${frontendUrl}/admin`
    });

    await Promise.all(
      [counsellorEmail, vaEmail]
        .filter(Boolean)
        .map((to) =>
          sendEmail({ to, subject: 'Session time requested', html }).catch((e) =>
            console.error('[requestSchedule] notify failed:', e.message)
          )
        )
    );

    res.json({ booking: updated });
  } catch (err) {
    next(err);
  }
}

/**
 * Admin marks the session as actually having happened (they're the only
 * ones who know, since video calls are manual Google Meet links, not an
 * API). This is what triggers the post-session survey email.
 */
export async function completeBooking(req, res, next) {
  try {
    const { id } = req.params;

    const { data: updated, error } = await supabase
      .from('bookings')
      .update({ session_completed: true })
      .eq('id', id)
      .select()
      .single();

    if (error || !updated) return res.status(404).json({ error: 'Booking not found' });

    const frontendUrl = process.env.PUBLIC_APP_URL;
    const surveyUrl = `${frontendUrl}/survey/${updated.id}`;

    await sendEmail({
      to: updated.email,
      subject: 'How was your session? — Aome Consults',
      html: postSessionSurveyEmail({
        fullName: updated.full_name,
        surveyUrl
      })
    }).catch((e) => console.error('[completeBooking] survey email failed:', e.message));

    res.json({ booking: updated });
  } catch (err) {
    next(err);
  }
}

export async function listBookingsAdmin(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ bookings: data });
  } catch (err) {
    next(err);
  }
}

/**
 * Admin confirms a date/time and pastes a Google Meet link.
 * This is the point at which the client gets their final confirmation email.
 */
export async function confirmBookingAdmin(req, res, next) {
  try {
    const { id } = req.params;
    const { scheduledDate, scheduledTime, videoCallLink, adminNotes } = req.body;

    const { data: updated, error } = await supabase
      .from('bookings')
      .update({
        preferred_date: scheduledDate,
        preferred_time: scheduledTime,
        video_call_link: videoCallLink,
        admin_notes: adminNotes,
        schedule_status: 'confirmed'
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !updated) return res.status(404).json({ error: 'Booking not found' });

    const { data: settingRow } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'whatsapp_number')
      .maybeSingle();

    await sendEmail({
      to: updated.email,
      subject: 'Your session is confirmed — Aome Consults',
      html: sessionConfirmedEmail({
        fullName: updated.full_name,
        scheduledDate: updated.preferred_date,
        scheduledTime: updated.preferred_time,
        videoCallLink: updated.video_call_link,
        whatsappNumber: settingRow?.value
      })
    }).catch((e) => console.error('[confirmBookingAdmin] client email failed:', e.message));

    res.json({ booking: updated });
  } catch (err) {
    next(err);
  }
}