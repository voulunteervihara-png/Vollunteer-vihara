import { UserProfile, UserRole } from '../../types';

export type AuthMode = 'login' | 'register';
export type AuthRole = 'student' | 'organization';

export interface StudentSignUpData {
  // Step 1: Basic Information
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;

  // Step 2: Student Verification
  collegeName: string;
  studentId: string;
  course: string;
  yearOfStudy: string;
  graduationYear: number;
  verificationMethod: 'id_card' | 'bonafide' | 'portal_sso';
  verificationStatus: 'pending' | 'verified';

  // Step 3: Travel Profile
  interests: string[];
  travelStyle: 'budget' | 'backpacker' | 'relaxed' | 'adventure' | 'cultural' | 'luxury' | 'flexible';
  preferredTransport: string[];
  accommodationPreference: 'hostel' | 'hotel' | 'homestay' | 'organizer-provided' | 'flexible';

  // Step 4: Safety Preferences
  travelPreference: 'solo' | 'compatible' | 'group';
  travellerPreference: 'anyone' | 'women-preferred' | 'women-only';

  // Step 5: Trusted Contact
  contactName: string;
  contactRelationship: string;
  contactPhone: string;
  contactEmail: string;
  notifyActiveJourneys: boolean;
  notifyMissedCheckin: boolean;
  allowTripDetailsShared: boolean;
}

export interface OrganizationSignUpData {
  // Step 1: Organization Information
  orgName: string;
  orgType: string;
  officialEmail: string;
  phone: string;
  website: string;
  description: string;
  city: string;
  state: string;
  country: string;

  // Step 2: Organization Verification
  registrationType: string;
  registrationNumber: string;
  officialAddress: string;
  representativeName: string;
  representativeRole: string;
  representativeContact: string;
  verificationStatus: 'under_review' | 'verified';

  // Step 3: Profile & Causes
  categories: string[];
  providesAccommodation: boolean;
  providesMeals: boolean;
  providesStipend: boolean;
  providesCertificate: boolean;

  // Step 4: Organizer Agreement
  agreeCommunityGuidelines: boolean;
  agreeSafetyGuidelines: boolean;
  agreeTermsOfService: boolean;
  agreePrivacyPolicy: boolean;
  agreeAccurateInfo: boolean;
}

export const STUDENT_INTERESTS_LIST = [
  'Adventure',
  'Culture',
  'Food',
  'Photography',
  'Nature',
  'History',
  'Festivals',
  'Sports',
  'Music',
  'Social Impact',
  'Community Service',
  'Technology',
];

export const TRAVEL_STYLES = [
  { id: 'budget', label: 'Budget', desc: 'Thrifty & smart travel' },
  { id: 'backpacker', label: 'Backpacker', desc: 'Light rucksack & trains' },
  { id: 'relaxed', label: 'Relaxed', desc: 'Slow pace & chill stays' },
  { id: 'adventure', label: 'Adventure', desc: 'High adrenaline & treks' },
  { id: 'cultural', label: 'Cultural', desc: 'Heritage & local living' },
  { id: 'luxury', label: 'Luxury', desc: 'Premium comfort' },
  { id: 'flexible', label: 'Flexible', desc: 'Go with the flow' },
];

export const TRANSPORTS = ['Bus', 'Train', 'Flight', 'Car', 'Bike', 'Flexible'];

export const ACCOMMODATIONS = [
  { id: 'hostel', label: 'Hostel' },
  { id: 'hotel', label: 'Hotel' },
  { id: 'homestay', label: 'Homestay' },
  { id: 'organizer-provided', label: 'Organizer-provided' },
  { id: 'flexible', label: 'Flexible' },
];

export const ORG_TYPES = [
  'NGO',
  'Festival',
  'Cultural Organization',
  'Tourism Organization',
  'Educational Institution',
  'Community Organization',
  'Event Organizer',
  'Other',
];

export const ORG_CATEGORIES = [
  'Community Service',
  'Environment',
  'Culture',
  'Tourism',
  'Education',
  'Social Impact',
  'Festivals',
  'Events',
  'Heritage',
];
