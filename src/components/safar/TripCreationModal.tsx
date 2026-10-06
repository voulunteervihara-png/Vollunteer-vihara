import React, { useState } from 'react';
import { TripPlan } from '../../types';
import { Modal } from '../common/Modal';
import { Compass, Users, Calendar, Wallet, Shield, Heart, Sparkles } from 'lucide-react';

interface TripCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTrip: (trip: TripPlan) => void;
}

export const TripCreationModal: React.FC<TripCreationModalProps> = ({
  isOpen,
  onClose,
  onCreateTrip,
}) => {
  const [destination, setDestination] = useState('Goa');
  const [startDate, setStartDate] = useState('2026-10-18');
  const [endDate, setEndDate] = useState('2026-10-24');
  const [budgetMin, setBudgetMin] = useState(3000);
  const [budgetMax, setBudgetMax] = useState(6500);
  const [travelStyle, setTravelStyle] = useState<'budget' | 'backpacker' | 'moderate' | 'cultural' | 'adventure'>('backpacker');
  const [accommodationPreference, setAccommodationPreference] = useState<'hostel' | 'homestay' | 'campsite' | 'budget_hotel'>('hostel');
  const [groupSize, setGroupSize] = useState(3);
  const [womenOnly, setWomenOnly] = useState(false);
  const [nightTravel, setNightTravel] = useState(false);
  const [requireStudentVerified, setRequireStudentVerified] = useState(true);
  const [shareLocationWithBuddy, setShareLocationWithBuddy] = useState(true);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Coastal Conservation',
    'Photography',
    'Budget Travel',
  ]);

  const allInterests = [
    'Coastal Conservation',
    'Heritage Architecture',
    'Photography',
    'Budget Travel',
    'Folk Music',
    'Street Food',
    'Trekking',
    'Tech & Hackathons',
    'Bird Watching',
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrip: TripPlan = {
      id: `trip_${Date.now()}`,
      userId: 'usr_aarav_01',
      destination,
      startDate,
      endDate,
      budgetMin,
      budgetMax,
      travelStyle,
      accommodationPreference,
      groupSize,
      interests: selectedInterests,
      womenOnly,
      safetyPreferences: {
        nightTravel,
        requireStudentVerified,
        shareLocationWithBuddy,
      },
      status: 'active',
    };
    onCreateTrip(newTrip);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Travel Plan & Find Tribe"
      subtitle="Don't just find someone going to the same place. Find someone who travels like you."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        {/* Destination & Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Destination
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            >
              <option value="Goa">Goa (Coastal / Turtle Drive)</option>
              <option value="Jaipur">Jaipur (Walled City Heritage)</option>
              <option value="Hyderabad">Hyderabad (Deccan Arts Fest)</option>
              <option value="Manali">Manali (Alpine Clean Trails)</option>
              <option value="Kochi">Kochi (Biennale Art Outreach)</option>
              <option value="Bengaluru">Bengaluru (Open Tech Hub)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Budget & Style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Estimated Budget (₹)
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                step="500"
                value={budgetMin}
                onChange={(e) => setBudgetMin(Number(e.target.value))}
                className="w-1/2 px-2.5 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                placeholder="Min"
              />
              <span className="text-neutral-400">-</span>
              <input
                type="number"
                step="500"
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
                className="w-1/2 px-2.5 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                placeholder="Max"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Travel Style
            </label>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white text-neutral-900"
            >
              <option value="backpacker">Backpacker (Light & Flexible)</option>
              <option value="budget">Budget Conscious (Hostels)</option>
              <option value="cultural">Cultural & Heritage Focus</option>
              <option value="adventure">Adventure & Outdoor</option>
              <option value="moderate">Moderate Comfort</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Preferred Lodging
            </label>
            <select
              value={accommodationPreference}
              onChange={(e) => setAccommodationPreference(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white text-neutral-900"
            >
              <option value="hostel">Youth Hostel / Dorm</option>
              <option value="homestay">Verified Homestay</option>
              <option value="campsite">Eco-Campsite / Tent</option>
              <option value="budget_hotel">Budget Hotel</option>
            </select>
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block font-semibold text-neutral-700 mb-1.5">
            Travel & Volunteering Interests
          </label>
          <div className="flex flex-wrap gap-1.5">
            {allInterests.map((interest) => (
              <button
                type="button"
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  selectedInterests.includes(interest)
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Safety Preferences & Women-Only */}
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/90 space-y-3">
          <div className="flex items-center gap-2 font-bold text-neutral-900">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Safety Preferences for Matching</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <label className="flex items-center gap-2 p-2 rounded-lg bg-white border border-neutral-200 cursor-pointer">
              <input
                type="checkbox"
                checked={requireStudentVerified}
                onChange={(e) => setRequireStudentVerified(e.target.checked)}
                className="rounded text-neutral-900 focus:ring-0"
              />
              <span className="text-[11px] font-medium text-neutral-800">
                Only match Student Verified profiles
              </span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-lg bg-white border border-neutral-200 cursor-pointer">
              <input
                type="checkbox"
                checked={nightTravel}
                onChange={(e) => setNightTravel(e.target.checked)}
                className="rounded text-neutral-900 focus:ring-0"
              />
              <span className="text-[11px] font-medium text-neutral-800">
                Prefer daylight travel only (No late night buses)
              </span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-lg bg-white border border-neutral-200 cursor-pointer">
              <input
                type="checkbox"
                checked={shareLocationWithBuddy}
                onChange={(e) => setShareLocationWithBuddy(e.target.checked)}
                className="rounded text-neutral-900 focus:ring-0"
              />
              <span className="text-[11px] font-medium text-neutral-800">
                Sync Safety Check-in window with travel buddies
              </span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-lg bg-white border border-amber-200 cursor-pointer">
              <input
                type="checkbox"
                checked={womenOnly}
                onChange={(e) => setWomenOnly(e.target.checked)}
                className="rounded text-amber-700 focus:ring-0"
              />
              <span className="text-[11px] font-bold text-amber-900">
                Women-Only / Women-Preferred Circle
              </span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>Generate Compatible Travellers ({destination})</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
