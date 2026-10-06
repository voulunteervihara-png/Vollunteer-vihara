import React, { useState } from 'react';
import { ActiveJourney, TrustedContact, UserProfile } from '../../types';
import { MOUNTAIN_BACKDROP } from '../../data/mockData';
import { VerificationBadge } from '../common/Badge';
import { Modal } from '../common/Modal';
import {
  Shield,
  ShieldCheck,
  UserCheck,
  Award,
  Phone,
  Bell,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Users,
  Copy,
  Check,
  Plus,
  Trash2,
  Sparkles,
  LifeBuoy,
  Info,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface SafetyCenterProps {
  currentUser: UserProfile;
  trustedContacts: TrustedContact[];
  activeJourney: ActiveJourney;
  onUpdateJourney: (updated: ActiveJourney) => void;
  onAddContact: (contact: TrustedContact) => void;
  onRemoveContact: (id: string) => void;
  onOpenIncidentReport: () => void;
}

export const SafetyCenter: React.FC<SafetyCenterProps> = ({
  currentUser,
  trustedContacts,
  activeJourney,
  onUpdateJourney,
  onAddContact,
  onRemoveContact,
  onOpenIncidentReport,
}) => {
  const [activeTab, setActiveTab] = useState<'journey' | 'contacts' | 'verification' | 'workflow' | 'emergency'>('journey');
  const [checkInDoneToast, setCheckInDoneToast] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [copiedSos, setCopiedSos] = useState(false);

  // New Contact Form State
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPref, setNewContactPref] = useState<TrustedContact['notificationPreference']>('active_journey');

  // Emergency Modal State
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  const handleArrivalCheckIn = () => {
    const updated: ActiveJourney = {
      ...activeJourney,
      arrivalCheckIn: {
        completed: true,
        dueTime: 'Done just now',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
        location: 'Morjim Eco-Camp Base, North Goa',
      },
      currentStage: 'Arrived at Destination — Basecamp Active',
      status: 'in_destination',
    };
    onUpdateJourney(updated);
    setCheckInDoneToast(true);
    setTimeout(() => setCheckInDoneToast(false), 3500);
  };

  const handleSimulateMissedCheckIn = () => {
    setIsSimulating(true);
    setSimulationStep(1);

    const timer1 = setTimeout(() => setSimulationStep(2), 2200);
    const timer2 = setTimeout(() => setSimulationStep(3), 4500);
    const timer3 = setTimeout(() => setSimulationStep(4), 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;

    onAddContact({
      id: `tc_${Date.now()}`,
      name: newContactName,
      relationship: newContactRelation || 'Friend / Family',
      phone: newContactPhone,
      email: newContactEmail || `${newContactName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      notificationPreference: newContactPref,
      isPrimary: false,
    });

    setNewContactName('');
    setNewContactRelation('');
    setNewContactPhone('');
    setNewContactEmail('');
    setShowAddContactModal(false);
  };

  const copyEmergencySos = () => {
    const text = `[EMERGENCY SOS - VOLUNTEER VIHARA]\nI am Aarav Sharma. I need immediate assistance at: Morjim Beach Base, North Goa.\nActive Journey: Hyderabad -> Goa.\nOfficial Helpline: 112.`;
    navigator.clipboard.writeText(text);
    setCopiedSos(true);
    setTimeout(() => setCopiedSos(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast alert */}
      {checkInDoneToast && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <p className="font-bold">Arrival Check-in Confirmed!</p>
            <p className="text-emerald-200">
              Sunita Sharma and Vikram Patel received automated safe arrival notification.
            </p>
          </div>
        </div>
      )}

      {/* Safety Header */}
      <div className="bg-gradient-to-r from-teal-950 via-neutral-900 to-neutral-900 text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-xl relative overflow-hidden">
        {/* Mountain Backdrop Atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={MOUNTAIN_BACKDROP}
            alt="Scenic mountain landscape"
            className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/95 via-neutral-900/90 to-neutral-950/80" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Volunteer Vihara Safety Center</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Travel Protected. Stay Connected.
          </h2>

          <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
            Continuous journey check-ins, multi-tier verified identities, trusted contacts auto-alerts, and 24/7 emergency response protocols built for student expeditions.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setEmergencyModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Emergency Assistance</span>
            </button>

            <button
              onClick={onOpenIncidentReport}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Report an Incident</span>
            </button>
          </div>
        </div>
      </div>

      {/* Safety Center Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-neutral-200">
        {[
          { id: 'journey', label: 'Active Journey Tracker' },
          { id: 'contacts', label: `Trusted Contacts (${trustedContacts.length})` },
          { id: 'verification', label: 'Verification Levels' },
          { id: 'workflow', label: 'Missed Check-in Workflow' },
          { id: 'emergency', label: 'Emergency Helplines & SOS' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-bold whitespace-nowrap rounded-xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ACTIVE JOURNEY TRACKER */}
      {activeTab === 'journey' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-6">
            {/* Journey Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-teal-700 mb-1">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                  <span>JOURNEY STATUS: ACTIVE</span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 font-display">
                  {activeJourney.tripName}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {activeJourney.origin} → {activeJourney.destination}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1.5 rounded-lg bg-teal-50 text-teal-900 font-semibold border border-teal-200">
                  Current Stage: {activeJourney.currentStage}
                </span>
              </div>
            </div>

            {/* Live Journey Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider font-display">
                Check-in Timeline & Geolocation Verification
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Departure Check-in */}
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900">01. Departure Check-in</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-emerald-800 font-medium">
                    Status: Completed
                  </p>
                  <p className="text-[11px] text-neutral-600">
                    Logged: {activeJourney.departureCheckIn.time}
                  </p>
                  <p className="text-[11px] text-neutral-500 truncate">
                    Loc: {activeJourney.departureCheckIn.location}
                  </p>
                </div>

                {/* 2. Arrival Check-in */}
                <div
                  className={`p-4 rounded-xl border space-y-2 transition-all ${
                    activeJourney.arrivalCheckIn.completed
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        activeJourney.arrivalCheckIn.completed
                          ? 'text-emerald-900'
                          : 'text-amber-900'
                      }`}
                    >
                      02. Arrival Check-in
                    </span>
                    {activeJourney.arrivalCheckIn.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                    )}
                  </div>

                  <p
                    className={`text-xs font-medium ${
                      activeJourney.arrivalCheckIn.completed
                        ? 'text-emerald-800'
                        : 'text-amber-800 font-bold'
                    }`}
                  >
                    {activeJourney.arrivalCheckIn.completed
                      ? `Completed at ${activeJourney.arrivalCheckIn.time}`
                      : `Due: ${activeJourney.arrivalCheckIn.dueTime}`}
                  </p>

                  <p className="text-[11px] text-neutral-600">
                    Destination: Morjim Basecamp, Goa
                  </p>

                  {!activeJourney.arrivalCheckIn.completed ? (
                    <button
                      onClick={handleArrivalCheckIn}
                      className="w-full mt-2 py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>Check-In Safe Now</span>
                    </button>
                  ) : (
                    <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                      ✓ Trusted contacts notified
                    </div>
                  )}
                </div>

                {/* 3. Return Check-in */}
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-neutral-500">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-700">03. Return Journey Check-in</span>
                    <Clock className="w-4 h-4 text-neutral-400" />
                  </div>
                  <p className="text-xs text-neutral-600">
                    Scheduled: Oct 24, 2026
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Final journey closeout & review trigger
                  </p>
                </div>
              </div>
            </div>

            {/* Travel Companions & Synced Contacts strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-100 text-xs">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-3">
                <img
                  src={activeJourney.companionAvatar}
                  alt={activeJourney.companionName}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-neutral-500 text-[11px] block">Verified Travel Companion</span>
                  <span className="font-bold text-neutral-900 block">{activeJourney.companionName}</span>
                  <span className="text-[11px] text-teal-700 font-medium">Shared Check-in Sync: Enabled</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="text-neutral-500 text-[11px] block">Active Emergency Contacts</span>
                  <span className="font-bold text-neutral-900 block">
                    {trustedContacts.map((c) => c.name.split(' ')[0]).join(', ')}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Automated SMS channel active
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className="px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRUSTED CONTACTS */}
      {activeTab === 'contacts' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 font-display">
                Trusted Contacts Network
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Designate family members or campus mentors who receive automated updates based on your preferences.
              </p>
            </div>

            <button
              onClick={() => setShowAddContactModal(true)}
              className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Trusted Contact</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trustedContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-neutral-900 font-display text-sm">
                          {contact.name}
                        </h4>
                        {contact.isPrimary && (
                          <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500">{contact.relationship}</p>
                    </div>

                    {!contact.isPrimary && (
                      <button
                        onClick={() => onRemoveContact(contact.id)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove contact"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-1 text-xs text-neutral-600 pt-1">
                    <p className="font-mono">{contact.phone}</p>
                    <p className="text-neutral-500 text-[11px] truncate">{contact.email}</p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                      Notification Rule
                    </span>
                    <span className="text-xs font-semibold text-neutral-800 capitalize bg-neutral-100 px-2 py-0.5 rounded-md inline-block">
                      {contact.notificationPreference.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explanation of Notification Rules */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 space-y-2">
            <h5 className="font-bold text-neutral-900">How Notification Preferences Work</h5>
            <ul className="space-y-1 list-disc list-inside text-neutral-600">
              <li><strong>Share trip automatically:</strong> Contact receives notifications when your trip is confirmed, departs, and arrives.</li>
              <li><strong>Share only during active journey:</strong> Contact only receives updates between scheduled departure and arrival check-ins.</li>
              <li><strong>Share only during missed check-in:</strong> Contact is ONLY notified if a scheduled check-in is missed past the grace period.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: VERIFICATION LEVELS */}
      {activeTab === 'verification' && (
        <div className="space-y-6">
          <div className="text-left max-w-2xl">
            <h3 className="text-xl font-bold text-neutral-900 font-display">
              Multi-Tier Student Verification Framework
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Volunteer Vihara validates real students to protect campus peer circles and NGO organizers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tier 1 */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Tier 1</span>
                <h4 className="font-bold text-neutral-900 font-display text-base">
                  Profile Created
                </h4>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Initial registration completed with email and phone verification. Can view opportunities and browse destinations.
              </p>
              <div className="text-[11px] text-neutral-500 pt-2 border-t border-neutral-100">
                Granted on sign up
              </div>
            </div>

            {/* Tier 2 */}
            <div className="bg-white rounded-2xl border border-sky-200 p-5 space-y-3 bg-sky-50/30">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">Tier 2</span>
                <h4 className="font-bold text-neutral-900 font-display text-base">
                  Student Verified
                </h4>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                College ID card or university (.edu / .ac.in) email validated. Can apply to volunteering events and request travel buddies.
              </p>
              <div className="text-[11px] text-sky-800 font-semibold pt-2 border-t border-sky-100">
                Requires College ID
              </div>
            </div>

            {/* Tier 3 (Current) */}
            <div className="bg-white rounded-2xl border border-teal-300 p-5 space-y-3 bg-teal-50/40 relative ring-2 ring-teal-500/30">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">Tier 3 (Active)</span>
                <h4 className="font-bold text-neutral-900 font-display text-base">
                  Identity Verified
                </h4>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Govt Photo ID (DigiLocker / Aadhaar / Passport mask) paired with university records and verified emergency contacts.
              </p>
              <div className="text-[11px] text-teal-800 font-bold pt-2 border-t border-teal-200">
                Your Current Status ✓
              </div>
            </div>

            {/* Tier 4 */}
            <div className="bg-white rounded-2xl border border-emerald-300 p-5 space-y-3 bg-emerald-50/30">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Tier 4</span>
                <h4 className="font-bold text-neutral-900 font-display text-base">
                  Trusted Traveller
                </h4>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Achieved after 3+ verified completed trips, positive peer community reviews, zero safety flags, and 30+ completed Seva hours.
              </p>
              <div className="text-[11px] text-emerald-800 font-semibold pt-2 border-t border-emerald-200">
                Highest Trust Level
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-600 space-y-1">
            <p className="font-bold text-neutral-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-600" />
              <span>Verification Boundary Notice</span>
            </p>
            <p className="leading-relaxed">
              Volunteer Vihara badges verify documentation and peer participation history. Badges do not constitute a legal endorsement or personal safety guarantee. Always exercise prudent personal judgement when meeting travel buddies in public transit hubs.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: MISSED CHECK-IN ESCALATION WORKFLOW */}
      {activeTab === 'workflow' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 font-display">
                Missed Check-in Safety Protocol
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Automated multi-stage protocol that activates if a student fails to complete a scheduled check-in.
              </p>
            </div>

            <button
              onClick={handleSimulateMissedCheckIn}
              disabled={isSimulating}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSimulating ? 'Simulation Running...' : 'Simulate Escalation Demo'}</span>
            </button>
          </div>

          {/* Visual Step-by-step Workflow */}
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'Grace Window & Direct Student Ping',
                desc: 'If arrival check-in is overdue by 15 minutes, automated push notification and SMS is sent to the student.',
                active: simulationStep >= 1,
              },
              {
                step: 2,
                title: 'One-Touch "I Am Safe" Confirmation Prompt',
                desc: 'Student receives an urgent modal to confirm safety or flag transit delay (e.g. train delayed by 1 hour).',
                active: simulationStep >= 2,
              },
              {
                step: 3,
                title: 'Trusted Contacts Automated Alert',
                desc: 'If unconfirmed after 30 minutes, primary emergency contacts (Sunita Sharma) receive automated alert with last known GPS coordinate.',
                active: simulationStep >= 3,
              },
              {
                step: 4,
                title: 'Platform Safety Desk Incident Escalation',
                desc: 'Volunteer Vihara incident team contacts hostel host coordinators, station authority, and recommends dialing official helpline (112) if uncontactable.',
                active: simulationStep >= 4,
              },
            ].map((s) => (
              <div
                key={s.step}
                className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                  s.active
                    ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                    : 'bg-white border-neutral-200'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    s.active ? 'bg-amber-600 text-white' : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {s.step}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-neutral-900 font-display text-sm">
                    {s.title}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {isSimulating && (
            <div className="p-4 rounded-xl bg-neutral-900 text-white text-xs flex items-center justify-between">
              <span>Simulation in progress (Step {simulationStep} of 4)</span>
              <button
                onClick={() => {
                  setIsSimulating(false);
                  setSimulationStep(0);
                }}
                className="text-amber-400 font-bold hover:underline cursor-pointer"
              >
                Reset Simulation
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: EMERGENCY HELPLINES */}
      {activeTab === 'emergency' && (
        <div className="space-y-6">
          <div className="text-left max-w-2xl">
            <h3 className="text-xl font-bold text-neutral-900 font-display">
              Official Indian Emergency Helplines
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Always dial official emergency authorities first when in imminent physical danger.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">All-in-One Helpline</span>
              <div className="text-3xl font-black font-mono">112</div>
              <p className="text-xs font-semibold">National Emergency Response (Police, Fire, Medical)</p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Women Safety</span>
              <div className="text-3xl font-black font-mono">1091</div>
              <p className="text-xs font-semibold">National Women Helpline (24/7 Response)</p>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 space-y-2">
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Ambulance</span>
              <div className="text-3xl font-black font-mono">108</div>
              <p className="text-xs font-semibold">Emergency Medical Services & First Aid Transit</p>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 space-y-2">
              <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">Tourism Support</span>
              <div className="text-3xl font-black font-mono">1363</div>
              <p className="text-xs font-semibold">Ministry of Tourism National 24/7 Helpline</p>
            </div>
          </div>

          {/* Quick SOS Template */}
          <div className="p-5 rounded-2xl bg-neutral-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm font-display flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Pre-Drafted SOS Text for SMS / WhatsApp</span>
              </h4>
              <button
                onClick={copyEmergencySos}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-amber-300"
              >
                {copiedSos ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSos ? 'Copied' : 'Copy Message'}</span>
              </button>
            </div>

            <div className="p-3.5 bg-neutral-950/80 rounded-xl font-mono text-xs text-neutral-300 leading-relaxed border border-neutral-800">
              [EMERGENCY SOS - VOLUNTEER VIHARA]<br />
              I am Aarav Sharma. I need immediate assistance at: Morjim Beach Base, North Goa.<br />
              Active Journey: Hyderabad -&gt; Goa.<br />
              Official Helpline: 112.
            </div>
          </div>
        </div>
      )}

      {/* Add Contact Modal */}
      <Modal
        isOpen={showAddContactModal}
        onClose={() => setShowAddContactModal(false)}
        title="Add Trusted Contact"
        subtitle="This contact will receive automated check-in and safety notifications."
        maxWidth="md"
      >
        <form onSubmit={handleCreateContact} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Contact Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Sharma"
              value={newContactName}
              onChange={(e) => setNewContactName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Relationship
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Father, Mentor, Campus Hostel Warden"
              value={newContactRelation}
              onChange={(e) => setNewContactRelation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98XXX XXXXX"
              value={newContactPhone}
              onChange={(e) => setNewContactPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Notification Rule
            </label>
            <select
              value={newContactPref}
              onChange={(e) => setNewContactPref(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            >
              <option value="active_journey">Share only during active journey</option>
              <option value="always">Share trip automatically (All milestones)</option>
              <option value="missed_checkin_only">Share only during missed check-in</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddContactModal(false)}
              className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs"
            >
              Save Contact
            </button>
          </div>
        </form>
      </Modal>

      {/* Emergency Modal Dialog */}
      <Modal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        title="Immediate Emergency Assistance"
        subtitle="Volunteer Vihara is not a replacement for official state emergency services."
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
              <span>Are you in immediate life-threatening danger?</span>
            </div>
            <p>
              Please dial <strong>112</strong> immediately on your mobile phone. Do not delay waiting for in-app support.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-neutral-900">Direct Emergency Access</h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:112"
                className="p-3 rounded-xl bg-neutral-900 text-white font-bold flex items-center justify-between hover:bg-neutral-800 transition-colors"
              >
                <span>Call Police & Emergency</span>
                <span className="font-mono text-amber-400">112</span>
              </a>

              <a
                href="tel:1091"
                className="p-3 rounded-xl bg-neutral-900 text-white font-bold flex items-center justify-between hover:bg-neutral-800 transition-colors"
              >
                <span>Call Women Helpline</span>
                <span className="font-mono text-amber-400">1091</span>
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setEmergencyModalOpen(false)}
              className="w-full py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-100"
            >
              Dismiss
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
