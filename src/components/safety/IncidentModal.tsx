import React, { useState } from 'react';
import { IncidentReport } from '../../types';
import { Modal } from '../common/Modal';
import {
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  ShieldAlert,
  Upload,
  Lock,
  Calendar,
  MapPin,
  Clock,
} from 'lucide-react';

interface IncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitIncident: (report: IncidentReport) => void;
}

export const IncidentModal: React.FC<IncidentModalProps> = ({
  isOpen,
  onClose,
  onSubmitIncident,
}) => {
  const [submittedReport, setSubmittedReport] = useState<IncidentReport | null>(null);

  const [category, setCategory] = useState<IncidentReport['category']>('unsafe_behaviour');
  const [severity, setSeverity] = useState<IncidentReport['severity']>('medium');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('2026-10-06 14:00');
  const [involvedPersons, setInvolvedPersons] = useState('');
  const [evidenceName, setEvidenceName] = useState('');

  const categories = [
    { value: 'harassment', label: 'Harassment / Discrimination' },
    { value: 'unsafe_behaviour', label: 'Unsafe Driving / Host Behaviour' },
    { value: 'fraud_scam', label: 'Fraud / Financial Scam' },
    { value: 'accommodation_issue', label: 'Unsafe Hostel / Lock Issue' },
    { value: 'organizer_issue', label: 'Organizer Failed Benefit / Breach' },
    { value: 'traveller_issue', label: 'Companion / Traveller Dispute' },
    { value: 'lost_item', label: 'Lost Identity / Travel Belongings' },
    { value: 'other', label: 'Other Safety Concern' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: IncidentReport = {
      id: `inc_${Date.now()}`,
      referenceNumber: `VV-INC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      severity,
      description,
      location: location || 'Goa coastal basecamp area',
      dateTime,
      involvedPersons,
      reportedBy: 'Aarav Sharma (Student #8821)',
      status: 'received',
      assignedReviewer: 'Safety Escalation Desk (Pending Assignment)',
      evidenceName: evidenceName || 'statement_log.pdf',
    };

    setSubmittedReport(newReport);
    onSubmitIncident(newReport);
  };

  const handleResetAndClose = () => {
    setSubmittedReport(null);
    setDescription('');
    setLocation('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={submittedReport ? 'Incident Report Received' : 'Confidential Incident Report'}
      subtitle={
        submittedReport
          ? 'Your report is logged into our safety triage queue.'
          : 'Volunteer Vihara prioritizes community protection. All reports are handled confidentially.'
      }
      maxWidth="2xl"
    >
      {submittedReport ? (
        <div className="py-4 text-center space-y-6 text-xs">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h4 className="text-xl font-bold text-neutral-900 font-display">
              Case Reference: {submittedReport.referenceNumber}
            </h4>
            <p className="text-neutral-600 mt-1 max-w-md mx-auto">
              Our safety review officers have received your submission. We investigate with strict privacy safeguards.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 text-left max-w-md mx-auto space-y-2 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
              <span className="text-neutral-500">Tracking Number</span>
              <span className="font-mono font-bold text-neutral-900">
                {submittedReport.referenceNumber}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">Category</span>
              <span className="capitalize font-semibold text-neutral-900">
                {submittedReport.category.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">Status</span>
              <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                Case Received · Triage Active
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">Assigned Reviewer</span>
              <span className="text-neutral-700">{submittedReport.assignedReviewer}</span>
            </div>
          </div>

          <div className="p-3.5 bg-neutral-100 rounded-xl max-w-md mx-auto text-left text-[11px] text-neutral-600 space-y-1">
            <p className="font-bold text-neutral-900">Immediate Danger?</p>
            <p>
              If you are in immediate personal danger, please do not wait for platform ticketing. Immediately contact local emergency police by dialing <strong>112</strong> or Women Helpline at <strong>1091</strong>.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Close & Return
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-[11px] text-amber-900">
            <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              Incident submissions are strictly confidential. Neither organizers nor co-travellers will see your identity without explicit consent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Incident Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Severity Level
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              >
                <option value="low">Low — General grievance / reimbursement delay</option>
                <option value="medium">Medium — Defective lock / amenity misrepresentation</option>
                <option value="high">High — Harassment / hostile situation</option>
                <option value="critical">Critical — Immediate safety / fraud violation</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Approximate Location / Address
              </label>
              <input
                type="text"
                placeholder="e.g. Madgaon Station, or Hostel Om Vihar"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Date & Time of Occurrence
              </label>
              <input
                type="text"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                placeholder="2026-10-06 14:00"
                required
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Individuals or Entities Involved (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Driver name, hostel manager, or organizer organization"
              value={involvedPersons}
              onChange={(e) => setInvolvedPersons(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Detailed Description of What Happened
            </label>
            <textarea
              rows={4}
              required
              placeholder="Please provide factual details of the occurrence..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-hidden resize-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Evidence / Photos / Screenshots (Optional)
            </label>
            <div className="flex items-center gap-3">
              <label className="px-3 py-2 rounded-xl border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 cursor-pointer flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Document / Photo</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setEvidenceName(e.target.files[0].name);
                  }}
                />
              </label>
              {evidenceName && (
                <span className="text-neutral-600 font-mono text-[11px] truncate max-w-[200px]">
                  {evidenceName}
                </span>
              )}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Submit Confidential Report</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
