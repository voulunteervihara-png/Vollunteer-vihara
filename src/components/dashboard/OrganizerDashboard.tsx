import React, { useState } from 'react';
import {
  OrganizerBenefits,
  VolunteerApplication,
  VolunteerOpportunity,
} from '../../types';
import { Modal } from '../common/Modal';
import {
  Building2,
  Plus,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Sparkles,
  MapPin,
  Calendar,
  Bed,
  Utensils,
  Wallet,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface OrganizerDashboardProps {
  opportunities: VolunteerOpportunity[];
  applications: VolunteerApplication[];
  onAddOpportunity: (opp: VolunteerOpportunity) => void;
  onUpdateApplicationStatus: (appId: string, status: VolunteerApplication['status']) => void;
  onToggleVerification: (appId: string) => void;
}

export const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({
  opportunities,
  applications,
  onAddOpportunity,
  onUpdateApplicationStatus,
  onToggleVerification,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('Goa');
  const [state, setState] = useState('Goa');
  const [category, setCategory] = useState<VolunteerOpportunity['category']>('conservation');
  const [startDate, setStartDate] = useState('2026-11-15');
  const [endDate, setEndDate] = useState('2026-11-22');
  const [duration, setDuration] = useState('7 Days');
  const [openingsTotal, setOpeningsTotal] = useState(15);
  const [description, setDescription] = useState('');
  const [locationDetails, setLocationDetails] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [eligibilityText, setEligibilityText] = useState('');

  // Benefits (Provided by Organizer)
  const [accommodation, setAccommodation] = useState('Free shared volunteer guest rooms');
  const [food, setFood] = useState('3 wholesome meals provided daily');
  const [travelReimbursement, setTravelReimbursement] = useState('Up to ₹1,500 against tickets');
  const [stipend, setStipend] = useState('₹2,500 volunteer honorarium');
  const [certificate, setCertificate] = useState('Official Host Seva Credential');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOpp: VolunteerOpportunity = {
      id: `opp_${Date.now()}`,
      title,
      organizer: 'Deccan & Coastal Youth Initiative',
      organizerVerified: true,
      category,
      destination,
      state,
      startDate,
      endDate,
      duration,
      deadline: '2026-11-05',
      openingsTotal,
      openingsFilled: 0,
      description,
      responsibilities: responsibilitiesText
        ? responsibilitiesText.split('\n').filter(Boolean)
        : ['Assist community team', 'Document daily outcomes', 'Event coordination'],
      eligibility: eligibilityText
        ? eligibilityText.split('\n').filter(Boolean)
        : ['Enrolled university student', 'Good team player'],
      requiredSkills: ['Teamwork', 'Communication', 'Empathy'],
      benefits: {
        accommodation,
        food,
        travelReimbursement,
        stipend,
        certificate,
      },
      imageUrl:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80',
      safetyNotes: 'Host coordinators on site 24/7. Verified local medical partner.',
      locationDetails: locationDetails || `${destination} Center`,
    };

    onAddOpportunity(newOpp);
    setShowCreateModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Organizer Header */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Verified Host & NGO Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-display">
            Organizer Management Console
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl">
            Publish youth volunteering opportunities, review verified student applications, and issue authenticated participation credentials.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Post New Opportunity</span>
        </button>
      </div>

      {/* Host Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Active Hosted Events
          </span>
          <div className="text-3xl font-extrabold font-mono text-neutral-900 mt-1 tabular-nums">
            {opportunities.length}
          </div>
          <span className="text-xs text-neutral-500">Across 6 Indian regions</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Total Applications
          </span>
          <div className="text-3xl font-extrabold font-mono text-amber-600 mt-1 tabular-nums">
            {applications.length + 18}
          </div>
          <span className="text-xs text-neutral-500">From verified university students</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Selected Volunteers
          </span>
          <div className="text-3xl font-extrabold font-mono text-teal-700 mt-1 tabular-nums">
            {applications.filter((a) => a.status === 'accepted').length + 8}
          </div>
          <span className="text-xs text-neutral-500">Dorm & food passes confirmed</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Verified Certifications
          </span>
          <div className="text-3xl font-extrabold font-mono text-emerald-700 mt-1 tabular-nums">
            {applications.filter((a) => a.verifiedParticipation).length + 14}
          </div>
          <span className="text-xs text-neutral-500">Issued on blockchain/DigiLocker</span>
        </div>
      </div>

      {/* Applications Review Queue */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 font-display">
              Incoming Student Applications
            </h3>
            <p className="text-xs text-neutral-500">
              Review motivation statements, emergency contacts, and approve participation.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg">
            {applications.length} Submissions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500 text-[11px] uppercase tracking-wider font-semibold">
                <th className="pb-3">Applicant & College</th>
                <th className="pb-3">Opportunity</th>
                <th className="pb-3">Statement Summary</th>
                <th className="pb-3">Emergency Contact</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={app.applicantAvatar}
                        alt={app.applicantName}
                        className="w-8 h-8 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="font-bold text-neutral-900 block">
                          {app.applicantName}
                        </span>
                        <span className="text-[11px] text-neutral-500">
                          {app.applicantCollege}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 pr-4 font-semibold text-neutral-800 max-w-[180px] truncate">
                    {app.opportunityTitle}
                  </td>

                  <td className="py-3.5 pr-4 text-neutral-600 max-w-[220px] truncate italic">
                    "{app.statement}"
                  </td>

                  <td className="py-3.5 pr-4 text-neutral-600">
                    <span className="block font-medium">{app.emergencyContact.name}</span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {app.emergencyContact.phone}
                    </span>
                  </td>

                  <td className="py-3.5 pr-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        app.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'shortlisted'
                          ? 'bg-sky-100 text-sky-800'
                          : app.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 text-right space-x-1">
                    {app.status !== 'accepted' && (
                      <button
                        onClick={() => onUpdateApplicationStatus(app.id, 'accepted')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors cursor-pointer"
                        title="Accept volunteer"
                      >
                        Accept
                      </button>
                    )}
                    {app.status !== 'shortlisted' && app.status !== 'accepted' && (
                      <button
                        onClick={() => onUpdateApplicationStatus(app.id, 'shortlisted')}
                        className="px-2.5 py-1 rounded-lg border border-neutral-300 text-neutral-700 font-semibold text-[11px] hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        Shortlist
                      </button>
                    )}
                    {app.status !== 'rejected' && (
                      <button
                        onClick={() => onUpdateApplicationStatus(app.id, 'rejected')}
                        className="px-2 py-1 rounded-lg text-neutral-400 hover:text-rose-600 text-[11px] transition-colors cursor-pointer"
                        title="Reject application"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Volunteers & Participation Verification */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 font-display">
            Selected Volunteers Attendance & Verification
          </h3>
          <p className="text-xs text-neutral-500">
            Once volunteers complete their required hours, toggle participation verification to issue official credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications
            .filter((a) => a.status === 'accepted')
            .map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={app.applicantAvatar}
                    alt={app.applicantName}
                    className="w-10 h-10 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="font-bold text-neutral-900 text-xs">
                      {app.applicantName}
                    </h5>
                    <p className="text-[11px] text-neutral-500">{app.applicantCollege}</p>
                    <span className="text-[11px] text-teal-800 font-medium">
                      Event: {app.opportunityTitle.slice(0, 24)}...
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onToggleVerification(app.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    app.verifiedParticipation
                      ? 'bg-emerald-600 text-white'
                      : 'border border-neutral-300 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{app.verifiedParticipation ? 'Verified ✓' : 'Verify Seva'}</span>
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Create Opportunity Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Host a Volunteering Opportunity"
        subtitle="Clearly designate benefits provided directly by your organization."
        maxWidth="3xl"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-neutral-700 mb-1">
                Opportunity Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Goa Coastal Turtle Nesting & Marine Clean"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Destination City
              </label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                State
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white"
              >
                <option value="conservation">Conservation / Environmental</option>
                <option value="heritage">Heritage & Cultural Walk</option>
                <option value="festival">Cultural / Art Festival</option>
                <option value="community">Community Outreach</option>
                <option value="tech">Tech & Open Innovation</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Number of Volunteer Openings
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={openingsTotal}
                onChange={(e) => setOpeningsTotal(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Description & Mission
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe what students will achieve and why their participation matters..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 resize-none"
            />
          </div>

          {/* Organizer-Provided Benefits Explicit Section */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/90 space-y-3">
            <h5 className="font-bold text-amber-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Organizer-Provided Benefits (Host Obligation)</span>
            </h5>
            <p className="text-[11px] text-amber-800">
              State clearly what your organization provides to selected student volunteers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-neutral-700 mb-0.5">
                  Accommodation
                </label>
                <input
                  type="text"
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-0.5">
                  Food & Refreshments
                </label>
                <input
                  type="text"
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-0.5">
                  Travel Reimbursement
                </label>
                <input
                  type="text"
                  value={travelReimbursement}
                  onChange={(e) => setTravelReimbursement(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-0.5">
                  Stipend / Honorarium
                </label>
                <input
                  type="text"
                  value={stipend}
                  onChange={(e) => setStipend(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 bg-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs"
            >
              Publish Opportunity
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
