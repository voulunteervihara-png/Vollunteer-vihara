import React from 'react';
import { UserPlus, Compass, Users, CalendarCheck, ShieldCheck, Award } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Create Your Profile',
      desc: 'Verify your college enrolment, select your volunteering interests, travel budget, and safety preferences.',
      icon: UserPlus,
    },
    {
      step: '02',
      title: 'Discover Opportunities',
      desc: 'Browse verified festivals, eco-camps, and NGOs offering meals, stays, and student certificates.',
      icon: Compass,
    },
    {
      step: '03',
      title: 'Connect With Travellers',
      desc: 'Match with compatible verified student co-travellers with mutual consent before exchanging travel plans.',
      icon: Users,
    },
    {
      step: '04',
      title: 'Plan Your Expedition',
      desc: 'Coordinate transit schedules, lodging styles, and shared safety check-in windows together.',
      icon: CalendarCheck,
    },
    {
      step: '05',
      title: 'Travel Safely',
      desc: 'Activate your journey tracker. Keep your trusted contacts updated with departure and arrival check-ins.',
      icon: ShieldCheck,
    },
    {
      step: '06',
      title: 'Explore & Build Trust',
      desc: 'Complete your Seva hours, receive host verified credentials, peer reviews, and level up your Trust Tier.',
      icon: Award,
    },
  ];

  return (
    <section className="py-20 bg-neutral-50/70 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-left mb-14">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Clear 6-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-display tracking-tight mt-1 text-balance">
            How Volunteer Vihara Works
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed text-balance">
            From discovering purposeful opportunities on campus to returning home with trusted memories and recognized credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-extrabold text-amber-600 font-mono tracking-tight">
                      Step {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 font-display mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
