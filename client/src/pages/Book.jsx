import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api.js';
import { useSettings } from '../context/SettingsContext.jsx';

const STEPS = ['Your Details', 'Verify Email', 'Session Brief', 'Payment', 'Confirmed'];

export default function Book() {
  const { settings } = useSettings();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [lead, setLead] = useState({ name: '', email: '', phone: '', country: '' });
  const [leadId, setLeadId] = useState(null);
  const [otp, setOtp] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const [brief, setBrief] = useState('');
  const [booking, setBooking] = useState(null);
  const [bookingRef, setBookingRef] = useState('');

  const fee = currency === 'NGN' ? settings.consultation_fee_ngn : settings.consultation_fee_usd;

  async function handleLeadSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/api/leads', lead);
      setLeadId(data.lead.id);
      await api.post('/api/otp/send', { email: lead.email });
      setStep(1);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/api/otp/verify', { email: lead.email, code: otp });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleBriefSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/api/bookings', {
        leadId,
        fullName: lead.name,
        email: lead.email,
        phone: lead.phone,
        country: lead.country,
        brief,
        currency
      });
      setBooking(data.booking);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handlePayment() {
    if (!window.FlutterwaveCheckout) {
      setError('Payment system is still loading — please wait a moment and try again.');
      return;
    }
    setError('');

    window.FlutterwaveCheckout({
      public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: booking.id,
      amount: Number(fee),
      currency,
      payment_options: 'card,banktransfer,ussd',
      customer: {
        email: lead.email,
        phone_number: lead.phone,
        name: lead.name
      },
      customizations: {
        title: 'Aome Consults — Consultation',
        description: 'Booking fee for a consultation with Dr. Maria Esele Abraham',
        logo: ''
      },
      callback: async (response) => {
        setLoading(true);
        try {
          const { data } = await api.post(`/api/bookings/${booking.id}/verify-payment`, {
            transactionId: response.transaction_id
          });
          setBookingRef(data.bookingRef);
          setStep(4);
        } catch (err) {
          setError(err.response?.data?.error || 'Payment verification failed. Please contact us.');
        } finally {
          setLoading(false);
        }
      },
      onclose: () => {}
    });
  }

  return (
    <main className="px-5 py-14 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <p className="eyebrow eyebrow-gold text-center">Book a Consultation</p>
        <h1 className="font-display text-3xl md:text-4xl">Let's take the first step together</h1>
      </div>

      {/* Step indicator */}
      <div className="flex justify-between mb-10 text-xs font-semibold text-ink-400">
        {STEPS.map((label, i) => (
          <span key={label} className={i <= step ? 'text-teal-700' : ''}>
            {label}
          </span>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {step === 0 && (
        <form onSubmit={handleLeadSubmit} className="grid gap-4">
          <input
            required
            placeholder="Full name"
            className="input-field"
            value={lead.name}
            onChange={(e) => setLead({ ...lead, name: e.target.value })}
          />
          <input
            required
            type="email"
            placeholder="Email address"
            className="input-field"
            value={lead.email}
            onChange={(e) => setLead({ ...lead, email: e.target.value })}
          />
          <input
            required
            placeholder="Phone number"
            className="input-field"
            value={lead.phone}
            onChange={(e) => setLead({ ...lead, phone: e.target.value })}
          />
          <input
            placeholder="Country"
            className="input-field"
            value={lead.country}
            onChange={(e) => setLead({ ...lead, country: e.target.value })}
          />
          <button disabled={loading} className="btn-primary mt-2">
            {loading ? 'Please wait...' : 'Continue'}
          </button>
        </form>
      )}

      {step === 1 && (
        <form onSubmit={handleOtpSubmit} className="grid gap-4">
          <p className="text-sm text-ink-600">
            We've sent a 6-digit code to <strong>{lead.email}</strong>. Enter it below to verify your email.
          </p>
          <input
            required
            maxLength={6}
            placeholder="6-digit code"
            className="input-field text-center text-2xl tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button disabled={loading} className="btn-primary mt-2">
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleBriefSubmit} className="grid gap-4">
          <div className="flex gap-3">
            {['NGN', 'USD'].map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setCurrency(c)}
                className={`flex-1 rounded-xl border-2 py-3 font-semibold ${
                  currency === c ? 'border-gold-500 bg-gold-100' : 'border-teal-700/15'
                }`}
              >
                {c === 'NGN' ? `₦${settings.consultation_fee_ngn}` : `$${settings.consultation_fee_usd}`}
              </button>
            ))}
          </div>
          <textarea
            placeholder="What would you like to discuss in this session? (optional)"
            rows={4}
            className="input-field"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
          />
          <button disabled={loading} className="btn-primary mt-2">
            {loading ? 'Please wait...' : `Continue to Payment (${currency === 'NGN' ? '₦' : '$'}${fee})`}
          </button>
        </form>
      )}

      {step === 3 && booking && (
        <div className="text-center">
          <p className="text-ink-600 mb-6">
            You're about to pay <strong>{currency === 'NGN' ? '₦' : '$'}{fee}</strong> to book your
            consultation. You'll be able to choose your preferred session time right after payment.
          </p>
          <button onClick={handlePayment} disabled={loading} className="btn-primary btn-large">
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="text-center">
          <h2 className="font-display text-2xl mb-3">Booking Confirmed 🎉</h2>
          <p className="text-ink-600 mb-2">
            Your reference number is <strong>{bookingRef}</strong>.
          </p>
          <p className="text-ink-600 mb-8">
            Check your email for a link to choose your preferred session date and time.
          </p>
          <Link to="/" className="btn-ghost">Back to Home</Link>
        </div>
      )}
    </main>
  );
}
