import useMeta from '../hooks/useMeta.js';

const LAST_UPDATED = 'July 2026';
const EMAIL = 'aomeconsults.contacts@gmail.com';

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-xl text-teal-700 mb-3">{title}</h2>
      <div className="text-ink-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function Privacy() {
  useMeta({
    title: 'Privacy Policy',
    description: 'How Aome Consults collects, uses and protects your personal information.',
    path: '/privacy',
    noindex: false
  });

  return (
    <main className="px-5 py-14 max-w-3xl mx-auto">
      <div className="mb-10">
        <p className="eyebrow eyebrow-gold">Legal</p>
        <h1 className="font-display text-3xl md:text-4xl mb-3">Privacy Policy</h1>
        <p className="text-xs text-ink-400">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="bg-teal-700 text-cream-100 rounded-brand px-7 py-5 mb-10 text-sm leading-relaxed">
        <p>
          At Aome Consults, your privacy is not just a legal obligation - it is a
          reflection of the trust you place in us when you seek support. This policy
          explains clearly what information we collect, why we collect it, and how it
          is protected.
        </p>
      </div>

      <Section title="1. Who We Are">
        <p>
          Aome Consults Limited (CAC Reg. No. 9031236) is a professional psychological
          services, coaching and consulting practice founded by Barr. Dr. Maria Esele Abraham.
          We operate at <strong>aomeconsults.com</strong> and can be contacted at{' '}
          <a href={`mailto:${EMAIL}`} className="text-teal-700 underline">{EMAIL}</a>.
        </p>
      </Section>

      <Section title="2. Information We Collect">
        <p>We collect only what is necessary to provide our services to you:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Contact information</strong> - your name, email address and phone number,
            provided when you complete a booking or inquiry form.
          </li>
          <li>
            <strong>Session information</strong> - a brief description of what you would like
            to discuss, provided voluntarily before your consultation.
          </li>
          <li>
            <strong>Payment information</strong> - processed securely through Flutterwave.
            We do not store your card details. Flutterwave's own privacy policy governs
            their handling of payment data.
          </li>
          <li>
            <strong>Communication records</strong> - emails sent between you and Aome Consults
            for the purpose of scheduling and follow-up.
          </li>
          <li>
            <strong>Feedback</strong> - ratings and written feedback submitted through our
            post-session survey, provided voluntarily.
          </li>
        </ul>
      </Section>

      <Section title="3. How We Use Your Information">
        <p>Your information is used solely to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Process and confirm your consultation booking</li>
          <li>Send you your session confirmation, scheduling link and video call details</li>
          <li>Send post-session follow-up communications</li>
          <li>Notify our team of new bookings and scheduling requests</li>
          <li>Respond to inquiries you direct to us</li>
        </ul>
        <p>
          We do not use your personal information for advertising, profiling or any
          purpose beyond direct service delivery.
        </p>
      </Section>

      <Section title="4. Confidentiality of Session Content">
        <p>
          Any personal matters discussed during therapy, coaching or consulting sessions
          are held in strict professional confidence. Session notes, if kept, are
          maintained in accordance with professional counselling ethics and are not
          shared with any third party except where required by law (for example, where
          there is a risk of serious harm).
        </p>
        <p>
          Brief descriptions you provide before a session (the "brief" field in our
          booking form) are visible only to Barr. Dr. Maria Esele Abraham and our
          administrative team.
        </p>
      </Section>

      <Section title="5. Data Storage and Security">
        <p>
          Your data is stored securely in Supabase (a PostgreSQL-based cloud database)
          hosted on AWS infrastructure. All data is transmitted over encrypted HTTPS
          connections. Access to client data is restricted to authorised team members only.
        </p>
        <p>
          While we take all reasonable precautions, no internet-based system can be
          guaranteed 100% secure. If you have concerns about a specific data point,
          please contact us directly.
        </p>
      </Section>

      <Section title="6. Email Communications">
        <p>
          We send transactional emails only - booking confirmations, OTP verification
          codes, scheduling links, session confirmations and post-session surveys.
          These are sent via Resend and are directly related to services you have
          requested. We do not send unsolicited marketing emails.
        </p>
      </Section>

      <Section title="7. Third-Party Services">
        <p>Our website uses the following third-party services:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Flutterwave</strong> - payment processing</li>
          <li><strong>Supabase</strong> - secure data storage</li>
          <li><strong>Resend</strong> - transactional email delivery</li>
          <li><strong>Google Fonts</strong> - typography (no personal data shared)</li>
          <li><strong>WhatsApp</strong> - optional direct chat via click-to-chat link</li>
        </ul>
        <p>
          Each third party operates under its own privacy policy. We recommend reviewing
          their policies if you have specific concerns about how they handle data.
        </p>
      </Section>

      <Section title="8. Your Rights">
        <p>You have the right to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Request a copy of the personal data we hold about you</li>
          <li>Request that we correct inaccurate information</li>
          <li>Request deletion of your data, subject to any legal retention requirements</li>
          <li>Withdraw consent for us to contact you at any time</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{' '}
          <a href={`mailto:${EMAIL}`} className="text-teal-700 underline">{EMAIL}</a>.
        </p>
      </Section>

      <Section title="9. Retention of Data">
        <p>
          We retain booking and contact records for a period of up to 3 years following
          your last interaction with us, after which they are securely deleted. You may
          request earlier deletion at any time.
        </p>
      </Section>

      <Section title="10. Children">
        <p>
          Our online booking system is intended for adults (18 years and over). If you
          are a parent or guardian booking on behalf of a minor for family therapy,
          please contact us directly at{' '}
          <a href={`mailto:${EMAIL}`} className="text-teal-700 underline">{EMAIL}</a>{' '}
          to discuss appropriate arrangements.
        </p>
      </Section>

      <Section title="11. Changes to This Policy">
        <p>
          We may update this policy from time to time. Any changes will be posted on
          this page with a revised "last updated" date. Continued use of our website
          after such changes constitutes acceptance of the updated policy.
        </p>
      </Section>

      <Section title="12. Contact Us">
        <p>
          If you have any questions or concerns about this privacy policy or how your
          data is handled, please contact:
        </p>
        <div className="bg-cream-100 rounded-xl px-5 py-4 border border-teal-700/10 mt-2">
          <p className="font-semibold text-teal-900">Aome Consults Limited</p>
          <p>Email: <a href={`mailto:${EMAIL}`} className="text-teal-700 underline">{EMAIL}</a></p>
          <p>Website: aomeconsults.com</p>
          <p>CAC Reg. No. 9031236</p>
        </div>
      </Section>
    </main>
  );
}
