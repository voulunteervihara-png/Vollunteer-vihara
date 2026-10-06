import React, { useState } from 'react';
import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  Upload,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Info,
} from 'lucide-react';
import { OrganizationSignUpData, ORG_TYPES, ORG_CATEGORIES } from './types';
import { UserProfile } from '../../types';

interface OrgSignUpFlowProps {
  onComplete: (user: UserProfile, targetTab?: string) => void;
  onSwitchToLogin: () => void;
}

export const OrgSignUpFlow: React.FC<OrgSignUpFlowProps> = ({
  onComplete,
  onSwitchToLogin,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [simulatedDocName, setSimulatedDocName] = useState('ngo_darpan_registration_cert.pdf');

  // Form State
  const [formData, setFormData] = useState<OrganizationSignUpData>({
    orgName: '',
    orgType: 'NGO',
    officialEmail: '',
    phone: '+91 98200 11223',
    website: 'https://sahapedia.org',
    description: 'Heritage conservation society promoting student oral history documentation.',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',

    registrationType: 'Trust Registration / NGO Darpan',
    registrationNumber: 'RJ/2021/049182',
    officialAddress: 'Plot 42, Civil Lines, Jaipur 302006',
    representativeName: 'Digvijay Rathore',
    representativeRole: 'Director of Volunteer Operations',
    representativeContact: '+91 98200 11223',
    verificationStatus: 'under_review',

    categories: ['Heritage', 'Culture', 'Education'],
    providesAccommodation: true,
    providesMeals: true,
    providesStipend: false,
    providesCertificate: true,

    agreeCommunityGuidelines: true,
    agreeSafetyGuidelines: true,
    agreeTermsOfService: true,
    agreePrivacyPolicy: true,
    agreeAccurateInfo: true,
  });

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.orgName.trim()) {
      setErrorMsg('Please enter your Organization Name.');
      return;
    }
    if (!formData.officialEmail || !formData.officialEmail.includes('@')) {
      setErrorMsg('Please enter a valid official email address.');
      return;
    }
    setErrorMsg('');
    setCurrentStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.registrationNumber.trim()) {
      setErrorMsg('Please enter your registration / identification number.');
      return;
    }
    if (!formData.representativeName.trim()) {
      setErrorMsg('Please enter the authorized representative name.');
      return;
    }
    setErrorMsg('');
    setCurrentStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.categories.length === 0) {
      setErrorMsg('Please select at least 1 cause category.');
      return;
    }
    setErrorMsg('');
    setCurrentStep(4);
  };

  const handleStep4Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.agreeCommunityGuidelines ||
      !formData.agreeSafetyGuidelines ||
      !formData.agreeTermsOfService ||
      !formData.agreePrivacyPolicy ||
      !formData.agreeAccurateInfo
    ) {
      setErrorMsg('Please agree to all mandatory platform rules and policies.');
      return;
    }
    setErrorMsg('');
    setCurrentStep(5); // Success Screen
  };

  const toggleCategory = (cat: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const handleFinalRedirect = () => {
    const orgUser: UserProfile = {
      id: `org_${Date.now()}`,
      name: formData.orgName || 'Host Organization',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      college: `Coordinator: ${formData.representativeName}`,
      degree: formData.registrationNumber,
      graduationYear: 2026,
      bio: formData.description,
      verificationTier: 'trusted_traveller',
      sevaHours: 80,
      completedTrips: 6,
      rating: 5.0,
      reviewsCount: 14,
      interests: formData.categories,
      travelStyle: 'cultural',
      languages: ['Hindi', 'English'],
      city: formData.city,
      trustedContactsCount: 2,
      womenOnlyPreference: false,
    };
    onComplete(orgUser, 'organizer-dashboard');
  };

  // SUCCESS SCREEN (Step 5)
  if (currentStep === 5) {
    return (
      <div className="py-6 px-2 sm:px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-3xl bg-teal-100 text-teal-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold text-amber-800 bg-amber-100/90 border border-amber-300 px-3 py-1 rounded-full uppercase tracking-wider">
            Verification Status: Under Review
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 font-display">
            Application Submitted
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            Your organization profile has been submitted for verification. Once approved, you can start creating volunteer opportunities on Volunteer Vihara.
          </p>
        </div>

        <div className="p-4 bg-stone-50 rounded-2xl border border-neutral-200/90 max-w-md mx-auto text-left text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-neutral-900">{formData.orgName}</span>
            <span className="text-[10px] text-neutral-500 font-mono">{formData.registrationNumber}</span>
          </div>
          <p className="text-neutral-500 text-[11px]">Representative: {formData.representativeName}</p>
          <div className="pt-2 flex flex-wrap gap-1">
            {formData.categories.map((c) => (
              <span key={c} className="px-2 py-0.5 rounded-md bg-stone-200/70 text-neutral-800 text-[10px]">
                {c}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleFinalRedirect}
          className="w-full max-w-md py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-md transition-all"
        >
          <span>Go to Organization Dashboard</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Step Progress Header */}
      <div className="pb-3 border-b border-neutral-100">
        <div className="flex items-center justify-between text-[11px] font-bold text-neutral-400 mb-2">
          <span>Step {currentStep} of 4</span>
          <span className="text-teal-700">
            {currentStep === 1 && 'Organization Information'}
            {currentStep === 2 && 'Organization Verification'}
            {currentStep === 3 && 'Organization Profile'}
            {currentStep === 4 && 'Organizer Agreement'}
          </span>
        </div>
        <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden flex gap-1">
          {[1, 2, 3, 4].map((step) => (
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
      {/* STEP 1: Organization Information */}
      {/* ======================================================== */}
      {currentStep === 1 && (
        <form onSubmit={handleStep1Submit} className="space-y-3.5 text-xs">
          <div>
            <h4 className="text-base font-extrabold text-neutral-900 font-display">
              Create your organization profile
            </h4>
            <p className="text-neutral-500 text-[11px] mt-0.5">
              Enter your official organization details to begin hosting student volunteers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-800 mb-1">Organization Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sahapedia Heritage Trust"
                value={formData.orgName}
                onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Organization Type</label>
              <select
                value={formData.orgType}
                onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-stone-50/50"
              >
                {ORG_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Official Email</label>
              <input
                type="email"
                required
                placeholder="coordinator@ngo.org"
                value={formData.officialEmail}
                onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+91 98200 11223"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Website URL</label>
              <input
                type="url"
                placeholder="https://organization.org"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">City & State</label>
              <input
                type="text"
                required
                placeholder="e.g. Jaipur, Rajasthan"
                value={`${formData.city}, ${formData.state}`}
                onChange={(e) => {
                  const parts = e.target.value.split(',');
                  setFormData({
                    ...formData,
                    city: parts[0]?.trim() || formData.city,
                    state: parts[1]?.trim() || formData.state,
                  });
                }}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-800 mb-1">Organization Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief summary of your mission, community initiatives and volunteering projects..."
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50 resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
            >
              <span>Continue to Verification</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* STEP 2: Organization Verification */}
      {/* ======================================================== */}
      {currentStep === 2 && (
        <form onSubmit={handleStep2Submit} className="space-y-3.5 text-xs">
          <div>
            <h4 className="text-base font-extrabold text-neutral-900 font-display">
              Verify your organization
            </h4>
            <p className="text-neutral-500 text-[11px] mt-0.5">
              Verification helps students identify legitimate organizations and opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-800 mb-1">Registration Type</label>
              <input
                type="text"
                required
                placeholder="Trust / Society / Section 8"
                value={formData.registrationType}
                onChange={(e) => setFormData({ ...formData, registrationType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Registration / ID Number</label>
              <input
                type="text"
                required
                placeholder="e.g. RJ/2021/049182"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50 uppercase"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Authorized Representative Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Digvijay Rathore"
                value={formData.representativeName}
                onChange={(e) => setFormData({ ...formData, representativeName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">Representative Role</label>
              <input
                type="text"
                required
                placeholder="e.g. Volunteer Coordinator"
                value={formData.representativeRole}
                onChange={(e) => setFormData({ ...formData, representativeRole: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-800 mb-1">Official Address</label>
            <input
              type="text"
              required
              placeholder="Full registered address of the organization"
              value={formData.officialAddress}
              onChange={(e) => setFormData({ ...formData, officialAddress: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-neutral-900 bg-stone-50/50"
            />
          </div>

          {/* Secure Document Submission Preview */}
          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-950 text-xs flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-amber-700" />
                <span>Verification Document</span>
              </span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Status: Pending Review
              </span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-amber-200 flex items-center justify-between text-xs">
              <span className="text-neutral-700 truncate">{simulatedDocName}</span>
              <span className="text-teal-700 font-bold text-[11px]">Attached</span>
            </div>
            <p className="text-[11px] text-amber-900 leading-snug">
              <strong>Security Policy:</strong> Sensitive verification documents are securely processed and never publicly visible.
            </p>
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
              <span>Continue to Profile & Perks</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* STEP 3: Organization Profile & Perks */}
      {/* ======================================================== */}
      {currentStep === 3 && (
        <form onSubmit={handleStep3Submit} className="space-y-4 text-xs">
          <div>
            <h4 className="text-base font-extrabold text-neutral-900 font-display">
              Configure organization causes & volunteer benefits
            </h4>
            <p className="text-neutral-500 text-[11px] mt-0.5">
              Highlight the causes you support and the perks provided to student volunteers.
            </p>
          </div>

          {/* Causes / Categories */}
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5">
              Causes / Categories (Select applicable)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ORG_CATEGORIES.map((cat) => {
                const isSelected = formData.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold shadow-2xs'
                        : 'bg-stone-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    {cat} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guaranteed Volunteer Benefits */}
          <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-200/80 space-y-2">
            <span className="font-bold text-teal-950 text-xs block">
              Host Perks Guaranteed for Student Volunteers:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs text-teal-900">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.providesAccommodation}
                  onChange={(e) => setFormData({ ...formData, providesAccommodation: e.target.checked })}
                  className="rounded text-teal-700"
                />
                <span>Free Safe Lodging</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.providesMeals}
                  onChange={(e) => setFormData({ ...formData, providesMeals: e.target.checked })}
                  className="rounded text-teal-700"
                />
                <span>3 Daily Meals Provided</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.providesCertificate}
                  onChange={(e) => setFormData({ ...formData, providesCertificate: e.target.checked })}
                  className="rounded text-teal-700"
                />
                <span>Seva Certification</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.providesStipend}
                  onChange={(e) => setFormData({ ...formData, providesStipend: e.target.checked })}
                  className="rounded text-teal-700"
                />
                <span>Travel Stipend / Allowance</span>
              </label>
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
              <span>Continue to Platform Agreement</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* STEP 4: Organizer Agreement */}
      {/* ======================================================== */}
      {currentStep === 4 && (
        <form onSubmit={handleStep4Submit} className="space-y-4 text-xs">
          <div>
            <h4 className="text-base font-extrabold text-neutral-900 font-display">
              Review platform agreements & responsibilities
            </h4>
            <p className="text-neutral-500 text-[11px] mt-0.5">
              Confirm your commitment to student safety, verified accommodation and ethical hosting.
            </p>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-2xl border border-neutral-200/90 space-y-2.5">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeCommunityGuidelines}
                onChange={(e) => setFormData({ ...formData, agreeCommunityGuidelines: e.target.checked })}
                className="rounded text-neutral-900 mt-0.5"
              />
              <span className="text-neutral-700 leading-snug">
                I agree to the <strong className="text-neutral-900">Community Guidelines</strong>
              </span>
            </label>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeSafetyGuidelines}
                onChange={(e) => setFormData({ ...formData, agreeSafetyGuidelines: e.target.checked })}
                className="rounded text-neutral-900 mt-0.5"
              />
              <span className="text-neutral-700 leading-snug">
                I agree to the <strong className="text-neutral-900">Volunteer Safety Guidelines</strong>
              </span>
            </label>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeTermsOfService}
                onChange={(e) => setFormData({ ...formData, agreeTermsOfService: e.target.checked })}
                className="rounded text-neutral-900 mt-0.5"
              />
              <span className="text-neutral-700 leading-snug">
                I agree to the <strong className="text-neutral-900">Terms of Service</strong> and <strong className="text-neutral-900">Privacy Policy</strong>
              </span>
            </label>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeAccurateInfo}
                onChange={(e) => setFormData({ ...formData, agreeAccurateInfo: e.target.checked })}
                className="rounded text-neutral-900 mt-0.5"
              />
              <span className="text-neutral-700 leading-snug">
                I agree to the <strong className="text-neutral-900">Accurate Opportunity Information Policy</strong>
              </span>
            </label>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-[11px] flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              Organizations are responsible for accurately describing volunteer responsibilities, timings and benefits they provide.
            </span>
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
              className="py-3 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all"
            >
              <span>Submit Organization for Verification</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
