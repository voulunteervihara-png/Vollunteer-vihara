import React, { useState, useMemo } from 'react';
import {
  ActiveJourney,
  IncidentReport,
  NotificationItem,
  TripPlan,
  TrustedContact,
  UserProfile,
  UserRole,
  VolunteerApplication,
  VolunteerOpportunity,
} from './types';
import {
  CURRENT_STUDENT_USER,
  INITIAL_APPLICATIONS,
  INITIAL_INCIDENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_OPPORTUNITIES,
  INITIAL_TRAVELLERS,
  INITIAL_TRUSTED_CONTACTS,
  INITIAL_ACTIVE_JOURNEY,
} from './data/mockData';
import { calculateCompatibility } from './utils/compatibility';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';

// Landing Components
import { HeroSection } from './components/landing/HeroSection';
import { PillarsSection } from './components/landing/PillarsSection';
import { HowItWorks } from './components/landing/HowItWorks';
import { ImpactSection } from './components/landing/ImpactSection';
import { FinalCta } from './components/landing/FinalCta';

// Feature Views
import { SevaMarketplace } from './components/seva/SevaMarketplace';
import { SafarMatchingView } from './components/safar/SafarMatchingView';
import { SafetyCenter } from './components/safety/SafetyCenter';

// Dashboards
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { OrganizerDashboard } from './components/dashboard/OrganizerDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';

// Modals
import { OpportunityDetailModal } from './components/seva/OpportunityDetailModal';
import { ApplicationModal } from './components/seva/ApplicationModal';
import { TripCreationModal } from './components/safar/TripCreationModal';
import { CompatibilityModal } from './components/safar/CompatibilityModal';
import { TravellerProfileModal } from './components/safar/TravellerProfileModal';
import { IncidentModal } from './components/safety/IncidentModal';
import { NotificationDrawer } from './components/notifications/NotificationDrawer';
import { AuthPage } from './components/auth/AuthPage';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & Role State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>('explore');
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [authToast, setAuthToast] = useState<{ show: boolean; title: string; desc: string } | null>(null);

  // Application Data States
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_STUDENT_USER);
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>(INITIAL_OPPORTUNITIES);
  const [applications, setApplications] = useState<VolunteerApplication[]>(INITIAL_APPLICATIONS);
  const [activeJourney, setActiveJourney] = useState<ActiveJourney>(INITIAL_ACTIVE_JOURNEY);
  const [trustedContacts, setTrustedContacts] = useState<TrustedContact[]>(INITIAL_TRUSTED_CONTACTS);
  const [incidents, setIncidents] = useState<IncidentReport[]>(INITIAL_INCIDENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Active Trip Search State
  const [currentTrip, setCurrentTrip] = useState<TripPlan>({
    id: 'trip_active_01',
    userId: currentUser.id,
    destination: 'Goa',
    startDate: '2026-10-18',
    endDate: '2026-10-24',
    budgetMin: 3000,
    budgetMax: 6500,
    travelStyle: 'backpacker',
    accommodationPreference: 'hostel',
    groupSize: 3,
    interests: ['Coastal Conservation', 'Photography', 'Budget Travel'],
    womenOnly: false,
    safetyPreferences: {
      nightTravel: false,
      requireStudentVerified: true,
      shareLocationWithBuddy: true,
    },
    status: 'active',
  });

  // Connection Requests Map
  const [connectionStatuses, setConnectionStatuses] = useState<Record<string, 'none' | 'requested' | 'connected'>>({
    usr_ananya_02: 'connected', // Already connected demo companion
    usr_rohan_03: 'none',
    usr_priya_04: 'none',
    usr_tanmay_05: 'none',
    usr_meera_06: 'none',
  });

  // Dynamically compute traveller matches using the weighted matching engine
  const computedTravellers = useMemo(() => {
    return INITIAL_TRAVELLERS.map((item) => {
      const { score, breakdown, sharedInterests } = calculateCompatibility(
        currentTrip,
        item.profile,
        item.trip
      );
      return {
        id: item.profile.id,
        profile: item.profile,
        destination: item.trip.destination,
        dates: `${item.trip.startDate} - ${item.trip.endDate}`,
        budgetRange: `₹${item.trip.budgetMin.toLocaleString()} - ₹${item.trip.budgetMax.toLocaleString()}`,
        compatibilityScore: score,
        breakdown,
        sharedInterests,
        trip: item.trip,
        connectionStatus: connectionStatuses[item.profile.id] || 'none',
      };
    }).sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  }, [currentTrip, connectionStatuses]);

  // Modal Dialog States
  const [selectedOpportunity, setSelectedOpportunity] = useState<VolunteerOpportunity | null>(null);
  const [applyingOpportunity, setApplyingOpportunity] = useState<VolunteerOpportunity | null>(null);
  const [tripModalOpen, setTripModalOpen] = useState(false);
  const [selectedCompatibilityTraveller, setSelectedCompatibilityTraveller] = useState<any | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [incidentModalOpen, setIncidentModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Unread notifications count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handlers
  const handleLoginSuccess = (user: UserProfile, role: UserRole, targetTab?: string) => {
    setCurrentUser(user);
    setActiveRole(role);
    setIsLoggedIn(true);
    setCurrentTab(targetTab || 'explore');
    setAuthToast({
      show: true,
      title: `Welcome back, ${user.name.split(' ')[0]}! 👋`,
      desc: 'Logged in successfully. Redirected to Explore portal.',
    });
    setTimeout(() => setAuthToast(null), 4000);
  };

  const handleRegisterSuccess = (user: UserProfile, role: UserRole, targetTab?: string) => {
    setCurrentUser(user);
    setActiveRole(role);
    setIsLoggedIn(true);
    setCurrentTab(targetTab || 'explore');
    setAuthToast({
      show: true,
      title: `Welcome to Volunteer Vihara, ${user.name.split(' ')[0]}! 🎉`,
      desc: 'Registration completed. Redirected to Explore portal.',
    });
    setTimeout(() => setAuthToast(null), 4000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentTab('login');
    setAuthToast({
      show: true,
      title: 'Signed Out Successfully 👋',
      desc: 'You have returned to the Volunteer Vihara login portal.',
    });
    setTimeout(() => setAuthToast(null), 3500);
  };

  const handleApplyOpportunity = (opp: VolunteerOpportunity) => {
    setApplyingOpportunity(opp);
  };

  const handleSubmitApplication = (appData: Partial<VolunteerApplication>) => {
    const newApp: VolunteerApplication = {
      id: appData.id || `app_${Date.now()}`,
      opportunityId: appData.opportunityId || '',
      opportunityTitle: appData.opportunityTitle || '',
      organizer: appData.organizer || '',
      applicantId: currentUser.id,
      applicantName: appData.applicantName || currentUser.name,
      applicantCollege: appData.applicantCollege || currentUser.college,
      applicantAvatar: currentUser.avatar,
      appliedDate: '2026-10-06',
      status: 'submitted',
      statement: appData.statement || '',
      skills: appData.skills || [],
      departureCity: appData.departureCity || currentUser.city,
      travelDates: appData.travelDates || '',
      emergencyContact: appData.emergencyContact || {
        name: 'Sunita Sharma',
        relationship: 'Mother',
        phone: '+91 98201 44521',
      },
    };

    setApplications([newApp, ...applications]);

    // Add alert notification
    setNotifications([
      {
        id: `notif_${Date.now()}`,
        type: 'application',
        title: 'Application Transmitted',
        message: `Your application for ${newApp.opportunityTitle} was sent to ${newApp.organizer}.`,
        timestamp: 'Just now',
        read: false,
        actionLabel: 'View Applications',
        targetTab: 'student-dashboard',
      },
      ...notifications,
    ]);
  };

  const handleAddOpportunity = (newOpp: VolunteerOpportunity) => {
    setOpportunities([newOpp, ...opportunities]);
    setNotifications([
      {
        id: `notif_${Date.now()}`,
        type: 'system',
        title: 'New Opportunity Published',
        message: `Your listing "${newOpp.title}" is now live on SEVA.`,
        timestamp: 'Just now',
        read: false,
      },
      ...notifications,
    ]);
  };

  const handleUpdateApplicationStatus = (
    appId: string,
    status: VolunteerApplication['status']
  ) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status } : app))
    );
  };

  const handleToggleParticipationVerification = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, verifiedParticipation: !app.verifiedParticipation }
          : app
      )
    );
  };

  const handleAddTrustedContact = (contact: TrustedContact) => {
    setTrustedContacts([...trustedContacts, contact]);
  };

  const handleRemoveTrustedContact = (id: string) => {
    setTrustedContacts(trustedContacts.filter((c) => c.id !== id));
  };

  const handleSubmitIncident = (report: IncidentReport) => {
    setIncidents([report, ...incidents]);
    setNotifications([
      {
        id: `notif_${Date.now()}`,
        type: 'safety',
        title: 'Incident Report Received',
        message: `Reference ${report.referenceNumber} assigned to triage desk.`,
        timestamp: 'Just now',
        read: false,
      },
      ...notifications,
    ]);
  };

  const handleUpdateIncidentStatus = (
    id: string,
    status: IncidentReport['status']
  ) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status } : inc))
    );
  };

  const handleRequestConnect = (travellerId: string) => {
    setConnectionStatuses((prev) => ({
      ...prev,
      [travellerId]: 'requested',
    }));
    setNotifications([
      {
        id: `notif_${Date.now()}`,
        type: 'match',
        title: 'Connection Request Sent',
        message: 'Awaiting mutual consent from traveller before opening chat.',
        timestamp: 'Just now',
        read: false,
      },
      ...notifications,
    ]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSelectNotification = (item: NotificationItem) => {
    if (item.targetTab) {
      setCurrentTab(item.targetTab);
    }
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    setNotificationsOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <>
        <AuthPage
          initialMode={currentTab === 'register' ? 'register' : 'login'}
          initialRole={activeRole === 'organizer' ? 'organization' : 'student'}
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
          onNavigateExplore={() => {
            setIsLoggedIn(true);
            setCurrentTab('explore');
          }}
        />

        {/* Floating Auth Toast Notification */}
        {authToast && (
          <div className="fixed top-6 right-4 sm:right-8 z-50 bg-neutral-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-400/50 flex items-center gap-3.5 animate-in fade-in slide-in-from-top-4 duration-300 max-w-md">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white text-sm">{authToast.title}</p>
              <p className="text-neutral-300 mt-0.5">{authToast.desc}</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 font-sans selection:bg-amber-200 selection:text-stone-900">
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeRole={activeRole}
        onChangeRole={setActiveRole}
        unreadNotificationsCount={unreadCount}
        onOpenNotifications={() => setNotificationsOpen(true)}
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        userApplications={applications}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: LANDING & STORYTELLING */}
        {currentTab === 'explore' && (
          <div className="space-y-0">
            {/* Hero */}
            <HeroSection
              onExploreOpportunities={() => setCurrentTab('seva')}
              onFindTravellers={() => setCurrentTab('safar')}
              onOpenSafety={() => setCurrentTab('safety')}
            />

            {/* Problem & Solution Narrative Banner */}
            <section className="py-16 bg-white border-b border-neutral-200/80">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  The Problem & The Purpose
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-display text-balance">
                  Student travel shouldn't be expensive, isolated, or unsafe.
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-balance">
                  Traditional travel is costly, disconnected from local communities, and stressful for parents back home. Volunteer Vihara brings volunteering, verified student co-travellers, and automated safety check-ins into one trusted ecosystem.
                </p>
              </div>
            </section>

            {/* 3 Core Pillars */}
            <PillarsSection
              onExploreSeva={() => setCurrentTab('seva')}
              onExploreSafar={() => setCurrentTab('safar')}
              onExploreSafety={() => setCurrentTab('safety')}
            />
          </div>
        )}

        {/* VIEW 2: SEVA MARKETPLACE */}
        {currentTab === 'seva' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <SevaMarketplace
              opportunities={opportunities}
              onViewDetails={setSelectedOpportunity}
              onApply={handleApplyOpportunity}
            />
          </div>
        )}

        {/* VIEW 3: SAFAR TRAVEL TRIBE MATCHING */}
        {currentTab === 'safar' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <SafarMatchingView
              currentTrip={currentTrip}
              travellers={computedTravellers}
              onOpenTripModal={() => setTripModalOpen(true)}
              onViewProfile={setSelectedProfile}
              onViewCompatibility={setSelectedCompatibilityTraveller}
              onRequestConnect={handleRequestConnect}
            />
          </div>
        )}

        {/* VIEW 4: SAFETY CENTER */}
        {currentTab === 'safety' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <SafetyCenter
              currentUser={currentUser}
              trustedContacts={trustedContacts}
              activeJourney={activeJourney}
              onUpdateJourney={setActiveJourney}
              onAddContact={handleAddTrustedContact}
              onRemoveContact={handleRemoveTrustedContact}
              onOpenIncidentReport={() => setIncidentModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW 5: HOW IT WORKS DEDICATED TAB */}
        {currentTab === 'how-it-works' && (
          <div className="space-y-0">
            <HowItWorks />
            <ImpactSection />
            <FinalCta
              onStartExploring={() => setCurrentTab('seva')}
              onBecomeOrganizer={() => {
                setActiveRole('organizer');
                setCurrentTab('organizer-dashboard');
              }}
            />
          </div>
        )}

        {/* VIEW 6: STUDENT DASHBOARD */}
        {currentTab === 'student-dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <StudentDashboard
              currentUser={currentUser}
              activeJourney={activeJourney}
              applications={applications}
              recommendedOpportunities={opportunities}
              recommendedTravellers={computedTravellers}
              onSelectTab={setCurrentTab}
              onOpenTripModal={() => setTripModalOpen(true)}
              onViewOpportunity={setSelectedOpportunity}
              onApplyOpportunity={handleApplyOpportunity}
              onViewProfile={setSelectedProfile}
              onViewCompatibility={setSelectedCompatibilityTraveller}
              onRequestConnect={handleRequestConnect}
            />
          </div>
        )}

        {/* VIEW 7: ORGANIZER DASHBOARD */}
        {currentTab === 'organizer-dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <OrganizerDashboard
              opportunities={opportunities}
              applications={applications}
              onAddOpportunity={handleAddOpportunity}
              onUpdateApplicationStatus={handleUpdateApplicationStatus}
              onToggleVerification={handleToggleParticipationVerification}
            />
          </div>
        )}

        {/* VIEW 8: ADMIN DASHBOARD */}
        {currentTab === 'admin-dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <AdminDashboard
              incidents={incidents}
              onUpdateIncidentStatus={handleUpdateIncidentStatus}
            />
          </div>
        )}

        {/* VIEW 9: LOGIN & REGISTER AUTH PAGE */}
        {(currentTab === 'login' || currentTab === 'register') && (
          <AuthPage
            initialMode={currentTab === 'register' ? 'register' : 'login'}
            initialRole={activeRole === 'organizer' ? 'organization' : 'student'}
            onLoginSuccess={handleLoginSuccess}
            onRegisterSuccess={handleRegisterSuccess}
            onNavigateExplore={() => setCurrentTab('explore')}
          />
        )}
      </main>

      {/* Floating Auth Toast Notification */}
      {authToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-neutral-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-400/50 flex items-center gap-3.5 animate-in fade-in slide-in-from-top-4 duration-300 max-w-md">
          <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-white text-sm">{authToast.title}</p>
            <p className="text-neutral-300 mt-0.5">{authToast.desc}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        onSelectTab={setCurrentTab}
        onOpenIncidentReport={() => setIncidentModalOpen(true)}
        onOpenEmergencyGuide={() => {
          setCurrentTab('safety');
        }}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeRole={activeRole}
      />

      {/* MODALS */}
      {/* 1. Opportunity Details Modal */}
      <OpportunityDetailModal
        opportunity={selectedOpportunity}
        isOpen={Boolean(selectedOpportunity)}
        onClose={() => setSelectedOpportunity(null)}
        onApply={handleApplyOpportunity}
      />

      {/* 2. Multi-Step Application Modal */}
      <ApplicationModal
        opportunity={applyingOpportunity}
        currentUser={currentUser}
        isOpen={Boolean(applyingOpportunity)}
        onClose={() => setApplyingOpportunity(null)}
        onSubmitApplication={handleSubmitApplication}
      />

      {/* 3. Trip Creation / Adjustment Modal */}
      <TripCreationModal
        isOpen={tripModalOpen}
        onClose={() => setTripModalOpen(false)}
        onCreateTrip={(trip) => {
          setCurrentTrip(trip);
          setCurrentTab('safar');
        }}
      />

      {/* 4. Compatibility Score Explanation Modal */}
      <CompatibilityModal
        isOpen={Boolean(selectedCompatibilityTraveller)}
        onClose={() => setSelectedCompatibilityTraveller(null)}
        traveller={selectedCompatibilityTraveller}
      />

      {/* 5. Privacy-First Traveller Profile Modal */}
      <TravellerProfileModal
        isOpen={Boolean(selectedProfile)}
        onClose={() => setSelectedProfile(null)}
        profile={selectedProfile}
        connectionStatus={
          selectedProfile ? connectionStatuses[selectedProfile.id] || 'none' : 'none'
        }
        onRequestConnect={handleRequestConnect}
      />

      {/* 6. Confidential Incident Reporting Modal */}
      <IncidentModal
        isOpen={incidentModalOpen}
        onClose={() => setIncidentModalOpen(false)}
        onSubmitIncident={handleSubmitIncident}
      />

      {/* 7. Notification Drawer */}
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onSelectNotification={handleSelectNotification}
      />
    </div>
  );
}
