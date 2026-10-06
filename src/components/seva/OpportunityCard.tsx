import React from 'react';
import { VolunteerOpportunity } from '../../types';
import { MapPin, Calendar, Clock, ShieldCheck, ArrowRight, Bed, Utensils, Award, Wallet } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: VolunteerOpportunity;
  onViewDetails: (opportunity: VolunteerOpportunity) => void;
  onApply: (opportunity: VolunteerOpportunity) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onViewDetails,
  onApply,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Card Image */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100">
          <img
            src={opportunity.imageUrl}
            alt={opportunity.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Unboxed category label on image */}
          <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md capitalize">
            {opportunity.category}
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{opportunity.destination}, {opportunity.state}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3.5">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
              <span>{opportunity.organizer}</span>
              {opportunity.organizerVerified && (
                <span title="Verified Organizer">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                </span>
              )}
            </div>

            <h3
              onClick={() => onViewDetails(opportunity)}
              className="text-lg font-bold text-neutral-900 font-display leading-snug hover:text-amber-700 transition-colors cursor-pointer line-clamp-2"
            >
              {opportunity.title}
            </h3>
          </div>

          {/* Dates & Duration Metadata (Unboxed text with dots) */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-neutral-600">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <span>{opportunity.startDate}</span>
            </span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>{opportunity.duration}</span>
            </span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="text-neutral-500">
              {opportunity.openingsTotal - opportunity.openingsFilled} spots left
            </span>
          </div>

          {/* Organizer-provided benefits quick tags */}
          <div className="pt-2 border-t border-neutral-100 flex flex-wrap gap-1.5 text-[11px]">
            {opportunity.benefits.accommodation && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-medium">
                <Bed className="w-3 h-3 text-neutral-500" /> Stay
              </span>
            )}
            {opportunity.benefits.food && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-medium">
                <Utensils className="w-3 h-3 text-neutral-500" /> Meals
              </span>
            )}
            {opportunity.benefits.stipend && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-medium border border-amber-200/60">
                <Wallet className="w-3 h-3 text-amber-700" /> Stipend
              </span>
            )}
            {opportunity.benefits.certificate && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 text-teal-900 font-medium border border-teal-200/60">
                <Award className="w-3 h-3 text-teal-700" /> Certificate
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-5 pt-0 flex items-center gap-2.5">
        <button
          onClick={() => onViewDetails(opportunity)}
          className="flex-1 py-2.5 px-3 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-bold transition-colors cursor-pointer text-center"
        >
          View Details
        </button>

        <button
          onClick={() => onApply(opportunity)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>Apply</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
