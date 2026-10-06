import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, RefreshCw, Edit2, ArrowRight, X } from 'lucide-react';

interface EmailVerificationModalProps {
  isOpen: boolean;
  email: string;
  onVerified: () => void;
  onChangeEmail: () => void;
  onClose?: () => void;
}

export const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  email,
  onVerified,
  onChangeEmail,
  onClose,
}) => {
  const [cooldown, setCooldown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setCooldown(60);
    setCanResend(false);

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleResend = () => {
    if (!canResend) return;
    setCanResend(false);
    setCooldown(60);
    setResendStatus('Verification link re-sent successfully!');
    setTimeout(() => setResendStatus(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 text-center relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4 shadow-xs">
          <Mail className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-black text-neutral-900 font-display">
          Verify your email
        </h3>
        <p className="text-xs text-neutral-600 mt-2 mb-4 leading-relaxed">
          We've sent a verification link to{' '}
          <strong className="text-neutral-900 font-semibold">{email || 'your email'}</strong>. Please click the link to confirm your campus identity.
        </p>

        {resendStatus && (
          <div className="mb-4 p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            {resendStatus}
          </div>
        )}

        <div className="space-y-2.5 pt-2">
          {/* Action 1: Open Email */}
          <button
            onClick={onVerified}
            className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <span>Open Email & Confirm Link</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>

          {/* Action 2: Resend Verification */}
          <button
            onClick={handleResend}
            disabled={!canResend}
            className="w-full py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>
              {canResend ? 'Resend Verification' : `Resend available in ${cooldown}s`}
            </span>
          </button>

          {/* Action 3: Change Email */}
          <button
            onClick={onChangeEmail}
            className="w-full py-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Edit2 className="w-3 h-3" />
            <span>Change Email</span>
          </button>
        </div>
      </div>
    </div>
  );
};
