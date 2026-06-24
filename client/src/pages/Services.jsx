import { Link } from 'react-router-dom';
import LeafIcon from '../components/LeafIcon.jsx';
import { Reveal } from '../hooks/useScrollAnimations.jsx';

const pillars = [
  {
    number: '01',
    title: 'Therapy & Counselling',
    intro: 'Professional support for emotional, psychological and relational wellbeing.',
    items: [
      'Individual Therapy', 'Relationship Counselling', 'Marriage Counselling',
      'Premarital Counselling', 'Family Therapy', 'Anxiety Management',
      'Stress Management', 'Depression Support', 'Grief and Loss Counselling',
      'Trauma Recovery', 'Self-Esteem and Confidence Building',
      'Life Transition Support', 'Emotional Regulation Support'
    ]
  },
  {
    number: '02',
    title: 'Coaching & Personal Development',
    intro: 'Helping individuals move from where they are to where they want to be.',
    items: [
      'Life Coaching', 'Personal Growth Coaching', 'Relationship Coaching',
      'Emotional Intelligence Coaching', "Women's Empowerment Coaching",
      'Leadership Coaching', 'Goal Achievement Coaching', 'Purpose Discovery Coaching',
      'Confidence Building Coaching', 'Career and Life Transition Coaching'
    ]
  },
  {
    number: '04',
    title: 'Training & Consulting',
    intro: 'Building healthier organizations, schools, churches and communities.',
    items: [
      'Mental Health Awareness', 'Emotional Intelligence Development',
      'Leadership Development', 'Communication Skills', 'Conflict Resolution',
      'Stress Management', 'Workplace Wellbeing', 'Employee Wellness',
      'Relationship Skills', 'Parenting Skills', "Women's Empowerment",
      'Faith-Based Wellness Programmes'
    ]
  },
  {
    number: '05',
    title: 'Speaking, Publications & Thought Leadership',
    intro: 'Transformational ideas that educate, inspire and empower.',
    items: [
      'Schema Intelligence', 'Emotional Intelligence', 'Mental Health and Wellbeing',
      'Relationships and Marriage', 'Personal Growth', 'Leadership Development',
      "Women's Emotional Wellness", 'Parenting', 'Resilience and Recovery', 'Purpose and Meaning'
    ]
  }
];

const schemaBenefits = [
  'Recognize unhealthy emotional patterns',
  'Identify recurring life themes',
  'Understand emotional triggers',
  'Break self-defeating cycles',
  'Improve relationships',
  'Develop deeper self-awareness',
  'Strengthen emotional resilience',
  'Build healthier beliefs',
  'Create sustainable change'
];

export default function Services() {
  return (
    <main>
      <section className="px-5 pt-14 pb-10 text-center max-w-3xl mx-auto">
        <p className="eyebrow eyebrow-gold text-center">Our Five Pillars of Service</p>
        <h1 className="font-display text-3xl md:text-5xl mb-5">
          Support for every season you're moving through
        </h1>
        <p className="text-ink-600">
          At Aome Consults, we believe transformation begins with understanding. Through
          therapy, coaching, Schema Intelligence™, training and consulting, we help people
          move beyond survival into emotional wellness, relational health and purposeful living.
        </p>
      </section>

      {/* SCHEMA INTELLIGENCE — signature framework, given visual prominence */}
      <section className="bg-teal-900 text-cream-100 px-5 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4 text-gold-300">
            <LeafIcon className="w-9 h-10" />
            <p className="eyebrow text-gold-300 mb-0">Pillar 03 &middot; Our Signature Framework</p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Schema Intelligence™ — Understanding the Patterns Behind the Pain
          </h2>
          <p className="text-teal-100 mb-4 max-w-2xl">
            Many people struggle with recurring challenges in relationships, self-worth,
            decision-making and emotional wellbeing without understanding why those patterns
            continue to repeat. Schemas are deeply rooted beliefs, assumptions and emotional
            patterns formed through life experience &mdash; and Schema Intelligence helps you
            uncover the hidden emotional blueprints shaping your life.
          </p>
          <p className="font-display italic text-gold-300 text-lg mb-8">
            When you understand your schema, you understand your story. When you understand
            your story, you gain the power to rewrite it.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {schemaBenefits.map((b) => (
              <div key={b} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm">
                {b}
              </div>
            ))}
          </div>

          <p className="text-xs uppercase tracking-widest text-teal-100/70 mb-2">Schema Intelligence Services</p>
          <p className="text-sm text-teal-100">
            Schema Intelligence Assessment &middot; Schema-Based Therapy &middot; Schema
            Intelligence Coaching &middot; Relationship Schema Analysis &middot; Family Schema
            Assessment &middot; Parenting & Generational Pattern Work &middot; Schema
            Intelligence for Leaders &middot; Workshops &amp; Masterclasses
          </p>
        </div>
      </section>

      {/* OTHER FOUR PILLARS */}
      <section className="px-5 py-16">
        <div className="max-w-5xl mx-auto grid gap-6">
          {pillars.map((pillar) => (
            <Reveal key={pillar.title}>
              <div className="card">
                <p className="text-xs font-bold text-gold-600 tracking-widest mb-1">PILLAR {pillar.number}</p>
                <h3 className="font-display text-2xl mb-2">{pillar.title}</h3>
                <p className="text-ink-600 mb-4">{pillar.intro}</p>
                <div className="flex flex-wrap gap-2">
                  {pillar.items.map((item) => (
                    <span key={item} className="text-xs font-semibold bg-teal-100 text-teal-700 px-3 py-1.5 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream-50 text-center px-5 py-16">
        <h2 className="section-title">Ready to begin understanding your story?</h2>
        <Link to="/book" className="btn-primary btn-large">Book a Consultation</Link>
      </section>
    </main>
  );
}
