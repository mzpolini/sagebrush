"use client";

import Image from "next/image";
import Link from "next/link";
import { Leaf, TrendingUp, MapPin, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <div className="bg-slate-950">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-slate-950 lg:block"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                
                {/* Top Badge - Live Data Indicator */}
                <div className="hidden sm:mb-10 sm:flex">
                  <div className="relative rounded-full px-4 py-2 text-sm/6 bg-emerald-950/50 border border-emerald-500/30 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-emerald-400 font-semibold">Live Data:</span>
                      <span className="text-slate-300">2,847 counties analyzed across 15 states</span>
                    </div>
                  </div>
                </div>

                {/* Logo Mark */}
                <div className="flex items-center gap-3 mb-6">
                  <Leaf className="h-12 w-12 text-emerald-500" strokeWidth={2.5} />
                  <div>
                    <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-green-400 to-lime-500 text-transparent bg-clip-text">
                      Sagebrush
                    </div>
                    <div className="text-xs text-slate-500 font-mono">License Intelligence</div>
                  </div>
                </div>

                {/* Main Headline */}
                <h1 className="text-pretty text-5xl font-bold tracking-tight text-white sm:text-7xl leading-tight">
                  Know your{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-lime-500 text-transparent bg-clip-text">
                    exact odds
                  </span>{" "}
                  before you apply
                </h1>

                {/* Subheadline */}
                <p className="mt-8 text-pretty text-lg font-medium text-slate-300 sm:text-xl/8">
                  Real-time probability analysis for cannabis license applicants and investors. 
                  Stop guessing. Start winning.
                </p>

                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <div className="text-2xl font-mono font-black text-emerald-400">24.8%</div>
                    <div className="text-xs text-slate-500 mt-1">Avg Win Rate</div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <div className="text-2xl font-mono font-black text-cyan-400">2-3x</div>
                    <div className="text-xs text-slate-500 mt-1">SEA Boost</div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <div className="text-2xl font-mono font-black text-amber-400">$2.5M</div>
                    <div className="text-xs text-slate-500 mt-1">Avg License Value</div>
                  </div>
                </div>

                {/* Key Features Pills */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-sm text-slate-300">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    County-by-County Analysis
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-sm text-slate-300">
                    <TrendingUp className="h-4 w-4 text-cyan-400" />
                    Investor Matching
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-sm text-slate-300">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    Scenario Modeling
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link 
                    href="/features" 
                    className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2"
                  >
                    Calculate Your Odds
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>

                  <Link
                    href="/company"
                    className="text-sm/6 font-semibold text-slate-300 hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
                  >
                    Watch Demo
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Link>
                </div>

                {/* Social Proof */}
                <div className="mt-10 pt-10 border-t border-slate-800">
                  <div className="flex items-center gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex -space-x-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-slate-950" />
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 border-2 border-slate-950" />
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-slate-950" />
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-slate-950 flex items-center justify-center text-white text-xs font-bold">
                            +50
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">
                        <span className="text-emerald-400 font-semibold">500+ applicants</span> analyzed their odds
                      </p>
                    </div>
                    <div className="h-8 w-px bg-slate-800" />
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">
                        Trusted by applicants & investors
                      </p>
                    </div>
                  </div>
                </div>

                {/* States Badge */}
                <div className="mt-6">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-mono">Available States</p>
                  <div className="flex flex-wrap gap-2">
                    {['Virginia', 'Florida', 'Georgia', 'N. Carolina', 'Maryland', '+10 more'].map((state) => (
                      <div
                        key={state}
                        className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-400 font-mono hover:border-emerald-500/50 hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        {state}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Image Section - Kept as requested */}
        <div className="bg-slate-900 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            src="/sgHeroNoWordsMobile.png"
            alt="Sagebrush Platform Dashboard"
            className="aspect-[3/2] object-cover lg:aspect-auto lg:size-full"
            width={1587}
            height={1058}
            priority
          />
        </div>
      </div>
    </div>
  );
}
