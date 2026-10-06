import React, { useState } from 'react';
import { IncidentReport, UserProfile } from '../../types';
import { Modal } from '../common/Modal';
import { VerificationBadge } from '../common/Badge';
import {
  ShieldAlert,
  Users,
  Building,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Ban,
  Clock,
  Shield,
  Search,
} from 'lucide-react';

interface AdminDashboardProps {
  incidents: IncidentReport[];
  onUpdateIncidentStatus: (id: string, status: IncidentReport['status']) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  incidents,
  onUpdateIncidentStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'incidents' | 'verifications' | 'users'>('overview');

  // Sample Admin State for Verification Queue
  const [verificationQueue, setVerificationQueue] = useState([
    {
      id: 'vr_01',
      studentName: 'Siddharth Roy',
      college: 'BITS Pilani',
      document: 'College ID (2023A7PS0192G)',
      requestedTier: 'Student Verified',
      date: 'Oct 04, 2026',
    },
    {
      id: 'vr_02',
      studentName: 'Meera Deshmukh',
      college: 'NLSIU Bengaluru',
      document: 'DigiLocker Student Registry',
      requestedTier: 'Identity Verified',
      date: 'Oct 05, 2026',
    },
    {
      id: 'vr_03',
      studentName: 'Farhan Zaidi',
      college: 'Jamia Millia Islamia',
      document: 'University Smart Card & Fee Receipt',
      requestedTier: 'Student Verified',
      date: 'Oct 05, 2026',
    },
  ]);

  // Sample Users for User Management
  const [userList, setUserList] = useState([
    {
      id: 'u_1',
      name: 'Aarav Sharma',
      college: 'IIT Hyderabad',
      status: 'active',
      trips: 5,
      trustRating: 4.9,
    },
    {
      id: 'u_2',
      name: 'Ananya Sen',
      college: 'BITS Pilani',
      status: 'active',
      trips: 7,
      trustRating: 5.0,
    },
    {
      id: 'u_3',
      name: 'Karan Mehra',
      college: 'Delhi University',
      status: 'restricted',
      trips: 1,
      trustRating: 3.2,
      note: 'Reported for noisy hostel disruption',
    },
    {
      id: 'u_4',
      name: 'Rohan Kulkarni',
      college: 'Delhi University',
      status: 'active',
      trips: 4,
      trustRating: 4.8,
    },
  ]);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    userId: string;
    action: 'restrict' | 'suspend' | 'restore';
  }>({ isOpen: false, userId: '', action: 'restrict' });

  const handleApproveVerification = (id: string) => {
    setVerificationQueue(verificationQueue.filter((v) => v.id !== id));
  };

  const handleExecuteUserAction = () => {
    setUserList((prev) =>
      prev.map((u) => {
        if (u.id === confirmModal.userId) {
          const nextStatus =
            confirmModal.action === 'restore'
              ? 'active'
              : confirmModal.action === 'suspend'
              ? 'suspended'
              : 'restricted';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    setConfirmModal({ isOpen: false, userId: '', action: 'restrict' });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Header */}
      <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-neutral-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Platform Governance & Trust Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Admin Safety & Trust Administration
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
            Real-time incident triage, student identity verification queues, host compliance monitoring, and access controls.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-neutral-800 p-1.5 rounded-xl border border-neutral-700">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'incidents', label: `Incidents (${incidents.length})` },
            { id: 'verifications', label: `Verifications (${verificationQueue.length})` },
            { id: 'users', label: 'User Directory' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Students</span>
              <div className="text-2xl font-black font-mono mt-1">1,248</div>
              <span className="text-[11px] text-neutral-500">Enrolled nationwide</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <span className="text-[10px] font-bold text-teal-600 uppercase">Verified IDs</span>
              <div className="text-2xl font-black font-mono text-teal-700 mt-1">1,084</div>
              <span className="text-[11px] text-teal-700 font-semibold">86.8% verification</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <span className="text-[10px] font-bold text-amber-600 uppercase">Active Trips</span>
              <div className="text-2xl font-black font-mono text-amber-700 mt-1">42</div>
              <span className="text-[11px] text-neutral-500">Live check-in sync</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Opportunities</span>
              <div className="text-2xl font-black font-mono mt-1">36</div>
              <span className="text-[11px] text-neutral-500">Across 8 states</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Host Partners</span>
              <div className="text-2xl font-black font-mono mt-1">85</div>
              <span className="text-[11px] text-neutral-500">NGOs & Councils</span>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
              <span className="text-[10px] font-bold text-rose-700 uppercase">Open Incidents</span>
              <div className="text-2xl font-black font-mono text-rose-800 mt-1">
                {incidents.filter((i) => i.status !== 'resolved').length}
              </div>
              <span className="text-[11px] text-rose-700 font-semibold">In active triage</span>
            </div>
          </div>

          {/* Quick Incident Snapshot */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-neutral-900 font-display">
                Recent Incident Escalations
              </h3>
              <button
                onClick={() => setActiveTab('incidents')}
                className="text-xs font-bold text-neutral-700 hover:text-neutral-900"
              >
                View Full Queue →
              </button>
            </div>

            <div className="space-y-2.5">
              {incidents.slice(0, 3).map((inc) => (
                <div
                  key={inc.id}
                  className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/60 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-neutral-900">{inc.referenceNumber}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          inc.severity === 'critical' || inc.severity === 'high'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {inc.severity}
                      </span>
                      <span className="text-neutral-500 capitalize">
                        {inc.category.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-neutral-600 truncate mt-1">{inc.description}</p>
                  </div>

                  <span className="font-semibold text-[11px] capitalize text-neutral-700 shrink-0">
                    {inc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INCIDENTS TAB */}
      {activeTab === 'incidents' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 font-display">
                Incident Triage & Investigation Log
              </h3>
              <p className="text-xs text-neutral-500">
                All cases generated by students or organizers with assigned platform reviewers.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="pb-3">Reference ID</th>
                  <th className="pb-3">Category & Severity</th>
                  <th className="pb-3">Details & Location</th>
                  <th className="pb-3">Assigned Reviewer</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {incidents.map((inc) => (
                  <tr key={inc.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3.5 pr-3 font-mono font-bold text-neutral-900">
                      {inc.referenceNumber}
                    </td>

                    <td className="py-3.5 pr-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            inc.severity === 'critical' || inc.severity === 'high'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {inc.severity}
                        </span>
                        <span className="capitalize text-neutral-700">
                          {inc.category.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400 block mt-0.5">
                        {inc.dateTime}
                      </span>
                    </td>

                    <td className="py-3.5 pr-3 max-w-[260px]">
                      <p className="text-neutral-800 font-medium truncate">{inc.description}</p>
                      <span className="text-[11px] text-neutral-500 block truncate">
                        Loc: {inc.location}
                      </span>
                    </td>

                    <td className="py-3.5 pr-3 text-neutral-600 font-medium">
                      {inc.assignedReviewer}
                    </td>

                    <td className="py-3.5 pr-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          inc.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {inc.status}
                      </span>
                    </td>

                    <td className="py-3.5 text-right">
                      {inc.status !== 'resolved' ? (
                        <button
                          onClick={() => onUpdateIncidentStatus(inc.id, 'resolved')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors cursor-pointer"
                        >
                          Mark Resolved
                        </button>
                      ) : (
                        <span className="text-emerald-700 text-xs font-semibold">Closed ✓</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VERIFICATIONS TAB */}
      {activeTab === 'verifications' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 font-display">
              Student ID Verification Queue
            </h3>
            <p className="text-xs text-neutral-500">
              Manual review of college enrolment cards before granting Student Verified badges.
            </p>
          </div>

          <div className="space-y-3">
            {verificationQueue.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">
                    {item.studentName}
                  </h4>
                  <p className="text-neutral-600">
                    {item.college} · <span className="font-mono text-neutral-500">{item.document}</span>
                  </p>
                  <span className="text-[11px] text-teal-700 font-semibold mt-1 block">
                    Target: {item.requestedTier}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApproveVerification(item.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 cursor-pointer"
                  >
                    Approve Badge
                  </button>
                  <button
                    onClick={() => handleApproveVerification(item.id)}
                    className="px-3 py-1.5 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-100 text-xs font-semibold cursor-pointer"
                  >
                    Request Re-upload
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USER MANAGEMENT TAB */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 font-display">
              Platform User Directory & Moderation
            </h3>
            <p className="text-xs text-neutral-500">
              Manage accounts, investigate conduct flags, or temporarily restrict platform privileges.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="pb-3">User</th>
                  <th className="pb-3">College</th>
                  <th className="pb-3">Trips Taken</th>
                  <th className="pb-3">Trust Rating</th>
                  <th className="pb-3">Account State</th>
                  <th className="pb-3 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {userList.map((u) => (
                  <tr key={u.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3.5 pr-4 font-bold text-neutral-900">{u.name}</td>
                    <td className="py-3.5 pr-4 text-neutral-600">{u.college}</td>
                    <td className="py-3.5 pr-4 font-mono">{u.trips}</td>
                    <td className="py-3.5 pr-4 font-mono text-amber-700 font-bold">{u.trustRating} ★</td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          u.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : u.status === 'restricted'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right space-x-1">
                      {u.status === 'active' ? (
                        <>
                          <button
                            onClick={() =>
                              setConfirmModal({ isOpen: true, userId: u.id, action: 'restrict' })
                            }
                            className="px-2.5 py-1 rounded-md border border-amber-300 text-amber-800 hover:bg-amber-50 font-semibold cursor-pointer"
                          >
                            Restrict
                          </button>
                          <button
                            onClick={() =>
                              setConfirmModal({ isOpen: true, userId: u.id, action: 'suspend' })
                            }
                            className="px-2.5 py-1 rounded-md bg-rose-600 text-white hover:bg-rose-700 font-semibold cursor-pointer"
                          >
                            Suspend
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() =>
                            setConfirmModal({ isOpen: true, userId: u.id, action: 'restore' })
                          }
                          className="px-2.5 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 font-semibold cursor-pointer"
                        >
                          Restore Account
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Moderation */}
      <Modal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        title="Confirm Administrative Action"
        subtitle="This action modifies user platform permissions."
        maxWidth="sm"
      >
        <div className="space-y-4 text-xs">
          <p className="text-neutral-600">
            Are you sure you want to <strong>{confirmModal.action.toUpperCase()}</strong> this user account?
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
              className="px-3 py-2 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              onClick={handleExecuteUserAction}
              className={`px-4 py-2 rounded-xl text-white font-bold cursor-pointer ${
                confirmModal.action === 'restore' ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            >
              Confirm {confirmModal.action}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
