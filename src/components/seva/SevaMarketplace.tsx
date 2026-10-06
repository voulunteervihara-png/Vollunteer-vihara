import React, { useState } from 'react';
import { VolunteerOpportunity } from '../../types';
import { OpportunityCard } from './OpportunityCard';
import { Search, Filter, Sparkles, MapPin, Check } from 'lucide-react';

interface SevaMarketplaceProps {
  opportunities: VolunteerOpportunity[];
  onViewDetails: (opp: VolunteerOpportunity) => void;
  onApply: (opp: VolunteerOpportunity) => void;
}

export const SevaMarketplace: React.FC<SevaMarketplaceProps> = ({
  opportunities,
  onViewDetails,
  onApply,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterStay, setFilterStay] = useState(false);
  const [filterFood, setFilterFood] = useState(false);
  const [filterStipend, setFilterStipend] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'deadline' | 'openings'>('recommended');

  const destinations = ['all', 'Goa', 'Jaipur', 'Hyderabad', 'Bengaluru', 'Kochi', 'Manali'];
  const categories = ['all', 'conservation', 'heritage', 'festival', 'tech', 'community'];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDest =
      selectedDestination === 'all' ||
      opp.destination.toLowerCase() === selectedDestination.toLowerCase();

    const matchesCat =
      selectedCategory === 'all' || opp.category === selectedCategory;

    const matchesStay = !filterStay || Boolean(opp.benefits.accommodation);
    const matchesFood = !filterFood || Boolean(opp.benefits.food);
    const matchesStipend = !filterStipend || Boolean(opp.benefits.stipend);

    return matchesSearch && matchesDest && matchesCat && matchesStay && matchesFood && matchesStipend;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="text-left space-y-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-display tracking-tight text-balance">
          Discover Verified Volunteering Opportunities
        </h2>
        <p className="text-sm text-neutral-600 max-w-2xl text-balance">
          Contribute your energy to cultural festivals, conservation drives, and community projects. All opportunities feature host-provided stay, meals, and recognized student credentials.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-xs space-y-4">
        {/* Search input + Destination dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by keyword, city, or event (e.g. Turtle, Heritage, Bengaluru)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 bg-neutral-50/50"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-neutral-200 text-xs bg-white text-neutral-800 focus:ring-2 focus:ring-neutral-900"
            >
              <option value="all">All Indian Destinations</option>
              {destinations.filter((d) => d !== 'all').map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories & Benefit Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100 text-xs">
          {/* Category tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Quick Benefit checkboxes */}
          <div className="flex items-center gap-3 text-xs text-neutral-600">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filterStay}
                onChange={(e) => setFilterStay(e.target.checked)}
                className="rounded text-neutral-900 focus:ring-0"
              />
              <span>Includes Stay</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filterFood}
                onChange={(e) => setFilterFood(e.target.checked)}
                className="rounded text-neutral-900 focus:ring-0"
              />
              <span>Includes Meals</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filterStipend}
                onChange={(e) => setFilterStipend(e.target.checked)}
                className="rounded text-neutral-900 focus:ring-0"
              />
              <span>Offers Stipend</span>
            </label>
          </div>
        </div>
      </div>

      {/* Opportunities Grid */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-lg mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-neutral-900 font-display text-base">
            No Opportunities Found
          </h4>
          <p className="text-xs text-neutral-500">
            Try adjusting your search keywords, widening your destination choice, or unchecking benefit filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDestination('all');
              setSelectedCategory('all');
              setFilterStay(false);
              setFilterFood(false);
              setFilterStipend(false);
            }}
            className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onViewDetails={onViewDetails}
              onApply={onApply}
            />
          ))}
        </div>
      )}
    </div>
  );
};
