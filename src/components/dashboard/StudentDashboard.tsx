import React from 'react';
import {
  ActiveJourney,
  TripPlan,
  UserProfile,
  VolunteerApplication,
  VolunteerOpportunity,
} from '../../types';
import { VerificationBadge } from '../common/Badge';
import { OpportunityCard } from '../seva/OpportunityCard';
import { TravellerCard } from '../safar/TravellerCard';
import {
  Compass,
  Users,
  Shield,
  HeartHandshake,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Award,
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronRight,
} from 'lucide-react';

interface StudentDashboardProps {
  currentUser: UserProfile;
  activeJourney: ActiveJourney;
  applications: VolunteerApplication[];
  recommendedOpportunities: VolunteerOpportunity[];
  recommendedTravellers: any[];
  onSelectTab: (tab: string) => void;
  onOpenTripModal: () => void;
  onViewOpportunity: (opp: VolunteerOpportunity) => void;
  onApplyOpportunity: (opp: VolunteerOpportunity) => void;
  onViewProfile: (profile: UserProfile) => void;
  onViewCompatibility: (traveller: any) => void;
  onRequestConnect: (id: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentUser,
  activeJourney,
  applications,
  recommendedOpportunities,
  recommendedTravellers,
  onSelectTab,
  onOpenTripModal,
  onViewOpportunity,
  onApplyOpportunity,
  onViewProfile,
  onViewCompatibility,
  onRequestConnect,
}) => {
  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-display">
              Good morning, {currentUser.name.split(' ')[0]}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600">
            {currentUser.degree} at <span className="font-semibold text-neutral-800">{currentUser.college}</span>
          </p>
          <div className="flex items-center gap-3 pt-1">
            <VerificationBadge tier={currentUser.verificationTier} />
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-mono font-bold text-amber-700">
              {currentUser.sevaHours} Seva Hours Completed
            </span>
          </div>
        </div>

        {/* Trust Profile Mini Card */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900 text-white shadow-xs w-full md:w-auto">
          <div className="text-center px-2">
            <span className="text-xl font-bold font-mono text-amber-400 block tabular-nums">
              {currentUser.rating} ★
            </span>
            <span className="text-[10px] text-neutral-400">Trust Score</span>
          </div>
          <div className="h-8 w-px bg-neutral-700" />
          <div className="text-center px-2">
            <span className="text-xl font-bold font-mono text-amber-400 block tabular-nums">
              {currentUser.completedTrips}
            </span>
            <span className="text-[10px] text-neutral-400">Trips</span>
          </div>
          <div className="h-8 w-px bg-neutral-700" />
          <div className="text-center px-2">
            <span className="text-xl font-bold font-mono text-emerald-400 block tabular-nums">
              {currentUser.trustedContactsCount}
            </span>
            <span className="text-[10px] text-neutral-400">Contacts</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onSelectTab('seva')}
          className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-900 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-neutral-900 text-sm font-display">
            Find Opportunities
          </h4>
          <p className="text-[11px] text-neutral-500 mt-0.5">Explore SEVA volunteering</p>
        </button>

        <button
          onClick={onOpenTripModal}
          className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-900 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-neutral-900 text-sm font-display">
            Create Travel Plan
          </h4>
          <p className="text-[11px] text-neutral-500 mt-0.5">Set dates & budget</p>
        </button>

        <button
          onClick={() => onSelectTab('safar')}
          className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-900 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-neutral-900 text-sm font-display">
            Find Travel Tribe
          </h4>
          <p className="text-[11px] text-neutral-500 mt-0.5">Matching student travellers</p>
        </button>

        <button
          onClick={() => onSelectTab('safety')}
          className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-900 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-neutral-900 text-sm font-display">
            Safety Center Hub
          </h4>
          <p className="text-[11px] text-neutral-500 mt-0.5">Check-in & contacts</p>
        </button>
      </div>

      {/* Active Trip Live Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-neutral-900 to-neutral-900 text-white rounded-2xl p-6 shadow-sm border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            <span>ACTIVE EXPEDITION IN PROGRESS</span>
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            {activeJourney.tripName}
          </h3>
          <p className="text-xs text-neutral-300">
            Stage: {activeJourney.currentStage} · Companion: {activeJourney.companionName}
          </p>
        </div>

        <button
          onClick={() => onSelectTab('safety')}
          className="px-5 py-2.5 rounded-xl bg-white text-neutral-900 font-bold text-xs hover:bg-neutral-100 transition-colors flex items-center gap-2 cursor-pointer shadow-sm whitespace-nowrap"
        >
          <span>View Safety Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* My Applications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-neutral-900 font-display">
            My Volunteer Applications ({applications.length})
          </h3>
          <button
            onClick={() => onSelectTab('seva')}
            className="text-xs font-bold text-neutral-700 hover:text-neutral-950 flex items-center gap-1 cursor-pointer"
          >
            <span>Browse More</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono text-neutral-600">{app.appliedDate}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      app.status === 'accepted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'shortlisted'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {app.status.replace('_', ' ')}
                  </span>
                </div>

                <h4 className="font-bold text-neutral-900 font-display text-sm leading-snug">
                  {app.opportunityTitle}
                </h4>
                <p className="text-xs text-neutral-500 mt-1">Host: {app.organizer}</p>
                <p className="text-xs text-neutral-600 mt-2 line-clamp-2 italic">
                  "{app.statement}"
                </p>
              </div>

              {app.verifiedParticipation && (
                <div className="pt-2 border-t border-neutral-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Host Verified Participation ✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Opportunities */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-neutral-900 font-display">
            Recommended Opportunities For You
          </h3>
          <button
            onClick={() => onSelectTab('seva')}
            className="text-xs font-bold text-neutral-700 hover:text-neutral-950 flex items-center gap-1 cursor-pointer"
          >
            <span>View All SEVA</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedOpportunities.slice(0, 3).map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onViewDetails={onViewOpportunity}
              onApply={onApplyOpportunity}
            />
          ))}
        </div>
      </div>

      {/* Recommended Travellers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-neutral-900 font-display">
            High-Compatibility Travel Tribe Matches
          </h3>
          <button
            onClick={() => onSelectTab('safar')}
            className="text-xs font-bold text-neutral-700 hover:text-neutral-950 flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All Matches</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedTravellers.slice(0, 3).map((t) => (
            <TravellerCard
              key={t.id}
              traveller={t}
              onViewProfile={onViewProfile}
              onViewCompatibility={onViewCompatibility}
              onRequestConnect={onRequestConnect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
