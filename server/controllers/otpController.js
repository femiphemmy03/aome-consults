import { supabase } from '../services/supabaseClient.js';
import { sendEmail } from '../services/resendClient.js';
import { otpEmail } from '../services/emailTemplates.js';

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtp(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { error } = await supabase
      .from('otp_codes')
      .insert([{ email, code, expires_at: expiresAt }]);

    if (error) throw error;

    await sendEmail({
      to: email,
      subject: 'Your Aome Consults verification code',
      html: otpEmail({ code })
    });

    res.json({ message: 'Verification code sent' });
  } catch (err) {
    next(err);
  }
}

export async function verifyOtp(req, res, next) {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ error: 'Email and code are required' });
    }

    const { data, error } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('used', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(400).json({ error: 'Invalid verification code' });

    if (new Date(data.expires_at) < new Date()) {
      return res.status(400).json({ error: 'Verification code has expired' });
    }

    await supabase.from('otp_codes').update({ used: true }).eq('id', data.id);

    // Mark any matching lead as verified
    await supabase.from('leads').update({ verified: true }).eq('email', email);

    res.json({ verified: true });
  } catch (err) {
    next(err);
  }
}
