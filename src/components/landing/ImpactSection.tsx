import React from 'react';
import { Star, Quote, Award } from 'lucide-react';

export const ImpactSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'Volunteering at the Goa Marine Drive through Vihara cut my travel lodging costs to zero while letting me connect with Ananya from BITS. The safety check-in gave my parents complete peace of mind.',
      name: 'Priya Nair',
      college: "St. Xavier's Mumbai",
      role: 'Environmental Studies',
      verified: 'Trusted Traveller',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'As an organizer of the Jaipur Walled City walks, having pre-verified students who are genuinely passionate about heritage made our visitor experience unforgettable. Verifying their certificates took one click.',
      name: 'Digvijay Rathore',
      college: 'Sahapedia Heritage Foundation',
      role: 'Community Lead',
      verified: 'Verified Organizer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-2xl mb-12">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Prototype Community Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-display tracking-tight mt-1 text-balance">
            Real Student Experiences. Tangible Trust.
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed text-balance">
            Designed for students traveling across India seeking meaningful volunteering, affordable journeys, and certified safety.
          </p>
        </div>

        {/* Quantified Metrics Grid with Tabular Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-2xl bg-neutral-900 text-white shadow-xl mb-14">
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight tabular-nums text-amber-400">
              1,200+
            </div>
            <p className="text-xs sm:text-sm font-semibold text-neutral-300 mt-1">
              Student Explorers
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Enrolled across 140+ campuses
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight tabular-nums text-amber-400">
              350+
            </div>
            <p className="text-xs sm:text-sm font-semibold text-neutral-300 mt-1">
              Volunteer Opportunities
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Festivals, NGOs & Eco-camps
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight tabular-nums text-amber-400">
              85+
            </div>
            <p className="text-xs sm:text-sm font-semibold text-neutral-300 mt-1">
              Community Partners
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Verified hosts providing food & stay
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight tabular-nums text-amber-400">
              94%
            </div>
            <p className="text-xs sm:text-sm font-semibold text-neutral-300 mt-1">
              Avg Compatibility
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Algorithm recommendations
            </p>
          </div>
        </div>

        {/* Claim-to-Proof Adjacent Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-neutral-50/70 rounded-2xl p-7 border border-neutral-200/90 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-7 h-7 text-amber-500/80" />
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-200/60 mt-6 flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-neutral-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 font-display">
                    {t.name}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {t.role} · {t.college}
                  </p>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    {t.verified}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
