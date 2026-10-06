import React from 'react';
import { ArrowRight, Compass, ShieldCheck, HeartHandshake, Users, MapPin, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../../data/mockData';

interface HeroSectionProps {
  onExploreOpportunities: () => void;
  onFindTravellers: () => void;
  onOpenSafety: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreOpportunities,
  onFindTravellers,
  onOpenSafety,
}) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28 bg-stone-50 border-b border-neutral-200/80">
      {/* Full-width, low-opacity, layered SVG mountain silhouette with subtle parallax drift */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Soft Ambient Horizon Glow */}
        <div className="absolute top-0 right-1/4 w-[520px] h-[360px] bg-gradient-to-b from-amber-100/35 via-amber-50/15 to-transparent rounded-full blur-3xl -translate-y-1/3" />

        {/* Layer 1: Distant Himalayan Peaks (Slow Parallax Drift) */}
        <div className="absolute inset-x-[-8%] bottom-0 h-[82%] animate-parallax-slow opacity-65">
          <svg
            viewBox="0 0 1600 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover object-bottom"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroDistantRidgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.18" />
                <stop offset="45%" stopColor="#cbd5e1" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#fafaf9" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path
              d="M 0 320 
                 L 0 190 
                 L 110 160 
                 L 220 200 
                 L 360 120 
                 L 500 195 
                 L 650 90 
                 L 780 180 
                 L 920 70 
                 L 1060 165 
                 L 1190 100 
                 L 1320 180 
                 L 1460 115 
                 L 1600 170 
                 L 1600 420 
                 L 0 420 Z"
              fill="url(#heroDistantRidgeGrad)"
            />
          </svg>
        </div>

        {/* Layer 2: Mid-Ground Adventure Ridges (Medium Parallax Drift in Reverse) */}
        <div className="absolute inset-x-[-8%] bottom-0 h-[68%] animate-parallax-medium opacity-75">
          <svg
            viewBox="0 0 1600 360"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover object-bottom"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroMidRidgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d97706" stopOpacity="0.15" />
                <stop offset="40%" stopColor="#78716c" stopOpacity="0.11" />
                <stop offset="100%" stopColor="#fafaf9" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            <path
              d="M 0 300 
                 C 120 280, 220 200, 360 200 
                 C 500 200, 580 260, 720 230 
                 C 860 200, 940 130, 1080 150 
                 C 1220 170, 1340 250, 1480 210 
                 C 1540 195, 1570 215, 1600 205 
                 L 1600 360 
                 L 0 360 Z"
              fill="url(#heroMidRidgeGrad)"
            />
            {/* Minimalist Spine Accent Line */}
            <path
              d="M 0 300 C 120 280, 220 200, 360 200 C 500 200, 580 260, 720 230 C 860 200, 940 130, 1080 150 C 1220 170, 1340 250, 1480 210"
              stroke="#b45309"
              strokeWidth="1"
              strokeOpacity="0.12"
              fill="none"
            />
          </svg>
        </div>

        {/* Layer 3: Foreground Foothill Silhouettes (Gentle Parallax Drift) */}
        <div className="absolute inset-x-[-8%] bottom-0 h-[50%] animate-parallax-fore opacity-85">
          <svg
            viewBox="0 0 1600 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover object-bottom"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroForeRidgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b45309" stopOpacity="0.10" />
                <stop offset="50%" stopColor="#57534e" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#fafaf9" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <path
              d="M 0 250 
                 C 150 235, 270 170, 440 185 
                 C 610 200, 740 145, 920 160 
                 C 1100 175, 1220 140, 1390 170 
                 C 1490 190, 1550 175, 1600 185 
                 L 1600 280 
                 L 0 280 Z"
              fill="url(#heroForeRidgeGrad)"
            />
          </svg>
        </div>

        {/* Soft Linear Gradient Ground Mask for Ultra-Clean Blending */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-stone-50 via-stone-50/80 to-transparent" />
      </div>

      {/* Foreground Content with High-Contrast Z-Index */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Storytelling & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 font-display leading-[1.08] text-balance">
                Travel With Purpose.
              </h1>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-display">
                Volunteer. Connect. Explore. Safely.
              </p>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl text-balance">
              Discover meaningful volunteer opportunities from high-altitude Himalayan schools to coastal turtle conservation. Meet compatible student co-travellers with verified safety built into every journey.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onExploreOpportunities}
                className="px-6 py-3.5 rounded-xl bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group whitespace-nowrap"
              >
                <span>Explore Opportunities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onFindTravellers}
                className="px-6 py-3.5 rounded-xl bg-white/95 backdrop-blur-xs border border-neutral-300 text-neutral-900 font-bold text-sm hover:bg-white transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-xs"
              >
                <Users className="w-4 h-4 text-amber-700" />
                <span>Find Travel Buddies</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-600 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verified College IDs</span>
              </div>
              <span className="hidden sm:inline text-neutral-300">·</span>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-teal-700" />
                <span>Verified Host Stays & Food</span>
              </div>
              <span className="hidden sm:inline text-neutral-300">·</span>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-700" />
                <span>Live Journey Check-ins</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Anchor + Floating Contextual UI Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/90 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 bg-neutral-100">
                <img
                  src={HERO_IMAGE}
                  alt="University students volunteering and exploring in India"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <div className="flex items-center gap-1.5 font-bold tracking-tight text-white/95">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Manali · Spiti · Goa · Jaipur · Kochi</span>
                  </div>
                  <p className="text-[11px] text-white/80 mt-0.5">
                    Purposeful student journeys across mountain trails, cultural havelis & coastal reserves
                  </p>
                </div>
              </div>

              {/* Floating Card 1: Verified Student */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-neutral-200/80 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[210px]">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-neutral-900 truncate">Verified Student</p>
                  <p className="text-[10px] text-neutral-500 truncate">IIT Hyderabad · B.Tech</p>
                </div>
              </div>

              {/* Floating Card 2: Compatibility */}
              <div className="absolute -bottom-4 -left-3 sm:-left-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-neutral-200/80 flex items-center gap-3 max-w-[220px]">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs font-mono shrink-0">
                  94%
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-neutral-900 truncate">Travel Tribe Match</p>
                  <p className="text-[10px] text-neutral-500 truncate">Himalayan Trails · Dates Sync</p>
                </div>
              </div>

              {/* Floating Card 3: Active Safety Check-in */}
              <div
                onClick={onOpenSafety}
                className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-emerald-200/90 flex items-center gap-3 cursor-pointer hover:bg-neutral-50 transition-colors max-w-[210px]"
              >
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-600"></span>
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-neutral-900 truncate">Active Journey</p>
                  <p className="text-[10px] text-teal-700 font-medium truncate">Check-in Due: 45m</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
