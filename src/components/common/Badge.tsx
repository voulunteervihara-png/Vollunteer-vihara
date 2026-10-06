import React from 'react';
import { VerificationTier } from '../../types';
import { ShieldCheck, CheckCircle2, UserCheck, Award } from 'lucide-react';

interface VerificationBadgeProps {
  tier: VerificationTier;
  showLabel?: boolean;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  tier,
  showLabel = true,
  className = '',
}) => {
  switch (tier) {
    case 'trusted_traveller':
      return (
        <span className={`inline-flex items-center gap-1 text-xs font-medium text-emerald-800 ${className}`}>
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          {showLabel && <span>Trusted Traveller</span>}
        </span>
      );
    case 'identity_verified':
      return (
        <span className={`inline-flex items-center gap-1 text-xs font-medium text-teal-800 ${className}`}>
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          {showLabel && <span>Identity Verified</span>}
        </span>
      );
    case 'student_verified':
      return (
        <span className={`inline-flex items-center gap-1 text-xs font-medium text-sky-800 ${className}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
          {showLabel && <span>Student Verified</span>}
        </span>
      );
    case 'profile_created':
    default:
      return (
        <span className={`inline-flex items-center gap-1 text-xs font-medium text-neutral-600 ${className}`}>
          <UserCheck className="w-3.5 h-3.5 text-neutral-400" />
          {showLabel && <span>Profile Created</span>}
        </span>
      );
  }
};
