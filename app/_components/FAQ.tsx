import { Leaf, Mail } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "How accurate are your probability calculations?",
    answer:
      "Our calculations are based on official legislation, historical lottery data, demographic analysis, and real-time application tracking. We factor in license quotas, SEA preferences, county population, and competition density. Accuracy ranges from 85-95% depending on data availability for each state.",
  },
  {
    id: 2,
    question: 'What is SEA eligibility and how does it affect my odds?',
    answer:
      'Social Equity Applicant (SEA) status can multiply your win probability by 2-3x depending on the state. Requirements vary but typically include factors like cannabis-related convictions, residence in disproportionately impacted areas, HBCU alumni status, or low-income qualifications. We calculate your exact boost per county.',
  },
  {
    id: 3,
    question: 'Which states do you currently cover?',
    answer:
      "We currently provide comprehensive data for Virginia, Florida, Georgia, and North Carolina. Each state includes county-by-county breakdowns, license type analysis (dispensary, cultivation, processing, microbusiness), and real-time updates as new legislation passes. We're expanding to 10+ states in 2025.",
  },
  {
    id: 4,
    question: 'How does investor matching work?',
    answer: 
      'Our AI analyzes your location, funding needs, license type, and business plan to match you with investors seeking similar opportunities. Investors can filter by state, investment range ($100K-$5M+), SEA preference, and involvement level. Premium users get priority introductions and deal room access.',
  },
  {
    id: 5,
    question: "What's included in the free tier vs. Pro tier?",
    answer:
      'Free: Basic probability view for 3 counties, SEA eligibility check, and market reports. Basic ($49/mo): Unlimited county analysis, investor directory access, and application guides. Pro ($199/mo): Interactive scenario modeling, priority investor matching, real-time legislation alerts, and dedicated support.',
  },
  {
    id: 6,
    question: 'How often is your data updated?',
    answer:
      "We monitor state cannabis boards, legislation, and application windows daily. Probability calculations update in real-time as new data becomes available. Major updates (new license quotas, application deadlines, SEA criteria changes) trigger immediate alerts to Pro users. Our team verifies all data with primary sources.",
  },
  {
    id: 7,
    question: 'Can you help with the actual license application?',
    answer:
      "While we don't file applications on your behalf, we provide comprehensive application guides, document checklists, and compliance resources for each state. Pro users get access to our network of licensed cannabis attorneys and consultants. We focus on helping you choose the right opportunity—not navigating the paperwork.",
  },
  {
    id: 8,
    question: 'Do you guarantee I will win a license?',
    answer:
      "No. We provide data-driven probability analysis to help you make informed decisions, but cannabis licensing is competitive and outcomes depend on many factors including application quality, local opposition, compliance history, and regulatory discretion. Our platform optimizes your strategy—it doesn't replace due diligence.",
  },
  {
    id: 9,
    question: 'How do you calculate market value estimates?',
    answer:
      "We analyze comparable sales, population density, competition levels, average dispensary revenue in similar markets, and state-specific regulations (delivery allowed, vertical integration, etc.). Values range from $500K-$5M+ per license. These are estimates for investment modeling—not appraisals or guarantees.",
  },
  {
    id: 10,
    question: 'Is my data secure and confidential?',
    answer:
      "Yes. We use bank-level encryption (AES-256), secure cloud infrastructure (SOC 2 compliant), and never share your application strategy or investor conversations. Your data is yours—we don't sell it to third parties. Cannabis industry data is especially sensitive, and we treat it accordingly.",
  },
  {
    id: 11,
    question: 'What makes Sagebrush different from competitors?',
    answer:
      "We're the only platform combining real-time probability calculations, SEA eligibility analysis, and investor matching in one place. Others focus on legal compliance or consulting—we focus on data-driven decision making. Our scenario modeling lets you test different strategies before committing capital.",
  },
  {
    id: 12,
    question: 'Can I cancel my subscription anytime?',
    answer:
      "Yes. Cancel anytime with no penalties. You'll retain access until the end of your billing period. We also offer annual plans (20% discount) and custom enterprise pricing for multi-state operators, investor groups, and consulting firms. Contact sales for volume pricing.",
  },
]

export default function SagebrushFAQ() {
  return (
    <div className="bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Leaf className="h-10 w-10 text-emerald-500" />
          <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
        </div>
        
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-6 max-w-3xl text-base/7 text-slate-400">
          Have a different question and can't find the answer you're looking for? Reach out to our support team by{' '}
          <a 
            href="mailto:support@sagebrush.io" 
            className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
          >
            <Mail className="h-4 w-4" />
            sending us an email
          </a>{' '}
          and we'll get back to you within 24 hours.
        </p>

        {/* FAQ Grid */}
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
            {faqs.map((faq) => (
              <div 
                key={faq.id}
                className="group"
              >
                <dt className="text-base/7 font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base/7 text-slate-400">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA Section */}
        <div className="mt-20 border-t border-slate-800 pt-16">
          <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-500/20 rounded-2xl p-8 lg:p-12">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Still have questions?
                </h3>
                <p className="text-lg text-slate-300 mb-6">
                  Schedule a free 30-minute consultation with our cannabis licensing experts. We'll walk you through the platform and answer your specific questions about your target states.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors">
                    Schedule Consultation
                  </button>
                  <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-colors">
                    View Demo
                  </button>
                </div>
              </div>
              <div className="mt-8 lg:mt-0">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-emerald-400 text-lg">✓</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Free Trial Available</div>
                      <div className="text-sm text-slate-400">7 days, no credit card required</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-cyan-400 text-lg">✓</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Expert Support</div>
                      <div className="text-sm text-slate-400">Former applicants & investors on our team</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-amber-400 text-lg">✓</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Money-Back Guarantee</div>
                      <div className="text-sm text-slate-400">30 days, no questions asked</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Documentation</h4>
            <p className="text-sm text-slate-400 mb-4">
              Comprehensive guides on probability analysis, SEA criteria, and state-specific requirements.
            </p>
            <a href="#" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              Browse docs →
            </a>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Video Tutorials</h4>
            <p className="text-sm text-slate-400 mb-4">
              Step-by-step walkthroughs of platform features, scenario modeling, and best practices.
            </p>
            <a href="#" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Watch tutorials →
            </a>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Community Forum</h4>
            <p className="text-sm text-slate-400 mb-4">
              Connect with other applicants and investors, share strategies, and learn from success stories.
            </p>
            <a href="#" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
              Join community →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
