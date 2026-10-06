import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { Modal } from '../common/Modal';
import { VerificationBadge } from '../common/Badge';
import {
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Globe,
  Clock,
  Send,
  CheckCircle2,
  Lock,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface TravellerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  connectionStatus: 'none' | 'requested' | 'connected';
  onRequestConnect: (travellerId: string) => void;
}

export const TravellerProfileModal: React.FC<TravellerProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  connectionStatus,
  onRequestConnect,
}) => {
  const [requestSent, setRequestSent] = useState(connectionStatus !== 'none');

  if (!profile) return null;

  const handleConnectClick = () => {
    onRequestConnect(profile.id);
    setRequestSent(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${profile.name.split(' ')[0]}'s Traveller Profile`}
      subtitle="Privacy-first student profile. Contact details protected until mutual consent."
      maxWidth="lg"
    >
      <div className="space-y-6 text-xs">
        {/* Profile Card Header */}
        <div className="flex items-start gap-4 pb-5 border-b border-neutral-100">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-xs">
              <VerificationBadge tier={profile.verificationTier} showLabel={false} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold text-neutral-900 font-display">
                {profile.name.split(' ')[0]}
              </h3>
              <VerificationBadge tier={profile.verificationTier} />
            </div>

            <p className="text-xs text-neutral-600 mt-0.5">
              {profile.degree} · <span className="font-semibold text-neutral-800">{profile.college}</span>
            </p>

            <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-2">
              <span className="flex items-center gap-1 text-amber-700 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {profile.rating.toFixed(1)} ({profile.reviewsCount} reviews)
              </span>
              <span>·</span>
              <span>Class of {profile.graduationYear}</span>
              <span>·</span>
              <span>{profile.city}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <h5 className="font-bold text-neutral-900 uppercase tracking-wider text-[11px] mb-1.5">
            About {profile.name.split(' ')[0]}
          </h5>
          <p className="text-xs text-neutral-600 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-200/80">
            "{profile.bio}"
          </p>
        </div>

        {/* Trust Indicators Stats Strip */}
        <div className="grid grid-cols-3 gap-3 text-center p-3.5 rounded-xl bg-neutral-900 text-white">
          <div>
            <span className="text-xl font-bold font-mono text-amber-400 block tabular-nums">
              {profile.sevaHours}h
            </span>
            <span className="text-[10px] text-neutral-300">Seva Hours Logged</span>
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-amber-400 block tabular-nums">
              {profile.completedTrips}
            </span>
            <span className="text-[10px] text-neutral-300">Trips Completed</span>
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-emerald-400 block tabular-nums">
              {profile.trustedContactsCount}
            </span>
            <span className="text-[10px] text-neutral-300">Trusted Contacts</span>
          </div>
        </div>

        {/* Travel Style, Languages, Interests */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500">Travel Style</span>
            <span className="font-bold text-neutral-900 capitalize">{profile.travelStyle}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500">Languages Spoken</span>
            <span className="font-semibold text-neutral-800">{profile.languages.join(', ')}</span>
          </div>

          <div>
            <span className="text-neutral-500 block mb-1.5">Interests & Topics</span>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 font-medium text-[11px]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy Notice on Contact Details */}
        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-[11px] text-neutral-700">
          <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Privacy Protection Active:</strong> Personal contact information (phone number, WhatsApp, email) is never displayed publicly. Both travellers must mutually consent to connect before an encrypted travel group chat is established.
          </p>
        </div>

        {/* Connect Action */}
        <div className="pt-2">
          {connectionStatus === 'connected' ? (
            <div className="w-full py-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Mutual Connection Established</span>
            </div>
          ) : requestSent || connectionStatus === 'requested' ? (
            <div className="w-full py-3 rounded-xl bg-neutral-100 border border-neutral-300 text-neutral-700 font-semibold text-xs flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-neutral-500" />
              <span>Connection Request Sent (Awaiting {profile.name.split(' ')[0]}'s Consent)</span>
            </div>
          ) : (
            <button
              onClick={handleConnectClick}
              className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>Send Mutual Connection Request</span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
