import React, { useState } from 'react';
import {
  Compass,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building2,
  GraduationCap,
  AlertCircle,
} from 'lucide-react';
import { UserProfile, UserRole } from '../../types';
import { CURRENT_STUDENT_USER, INITIAL_TRAVELLERS } from '../../data/mockData';
import { AuthMode, AuthRole } from './types';
import { StudentSignUpFlow } from './StudentSignUpFlow';
import { OrgSignUpFlow } from './OrgSignUpFlow';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { EmailVerificationModal } from './EmailVerificationModal';

interface AuthPageProps {
  initialMode?: AuthMode;
  initialRole?: AuthRole;
  onLoginSuccess: (user: UserProfile, role: UserRole, targetTab?: string) => void;
  onRegisterSuccess: (user: UserProfile, role: UserRole, targetTab?: string) => void;
  onNavigateExplore?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  initialRole = 'student',
  onLoginSuccess,
  onRegisterSuccess,
  onNavigateExplore,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [role, setRole] = useState<AuthRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Modals
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [emailVerifyOpen, setEmailVerifyOpen] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  // Login Form States
  const [studentEmail, setStudentEmail] = useState('aarav.sharma@iith.ac.in');
  const [studentPassword, setStudentPassword] = useState('password123');
  const [studentRemember, setStudentRemember] = useState(true);

  const [orgEmail, setOrgEmail] = useState('coordinator@deccanheritage.org');
  const [orgPassword, setOrgPassword] = useState('orgSecret123');
  const [orgRemember, setOrgRemember] = useState(true);

  // Quick 1-Click Demo Login
  const handleQuickDemoLogin = (type: 'student' | 'companion' | 'org' | 'admin') => {
    setIsLoading(true);
    setAuthError('');
    setTimeout(() => {
      setIsLoading(false);
      if (type === 'student') {
        onLoginSuccess(CURRENT_STUDENT_USER, 'student', 'explore');
      } else if (type === 'companion') {
        const companion = INITIAL_TRAVELLERS[0]?.profile || CURRENT_STUDENT_USER;
        onLoginSuccess(companion, 'student', 'explore');
      } else if (type === 'org') {
        const orgProfile: UserProfile = {
          ...CURRENT_STUDENT_USER,
          id: 'org_deccan_arts',
          name: 'Deccan Arts & Heritage Trust',
          college: 'Coordinator: Digvijay Rathore',
          verificationTier: 'trusted_traveller',
        };
        onLoginSuccess(orgProfile, 'organizer', 'explore');
      } else {
        const adminProfile: UserProfile = {
          ...CURRENT_STUDENT_USER,
          id: 'admin_officer',
          name: 'Campus Safety Triage Desk',
          college: 'Trust & Safety Unit',
          verificationTier: 'trusted_traveller',
        };
        onLoginSuccess(adminProfile, 'admin', 'admin-dashboard');
      }
    }, 450);
  };

  // Student Login Submit
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentEmail || !studentEmail.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    if (studentPassword.length < 6) {
      setAuthError('Please enter a valid password.');
      return;
    }
    setAuthError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(CURRENT_STUDENT_USER, 'student', 'explore');
    }, 550);
  };

  // Organization Login Submit
  const handleOrgLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgEmail || !orgEmail.includes('@')) {
      setAuthError('Please enter a valid organization email address.');
      return;
    }
    if (orgPassword.length < 6) {
      setAuthError('Please enter a valid password.');
      return;
    }
    setAuthError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const orgProfile: UserProfile = {
        ...CURRENT_STUDENT_USER,
        id: 'org_deccan_arts',
        name: 'Deccan Arts & Heritage Trust',
        college: 'Coordinator: Digvijay Rathore',
        verificationTier: 'trusted_traveller',
      };
      onLoginSuccess(orgProfile, 'organizer', 'explore');
    }, 550);
  };

  // Google Sign-In Simulation
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'student') {
        onLoginSuccess(CURRENT_STUDENT_USER, 'student', 'explore');
      } else {
        const orgProfile: UserProfile = {
          ...CURRENT_STUDENT_USER,
          id: 'org_deccan_arts',
          name: 'Deccan Arts & Heritage Trust',
          college: 'Coordinator: Digvijay Rathore',
          verificationTier: 'trusted_traveller',
        };
        onLoginSuccess(orgProfile, 'organizer', 'explore');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-stone-900 flex flex-col justify-between relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-[600px] h-[360px] bg-gradient-to-b from-amber-200/25 via-orange-100/15 to-transparent rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[300px] bg-gradient-to-t from-teal-100/20 via-emerald-50/10 to-transparent rounded-full blur-3xl translate-y-1/3" />
      </div>

      {/* Top Header */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-2xs flex items-center justify-center bg-white border border-neutral-200/90 p-0.5 shrink-0">
            <img
              src="/logo.png"
              alt="Volunteer Vihara Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-neutral-900 font-display block leading-none">
              VOLUNTEER VIHARA
            </span>
            <span className="text-[10px] text-neutral-500 font-medium">
              Purpose · People · Safety
            </span>
          </div>
        </div>

        {/* Header Switcher */}
        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-2xl border border-neutral-200 shadow-xs">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setAuthError('');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setAuthError('');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Authentication Container */}
      <main className="relative z-10 w-full max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex-1 flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl shadow-2xl border border-neutral-200/90 p-6 sm:p-9 flex flex-col justify-between">
          <div>
              {/* Card Header & Welcome */}
              <div className="pb-4 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-neutral-900 font-display">
                      Welcome to Volunteer Vihara 👋
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Your journey starts here.
                    </p>
                  </div>

                  {/* Mode Pill Indicator */}
                  <span className="text-[11px] font-bold text-neutral-600 bg-stone-100 px-2.5 py-1 rounded-lg">
                    {mode === 'login' ? 'Sign In' : 'Register'}
                  </span>
                </div>

                {/* Role Selector: "I am a... [ Student ] [ Organization ]" */}
                <div className="mt-4 pt-3 border-t border-neutral-100/80">
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">
                    I am a...
                  </span>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => {
                        setRole('student');
                        setAuthError('');
                      }}
                      className={`py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        role === 'student'
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4 text-amber-600" />
                      <span>Student</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setRole('organization');
                        setAuthError('');
                      }}
                      className={`py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        role === 'organization'
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-teal-600" />
                      <span>Organization</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Error Alert */}
              {authError && (
                <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{authError}</span>
                </div>
              )}

              {/* ======================================================== */}
              {/* VIEW A: LOGIN (Student or Organization) */}
              {/* ======================================================== */}
              {mode === 'login' && (
                <div className="mt-5 space-y-4">
                  {/* Quick 1-Click Demo Login Bar */}
                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Instant Demo Login</span>
                      </span>
                      <span className="text-[10px] text-amber-700">1-click test</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {role === 'student' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleQuickDemoLogin('student')}
                            disabled={isLoading}
                            className="p-2 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-left text-xs transition-all cursor-pointer"
                          >
                            <span className="font-bold text-neutral-900 block truncate">Aarav Sharma</span>
                            <span className="text-[10px] text-neutral-500 block">IIT Hyderabad · Explorer</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickDemoLogin('companion')}
                            disabled={isLoading}
                            className="p-2 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-left text-xs transition-all cursor-pointer"
                          >
                            <span className="font-bold text-neutral-900 block truncate">Ananya Deshmukh</span>
                            <span className="text-[10px] text-neutral-500 block">St. Xavier's · Match</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleQuickDemoLogin('org')}
                            disabled={isLoading}
                            className="p-2 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-left text-xs transition-all cursor-pointer"
                          >
                            <span className="font-bold text-neutral-900 block truncate">Deccan Arts</span>
                            <span className="text-[10px] text-neutral-500 block">Heritage NGO Host</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickDemoLogin('admin')}
                            disabled={isLoading}
                            className="p-2 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-left text-xs transition-all cursor-pointer"
                          >
                            <span className="font-bold text-neutral-900 block truncate">Safety Desk</span>
                            <span className="text-[10px] text-neutral-500 block">Admin Console</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Student Login Form */}
                  {role === 'student' ? (
                    <form onSubmit={handleStudentLogin} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block font-bold text-neutral-800 mb-1">
                          Email / Student Email
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            placeholder="e.g. aarav.sharma@iith.ac.in"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="font-bold text-neutral-800">Password</label>
                          <button
                            type="button"
                            onClick={() => setForgotModalOpen(true)}
                            className="text-[11px] text-amber-700 hover:text-amber-900 font-semibold cursor-pointer"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={studentPassword}
                            onChange={(e) => setStudentPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-0.5">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={studentRemember}
                            onChange={(e) => setStudentRemember(e.target.checked)}
                            className="rounded text-neutral-900 cursor-pointer"
                          />
                          <span className="text-neutral-600 text-[11px]">Remember me</span>
                        </label>
                        <span className="text-[11px] text-teal-700 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Campus Verified</span>
                        </span>
                      </div>

                      {/* Primary CTA: Log In */}
                      <div className="pt-1">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-50"
                        >
                          <span>{isLoading ? 'Authenticating...' : 'Log In'}</span>
                          <ArrowRight className="w-4 h-4 text-amber-400" />
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Organization Login Form */
                    <form onSubmit={handleOrgLogin} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block font-bold text-neutral-800 mb-1">
                          Organization Email
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={orgEmail}
                            onChange={(e) => setOrgEmail(e.target.value)}
                            placeholder="coordinator@ngo.org"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="font-bold text-neutral-800">Password</label>
                          <button
                            type="button"
                            onClick={() => setForgotModalOpen(true)}
                            className="text-[11px] text-amber-700 hover:text-amber-900 font-semibold cursor-pointer"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={orgPassword}
                            onChange={(e) => setOrgPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-0.5">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={orgRemember}
                            onChange={(e) => setOrgRemember(e.target.checked)}
                            className="rounded text-neutral-900 cursor-pointer"
                          />
                          <span className="text-neutral-600 text-[11px]">Remember me</span>
                        </label>
                        <span className="text-[11px] text-teal-700 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Host Verified</span>
                        </span>
                      </div>

                      {/* Primary CTA: Log In as Organization */}
                      <div className="pt-1">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-50"
                        >
                          <span>{isLoading ? 'Authenticating Organization...' : 'Log In as Organization'}</span>
                          <ArrowRight className="w-4 h-4 text-amber-400" />
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Divider: OR */}
                  <div className="relative my-3 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-200" />
                    </div>
                    <span className="relative bg-white px-3 text-[11px] font-bold text-neutral-400">
                      OR
                    </span>
                  </div>

                  {/* Secondary Option: Continue with Google */}
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full py-2.5 rounded-xl border border-neutral-300 hover:bg-stone-50 font-bold text-xs flex items-center justify-center gap-2.5 cursor-pointer transition-all shadow-2xs"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  {/* Switch Links */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-1.5 border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => setRole(role === 'student' ? 'organization' : 'student')}
                      className="text-neutral-700 hover:text-neutral-900 font-semibold underline cursor-pointer"
                    >
                      {role === 'student' ? 'Login as Organization' : 'Login as Student'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="font-bold text-neutral-900 hover:underline cursor-pointer"
                    >
                      Don't have an account? Sign Up
                    </button>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* VIEW B: SIGN-UP (Student or Organization) */}
              {/* ======================================================== */}
              {mode === 'register' && (
                <div className="mt-4">
                  {role === 'student' ? (
                    <StudentSignUpFlow
                      onComplete={(user, targetTab) => onRegisterSuccess(user, 'student', targetTab)}
                      onSwitchToLogin={() => setMode('login')}
                    />
                  ) : (
                    <OrgSignUpFlow
                      onComplete={(user, targetTab) => onRegisterSuccess(user, 'organizer', targetTab)}
                      onSwitchToLogin={() => setMode('login')}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-4 border-t border-neutral-100 text-center text-xs text-neutral-500">
              {mode === 'login' ? (
                <p>
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="font-bold text-neutral-900 hover:text-amber-800 underline cursor-pointer"
                  >
                    Create {role === 'student' ? 'Student' : 'Organization'} Account
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="font-bold text-neutral-900 hover:text-amber-800 underline cursor-pointer"
                  >
                    Log In to Existing Account
                  </button>
                </p>
              )}
            </div>
          </div>
        </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        defaultEmail={role === 'student' ? studentEmail : orgEmail}
      />

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={emailVerifyOpen}
        email={pendingEmail}
        onVerified={() => {
          setEmailVerifyOpen(false);
          onLoginSuccess(CURRENT_STUDENT_USER, 'student', 'explore');
        }}
        onChangeEmail={() => {
          setEmailVerifyOpen(false);
          setMode('register');
        }}
        onClose={() => setEmailVerifyOpen(false)}
      />

      {/* Footer */}
      <footer className="relative z-10 py-3 text-center text-[11px] text-neutral-400">
        <span>Volunteer Vihara · Purpose-Driven Student Travel & Volunteering Platform</span>
      </footer>
    </div>
  );
};
