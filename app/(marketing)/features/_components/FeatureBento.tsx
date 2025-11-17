import { Target, Users, Zap, Award, Leaf } from 'lucide-react';

export default function SagebrushBento() {
  return (
    <div className="bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-emerald-500" />
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          <h2 className="text-base/7 font-semibold text-emerald-400 font-mono uppercase tracking-wider">
            Intelligence Platform
          </h2>
        </div>
        <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
          <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-lime-500 text-transparent bg-clip-text">
            Win your license.
          </span>{' '}
          Fund your future.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-400">
          Data-driven probability analysis for cannabis license applicants and investors
        </p>

        {/* Bento Grid */}
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          
          {/* Feature 1: Probability Calculations - Large Left */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-emerald-900/40 to-slate-900 lg:rounded-l-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)] border border-emerald-500/20">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Target className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-transparent rounded-full" />
                </div>
                <p className="mt-2 text-2xl font-bold tracking-tight text-white">
                  Real-Time Probability Analysis
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-slate-400">
                  County-by-county odds calculated from legislation, demographics, and competition density. Know your chances before you apply.
                </p>
              </div>
              
              {/* Mock Dashboard Preview */}
              <div className="relative min-h-[30rem] w-full grow p-8">
                <div className="h-full bg-slate-950/80 rounded-xl border border-slate-800 p-6 backdrop-blur-sm">
                  {/* Mock Probability Display */}
                  <div className="mb-6">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-mono">
                      Fairfax County, VA
                    </div>
                    <div className="text-6xl font-mono font-black text-emerald-400 mb-2">
                      24.8%
                    </div>
                    <div className="text-sm text-slate-400 font-mono">Win Probability</div>
                  </div>
                  
                  {/* Mock Chart Bars */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-slate-500 w-20">Arlington</div>
                      <div className="flex-1 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg opacity-80" style={{ width: '87%' }} />
                      <div className="text-sm font-mono text-emerald-400 w-16 text-right">21.6%</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-slate-500 w-20">Loudoun</div>
                      <div className="flex-1 h-8 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg opacity-70" style={{ width: '73%' }} />
                      <div className="text-sm font-mono text-cyan-400 w-16 text-right">18.2%</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-slate-500 w-20">Richmond</div>
                      <div className="flex-1 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg opacity-60" style={{ width: '66%' }} />
                      <div className="text-sm font-mono text-amber-400 w-16 text-right">16.4%</div>
                    </div>
                  </div>
                  
                  {/* Mock Metrics */}
                  <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Licenses</div>
                      <div className="text-2xl font-mono font-bold text-white">8</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Applicants</div>
                      <div className="text-2xl font-mono font-bold text-white">850</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-xl shadow-emerald-500/10 outline outline-1 outline-emerald-500/20 lg:rounded-l-[2rem]" />
          </div>

          {/* Feature 2: SEA Boost - Top Middle */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-slate-900 max-lg:rounded-t-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] border border-slate-800">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Award className="h-6 w-6 text-amber-400" />
                  </div>
                  <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-transparent rounded-full" />
                </div>
                <p className="mt-2 text-xl font-bold tracking-tight text-white">
                  SEA Eligibility Boost
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-slate-400">
                  Social Equity Applicants get up to 2x probability multiplier. We calculate your exact advantage.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-8">
                {/* SEA Badge Visual */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 px-6 py-4 bg-emerald-950/50 border-2 border-emerald-500/50 rounded-xl mb-4">
                    <div className="text-4xl">✓</div>
                    <div className="text-left">
                      <div className="text-sm text-emerald-400 font-bold uppercase tracking-wider">SEA Eligible</div>
                      <div className="text-xs text-slate-400">Social Equity Applicant</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-slate-500 text-xs uppercase mb-1">Standard</div>
                      <div className="text-3xl font-mono font-black text-slate-600">12.4%</div>
                    </div>
                    <div className="text-emerald-400 text-2xl">→</div>
                    <div className="text-center">
                      <div className="text-emerald-400 text-xs uppercase mb-1">With SEA</div>
                      <div className="text-3xl font-mono font-black text-emerald-400">24.8%</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-amber-400 font-mono font-bold">2.0x Multiplier</div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow outline outline-1 outline-slate-700 max-lg:rounded-t-[2rem]" />
          </div>

          {/* Feature 3: Investor Matching - Bottom Middle */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-slate-900" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] border border-slate-800">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
                </div>
                <p className="mt-2 text-xl font-bold tracking-tight text-white">
                  Smart Investor Matching
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-slate-400">
                  Connect applicants with capital partners. AI-powered matching based on location, budget, and preferences.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center max-lg:py-6 lg:pb-4 px-8">
                {/* Match Cards */}
                <div className="space-y-2 w-full">
                  <div className="flex items-center gap-3 bg-slate-950/50 border border-cyan-500/30 rounded-lg p-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                      GC
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white">Green Capital Partners</div>
                      <div className="text-xs text-slate-400">$500K - $2M • Virginia</div>
                    </div>
                    <div className="text-xs font-mono font-bold text-cyan-400">92% Match</div>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-950/50 border border-slate-700 rounded-lg p-3 opacity-70">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      EV
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white">Emerald Ventures</div>
                      <div className="text-xs text-slate-400">$250K - $1M • Multi-state</div>
                    </div>
                    <div className="text-xs font-mono font-bold text-purple-400">87% Match</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow outline outline-1 outline-slate-700" />
          </div>

          {/* Feature 4: Scenario Modeling - Large Right */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-slate-900 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)] border border-slate-800">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
                  </div>
                  <div className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                    PRO
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold tracking-tight text-white">
                  Interactive Scenario Modeling
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-slate-400">
                  Adjust forecasts, model different outcomes, and stress-test your investment thesis in real-time.
                </p>
              </div>
              
              {/* Scenario Modeling Preview */}
              <div className="relative min-h-[30rem] w-full grow p-8">
                <div className="h-full bg-gradient-to-br from-purple-950/30 to-slate-950/80 rounded-xl border border-purple-500/20 p-6 backdrop-blur-sm">
                  
                  {/* Forecasted Probability */}
                  <div className="bg-slate-950/80 border-2 border-cyan-500/50 rounded-xl p-4 mb-6">
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-mono">
                      Forecasted Win Probability
                    </div>
                    <div className="flex items-baseline gap-3">
                      <div className="text-5xl font-mono font-black text-cyan-400">18.6%</div>
                      <div className="text-xl font-mono font-bold text-emerald-400">+3.2%</div>
                    </div>
                  </div>

                  {/* Slider 1 */}
                  <div className="mb-6">
                    <div className="flex justify-between items-baseline mb-2">
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                        Expected Licenses
                      </div>
                      <div className="text-2xl font-mono font-black text-emerald-400">12</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: '48%' }} />
                    </div>
                    <div className="flex justify-between text-xs text-slate-600 mt-1 font-mono">
                      <span>1</span>
                      <span>25</span>
                      <span>50</span>
                    </div>
                  </div>

                  {/* Slider 2 */}
                  <div className="mb-6">
                    <div className="flex justify-between items-baseline mb-2">
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                        Expected Applications
                      </div>
                      <div className="text-2xl font-mono font-black text-amber-400">650</div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{ width: '32%' }} />
                    </div>
                    <div className="flex justify-between text-xs text-slate-600 mt-1 font-mono">
                      <span>50</span>
                      <span>1000</span>
                      <span>2000</span>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 uppercase mb-1">Ratio</div>
                      <div className="text-lg font-mono font-bold text-white">1:54</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 uppercase mb-1">Competition</div>
                      <div className="text-lg font-mono font-bold text-amber-400">High</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 uppercase mb-1">Confidence</div>
                      <div className="text-lg font-mono font-bold text-cyan-400">Med</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow outline outline-1 outline-slate-700 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
            Start Your Analysis
          </button>
          <p className="mt-4 text-sm text-slate-500">
            Free trial • No credit card required • Virginia, Florida, Georgia, North Carolina
          </p>
        </div>
      </div>
    </div>
  );
}
