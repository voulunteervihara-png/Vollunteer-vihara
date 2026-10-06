import React from 'react';
import { ArrowRight, Sparkles, Building2, Mountain } from 'lucide-react';
import { MOUNTAIN_BACKDROP } from '../../data/mockData';

interface FinalCtaProps {
  onStartExploring: () => void;
  onBecomeOrganizer: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({
  onStartExploring,
  onBecomeOrganizer,
}) => {
  return (
    <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
      {/* Mountain Backdrop with Rich Dark Sunset Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={MOUNTAIN_BACKDROP}
          alt="Majestic mountains backdrop"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/90 to-amber-950/70" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold border border-white/10 shadow-xs">
          <Mountain className="w-3.5 h-3.5 text-amber-400" />
          <span>Launch Your Student Vihara</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight text-balance">
          Your next journey can make a difference.
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed text-balance">
          Volunteer in remote valleys. Meet travel buddies. Discover iconic places. Create lifelong memories — with continuous safety built in.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartExploring}
            className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-sm transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer group whitespace-nowrap"
          >
            <span>Start Exploring Opportunities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onBecomeOrganizer}
            className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Building2 className="w-4 h-4 text-amber-300" />
            <span>Become a Verified Host</span>
          </button>
        </div>

        <p className="text-xs text-neutral-400 pt-2">
          Free for enrolled university students across India · Verified student ID required for full access
        </p>
      </div>
    </section>
  );
};
