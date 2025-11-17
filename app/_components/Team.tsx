import { Leaf } from 'lucide-react';

const team = [
  {
    name: 'Lori Glauser',
    role: 'Co-Founder & CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Cannabis industry veteran with deep expertise in license applications and market analysis. Navigated the complexities of multi-state licensing and saw the need for data-driven decision making. Built Sagebrush to democratize access to probability intelligence.',
    xUrl: '#',
    linkedinUrl: '#',
  },
  {
    name: 'Carl Hairston',
    role: 'Co-Founder & Head of Data',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Data scientist and analytics expert specializing in competitive market modeling. Built the probability calculation engine that powers Sagebrush. Tracks legislation across 15+ states and translates complex regulations into actionable odds.',
    xUrl: '#',
    linkedinUrl: '#',
  },
  {
    name: 'Matt Polini',
    role: 'Co-Founder & CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Full-stack engineer and technical architect. Built scalable platforms for real-time data processing and predictive modeling. Designed Sagebrush\'s technical infrastructure to handle complex scenario modeling and investor matching at scale.',
    xUrl: '#',
    linkedinUrl: '#',
  },
]

export default function SagebrushTeam() {
  return (
    <div className="bg-slate-950 py-24 md:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 px-6 lg:px-8 xl:grid-cols-3">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="flex items-center gap-3 mb-6">
            <Leaf className="h-10 w-10 text-emerald-500" />
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-pretty text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Meet the Founders
          </h2>
          <p className="mt-6 text-lg/8 text-slate-400">
            Cannabis veterans and data experts who've been in your shoes. We combine industry experience with predictive analytics to help applicants and investors make smarter decisions.
          </p>

          {/* Team Stats */}
          <div className="mt-10 grid grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-3xl font-mono font-black text-emerald-400 mb-1">2,000+</div>
              <div className="text-sm text-slate-400">Counties Analyzed</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-3xl font-mono font-black text-cyan-400 mb-1">15</div>
              <div className="text-sm text-slate-400">States Tracked</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-3xl font-mono font-black text-amber-400 mb-1">Daily</div>
              <div className="text-sm text-slate-400">Data Updates</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-3xl font-mono font-black text-purple-400 mb-1">Real-Time</div>
              <div className="text-sm text-slate-400">Probability Calcs</div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-lg shadow-emerald-500/20"
            >
              Join Our Mission
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="mt-3 text-sm text-slate-500">We're hiring across data, engineering, and operations</p>
          </div>
        </div>

        {/* Team Grid */}
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
        >
          {team.map((person) => (
            <li key={person.name} className="group">
              <img
                alt={person.name}
                src={person.imageUrl}
                className="aspect-[3/2] w-full rounded-2xl object-cover outline outline-1 -outline-offset-1 outline-slate-700 group-hover:outline-emerald-500 transition-all"
              />
              <h3 className="mt-6 text-lg/8 font-semibold text-white group-hover:text-emerald-400 transition-colors">
                {person.name}
              </h3>
              <p className="text-base/7 text-emerald-400 font-mono">{person.role}</p>
              <p className="mt-4 text-base/7 text-slate-400">{person.bio}</p>
              
              {/* Social Links */}
              <ul role="list" className="mt-6 flex gap-x-6">
                <li>
                  <a href={person.xUrl} className="text-slate-500 hover:text-emerald-400 transition-colors">
                    <span className="sr-only">X</span>
                    <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                      <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href={person.linkedinUrl} className="text-slate-500 hover:text-emerald-400 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                      <path
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional Context Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-500/20 rounded-2xl p-8 lg:p-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Why We Built Sagebrush
              </h3>
              <p className="text-lg text-slate-300 mb-4">
                After navigating the chaos of cannabis licensing applications ourselves, we saw a massive information gap. Applicants were making million-dollar decisions based on gut feel. Investors were flying blind.
              </p>
              <p className="text-lg text-slate-300">
                We built Sagebrush to bring Wall Street-level analytics to cannabis licensing. Every applicant deserves to know their real odds. Every investor deserves transparent data. That's our mission.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 space-y-4">
              <div className="flex items-start gap-4 bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-400 text-xl">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Data-Driven</div>
                  <div className="text-sm text-slate-400">
                    Built by data scientists, not consultants selling pipe dreams
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400 text-xl">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Industry Veterans</div>
                  <div className="text-sm text-slate-400">
                    We've been applicants, operators, and investors ourselves
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 text-xl">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Transparent</div>
                  <div className="text-sm text-slate-400">
                    No hidden fees, no conflicts of interest, just honest data
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
