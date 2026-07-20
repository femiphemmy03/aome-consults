import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import drMaria from '../assets/images/dr-maria.jpg';
import LeafIcon from '../components/LeafIcon.jsx';
import { Reveal, useDrawOnView } from '../hooks/useScrollAnimations.jsx';
import { useSettings } from '../context/SettingsContext.jsx';
import useMeta from '../hooks/useMeta.js';

const roles = [
  'find clarity in the chaos',
  'heal from grief and trauma',
  'build healthier relationships',
  'understand yourself more deeply'
];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length);
        setFading(false);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block italic text-gold-600 transition-all duration-300 ${
        fading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
      }`}
    >
      {roles[index]}
    </span>
  );
}

// Pain points that speak directly to the visitor's felt experience
const painPoints = [
  { icon: '🤝', text: 'Facing challenges in marriage, family or workplace relationships' },
   { icon: '🔄', text: 'Repeating the same patterns in relationships without knowing why' },
  { icon: '🌫️', text: 'Feeling stuck, overwhelmed or disconnected from who you truly are' },
   { icon: '💔', text: 'Struggling with grief, loss or emotional pain that won\'t go away' }

  ];

// What the client walks away with — solution focused
const outcomes = [
  {
    title: 'Clarity & Self-Understanding',
    text: 'You will finally understand the hidden beliefs and emotional patterns driving your thoughts, feelings and decisions - not just what you do, but why.'
  },
  {
    title: 'Healthier Relationships',
    text: 'You will gain the insight and tools to show up differently in your relationships - with more confidence, boundaries and genuine connection.'
  },
  {
    title: 'Healing from Pain',
    text: 'Whether it\'s grief, trauma, loss or old wounds - you will have a safe, compassionate space to process, heal and move forward at your own pace.'
  },
  
  {
    title: 'Lasting Transformation',
    text: 'Not just temporary relief - you will leave with practical, evidence-based strategies that create real, sustainable change in how you live and relate.'
  }
];

const testimonials = [
  {
    quote: 'I was broken and guarded when I began my Love Readiness journey - I expected judgment, not understanding. From the very first conversation, Maria welcomed me with compassion and patience. Our sessions became a place of healing, clarity and hope. I didn\'t just learn - I rediscovered parts of myself I thought I had lost. This isn\'t just a job for her. It is a ministry.',
    name: 'Progress Ekwuazi',
    service: 'LoveReadiness Coaching'
  },
  {
    quote: 'Whenever Maria teaches, I start asking myself - what is the inner map behind this behaviour? I no longer judge people so quickly because I now understand that behaviour usually has a story.',
    name: 'A. Adedayo',
    service: 'Schema Intelligence'
  },
  {
    quote: 'I stopped asking "What is wrong with me?" and started asking "What shaped me?" That single shift changed everything.',
    name: 'J. Ezimah',
    service: 'Schema Intelligence'
  }
];

// Condensed service list — framed around what the client receives
const services = [
  {
    title: 'A Space to Heal',
    sub: 'Therapy & Counselling',
    text: 'Individual therapy, marriage and family counselling, trauma recovery, anxiety and depression support, grief support - all in a safe and confidential setting.'
  },
  {
    title: 'A Path Forward',
    sub: 'Coaching & Personal Development',
    text: 'Life coaching, relationship coaching, emotional intelligence, purpose discovery and women\'s empowerment - practical support for intentional growth.'
  },
  {
    title: 'A Map of Yourself',
    sub: 'Schema Intelligence™',
    text: 'Dr. Maria\'s signature framework. Understand the hidden emotional blueprints behind your recurring patterns - and finally gain the power to rewrite them.'
  },
  {
    title: 'A Stronger Organization',
    sub: 'Training & Consulting',
    text: 'Mental health awareness, leadership development, conflict resolution and employee wellness - building healthier teams, schools, churches and communities.'
  }
];

function SectionDivider() {
  const ref = useDrawOnView();
  return (
    <div ref={ref} className="flex justify-center mb-6 text-gold-500">
      <LeafIcon className="w-10 h-11" />
    </div>
  );
}

export default function Home() {
  const { settings } = useSettings();

  useMeta({
    title: 'Healing Minds. Strengthening Relationships. Transforming Lives.',
    description:
      'Are you feeling stuck, overwhelmed or carrying pain alone? Aome Consults offers therapy, coaching and Schema Intelligence™ with Barr. Dr. Maria Esele Abraham - helping you heal, grow and transform.',
    path: '/'
  });

  return (
    <main>
      {/* ── HERO ── speak to the visitor's need first */}
      <section className="relative overflow-hidden px-5 pt-14 pb-16">
        <div className="absolute inset-0 flex items-center justify-start opacity-[0.06] text-teal-700 pointer-events-none">
          <LeafIcon className="w-[560px] h-[620px] -translate-x-1/4" />
        </div>

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow eyebrow-gold">You don't have to carry this alone</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight mb-5">
              This is a safe space to{' '}
              <span className="block mt-1">
                <RotatingRole />
              </span>
            </h1>
            <p className="text-ink-600 max-w-md mb-4 text-lg leading-relaxed">
              Whatever you are carrying right now -  broken relationships, emotional pain,
              recurring patterns, the quiet exhaustion of losing yourself or grief - you deserve
              real support and lasting change.
            </p>
            <p className="text-ink-600 max-w-md mb-8">
              At Aome Consults, Barr. Dr. Maria Esele Abraham walks with you through the
              journey - with compassion, clinical expertise and over 30 years of experience
              helping people truly transform.
            </p>
            <div className="flex flex-wrap gap-4 mb-7">
              <Link to="/book" className="btn-primary btn-large">Book a Consultation</Link>
              <Link to="/services" className="btn-ghost">See How We Can Help</Link>
            </div>
            <p className="text-xs text-ink-400">
              Aome Consults Limited &middot; CAC Reg. No. 9031236 &middot; Founder, Aome Foundation
            </p>
          </div>

          <div className="relative rounded-brand overflow-hidden shadow-2xl">
            <img
              src={drMaria}
              alt="Barr. Dr. Maria Esele Abraham - Counselling Psychologist and Founder of Aome Consults"
              className="w-full h-full object-cover aspect-[4/5]"
            />
            {/* Name badge over the image */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-900/90 to-transparent px-6 py-5">
              <p className="text-cream-50 font-display text-lg leading-tight">Barr. Dr. Maria Esele Abraham</p>
              <p className="text-cream-50 text-sm">Counselling Psychologist &middot; Schema Intelligence Specialist</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARE YOU EXPERIENCING THIS? ── pain-point recognition */}
      <section className="bg-cream-50 px-5 py-16">
        <SectionDivider />
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="eyebrow eyebrow-gold text-center">You are not alone</p>
          <h2 className="section-title">Many people come to Aome Consults feeling&hellip;</h2>
        </div>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
          {painPoints.map((p) => (
            <Reveal key={p.text}>
              <div className="flex items-start gap-4 bg-white rounded-brand px-6 py-5 border border-teal-700/10">
                <span className="text-2xl flex-shrink-0">{p.icon}</span>
                <p className="text-ink-600 text-sm leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-center text-teal-700 font-display italic text-lg mt-8">
          If any of this resonates - you are in the right place.
        </p>
      </section>

      {/* ── WHAT YOU WILL GAIN ── outcome focused */}
      <section className="px-5 py-16">
        <SectionDivider />
        <p className="eyebrow text-center">What working with Dr. Maria looks like for you</p>
        <h2 className="section-title">Real support. Real change. Results that last.</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {outcomes.map((o) => (
            <Reveal key={o.title}>
              <div className="card h-full">
                <LeafIcon className="w-9 h-10 text-gold-500 mb-4" />
                <h3 className="text-lg font-display mb-2">{o.title}</h3>
                <p className="text-sm text-ink-600">{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── framed as what the client receives */}
      <section className="bg-cream-50 px-5 py-16">
        <SectionDivider />
        <p className="eyebrow text-center">How Dr. Maria Can Help</p>
        <h2 className="section-title">Support for every season of your journey</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-5 mb-10">
          {services.map((s) => (
            <Reveal key={s.title}>
              <div className="card h-full">
                <p className="text-xs font-bold text-gold-600 tracking-widest uppercase mb-1">{s.sub}</p>
                <h3 className="text-xl font-display mb-2">{s.title}</h3>
                <p className="text-sm text-ink-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center">
          <Link to="/services" className="btn-ghost">Explore All Services &amp; Schema Intelligence™</Link>
        </div>
      </section>

      {/* ── ABOUT ── brief, trust-building, still client-oriented */}
      <section id="about" className="px-5 py-16">
        <SectionDivider />
        <div className="max-w-6xl mx-auto grid md:grid-cols-[0.85fr_1fr] gap-10 items-center">
          <Reveal>
            <div className="bg-teal-700 text-cream-100 rounded-brand p-10">
              <p className="font-display text-5xl text-gold-300 mb-2">&ldquo;</p>
              <blockquote className="font-display italic text-xl leading-relaxed mb-4">
                People cannot sustainably change what they do until they understand
                why they do it. That understanding is where your transformation begins.
              </blockquote>
              <p className="text-gold-300 font-semibold text-sm">
                &mdash; Barr. Dr. Maria Esele Abraham, PhD
              </p>
            </div>
          </Reveal>
          <Reveal>
            <p className="eyebrow">Why trust Dr. Maria with your journey</p>
            <h2 className="text-2xl md:text-3xl mb-4">
              30+ years of walking people back to themselves
            </h2>
            <p className="text-ink-600 mb-4">
              Barr. Dr. Maria Esele Abraham, PhD is a Counselling Psychologist,
              Psychotherapist and Schema Intelligence Specialist with over three decades
              of experience. Her approach combines clinical depth with genuine human warmth -
              meeting you exactly where you are.
            </p>
            <p className="text-ink-600 mb-6">
              She is the founder of <strong>Aome Consults</strong> and{' '}
              <strong>Reflections with Maria</strong>, and creator of the{' '}
              <strong>Schema Intelligence™</strong> framework - a powerful lens for
              understanding the hidden patterns shaping your life.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Counselling Psychologist', 'Schema Intelligence Specialist', 'Life Coach', 'Author & Speaker'].map(
                (tag) => (
                  <span key={tag} className="text-xs font-semibold bg-teal-100 text-teal-700 px-4 py-2 rounded-full">
                    {tag}
                  </span>
                )
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── client voices */}
      <section className="bg-cream-50 px-5 py-16">
        <SectionDivider />
        <p className="eyebrow text-center">Real Stories</p>
        <h2 className="section-title">Hear from people who have walked this journey</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={i}>
              <div className="bg-white rounded-brand p-7 border-t-4 border-gold-500 h-full flex flex-col">
                <p className="font-display text-2xl text-gold-400 mb-2">&ldquo;</p>
                <p className="font-display italic text-teal-900 mb-4 flex-1 text-[0.95rem] leading-relaxed">{t.quote}</p>
                <div>
                  <p className="text-sm font-bold text-teal-700">{t.name}</p>
                  <p className="text-xs text-ink-400 uppercase tracking-wide">{t.service}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── BOOKS TEASER ── */}
      <section className="px-5 py-16">
        <SectionDivider />
        <div className="max-w-4xl mx-auto text-center">
          <p className="eyebrow text-center">Books &amp; Resources</p>
          <h2 className="section-title">Continue the journey between sessions</h2>
          <p className="text-ink-600 mb-8 max-w-xl mx-auto">
            Dr. Maria's books are written for people who want to go deeper -
            practical, insightful reads on personality, beliefs, relationships and
            the psychology of lasting change.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/books" className="btn-primary">Browse the Book Catalogue</Link>
            {settings.gumroad_profile_url && (
              <a href={settings.gumroad_profile_url} target="_blank" rel="noreferrer" className="btn-ghost">
                All Books on Gumroad
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── client benefit, not about Maria */}
      <section className="relative bg-teal-900 text-cream-100 text-center px-5 py-20">
        <div className="flex justify-center mb-5 text-gold-300">
          <LeafIcon className="w-12 h-14" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-white mb-4 max-w-2xl mx-auto">
          You deserve to heal, grow and thrive - not just survive.
        </h2>
        <p className="max-w-lg mx-auto text-teal-100 mb-4 text-lg">
          Take the first step today. Book a consultation and begin the journey
          back to yourself.
        </p>
        <p className="text-sm text-teal-100/70 mb-8">
          Confidential &middot; Compassionate &middot; Evidence-Based &middot; Faith-Integrated
        </p>
        <Link to="/book" className="btn-primary btn-large">Book a Consultation</Link>
      </section>
    </main>
  );
}
