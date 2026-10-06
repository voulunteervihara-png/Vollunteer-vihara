import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Building,
  Upload,
  Shield,
  ShieldCheck,
  Compass,
  ArrowRight,
  ArrowLeft,
  Users,
  HeartHandshake,
  Check,
  Info,
} from 'lucide-react';
import {
  StudentSignUpData,
  STUDENT_INTERESTS_LIST,
  TRAVEL_STYLES,
  TRANSPORTS,
  ACCOMMODATIONS,
} from './types';
import { UserProfile } from '../../types';

interface StudentSignUpFlowProps {
  onComplete: (user: UserProfile, targetTab?: string) => void;
  onSwitchToLogin: () => void;
}

export const StudentSignUpFlow: React.FC<StudentSignUpFlowProps> = ({
  onComplete,
  onSwitchToLogin,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [simulatedDocName, setSimulatedDocName] = useState('student_id_card_front.jpg');

  // Form State
  const [formData, setFormData] = useState<StudentSignUpData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,

    collegeName: 'IIT Hyderabad',
    studentId: 'CS23BTECH11042',
    course: 'B.Tech Computer Science',
    yearOfStudy: '2nd Year',
    graduationYear: 2027,
    verificationMethod: 'id_card',
    verificationStatus: 'verified',

    interests: ['Adventure', 'Culture', 'Photography', 'Social Impact'],
    travelStyle: 'backpacker',
    preferredTransport: ['Train', 'Bus'],
    accommodationPreference: 'hostel',

    travelPreference: 'compatible',
    travellerPreference: 'anyone',

    contactName: 'Sunita Sharma',
    contactRelationship: 'Mother',
    contactPhone: '+91 98201 44521',
    contactEmail: 'sunita.sharma@gmail.com',
    notifyActiveJourneys: true,
    notifyMissedCheckin: true,
    allowTripDetailsShared: true,
  });

  // Password Validation Checkers
  const hasMinLen = formData.password.length >= 8;
  const hasUpper = /[A-Z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSpecial = /[^A-Za-z0-9]/.test(formData.password);
  const isPasswordValid = hasMinLen && hasUpper && hasNumber && hasSpecial;
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  // STEP 1 VALIDATION & PROCEED
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!isPasswordValid) {
      setErrorMsg('Your password needs at least 8 characters, one uppercase letter, one number and one special character.');
      return;
    }
    if (!passwordsMatch) {
      setErrorMsg("Passwords don't match.");
      return;
    }
    if (!formData.agreeTerms) {
      setErrorMsg('Please accept the Terms of Service to proceed.');
      return;
    }
    setErrorMsg('');
    setCurrentStep(2);
  };

  // STEP 2 VALIDATION & PROCEED
  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.collegeName.trim()) {
      setErrorMsg('Please enter your College / University name.');
      return;
    }
    if (!formData.studentId.trim()) {
      setErrorMsg('Please enter your Student ID or Enrollment number.');
      return;
    }
    setErrorMsg('');
    setCurrentStep(3);
  };

  // STEP 3 VALIDATION & PROCEED
  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.interests.length === 0) {
      setErrorMsg('Please select at least 1 interest.');
      return;
    }
    setErrorMsg('');
    setCurrentStep(4);
  };

  // STEP 4 VALIDATION & PROCEED
  const handleStep4Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setCurrentStep(5);
  };

  // STEP 5: FINISH REGISTRATION
  const handleStep5Finish = (skipContact = false) => {
    const newUserProfile: UserProfile = {
      id: `usr_${Date.now()}`,
      name: formData.fullName || 'Student Explorer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      college: formData.collegeName || 'IIT Hyderabad',
      degree: formData.course || 'B.Tech',
      graduationYear: formData.graduationYear,
      bio: `Student traveler into ${formData.interests.slice(0, 2).join(', ')}. Looking to volunteer and explore safely.`,
      verificationTier: 'student_verified',
      sevaHours: 0,
      completedTrips: 0,
      rating: 5.0,
      reviewsCount: 0,
      interests: formData.interests,
      travelStyle: formData.travelStyle,
      languages: ['Hindi', 'English'],
      city: 'Hyderabad',
      trustedContactsCount: skipContact ? 0 : 1,
      womenOnlyPreference: formData.travellerPreference === 'women-only',
    };

    // Show Step 6: Success Screen
    setCurrentStep(6);
  };

  // COMPLETE & REDIRECT ACTION
  const handleFinalRedirect = (targetTab: string) => {
    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      name: formData.fullName || 'Student Explorer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      college: formData.collegeName || 'IIT Hyderabad',
      degree: formData.course || 'B.Tech',
      graduationYear: formData.graduationYear,
      bio: `Student traveler into ${formData.interests.slice(0, 2).join(', ')}.`,
      verificationTier: 'student_verified',
      sevaHours: 0,
      completedTrips: 0,
      rating: 5.0,
      reviewsCount: 0,
      interests: formData.interests,
      travelStyle: formData.travelStyle,
      languages: ['Hindi', 'English'],
      city: 'Hyderabad',
      trustedContactsCount: 1,
      womenOnlyPreference: formData.travellerPreference === 'women-only',
    };
    onComplete(user, targetTab);
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const toggleTransport = (t: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredTransport: prev.preferredTransport.includes(t)
        ? prev.preferredTransport.filter((item) => item !== t)
        : [...prev.preferredTransport, t],
    }));
  };

  // SUCCESS SCREEN (Step 6)
  if (currentStep === 6) {
    return (
      <div className="py-6 px-2 sm:px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-3xl bg-teal-100 text-teal-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Registration Completed ✓
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 font-display">
            Welcome to Volunteer Vihara!
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            Your journey starts here. Discover opportunities, meet compatible travellers and explore with purpose.
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-lg mx-auto">
          <button
            onClick={() => handleFinalRedirect('seva')}
            className="p-3.5 rounded-2xl bg-amber-50/80 hover:bg-amber-100/90 border border-amber-200/90 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-amber-950 text-xs">Explore SEVA</span>
              <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-amber-800">
              Discover verified volunteer opportunities with free food & stay.
            </p>
          </button>

          <button
            onClick={() => handleFinalRedirect('safar')}
            className="p-3.5 rounded-2xl bg-teal-50/80 hover:bg-teal-100/90 border border-teal-200/90 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-teal-950 text-xs">Find Travel Buddies</span>
              <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-teal-800">
              Match with verified students heading to your destination.
            </p>
          </button>

          <button
            onClick={() => handleFinalRedirect('safety')}
            className="p-3.5 rounded-2xl bg-rose-50/80 hover:bg-rose-100/90 border border-rose-200/90 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-rose-950 text-xs">Set Up Safety</span>
              <ArrowRight className="w-4 h-4 text-rose-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-rose-800">
              Manage journey check-ins, emergency contacts & SOS preferences.
            </p>
          </button>

          <button
            onClick={() => handleFinalRedirect('student-dashboard')}
            className="p-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white transition-all cursor-pointer group shadow-xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-white text-xs">Go to Dashboard</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-neutral-300">
              View your personalized trips, applications and verification badge.
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Step Progress Header */}
      <div className="pb-3 border-b border-neutral-100">
        <div className="flex items-center justify-between text-[11px] font-bold text-neutral-400 mb-2">
          <span>Step {currentStep} of 5</span>
          <span className="text-amber-700">
            {currentStep === 1 && 'Basic Information'}
            {currentStep === 2 && 'Student Verification'}
            {currentStep === 3 && 'Travel Profile'}
            {currentStep === 4 && 'Safety Preferences'}
            {currentStep === 5 && 'Trusted Contact'}
          </span>
        </div>
        <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden flex gap-1">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`flex-1 h-full rounded-full transition-all duration-300 ${
                step <= currentStep ? 'bg-neutral-900' : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Validation Error Banner */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 1: Basic Information */}
      {/* ======================================================== */}
      {currentStep === 1 && (
        <form onSubmit={handleStep1Submit} className="space-y-3.5 text-xs">
          <div>
            <h4 className="text-base font-extrabold text-neutral-900 font-display">
              Create your student profile
            </h4>
            <p className="text-neutral-500 text-[11px] mt-0.5">
              Enter your basic identity and login details to begin.
            </p>
          </div>

          <div>
            <label className="block font-bold text-neutral-800 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Aarav Sharma"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-800 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="student@university.ac.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98201 44521"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
                />
              </div>
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-800 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Explicit Password Requirements Checklist */}
          <div className="p-3 bg-stone-50 rounded-xl border border-neutral-200/80 space-y-1.5">
            <span className="text-[11px] font-bold text-neutral-700 block">Password requirements:</span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <span className={`flex items-center gap-1.5 ${hasMinLen ? 'text-teal-700 font-bold' : 'text-neutral-500'}`}>
                <Check className={`w-3 h-3 ${hasMinLen ? 'text-teal-600' : 'text-neutral-300'}`} />
                <span>Minimum 8 characters</span>
              </span>
              <span className={`flex items-center gap-1.5 ${hasUpper ? 'text-teal-700 font-bold' : 'text-neutral-500'}`}>
                <Check className={`w-3 h-3 ${hasUpper ? 'text-teal-600' : 'text-neutral-300'}`} />
                <span>One uppercase letter</span>
              </span>
              <span className={`flex items-center gap-1.5 ${hasNumber ? 'text-teal-700 font-bold' : 'text-neutral-500'}`}>
                <Check className={`w-3 h-3 ${hasNumber ? 'text-teal-600' : 'text-neutral-300'}`} />
                <span>One number</span>
              </span>
              <span className={`flex items-center gap-1.5 ${hasSpecial ? 'text-teal-700 font-bold' : 'text-neutral-500'}`}>
                <Check className={`w-3 h-3 ${hasSpecial ? 'text-teal-600' : 'text-neutral-300'}`} />
                <span>One special character</span>
              </span>
            </div>
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
              className="rounded text-neutral-900 focus:ring-0 mt-0.5"
            />
            <span className="text-[11px] text-neutral-600 leading-normal">
              I agree to the <strong className="text-neutral-900">Terms of Service</strong> and <strong className="text-neutral-900">Privacy Policy</strong>
            </span>
          </label>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* STEP 2: Student Verification */}
      {/* ======================================================== */}
      {currentStep === 2 && (
        <form onSubmit={handleStep2Submit} className="space-y-3.5 text-xs">
          <div>
            <h4 className="text-base font-extrabold text-neutral-900 font-display">
              Verify your student identity
            </h4>
            <p className="text-neutral-500 text-[11px] mt-0.5">
              Verification helps us build a more trustworthy student travel community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-800 mb-1">College / University Name</label>
              <input
                type="text"
                required
                placeholder="e.g. IIT Hyderabad / BITS Pilani"
                value={formData.collegeName}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Student ID / Enrollment Number</label>
              <input
                type="text"
                required
                placeholder="e.g. CS23BTECH11042"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50 uppercase"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Course / Program</label>
              <input
                type="text"
                required
                placeholder="e.g. B.Tech Computer Science"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Year of Study</label>
              <select
                value={formData.yearOfStudy}
                onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-stone-50/50"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year / Dual Degree">5th Year / Dual Degree</option>
                <option value="Postgraduate / Masters">Postgraduate / Masters</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-800 mb-1">Graduation Year</label>
            <select
              value={formData.graduationYear}
              onChange={(e) => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-stone-50/50"
            >
              <option value={2025}>Batch of 2025</option>
              <option value={2026}>Batch of 2026</option>
              <option value={2027}>Batch of 2027</option>
              <option value={2028}>Batch of 2028</option>
              <option value={2029}>Batch of 2029</option>
            </select>
          </div>

          {/* Verification Method Box */}
          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-950 text-xs flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-amber-700" />
                <span>Verification Document (Simulated)</span>
              </span>
              <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                Student Verified ✓
              </span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-amber-200 flex items-center justify-between text-xs">
              <span className="text-neutral-700 font-medium truncate">{simulatedDocName}</span>
              <span className="text-amber-700 font-bold text-[11px]">Ready</span>
            </div>
            <p className="text-[11px] text-amber-900 leading-snug">
              <strong>Privacy Guarantee:</strong> Sensitive verification documents are encrypted and never exposed publicly.
            </p>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-neutral-500 border border-neutral-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <span>Verification improves trust across campus travellers but does not guarantee personal safety.</span>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-bold text-xs"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Submit for Verification</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* STEP 3: Travel Profile */}
      {/* ======================================================== */}
      {currentStep === 3 && (
        <form onSubmit={handleStep3Submit} className="space-y-4 text-xs">
          <div>
            <h4 className="text-base font-extrabold text-neutral-900 font-display">
              Tell us how you like to travel
            </h4>
            <p className="text-neutral-500 text-[11px] mt-0.5">
              These preferences power our 92% compatibility engine on SAFAR trips.
            </p>
          </div>

          {/* Interests Multi-Select */}
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5">
              Interests (Select multiple)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {STUDENT_INTERESTS_LIST.map((interest) => {
                const isSelected = formData.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-2xs'
                        : 'bg-stone-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    {interest} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Travel Style Cards */}
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5">Travel Style</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TRAVEL_STYLES.map((style) => {
                const isSelected = formData.travelStyle === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, travelStyle: style.id as any })}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                    }`}
                  >
                    <span className="font-bold text-xs block">{style.label}</span>
                    <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {style.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferred Transport */}
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5">Preferred Transport</label>
            <div className="flex flex-wrap gap-2">
              {TRANSPORTS.map((transport) => {
                const isSelected = formData.preferredTransport.includes(transport);
                return (
                  <button
                    key={transport}
                    type="button"
                    onClick={() => toggleTransport(transport)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold'
                        : 'bg-white border-neutral-200 text-neutral-700'
                    }`}
                  >
                    {transport}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accommodation Preference */}
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5">Accommodation Preference</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {ACCOMMODATIONS.map((acc) => {
                const isSelected = formData.accommodationPreference === acc.id;
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, accommodationPreference: acc.id as any })}
                    className={`p-2 rounded-xl border text-center text-xs font-medium cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    {acc.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-bold text-xs"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Continue to Safety Preferences</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* STEP 4: Safety Preferences */}
      {/* ======================================================== */}
      {currentStep === 4 && (
        <form onSubmit={handleStep4Submit} className="space-y-4 text-xs">
          <div>
            <h4 className="text-base font-extrabold text-neutral-900 font-display">
              Set your travel safety preferences
            </h4>
            <p className="text-neutral-500 text-[11px] mt-0.5">
              Customize how you connect with co-travellers on campus trips.
            </p>
          </div>

          {/* Travel Preference */}
          <div>
            <label className="block font-bold text-neutral-800 mb-2">Travel Preference</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'solo', title: 'Solo', desc: 'Travel on your own path' },
                { id: 'compatible', title: 'With compatible travellers', desc: '1-2 matched student buddies' },
                { id: 'group', title: 'Group travel', desc: 'Join larger student cohorts' },
              ].map((opt) => {
                const isSelected = formData.travelPreference === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, travelPreference: opt.id as any })}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                    }`}
                  >
                    <span className="font-bold text-xs block">{opt.title}</span>
                    <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Traveller Preference */}
          <div>
            <label className="block font-bold text-neutral-800 mb-2">Traveller Preference</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'anyone', title: 'Anyone', desc: 'Open to all verified students' },
                { id: 'women-preferred', title: 'Women-preferred', desc: 'Prefer female co-travellers' },
                { id: 'women-only', title: 'Women-only trips', desc: 'Strictly female-only travel cohorts' },
              ].map((opt) => {
                const isSelected = formData.travellerPreference === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, travellerPreference: opt.id as any })}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-900 bg-amber-900 text-white shadow-xs'
                        : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                    }`}
                  >
                    <span className="font-bold text-xs block">{opt.title}</span>
                    <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-amber-200' : 'text-neutral-500'}`}>
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Safety Disclaimer */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/90 rounded-2xl text-[11px] text-amber-950 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Important Notice:</strong> These preferences help personalize recommendations. They do not guarantee the behaviour or safety of another traveller.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-bold text-xs"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Continue to Trusted Contact</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* STEP 5: Trusted Contact */}
      {/* ======================================================== */}
      {currentStep === 5 && (
        <div className="space-y-4 text-xs">
          <div>
            <h4 className="text-base font-extrabold text-neutral-900 font-display">
              Add a trusted contact
            </h4>
            <p className="text-neutral-500 text-[11px] mt-0.5">
              Your trusted contact receives updates and safety notifications when you travel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-800 mb-1">Contact Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sunita Sharma"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Relationship</label>
              <select
                value={formData.contactRelationship}
                onChange={(e) => setFormData({ ...formData, contactRelationship: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-stone-50/50"
              >
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Sibling">Sibling</option>
                <option value="Guardian">Guardian</option>
                <option value="Friend">Friend</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+91 98201 44521"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Email</label>
              <input
                type="email"
                placeholder="contact@email.com"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>
          </div>

          {/* Safety Notification Checkboxes */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-neutral-200/80 space-y-2">
            <span className="font-bold text-neutral-900 text-xs block">Notification Triggers:</span>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notifyActiveJourneys}
                onChange={(e) => setFormData({ ...formData, notifyActiveJourneys: e.target.checked })}
                className="rounded text-neutral-900"
              />
              <span className="text-neutral-700 text-[11px]">Notify during active journeys</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notifyMissedCheckin}
                onChange={(e) => setFormData({ ...formData, notifyMissedCheckin: e.target.checked })}
                className="rounded text-neutral-900"
              />
              <span className="text-neutral-700 text-[11px]">Notify if a safety check-in is missed</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowTripDetailsShared}
                onChange={(e) => setFormData({ ...formData, allowTripDetailsShared: e.target.checked })}
                className="rounded text-neutral-900"
              />
              <span className="text-neutral-700 text-[11px]">Allow trip details to be shared</span>
            </label>
          </div>

          <p className="text-[11px] text-neutral-500">
            You can change these settings anytime from Safety Center.
          </p>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleStep5Finish(true)}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 hover:text-neutral-900 font-bold text-xs cursor-pointer"
            >
              Skip for now
            </button>
            <button
              type="button"
              onClick={() => handleStep5Finish(false)}
              className="py-3 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all"
            >
              <span>Complete Registration</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
