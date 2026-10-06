import React from 'react';
import { Compass, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenIncidentReport: () => void;
  onOpenEmergencyGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenIncidentReport,
  onOpenEmergencyGuide,
}) => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-24 md:pb-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Volunteer Vihara
              </span>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Travel with Purpose. Connect with People. Explore Safely. The student-centric ecosystem
              connecting meaningful volunteering with compatible travel companions and continuous journey safety.
            </p>
            <div className="pt-2 text-xs text-neutral-400 space-y-1">
              <p className="flex items-center gap-1.5 text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Student Identity & Safe Check-in Protocol
              </p>
              <p>Pan-India Student Network across 140+ Universities</p>
            </div>
          </div>

          {/* Product Col */}
          <div>
            <h4 className="text-xs font-bold text-neutral-100 uppercase tracking-wider mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('explore')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Explore Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('seva')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SEVA — Volunteering
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('safar')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SAFAR — Travel Tribe
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('safety')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Active Journey Safety
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Organizers & Admin */}
          <div>
            <h4 className="text-xs font-bold text-neutral-100 uppercase tracking-wider mb-4">
              For Organizers
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('organizer-dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Organizer Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('organizer-dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Host Opportunities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('admin-dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Admin Trust Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('login')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Student Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('register')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Create Student Account
                </button>
              </li>
              <li>
                <span className="text-neutral-400 text-xs block pt-2">
                  Partner NGOs, Cultural Trusts & Youth Expeditions
                </span>
              </li>
            </ul>
          </div>

          {/* Safety & Help */}
          <div>
            <h4 className="text-xs font-bold text-neutral-100 uppercase tracking-wider mb-4">
              Safety & Escalation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('safety')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Safety Center Hub
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenIncidentReport}
                  className="text-amber-300 hover:text-amber-200 transition-colors font-medium cursor-pointer"
                >
                  Report an Incident
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEmergencyGuide}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Emergency Contacts (112)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('safety')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Missed Check-in Flow
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Safety Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-neutral-400">
          <p className="leading-relaxed max-w-3xl">
            <strong className="text-neutral-400">Safety & Guarantee Notice:</strong> Volunteer Vihara is a peer-coordination, volunteering discovery, and journey check-in platform. Organizer benefits (food, accommodation, stipends) are provided directly by verified third-party hosts. Volunteer Vihara does not replace official law enforcement or emergency services. In immediate danger, always contact local emergency responders (Dial 112).
          </p>
          <div className="flex items-center gap-4 text-neutral-400 shrink-0">
            <span>© 2026 Volunteer Vihara</span>
            <span>·</span>
            <span>Privacy</span>
            <span>·</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
