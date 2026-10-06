import React from 'react';
import { Modal } from '../common/Modal';
import { COMPATIBILITY_DISCLAIMER } from '../../utils/compatibility';
import { ShieldCheck, Info, Check, Sparkles } from 'lucide-react';
import { UserProfile } from '../../types';

interface CompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  traveller: {
    profile: UserProfile;
    compatibilityScore: number;
    destination: string;
    dates: string;
    breakdown: {
      destination: number;
      dates: number;
      budget: number;
      interests: number;
      travelStyle: number;
      trustScore: number;
      safetyPreferences: number;
    };
    sharedInterests: string[];
  } | null;
}

export const CompatibilityModal: React.FC<CompatibilityModalProps> = ({
  isOpen,
  onClose,
  traveller,
}) => {
  if (!traveller) return null;

  const items = [
    { label: 'Destination Match', weight: '25% weight', score: traveller.breakdown.destination, desc: `Both exploring ${traveller.destination}` },
    { label: 'Dates Alignment', weight: '20% weight', score: traveller.breakdown.dates, desc: `Overlapping travel window (${traveller.dates})` },
    { label: 'Budget Similarity', weight: '15% weight', score: traveller.breakdown.budget, desc: 'Compatible per-day accommodation & food allocation' },
    { label: 'Interests & Activities', weight: '15% weight', score: traveller.breakdown.interests, desc: `Shared: ${traveller.sharedInterests.join(', ')}` },
    { label: 'Travel Style Harmony', weight: '10% weight', score: traveller.breakdown.travelStyle, desc: `${traveller.profile.travelStyle} preference alignment` },
    { label: 'Verification & Trust', weight: '10% weight', score: traveller.breakdown.trustScore, desc: `${traveller.profile.verificationTier.replace('_', ' ')} status` },
    { label: 'Safety Protocols', weight: '5% weight', score: traveller.breakdown.safetyPreferences, desc: 'Shared check-in window and verified emergency contact' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${traveller.compatibilityScore}% Travel Compatibility Breakdown`}
      subtitle={`Algorithmic recommendation between your profile and ${traveller.profile.name}`}
      maxWidth="xl"
    >
      <div className="space-y-6 text-xs">
        {/* Score Header */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-amber-500 text-white font-mono font-black text-2xl flex items-center justify-center shadow-xs">
              {traveller.compatibilityScore}%
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900 font-display">
                Strong Travel Harmony
              </h4>
              <p className="text-neutral-600 mt-0.5">
                Matches on destination, volunteer category, and safety check-ins
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-white text-neutral-700 font-mono text-[11px] border border-amber-200">
            Weighted Multi-Factor
          </span>
        </div>

        {/* Factors Breakdown */}
        <div className="space-y-3">
          <h5 className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
            Weighted Factor Analysis
          </h5>

          <div className="space-y-2.5">
            {items.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900">{item.label}</span>
                    <span className="text-[10px] text-neutral-600 font-mono">({item.weight})</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-20 bg-neutral-200 h-2 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className="bg-neutral-900 h-full rounded-full"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="font-mono font-bold text-neutral-900 w-9 text-right tabular-nums">
                    {item.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prominent Mandatory Safety Disclaimer */}
        <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-300/80 text-[11px] text-neutral-600 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-neutral-900">
            <Info className="w-4 h-4 text-amber-600" />
            <span>Important Compatibility Advisory</span>
          </div>
          <p className="leading-relaxed">
            {COMPATIBILITY_DISCLAIMER}
          </p>
        </div>

        <div className="pt-1">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </Modal>
  );
};
