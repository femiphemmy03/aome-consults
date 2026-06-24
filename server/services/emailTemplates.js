// ============================================================
// AOME CONSULTS — EMAIL TEMPLATES
// Deep teal header, warm gold accent, clean sans-serif body.
// Every template returns a full HTML string ready for Resend.
// ============================================================

const TEAL = '#0F4C46';
const GOLD = '#C8943E';
const CREAM = '#FBF6EC';
const INK = '#1E2A26';

function wrapper(bodyHtml, { heading = 'Aome Consults' } = {}) {
  return `
  <div style="background:${CREAM};padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:${INK};">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e7ddc9;">
      <div style="background:${TEAL};padding:24px 28px;">
        <p style="margin:0;color:${GOLD};font-size:13px;letter-spacing:0.08em;text-transform:uppercase;font-weight:bold;">Aome Consults</p>
        <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:600;">${heading}</h1>
      </div>
      <div style="padding:28px 28px 8px;font-size:15px;line-height:1.6;">
        ${bodyHtml}
      </div>
      <div style="padding:20px 28px 28px;border-top:1px solid #f0e9d8;margin-top:16px;font-size:12px;color:#7c8a85;">
        <p style="margin:0 0 4px;">Aome Consults Limited &middot; CAC Reg. No. 9031236</p>
        <p style="margin:0;">aomeconsults.com &middot; aomeconsults@gmail.com</p>
      </div>
    </div>
  </div>`;
}

function button(label, url) {
  return `<a href="${url}" style="display:inline-block;background:${GOLD};color:${INK};font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:999px;margin-top:12px;">${label}</a>`;
}

export function otpEmail({ code }) {
  return wrapper(
    `<p>Your verification code is:</p>
     <p style="font-size:32px;font-weight:bold;letter-spacing:0.1em;color:${TEAL};margin:16px 0;">${code}</p>
     <p>This code is valid for 10 minutes. If you didn't request this, you can safely ignore this email.</p>`,
    { heading: 'Verify your email' }
  );
}

export function vaLeadNotification({ name, email, phone, createdAt }) {
  return wrapper(
    `<p>A new lead has been captured on the website.</p>
     <ul>
       <li><strong>Name:</strong> ${name || 'N/A'}</li>
       <li><strong>Email:</strong> ${email}</li>
       <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
       <li><strong>Time:</strong> ${createdAt}</li>
     </ul>`,
    { heading: 'New Lead Captured' }
  );
}

export function clientBookingConfirmation({ fullName, bookingRef, currency, amount, scheduleUrl }) {
  return wrapper(
    `<p>Hi ${fullName},</p>
     <p>Thank you for booking a consultation with Barr. Dr. Maria Esele Abraham. Your payment of <strong>${currency} ${amount}</strong> has been received.</p>
     <p><strong>Booking reference:</strong> ${bookingRef}</p>
     <p>Next step — pick a date and time that works for you:</p>
     ${button('Choose Your Session Time', scheduleUrl)}
     <p style="margin-top:20px;">Once you submit your preferred time, our team will confirm availability and send your video call link by email.</p>`,
    { heading: 'Booking Confirmed' }
  );
}

export function counsellorBookingNotification({ fullName, email, phone, brief, bookingRef }) {
  return wrapper(
    `<p>A new consultation has been booked and paid for.</p>
     <ul>
       <li><strong>Reference:</strong> ${bookingRef}</li>
       <li><strong>Name:</strong> ${fullName}</li>
       <li><strong>Email:</strong> ${email}</li>
       <li><strong>Phone:</strong> ${phone}</li>
       <li><strong>What they'd like to discuss:</strong> ${brief || 'Not provided'}</li>
     </ul>`,
    { heading: 'New Paid Consultation' }
  );
}

export function scheduleRequestNotification({ fullName, email, preferredDate, preferredTime, bookingRef, adminUrl }) {
  return wrapper(
    `<p>${fullName} has requested a session time.</p>
     <ul>
       <li><strong>Reference:</strong> ${bookingRef}</li>
       <li><strong>Email:</strong> ${email}</li>
       <li><strong>Preferred date:</strong> ${preferredDate}</li>
       <li><strong>Preferred time:</strong> ${preferredTime}</li>
     </ul>
     <p>Confirm availability and paste the Google Meet link from the admin dashboard.</p>
     ${button('Open Admin Dashboard', adminUrl)}`,
    { heading: 'Session Time Requested' }
  );
}

export function sessionConfirmedEmail({ fullName, scheduledDate, scheduledTime, videoCallLink }) {
  return wrapper(
    `<p>Hi ${fullName},</p>
     <p>Your session with Barr. Dr. Maria Esele Abraham is confirmed for:</p>
     <p style="font-size:18px;font-weight:bold;color:${TEAL};">${scheduledDate} at ${scheduledTime}</p>
     ${button('Join Video Call', videoCallLink)}
     <p style="margin-top:20px;">Please join a few minutes early. We look forward to speaking with you.</p>`,
    { heading: 'Your Session is Confirmed' }
  );
}

export function postSessionSurveyEmail({ fullName, surveyUrl }) {
  return wrapper(
    `<p>Hi ${fullName},</p>
     <p>Thank you for attending your session. We'd love to hear how it went — it only takes a minute.</p>
     ${button('Share Your Feedback', surveyUrl)}`,
    { heading: 'How Was Your Session?' }
  );
}
