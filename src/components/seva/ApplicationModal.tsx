import React, { useState } from 'react';
import { VolunteerApplication, VolunteerOpportunity, UserProfile } from '../../types';
import { Modal } from '../common/Modal';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building,
  Calendar,
  User,
  Shield,
  Phone,
  FileCheck,
} from 'lucide-react';

interface ApplicationModalProps {
  opportunity: VolunteerOpportunity | null;
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (application: Partial<VolunteerApplication>) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  opportunity,
  currentUser,
  isOpen,
  onClose,
  onSubmitApplication,
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Form State
  const [name, setName] = useState(currentUser.name);
  const [college, setCollege] = useState(currentUser.college);
  const [degree, setDegree] = useState(currentUser.degree);
  const [city, setCity] = useState(currentUser.city);

  const [statement, setStatement] = useState(
    'I want to contribute my skills toward this initiative, learn from grassroots leaders, and connect with like-minded student travellers.'
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    opportunity?.requiredSkills.slice(0, 2) || ['Teamwork', 'Photography']
  );

  const [departureCity, setDepartureCity] = useState(currentUser.city);
  const [transitPreference, setTransitPreference] = useState('Train (Sleeper / 3AC)');
  const [arrivalDate, setArrivalDate] = useState(opportunity?.startDate || '2026-10-18');

  const [emergencyName, setEmergencyName] = useState('Sunita Sharma');
  const [emergencyRelation, setEmergencyRelation] = useState('Parent');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 98201 44521');

  if (!opportunity) return null;

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = `VV-APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceId(newRef);
    setIsSubmitted(true);

    onSubmitApplication({
      id: `app_${Date.now()}`,
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title,
      organizer: opportunity.organizer,
      applicantId: currentUser.id,
      applicantName: name,
      applicantCollege: college,
      applicantAvatar: currentUser.avatar,
      appliedDate: '2026-10-06',
      status: 'submitted',
      statement,
      skills: selectedSkills,
      departureCity,
      travelDates: `${arrivalDate} to ${opportunity.endDate}`,
      emergencyContact: {
        name: emergencyName,
        relationship: emergencyRelation,
        phone: emergencyPhone,
      },
    });
  };

  const handleResetAndClose = () => {
    setStep(1);
    setIsSubmitted(false);
    onClose();
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={isSubmitted ? 'Application Submitted' : 'Volunteer Application'}
      subtitle={
        isSubmitted
          ? `Application successfully transmitted to ${opportunity.organizer}`
          : `Step ${step} of 5 — Applying for ${opportunity.title}`
      }
      maxWidth="2xl"
    >
      {isSubmitted ? (
        /* Success Screen */
        <div className="py-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-neutral-900 font-display">
              Application Successfully Sent!
            </h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              Your application has been delivered to <strong>{opportunity.organizer}</strong> for review.
            </p>
          </div>

          {/* Reference Card */}
          <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 text-left max-w-md mx-auto space-y-2.5 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
              <span className="text-neutral-500">Reference ID</span>
              <span className="font-mono font-bold text-neutral-900">{referenceId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">Opportunity</span>
              <span className="font-semibold text-neutral-900 truncate max-w-[200px]">
                {opportunity.title}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">Current Status</span>
              <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Under Review
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">Host Expected Decision</span>
              <span className="font-semibold text-neutral-900">Within 3-4 working days</span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-left max-w-md mx-auto p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs space-y-1.5 text-neutral-700">
            <h5 className="font-bold text-amber-900">What happens next?</h5>
            <p>1. The host team reviews your student profile and motivation statement.</p>
            <p>2. You will receive an in-app notification when your application status updates.</p>
            <p>3. You can find compatible travellers heading to {opportunity.destination} right now!</p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleResetAndClose}
              className="px-6 py-3 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Done & Return to Opportunities
            </button>
          </div>
        </div>
      ) : (
        /* Multi-step Form */
        <div>
          {/* Progress Indicators */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step === s
                      ? 'bg-neutral-900 text-white'
                      : step > s
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-neutral-100 text-neutral-400'
                  }`}
                >
                  {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                </div>
                <span
                  className={`text-[11px] hidden sm:inline ${
                    step === s ? 'font-bold text-neutral-900' : 'text-neutral-400'
                  }`}
                >
                  {s === 1
                    ? 'Personal'
                    : s === 2
                    ? 'Skills'
                    : s === 3
                    ? 'Travel'
                    : s === 4
                    ? 'Emergency'
                    : 'Review'}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-neutral-900 font-display">
                  Step 1: Verified Student Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Current College / University
                    </label>
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Degree Program
                    </label>
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Home City / Campus City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Skills & Motivation */}
            {step === 2 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-neutral-900 font-display">
                  Step 2: Skills & Statement of Purpose
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-2">
                    Select Relevant Skills for this Opportunity
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Teamwork',
                      'Photography',
                      'Public Speaking',
                      'Event Coordination',
                      'Data Logging',
                      'First Aid',
                      'Multilingual Host',
                      'Design / Video',
                      'Social Media',
                    ].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggleSkill(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          selectedSkills.includes(s)
                            ? 'bg-neutral-900 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Why are you passionate about this volunteer opportunity?
                  </label>
                  <textarea
                    rows={4}
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 resize-none"
                    placeholder="Describe your background and what you hope to contribute..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Travel Logistics */}
            {step === 3 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-neutral-900 font-display">
                  Step 3: Travel Information & Logistics
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Departing From City
                    </label>
                    <input
                      type="text"
                      value={departureCity}
                      onChange={(e) => setDepartureCity(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Planned Arrival Date
                    </label>
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Intended Transit Mode
                    </label>
                    <select
                      value={transitPreference}
                      onChange={(e) => setTransitPreference(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 bg-white"
                    >
                      <option>Train (Sleeper / 3AC)</option>
                      <option>Inter-city Bus (Volvo / KSRTC)</option>
                      <option>Flight (Student fare)</option>
                      <option>Carpool / Shared transit with Vihara Buddies</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Emergency Contact */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-sm font-bold text-neutral-900 font-display">
                    Step 4: Emergency / Trusted Contact
                  </h4>
                </div>
                <p className="text-xs text-neutral-500">
                  Required for journey safety check-ins and emergency contact by host coordinators.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Relationship
                    </label>
                    <input
                      type="text"
                      value={emergencyRelation}
                      onChange={(e) => setEmergencyRelation(e.target.value)}
                      required
                      placeholder="Parent, Guardian, Sibling"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Emergency Phone Number
                    </label>
                    <input
                      type="tel"
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-neutral-900 font-display">
                  Step 5: Review Application Summary
                </h4>

                <div className="rounded-xl bg-neutral-50 p-4 border border-neutral-200 text-xs space-y-3">
                  <div className="grid grid-cols-2 gap-2 pb-2 border-b border-neutral-200">
                    <div>
                      <span className="text-neutral-500 block">Applicant</span>
                      <span className="font-bold text-neutral-900">{name} ({college})</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Host Opportunity</span>
                      <span className="font-bold text-neutral-900">{opportunity.title}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pb-2 border-b border-neutral-200">
                    <div>
                      <span className="text-neutral-500 block">Travel Dates</span>
                      <span className="font-bold text-neutral-900">
                        {arrivalDate} to {opportunity.endDate}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Departure City</span>
                      <span className="font-bold text-neutral-900">{departureCity}</span>
                    </div>
                  </div>

                  <div className="pb-2 border-b border-neutral-200">
                    <span className="text-neutral-500 block">Emergency Contact</span>
                    <span className="font-bold text-neutral-900">
                      {emergencyName} ({emergencyRelation}) · {emergencyPhone}
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-500 block">Motivation Statement</span>
                    <p className="text-neutral-700 mt-1 italic">"{statement}"</p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-900">
                  By submitting, I confirm that all details provided are accurate and understand that host benefits are contingent on full event participation and conduct guidelines.
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-neutral-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};
