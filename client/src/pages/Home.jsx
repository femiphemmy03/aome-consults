import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import drMaria from '../assets/images/dr-maria.jpg';
import LeafIcon from '../components/LeafIcon.jsx';
import { Reveal, useDrawOnView } from '../hooks/useScrollAnimations.jsx';
import { useSettings } from '../context/SettingsContext.jsx';

const roles = [
  'Counselling Psychologist',
  'Trauma & Grief Consultant',
  'LoveReadiness Coach',
  'Mental Health Educator'
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

const pillars = [
  { title: 'Therapy & Counselling', text: 'Safe, confidential support for emotional, psychological and relational wellbeing.' },
  { title: 'Coaching & Personal Development', text: 'Moving intentionally from where you are to where you want to be.' },
  { title: 'Schema Intelligence™', text: 'Understanding the hidden emotional blueprints shaping your patterns and choices.' },
  { title: 'Training & Consulting', text: 'Building healthier organizations, schools, churches and communities.' }
];

const testimonials = [
  {
    quote: 'I came in carrying years of grief I didn\u2019t know how to name. Maria helped me find words for it \u2014 and a way through it.',
    name: 'Client, Consultation Session'
  },
  {
    quote: 'The LoveReadiness sessions changed how I show up in relationships. I feel grounded in a way I never have before.',
    name: 'Client, LoveReadiness Coaching'
  },
  {
    quote: 'Warm, wise, and never rushed. I left every session feeling lighter and clearer about my next step.',
    name: 'Client, Trauma & Grief Support'
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

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden px-5 pt-14 pb-16">
        <div className="absolute inset-0 flex items-center justify-start opacity-[0.06] text-teal-700 pointer-events-none">
          <LeafIcon className="w-[560px] h-[620px] -translate-x-1/4" />
        </div>

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow eyebrow-gold">Aome Consults &middot; Reflections with Maria</p>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-5">
              Leading Without
              <br />
              <em className="italic text-gold-600">Losing Yourself</em>
            </h1>
            <p className="font-display text-lg text-teal-700 mb-5 min-h-[1.8em]">
              Barr. Dr. Maria Esele Abraham is a <RotatingRole />
            </p>
            <p className="text-ink-600 max-w-md mb-8">
              For over 30 years, Maria has helped individuals, couples, families and
              organizations understand themselves more deeply, overcome emotional barriers
              and create meaningful, lasting change.
            </p>
            <div className="flex flex-wrap gap-4 mb-7">
              <Link to="/book" className="btn-primary">Book a Consultation</Link>
              <Link to="/services" className="btn-ghost">Explore Our Services</Link>
            </div>
            <p className="text-xs text-ink-400">
              Founder, Aome Consults &amp; Reflections with Maria &middot; CAC Reg. No. 9031236
            </p>
          </div>

          <div className="relative rounded-brand overflow-hidden border-6 border-cream-50 shadow-2xl">
            <img
              src={drMaria}
              alt="Portrait of Barr. Dr. Maria Esele Abraham"
              className="w-full h-full object-cover aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      {/* PHILOSOPHY / ABOUT */}
      <section id="about" className="bg-cream-50 px-5 py-16">
        <SectionDivider />
        <div className="max-w-6xl mx-auto grid md:grid-cols-[0.85fr_1fr] gap-10 items-center">
          <Reveal>
            <div className="bg-teal-700 text-cream-100 rounded-brand p-10">
              <p className="font-display text-5xl text-gold-300 mb-2">&ldquo;</p>
              <blockquote className="font-display italic text-xl leading-relaxed mb-4">
                Transformation begins with understanding. People cannot sustainably change
                what they do until they understand why they do it.
              </blockquote>
              <p className="text-gold-300 font-semibold text-sm">
                &mdash; Barr. Dr. Maria Esele Abraham, PhD
              </p>
            </div>
          </Reveal>
          <Reveal>
            <p className="eyebrow">About Maria</p>
            <h2 className="text-2xl md:text-3xl mb-4">
              Helping people move from awareness to lasting transformation
            </h2>
            <p className="text-ink-600 mb-4">
              Barr. Dr. Maria Esele Abraham, PhD is a Counselling Psychologist,
              Psychotherapist, Schema Intelligence Specialist, Emotional Intelligence
              Consultant, Life Coach, Author, Trainer and Speaker. She is the founder of{' '}
              <strong>Aome Consults</strong> and <strong>Reflections with Maria</strong>.
            </p>
            <p className="text-ink-600 mb-6">
              Her work helps clients understand the hidden patterns influencing their
              emotions, relationships and life decisions &mdash; moving from awareness, to
              understanding, to transformation.
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

      {/* SERVICES (condensed — full detail on /services) */}
      <section className="px-5 py-16">
        <SectionDivider />
        <p className="eyebrow text-center">How Maria Can Help</p>
        <h2 className="section-title">Five pillars of support, one goal: lasting transformation</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {pillars.map((p) => (
            <Reveal key={p.title}>
              <div className="card h-full">
                <LeafIcon className="w-9 h-10 text-gold-500 mb-4" />
                <h3 className="text-lg font-display mb-2">{p.title}</h3>
                <p className="text-sm text-ink-600">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center">
          <Link to="/services" className="btn-ghost">See All Services &amp; Schema Intelligence™</Link>
        </div>
      </section>

      {/* BOOKS TEASER -> Gumroad profile (per Maria's instruction) */}
      <section className="bg-cream-50 px-5 py-16">
        <SectionDivider />
        <div className="max-w-4xl mx-auto text-center">
          <p className="eyebrow text-center">Books &amp; Resources</p>
          <h2 className="section-title">Words that educate, inspire and empower</h2>
          <p className="text-ink-600 mb-8 max-w-xl mx-auto">
            From <em>The Inner Map</em> to <em>Miracles Beyond Logic</em>, explore Dr. Maria's
            published works &mdash; or browse her full catalogue right here on the site.
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

      {/* TESTIMONIALS */}
      <section className="px-5 py-16">
        <SectionDivider />
        <p className="eyebrow text-center">Stories of Change</p>
        <h2 className="section-title">What clients are saying</h2>
        <p className="text-center text-xs italic text-ink-400 -mt-7 mb-10">
          Sample testimonials &mdash; to be replaced with real client stories.
        </p>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <Reveal key={t.name}>
              <div className="bg-cream-100 rounded-brand p-7 border-t-3 border-gold-500">
                <p className="font-display italic text-teal-900 mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide">{t.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative bg-teal-900 text-cream-100 text-center px-5 py-16">
        <div className="flex justify-center mb-4 text-gold-300">
          <LeafIcon className="w-12 h-13" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
          Ready to lead without losing yourself?
        </h2>
        <p className="max-w-lg mx-auto text-teal-100 mb-7">
          Book a consultation with Barr. Dr. Maria Esele Abraham and take the first step
          toward clarity, healing and wholeness.
        </p>
        <Link to="/book" className="btn-primary btn-large">Book a Consultation</Link>
      </section>
    </main>
  );
}
