import React from 'react';
import { UserProfile, UserRole } from '../../types';
import { Modal } from '../common/Modal';
import { VerificationBadge } from '../common/Badge';
import {
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  GraduationCap,
  Clock,
  Compass,
  Heart,
  Phone,
  Shield,
  LogOut,
  ExternalLink,
  Sparkles,
  User,
} from 'lucide-react';

interface MyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  activeRole: UserRole;
  onNavigateTab: (tab: string) => void;
  onLogout?: () => void;
}

export const MyProfileModal: React.FC<MyProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  activeRole,
  onNavigateTab,
  onLogout,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="My Explorer Profile"
      subtitle="Verified campus identity, volunteering record and travel safety settings."
      maxWidth="2xl"
    >
      <div className="space-y-6 text-xs text-neutral-800">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50/80 via-stone-50 to-teal-50/60 border border-neutral-200/80">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-white">
                <ShieldCheck className="w-3 h-3 stroke-[2.5]" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-neutral-900 font-display">
                  {currentUser.name}
                </h3>
                <VerificationBadge tier={currentUser.verificationTier} />
              </div>

              <p className="text-xs font-semibold text-neutral-600 flex items-center gap-1.5 mt-0.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {currentUser.college} · {currentUser.degree}
                </span>
              </p>

              <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  <span>{currentUser.city}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-neutral-400" />
                  <span>Class of {currentUser.graduationYear}</span>
                </span>
                <span>•</span>
                <span className="capitalize text-amber-800 font-semibold">{activeRole} Role</span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-200">
            <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-neutral-200 shadow-2xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-extrabold text-neutral-900 text-xs">{currentUser.rating.toFixed(1)}</span>
              <span className="text-[10px] text-neutral-400">({currentUser.reviewsCount} reviews)</span>
            </div>
            <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
              ID Verified ✓
            </span>
          </div>
        </div>

        {/* 4 Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-xl bg-stone-50 border border-neutral-200/80 text-center">
            <span className="text-lg font-black text-amber-700 font-display block">
              {currentUser.sevaHours} hrs
            </span>
            <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">
              SEVA Volunteered
            </span>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-neutral-200/80 text-center">
            <span className="text-lg font-black text-teal-700 font-display block">
              {currentUser.completedTrips}
            </span>
            <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">
              Trips Completed
            </span>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-neutral-200/80 text-center">
            <span className="text-lg font-black text-neutral-900 font-display block">
              {currentUser.rating.toFixed(1)} ★
            </span>
            <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">
              Traveller Trust
            </span>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-neutral-200/80 text-center">
            <span className="text-lg font-black text-neutral-900 font-display block">
              {currentUser.trustedContactsCount}
            </span>
            <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">
              Trusted Contacts
            </span>
          </div>
        </div>

        {/* Bio */}
        {currentUser.bio && (
          <div className="p-3.5 rounded-xl bg-stone-50 border border-neutral-200/80 space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
              About Me & Explorer Bio
            </span>
            <p className="text-xs text-neutral-700 leading-relaxed">{currentUser.bio}</p>
          </div>
        )}

        {/* Travel Style & Core Interests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-xl border border-neutral-200/80 bg-white space-y-2">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Travel Style (SAFAR)</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-950 font-bold capitalize text-xs">
                {currentUser.travelStyle}
              </span>
              <span className="text-[11px] text-neutral-500">Light rucksack & trains</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Languages: {currentUser.languages.join(', ')}
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-neutral-200/80 bg-white space-y-2">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Volunteering Passions</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentUser.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-2 py-0.5 rounded-md bg-stone-100 text-neutral-700 font-semibold text-[11px]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Safety & Emergency Contact Strip */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-amber-950 text-xs block">
                Continuous Journey Safety Active
              </span>
              <span className="text-[11px] text-amber-800">
                Automated check-ins linked with Parent & Campus safety protocols.
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onNavigateTab('safety');
            }}
            className="px-3 py-1.5 rounded-xl bg-white text-amber-900 border border-amber-300 font-bold text-xs hover:bg-amber-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            Manage Safety
          </button>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2.5 border-t border-neutral-100">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                if (activeRole === 'organizer') onNavigateTab('organizer-dashboard');
                else if (activeRole === 'admin') onNavigateTab('admin-dashboard');
                else onNavigateTab('student-dashboard');
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Open My Hub</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigateTab('explore');
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-stone-50 font-bold text-xs cursor-pointer"
            >
              Explore Portal
            </button>
          </div>

          {onLogout && (
            <button
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
