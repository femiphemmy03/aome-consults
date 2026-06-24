import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM || 'Aome Consults <noreply@aomeconsults.com>';

/**
 * Send a transactional email via Resend.
 * @param {Object} params
 * @param {string|string[]} params.to
 * @param {string} params.subject
 * @param {string} params.html
 */
export async function sendEmail({ to, subject, html }) {
  try {
    const result = await resend.emails.send({
      from: FROM,
      to,
      subject,
      html
    });
    return result;
  } catch (error) {
    console.error('[resendClient] Failed to send email:', error.message);
    throw error;
  }
}
