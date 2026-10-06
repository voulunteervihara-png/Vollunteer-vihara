import React from 'react';
import { UserProfile } from '../../types';
import { VerificationBadge } from '../common/Badge';
import {
  MapPin,
  Calendar,
  Wallet,
  Check,
  Send,
  User,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface TravellerCardProps {
  traveller: {
    profile: UserProfile;
    destination: string;
    dates: string;
    budgetRange: string;
    compatibilityScore: number;
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
    connectionStatus: 'none' | 'requested' | 'connected';
  };
  onViewProfile: (profile: UserProfile) => void;
  onViewCompatibility: (traveller: any) => void;
  onRequestConnect: (travellerId: string) => void;
}

export const TravellerCard: React.FC<TravellerCardProps> = ({
  traveller,
  onViewProfile,
  onViewCompatibility,
  onRequestConnect,
}) => {
  const { profile } = traveller;
  const firstName = profile.name.split(' ')[0];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs hover:shadow-lg hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Header: Avatar, Name, College & Compatibility Tag */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-13 h-13 rounded-2xl object-cover border border-neutral-200 shadow-xs"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4
                  onClick={() => onViewProfile(profile)}
                  className="font-bold text-neutral-900 font-display text-base hover:text-amber-700 transition-colors cursor-pointer"
                >
                  {firstName}
                </h4>
                <VerificationBadge tier={profile.verificationTier} />
              </div>
              <p className="text-xs text-neutral-500 font-medium">
                {profile.college}
              </p>
            </div>
          </div>

          {/* Compatibility Score Trigger Button */}
          <button
            onClick={() => onViewCompatibility(traveller)}
            className="flex flex-col items-end text-right px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 transition-colors cursor-pointer shrink-0"
            title="Click to view full compatibility breakdown"
          >
            <span className="font-mono font-extrabold text-sm tabular-nums text-amber-800">
              {traveller.compatibilityScore}%
            </span>
            <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-0.5">
              <span>Match</span>
              <Sparkles className="w-2.5 h-2.5" />
            </span>
          </button>
        </div>

        {/* Travel Details Strip */}
        <div className="space-y-2 py-3 border-y border-neutral-100 text-xs text-neutral-600">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Destination</span>
            <span className="font-bold text-neutral-900 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>{traveller.destination}</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Travel Dates</span>
            <span className="font-medium text-neutral-800 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <span>{traveller.dates}</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Budget Range</span>
            <span className="font-mono text-neutral-800 flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-neutral-400" />
              <span>{traveller.budgetRange}</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Travel Style</span>
            <span className="font-semibold text-neutral-800 capitalize">
              {profile.travelStyle}
            </span>
          </div>
        </div>

        {/* 6 Compatibility Breakdown Checkmarks */}
        <div className="py-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral-600">
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-teal-600" />
            <span>Destination</span>
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-teal-600" />
            <span>Dates</span>
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-teal-600" />
            <span>Budget</span>
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-teal-600" />
            <span>Interests</span>
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-teal-600" />
            <span>Safety</span>
          </span>
        </div>

        {/* Shared Interests tags */}
        <div className="flex flex-wrap gap-1 pb-4">
          {traveller.sharedInterests.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Card CTAs */}
      <div className="pt-2 flex items-center gap-2">
        <button
          onClick={() => onViewProfile(profile)}
          className="flex-1 py-2.5 px-3 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-bold transition-colors cursor-pointer text-center"
        >
          View Profile
        </button>

        {traveller.connectionStatus === 'connected' ? (
          <button
            disabled
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Connected</span>
          </button>
        ) : traveller.connectionStatus === 'requested' ? (
          <button
            disabled
            className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-100 text-neutral-600 text-xs font-semibold flex items-center justify-center gap-1"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Requested</span>
          </button>
        ) : (
          <button
            onClick={() => onRequestConnect(profile.id)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5 text-amber-400" />
            <span>Connect</span>
          </button>
        )}
      </div>
    </div>
  );
};
