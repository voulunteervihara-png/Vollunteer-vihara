import React, { useState } from 'react';
import { VolunteerOpportunity } from '../../types';
import { Modal } from '../common/Modal';
import {
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Share2,
  Bed,
  Utensils,
  Wallet,
  Award,
  AlertTriangle,
  Info,
  Sparkles,
} from 'lucide-react';

interface OpportunityDetailModalProps {
  opportunity: VolunteerOpportunity | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (opportunity: VolunteerOpportunity) => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  isOpen,
  onClose,
  onApply,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);

  if (!opportunity) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="3xl">
      <div className="space-y-6">
        {/* Header Cover Banner */}
        <div className="relative -mx-6 -mt-6 aspect-21/9 bg-neutral-900 overflow-hidden">
          <img
            src={opportunity.imageUrl}
            alt={opportunity.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <MapPin className="w-4 h-4" />
              <span>{opportunity.destination}, {opportunity.state}</span>
              <span className="text-white/40">·</span>
              <span className="capitalize">{opportunity.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1 text-balance">
              {opportunity.title}
            </h2>
          </div>
        </div>

        {/* Organizer info & Action strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
              {opportunity.organizer.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-neutral-900">
                <span>{opportunity.organizer}</span>
                {opportunity.organizerVerified && (
                  <span title="Verified Host Organizer">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500">Official Non-Profit & Cultural Host</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2.5 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                isSaved
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{shareFeedback ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Key Logistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs">
          <div>
            <span className="text-neutral-500 block">Dates</span>
            <span className="font-bold text-neutral-900 mt-0.5 block">{opportunity.startDate}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Duration</span>
            <span className="font-bold text-neutral-900 mt-0.5 block">{opportunity.duration}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Available Spots</span>
            <span className="font-bold text-neutral-900 mt-0.5 block">
              {opportunity.openingsTotal - opportunity.openingsFilled} of {opportunity.openingsTotal} Left
            </span>
          </div>
          <div>
            <span className="text-neutral-500 block">Application Deadline</span>
            <span className="font-bold text-amber-700 mt-0.5 block">{opportunity.deadline}</span>
          </div>
        </div>

        {/* Description & Responsibilities */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2 font-display">
              About This Opportunity
            </h4>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {opportunity.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2 font-display">
              Volunteer Responsibilities
            </h4>
            <ul className="space-y-2">
              {opportunity.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Organizer-Provided Benefits */}
        <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Benefits Provided by Organizer</span>
            </h4>
            <span className="text-[11px] text-amber-800 font-medium">Host Committed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {opportunity.benefits.accommodation && (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/80 border border-amber-100">
                <Bed className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-900 block">Accommodation</span>
                  <span className="text-neutral-600">{opportunity.benefits.accommodation}</span>
                </div>
              </div>
            )}
            {opportunity.benefits.food && (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/80 border border-amber-100">
                <Utensils className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-900 block">Food & Refreshments</span>
                  <span className="text-neutral-600">{opportunity.benefits.food}</span>
                </div>
              </div>
            )}
            {opportunity.benefits.stipend && (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/80 border border-amber-100">
                <Wallet className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-900 block">Stipend / Honorarium</span>
                  <span className="text-neutral-600">{opportunity.benefits.stipend}</span>
                </div>
              </div>
            )}
            {opportunity.benefits.certificate && (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/80 border border-amber-100">
                <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-900 block">Volunteer Credential</span>
                  <span className="text-neutral-600">{opportunity.benefits.certificate}</span>
                </div>
              </div>
            )}
          </div>

          {/* Mandatory Transparency Notice */}
          <div className="pt-2 flex items-start gap-2 text-[11px] text-neutral-500">
            <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <p>
              <strong>Notice:</strong> The benefits listed above are provided directly by {opportunity.organizer}. Volunteer Vihara is a platform facilitator and does not directly disburse stipends or guarantee third-party accommodations.
            </p>
          </div>
        </div>

        {/* Safety & Location Details */}
        <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/70 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-teal-900">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>Basecamp Safety & Location Protocols</span>
          </div>
          <p className="text-neutral-600 leading-relaxed">
            {opportunity.safetyNotes}
          </p>
          <p className="text-[11px] text-neutral-500 pt-1">
            <strong>Location:</strong> {opportunity.locationDetails}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              onClose();
              onApply(opportunity);
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Apply to Volunteer Now</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
