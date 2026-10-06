import React, { useState } from 'react';
import { Lock, Mail, Send, CheckCircle2, X, ArrowLeft } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  defaultEmail = '',
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-xl transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 shadow-xs">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-extrabold text-neutral-900 font-display">
              Reset your password
            </h3>
            <p className="text-xs text-neutral-500 mt-1 mb-5">
              Enter your registered student or organization email. We will send you instructions to securely reset your credentials.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="e.g. yourname@university.ac.in"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>{isLoading ? 'Transmitting...' : 'Send Reset Link'}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-2 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-neutral-900 font-display">
                Check your email
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">
                We've sent instructions to reset your password to{' '}
                <strong className="text-neutral-900 font-semibold">{email}</strong>.
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-neutral-500 border border-neutral-200/80">
              Did not receive the email? Check your spam folder or try again in a few minutes.
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
