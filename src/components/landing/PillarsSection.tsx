import React from 'react';
import { HeartHandshake, Users, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface PillarsSectionProps {
  onExploreSeva: () => void;
  onExploreSafar: () => void;
  onExploreSafety: () => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({
  onExploreSeva,
  onExploreSafar,
  onExploreSafety,
}) => {
  return (
    <section className="py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Three Pillars of Vihara</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-display tracking-tight text-balance">
            SEVA. SAFAR. SAFETY.
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed text-balance">
            Every meaningful adventure needs a purpose, the right people by your side, and continuous safety coverage.
          </p>
        </div>

        {/* 3 Pillar Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: SEVA */}
          <div className="group relative rounded-2xl bg-neutral-50/80 border border-neutral-200/90 p-8 flex flex-col justify-between hover:bg-white hover:shadow-xl hover:border-neutral-300 transition-all duration-300">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-teal-100/90 text-teal-800 flex items-center justify-center font-display font-black text-xl group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">Pillar 01</span>
                <h3 className="text-2xl font-bold text-neutral-900 font-display mt-0.5">
                  SEVA
                </h3>
                <p className="text-sm font-semibold text-neutral-700 mt-1">
                  Volunteer & Explore
                </p>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed">
                Discover verified volunteering opportunities at cultural festivals, conservation drives, NGO youth cohorts, and community initiatives across India.
              </p>

              <div className="pt-2 border-t border-neutral-200/70 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Verified NGO & Festival Hosts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Transparent Host-Provided Benefits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Government / Partner Seva Certificates</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onExploreSeva}
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Explore SEVA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: SAFAR */}
          <div className="group relative rounded-2xl bg-amber-50/40 border border-amber-200/80 p-8 flex flex-col justify-between hover:bg-white hover:shadow-xl hover:border-amber-300 transition-all duration-300">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-display font-black text-xl group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Pillar 02</span>
                <h3 className="text-2xl font-bold text-neutral-900 font-display mt-0.5">
                  SAFAR
                </h3>
                <p className="text-sm font-semibold text-neutral-700 mt-1">
                  Find Your Travel Tribe
                </p>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed">
                Don't just find someone going to the same place. Find someone who travels like you. Compare compatibility across dates, budgets, styles, and mutual consent.
              </p>

              <div className="pt-2 border-t border-amber-200/60 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Verified College Student Network</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Weighted Compatibility Matching Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Privacy First & Mutual Consent Requests</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onExploreSafar}
                className="w-full py-3 px-4 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 cursor-pointer group shadow-xs"
              >
                <span>Find Travellers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: SAFETY */}
          <div className="group relative rounded-2xl bg-neutral-50/80 border border-neutral-200/90 p-8 flex flex-col justify-between hover:bg-white hover:shadow-xl hover:border-neutral-300 transition-all duration-300">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-display font-black text-xl group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Pillar 03</span>
                <h3 className="text-2xl font-bold text-neutral-900 font-display mt-0.5">
                  SAFETY
                </h3>
                <p className="text-sm font-semibold text-neutral-700 mt-1">
                  Protected Throughout the Journey
                </p>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed">
                Stay connected and protected with multi-tier verification, real-time departure/arrival check-ins, automated trusted contact alerts, and rapid incident escalation.
              </p>

              <div className="pt-2 border-t border-neutral-200/70 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Trusted Contacts Auto-Notification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Simulated Missed Check-in Escalation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>24/7 Helpline Guide & Incident Tracking</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onExploreSafety}
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Explore Safety</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
