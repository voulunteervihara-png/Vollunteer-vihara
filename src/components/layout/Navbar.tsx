import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  Bell,
  Shield,
  Users,
  HeartHandshake,
  User,
  Check,
  Sparkles,
  LogOut,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronDown,
  ExternalLink,
  Star,
  Copy,
  CheckCheck,
  GraduationCap,
  Building2,
  Clock,
  Award,
} from 'lucide-react';
import { UserProfile, UserRole, VolunteerApplication } from '../../types';
import { INITIAL_APPLICATIONS } from '../../data/mockData';
import { MyProfileModal } from '../profile/MyProfileModal';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  activeRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  currentUser?: UserProfile;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  userApplications?: VolunteerApplication[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  activeRole,
  onChangeRole,
  unreadNotificationsCount,
  onOpenNotifications,
  currentUser,
  isLoggedIn = false,
  onLogout,
  userApplications,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeDropdownTab, setActiveDropdownTab] = useState<'profile' | 'events'>('profile');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const handleCopy = (key: string, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const myEvents = userApplications && userApplications.length > 0 ? userApplications : INITIAL_APPLICATIONS;

  const navLinks = [
    { id: 'explore', label: 'Explore' },
    { id: 'seva', label: 'SEVA' },
    { id: 'safar', label: 'SAFAR' },
    { id: 'safety', label: 'Safety Center' },
    { id: 'how-it-works', label: 'How It Works' },
  ];

  const handleLinkClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleLinkClick('explore')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-2xs group-hover:scale-105 transition-transform flex items-center justify-center bg-white border border-neutral-200/90 p-0.5 shrink-0">
            <img
              src="/logo.png"
              alt="Volunteer Vihara Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-neutral-900 font-display">
            Volunteer Vihara
          </span>
        </button>

        {/* Zone 2: 4-6 Clean Text Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-neutral-600">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-1.5 transition-colors cursor-pointer hover:text-neutral-900 ${
                  isActive ? 'text-neutral-900 font-bold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions + Role Switcher */}
        <div className="flex items-center gap-2.5 relative">
          {/* button:nth-of-type(1) - Notification Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            aria-label="View notifications"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* button:nth-of-type(2) - Persona / Hub Switcher CTA Button */}
          <button
            onClick={() => {
              if (activeRole === 'organizer') onSelectTab('organizer-dashboard');
              else if (activeRole === 'admin') onSelectTab('admin-dashboard');
              else onSelectTab('student-dashboard');
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-200/90 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
            title="Open Dedicated Hub"
          >
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {activeRole === 'student'
                ? 'Student Hub'
                : activeRole === 'organizer'
                ? 'Organizer Portal'
                : 'Admin Console'}
            </span>
          </button>

          {/* button:nth-of-type(3) - THE PROFILE ICON BUTTON (Prompt 9 & 10 Target!) */}
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className={`flex items-center gap-2 px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer border shadow-2xs group ${
              profileDropdownOpen
                ? 'bg-amber-100 text-amber-950 border-amber-300 ring-2 ring-amber-300/40'
                : 'bg-white text-neutral-800 hover:text-amber-900 hover:bg-amber-50/70 border-neutral-200'
            }`}
            title="Display My Profile & Events"
            aria-label="Display My Profile & Events"
            aria-expanded={profileDropdownOpen}
          >
            <div className="relative">
              <img
                src={
                  currentUser?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
                }
                alt={currentUser?.name || 'User Profile'}
                className="w-6 h-6 rounded-full object-cover border border-amber-400 shadow-2xs"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-teal-500 border-2 border-white rounded-full" />
            </div>

            <div className="text-left hidden sm:block">
              <span className="block text-xs font-extrabold text-neutral-900 leading-tight truncate max-w-[105px]">
                {currentUser?.name ? currentUser.name.split(' ')[0] : 'My Profile'}
              </span>
              <span className="block text-[10px] font-semibold text-neutral-500 leading-none">
                {activeRole === 'student' ? 'Student' : 'Organizer'}
              </span>
            </div>

            <div className="w-5 h-5 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-800 group-hover:bg-amber-500/20 transition-colors">
              <User className="w-3.5 h-3.5" />
            </div>

            <ChevronDown
              className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${
                profileDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Profile & Events Dropdown Window */}
          {profileDropdownOpen && (
            <div
              ref={profileDropdownRef}
              className="absolute right-0 top-full mt-2 w-[350px] sm:w-[410px] bg-white rounded-2xl shadow-2xl border border-neutral-200/90 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 text-xs text-neutral-800 max-h-[85vh] flex flex-col"
            >
              {/* Header: Personal Info Card */}
              <div className="p-4 bg-gradient-to-br from-amber-50/90 via-stone-50 to-teal-50/70 border-b border-neutral-100 shrink-0">
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={
                        currentUser?.avatar ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
                      }
                      alt={currentUser?.name || 'User Profile'}
                      className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                    <div
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-white shadow-xs"
                      title="Verified Identity"
                    >
                      <ShieldCheck className="w-3 h-3 stroke-[2.5]" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-black text-neutral-900 text-sm font-display truncate">
                        {currentUser?.name || 'Aarav Sharma'}
                      </h4>
                      <span className="text-[10px] font-extrabold text-teal-800 bg-teal-100/90 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                        <span>{activeRole === 'student' ? 'Student Verified' : 'Organizer Verified'}</span>
                      </span>
                    </div>

                    <p className="text-[11px] font-semibold text-neutral-600 truncate mt-0.5 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-amber-700 shrink-0" />
                      <span className="truncate">
                        {currentUser?.college || 'IIT Hyderabad'} · {currentUser?.degree || 'B.Tech'}
                      </span>
                    </p>

                    {/* Student ID Badge with Copy Button */}
                    <div className="mt-1.5 flex items-center justify-between bg-white/80 backdrop-blur-xs px-2 py-1 rounded-md border border-neutral-200/80">
                      <span className="text-[10px] text-neutral-500 font-medium">Student ID:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-amber-900 font-mono font-bold">
                          {currentUser?.studentId || 'CS23BTECH11042'}
                        </span>
                        <button
                          onClick={(e) =>
                            handleCopy('id', currentUser?.studentId || 'CS23BTECH11042', e)
                          }
                          className="text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                          title="Copy Student ID"
                        >
                          {copiedKey === 'id' ? (
                            <span className="text-[9px] font-bold text-teal-700 bg-teal-50 px-1 rounded">Copied!</span>
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Contact Details Strip: Phone & Email */}
                <div className="mt-3 pt-3 border-t border-amber-200/60 grid grid-cols-1 gap-1.5">
                  {/* Email */}
                  <div className="flex items-center justify-between text-neutral-800 bg-white/70 px-2.5 py-1.5 rounded-lg border border-neutral-200/60">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <Mail className="w-3 h-3" />
                      </div>
                      <span className="text-[11px] font-semibold truncate">
                        {currentUser?.email || 'aarav.sharma@iith.ac.in'}
                      </span>
                    </div>
                    <button
                      onClick={(e) =>
                        handleCopy('email', currentUser?.email || 'aarav.sharma@iith.ac.in', e)
                      }
                      className="text-neutral-400 hover:text-neutral-700 px-1 py-0.5 rounded cursor-pointer shrink-0"
                      title="Copy Email"
                    >
                      {copiedKey === 'email' ? (
                        <span className="text-[9px] font-bold text-teal-700">Copied!</span>
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between text-neutral-800 bg-white/70 px-2.5 py-1.5 rounded-lg border border-neutral-200/60">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-5 h-5 rounded-md bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                        <Phone className="w-3 h-3" />
                      </div>
                      <span className="text-[11px] font-semibold truncate">
                        {currentUser?.phone || '+91 98201 44521'}
                      </span>
                    </div>
                    <button
                      onClick={(e) =>
                        handleCopy('phone', currentUser?.phone || '+91 98201 44521', e)
                      }
                      className="text-neutral-400 hover:text-neutral-700 px-1 py-0.5 rounded cursor-pointer shrink-0"
                      title="Copy Phone"
                    >
                      {copiedKey === 'phone' ? (
                        <span className="text-[9px] font-bold text-teal-700">Copied!</span>
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  {/* Location & Hometown */}
                  <div className="flex items-center gap-2 text-neutral-600 px-1 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>
                      {currentUser?.city || 'Hyderabad'}, {currentUser?.state || 'Telangana'}, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Impact Metrics Strip */}
              <div className="grid grid-cols-3 divide-x divide-neutral-100 bg-stone-50 border-b border-neutral-100 py-2 text-center text-[10px] shrink-0">
                <div>
                  <span className="font-black text-neutral-900 text-xs block">
                    {currentUser?.sevaHours || 48} hrs
                  </span>
                  <span className="text-neutral-500 uppercase font-semibold">SEVA Impact</span>
                </div>
                <div>
                  <span className="font-black text-neutral-900 text-xs block">
                    {currentUser?.completedTrips || 5}
                  </span>
                  <span className="text-neutral-500 uppercase font-semibold">Trips Done</span>
                </div>
                <div>
                  <span className="font-black text-amber-600 text-xs block">
                    {currentUser?.rating ? currentUser.rating.toFixed(1) : '4.9'} ★
                  </span>
                  <span className="text-neutral-500 uppercase font-semibold">Trust Rating</span>
                </div>
              </div>

              {/* Sub-Tabs: Details vs Events */}
              <div className="flex items-center border-b border-neutral-100 bg-stone-50/50 px-3 pt-2 shrink-0">
                <button
                  onClick={() => setActiveDropdownTab('profile')}
                  className={`pb-2 px-3 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
                    activeDropdownTab === 'profile'
                      ? 'border-neutral-900 text-neutral-900'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Personal & Safety
                </button>
                <button
                  onClick={() => setActiveDropdownTab('events')}
                  className={`pb-2 px-3 text-xs font-bold transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                    activeDropdownTab === 'events'
                      ? 'border-neutral-900 text-neutral-900'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>My Events & Expeditions</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-extrabold">
                    {myEvents.length}
                  </span>
                </button>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {activeDropdownTab === 'profile' ? (
                  <div className="space-y-2.5">
                    {/* Emergency Safety Contact */}
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-amber-950 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-amber-700" />
                          <span>Emergency Safety Contact</span>
                        </span>
                        <span className="text-[9px] font-extrabold text-teal-800 bg-teal-100 px-1.5 py-0.5 rounded">
                          Active Alerts ✓
                        </span>
                      </div>
                      <p className="text-xs font-bold text-neutral-900">
                        Sunita Sharma (Mother)
                      </p>
                      <p className="text-[11px] text-neutral-600 font-mono mt-0.5">
                        +91 98201 99999 · Instant SMS on Check-in Miss
                      </p>
                    </div>

                    {/* Bio / Travel Style */}
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-neutral-200/70 text-[11px]">
                      <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                        Traveler Persona & Bio
                      </span>
                      <p className="text-neutral-700 italic leading-relaxed">
                        "{currentUser?.bio || 'Passionate about environmental conservation, heritage walks, and responsible student travel.'}"
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(currentUser?.interests || ['Conservation', 'Heritage', 'Photography', 'Trekking']).map(
                          (interest) => (
                            <span
                              key={interest}
                              className="text-[10px] font-medium bg-white px-2 py-0.5 rounded-md border border-neutral-200 text-neutral-700"
                            >
                              #{interest}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Quick Link to My Events */}
                    <button
                      onClick={() => setActiveDropdownTab('events')}
                      className="w-full py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>View Enrolled Events ({myEvents.length})</span>
                      </span>
                      <span className="text-amber-800 text-[11px]">See all →</span>
                    </button>
                  </div>
                ) : (
                  /* My Events List */
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-1">
                      <span className="font-extrabold text-neutral-900 text-xs">
                        Registered Volunteer Trips ({myEvents.length})
                      </span>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onSelectTab('seva');
                        }}
                        className="text-[10px] font-bold text-amber-700 hover:underline cursor-pointer"
                      >
                        + Find more SEVA
                      </button>
                    </div>

                    {myEvents.map((ev) => (
                      <div
                        key={ev.id}
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onSelectTab('student-dashboard');
                        }}
                        className="p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50/70 border border-neutral-200/70 transition-all cursor-pointer group text-left"
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <h5 className="font-bold text-neutral-900 text-xs group-hover:text-amber-900 leading-snug line-clamp-1">
                            {ev.opportunityTitle}
                          </h5>
                          <span
                            className={`shrink-0 text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                              ev.status === 'accepted'
                                ? 'bg-teal-100 text-teal-800'
                                : ev.status === 'submitted' || ev.status === 'under_review'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-sky-100 text-sky-800'
                            }`}
                          >
                            {ev.status === 'accepted'
                              ? 'Accepted ✓'
                              : ev.status === 'shortlisted'
                              ? 'Shortlisted'
                              : 'Under Review'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-1">
                          <span className="truncate text-neutral-700 font-medium">
                            {ev.organizer}
                          </span>
                          <span className="shrink-0 font-medium text-amber-900">
                            {ev.travelDates || 'Upcoming'}
                          </span>
                        </div>

                        {ev.statement && (
                          <p className="text-[10px] text-neutral-500 line-clamp-1 mt-1 italic border-t border-neutral-200/50 pt-1">
                            Role: {ev.skills?.[0] || 'Volunteer Coordinator'} · Accommodation & meals covered
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown Footer Actions */}
              <div className="p-3 bg-stone-50 border-t border-neutral-100 flex items-center justify-between gap-2 shrink-0">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setProfileModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-neutral-200/90 text-neutral-700 hover:bg-white hover:text-neutral-900 font-bold text-[11px] transition-colors cursor-pointer shadow-2xs"
                >
                  Full Profile
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      if (activeRole === 'organizer') onSelectTab('organizer-dashboard');
                      else if (activeRole === 'admin') onSelectTab('admin-dashboard');
                      else onSelectTab('student-dashboard');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-[11px] transition-colors cursor-pointer shadow-2xs"
                  >
                    Student Hub →
                  </button>

                  {onLogout && (
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="p-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Sign Out"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile drop-down drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentTab === link.id
                  ? 'bg-amber-50 text-neutral-900'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {link.label}
            </button>
          ))}

          {isLoggedIn ? (
            <div className="pt-2 border-t border-neutral-100 space-y-2">
              <div className="flex items-center gap-2.5 px-3 py-2 bg-stone-50 rounded-xl">
                <img
                  src={
                    currentUser?.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                />
                <div className="text-xs">
                  <p className="font-bold text-neutral-900">{currentUser?.name}</p>
                  <p className="text-[10px] text-neutral-500 capitalize">{activeRole} · Verified</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setProfileModalOpen(true);
                  }}
                  className="py-2 text-center rounded-lg bg-neutral-900 text-xs font-bold text-white flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    if (activeRole === 'organizer') handleLinkClick('organizer-dashboard');
                    else if (activeRole === 'admin') handleLinkClick('admin-dashboard');
                    else handleLinkClick('student-dashboard');
                  }}
                  className="py-2 text-center rounded-lg border border-neutral-200 text-xs font-bold text-neutral-800 hover:bg-neutral-50"
                >
                  My Hub
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => handleLinkClick('login')}
                className="py-2 text-center rounded-lg border border-neutral-200 text-xs font-bold text-neutral-800 hover:bg-neutral-50"
              >
                Log In
              </button>
              <button
                onClick={() => handleLinkClick('register')}
                className="py-2 text-center rounded-lg bg-neutral-900 text-xs font-bold text-white hover:bg-neutral-800"
              >
                Create Account
              </button>
            </div>
          )}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Switch Persona:</span>
            <div className="flex gap-1.5">
              {(['student', 'organizer', 'admin'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    onChangeRole(role);
                    setMobileMenuOpen(false);
                    if (role === 'organizer') onSelectTab('organizer-dashboard');
                    else if (role === 'admin') onSelectTab('admin-dashboard');
                    else onSelectTab('student-dashboard');
                  }}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium capitalize ${
                    activeRole === role
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* My Profile Display Modal */}
      {currentUser && (
        <MyProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          currentUser={currentUser}
          activeRole={activeRole}
          onNavigateTab={onSelectTab}
          onLogout={onLogout}
        />
      )}
    </header>
  );
};
