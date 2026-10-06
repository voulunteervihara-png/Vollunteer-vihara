import React, { useState } from 'react';
import { TripPlan, UserProfile } from '../../types';
import { TravellerCard } from './TravellerCard';
import { Users, Plus, ShieldCheck, Heart, Sparkles, Filter, Calendar } from 'lucide-react';

interface SafarMatchingViewProps {
  currentTrip: TripPlan;
  travellers: any[];
  onOpenTripModal: () => void;
  onViewProfile: (profile: UserProfile) => void;
  onViewCompatibility: (traveller: any) => void;
  onRequestConnect: (id: string) => void;
}

export const SafarMatchingView: React.FC<SafarMatchingViewProps> = ({
  currentTrip,
  travellers,
  onOpenTripModal,
  onViewProfile,
  onViewCompatibility,
  onRequestConnect,
}) => {
  const [filterWomenOnly, setFilterWomenOnly] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string>('all');

  const filteredTravellers = travellers.filter((t) => {
    const matchesWomen = !filterWomenOnly || t.trip.womenOnly;
    const matchesStyle =
      selectedStyle === 'all' || t.profile.travelStyle === selectedStyle;
    return matchesWomen && matchesStyle;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>SAFAR — Compatible Co-Traveller Matching</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-display tracking-tight text-balance">
            Find Your Travel Tribe
          </h2>
          <p className="text-sm text-neutral-600 max-w-xl text-balance">
            Don't just find someone going to the same place. Find someone who travels like you.
          </p>
        </div>

        <button
          onClick={onOpenTripModal}
          className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Adjust Travel Plan</span>
        </button>
      </div>

      {/* Active Trip Parameters Banner */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="text-neutral-400 block font-medium">Your Active Search</span>
            <span className="font-bold text-neutral-900 text-sm">
              {currentTrip.destination} · {currentTrip.startDate} to {currentTrip.endDate}
            </span>
            <span className="text-neutral-500 block">
              Budget: ₹{currentTrip.budgetMin.toLocaleString()} - ₹{currentTrip.budgetMax.toLocaleString()} · Style: {currentTrip.travelStyle}
            </span>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-200">
            <span className="text-neutral-500">Travel Style:</span>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="bg-transparent font-bold text-neutral-900 focus:outline-hidden"
            >
              <option value="all">All Styles</option>
              <option value="backpacker">Backpacker</option>
              <option value="cultural">Cultural</option>
              <option value="adventure">Adventure</option>
            </select>
          </div>

          <label className="flex items-center gap-2 p-2 rounded-xl bg-amber-50/70 border border-amber-200 cursor-pointer">
            <input
              type="checkbox"
              checked={filterWomenOnly}
              onChange={(e) => setFilterWomenOnly(e.target.checked)}
              className="rounded text-amber-700 focus:ring-0"
            />
            <span className="text-[11px] font-bold text-amber-900">
              Women-Only Circles
            </span>
          </label>
        </div>
      </div>

      {/* Traveller Matches Grid */}
      {filteredTravellers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-lg mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-neutral-900 font-display text-base">
            No trips found matching these filters
          </h4>
          <p className="text-xs text-neutral-500">
            Try widening your travel dates, adjusting your budget range, or clearing the women-only filter.
          </p>
          <button
            onClick={() => {
              setFilterWomenOnly(false);
              setSelectedStyle('all');
            }}
            className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTravellers.map((traveller) => (
            <TravellerCard
              key={traveller.id}
              traveller={traveller}
              onViewProfile={onViewProfile}
              onViewCompatibility={onViewCompatibility}
              onRequestConnect={onRequestConnect}
            />
          ))}
        </div>
      )}
    </div>
  );
};
