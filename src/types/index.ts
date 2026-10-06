export type UserRole = 'student' | 'organizer' | 'admin';

export type VerificationTier = 'profile_created' | 'student_verified' | 'identity_verified' | 'trusted_traveller';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  college: string;
  degree: string;
  graduationYear: number;
  bio: string;
  verificationTier: VerificationTier;
  sevaHours: number;
  completedTrips: number;
  rating: number;
  reviewsCount: number;
  interests: string[];
  travelStyle: 'budget' | 'backpacker' | 'moderate' | 'cultural' | 'adventure' | 'relaxed' | 'luxury' | 'flexible';
  languages: string[];
  city: string;
  state?: string;
  email?: string;
  phone?: string;
  studentId?: string;
  trustedContactsCount: number;
  womenOnlyPreference?: boolean;
}

export interface OrganizerBenefits {
  accommodation: string; // e.g. "Free shared dorm at volunteer basecamp"
  food: string; // e.g. "3 meals daily provided"
  travelReimbursement: string; // e.g. "Up to ₹1,500 train reimbursement"
  stipend: string; // e.g. "₹2,500 / week honorarium"
  certificate: string; // e.g. "Government-recognized Seva Certificate"
  eventAccess?: string; // e.g. "Full festival backstage all-access pass"
}

export interface VolunteerOpportunity {
  id: string;
  title: string;
  organizer: string;
  organizerVerified: boolean;
  category: 'festival' | 'conservation' | 'heritage' | 'community' | 'tech';
  destination: string;
  state: string;
  startDate: string;
  endDate: string;
  duration: string;
  deadline: string;
  openingsTotal: number;
  openingsFilled: number;
  description: string;
  responsibilities: string[];
  eligibility: string[];
  requiredSkills: string[];
  benefits: OrganizerBenefits;
  imageUrl: string;
  safetyNotes: string;
  locationDetails: string;
}

export interface VolunteerApplication {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  organizer: string;
  applicantId: string;
  applicantName: string;
  applicantCollege: string;
  applicantAvatar: string;
  appliedDate: string;
  status: 'submitted' | 'under_review' | 'shortlisted' | 'accepted' | 'completed' | 'rejected';
  statement: string;
  skills: string[];
  departureCity: string;
  travelDates: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  verifiedParticipation?: boolean;
}

export interface TripPlan {
  id: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  budgetMin: number;
  budgetMax: number;
  travelStyle: 'budget' | 'backpacker' | 'moderate' | 'cultural' | 'adventure';
  accommodationPreference: 'hostel' | 'homestay' | 'campsite' | 'budget_hotel';
  groupSize: number;
  interests: string[];
  womenOnly: boolean;
  safetyPreferences: {
    nightTravel: boolean;
    requireStudentVerified: boolean;
    shareLocationWithBuddy: boolean;
  };
  status: 'planning' | 'active' | 'completed';
}

export interface TravellerMatch {
  id: string;
  profile: UserProfile;
  destination: string;
  dates: string;
  budgetRange: string;
  compatibilityScore: number;
  breakdown: {
    destination: number;
    dates: number;
    budget: number;
    interests: number;
    travelStyle: number;
    safetyPreferences: number;
    trustScore: number;
  };
  sharedInterests: string[];
  connectionStatus: 'none' | 'requested' | 'connected';
}

export interface TrustedContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  notificationPreference: 'always' | 'active_journey' | 'missed_checkin_only';
  isPrimary: boolean;
}

export interface ActiveJourney {
  id: string;
  tripName: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'departure_completed' | 'arrival_due' | 'in_destination' | 'return_due' | 'completed';
  currentStage: string;
  departureCheckIn: {
    completed: boolean;
    time?: string;
    location?: string;
  };
  arrivalCheckIn: {
    completed: boolean;
    dueTime: string;
    time?: string;
    location?: string;
  };
  returnCheckIn: {
    completed: boolean;
    dueTime: string;
    time?: string;
  };
  companionName?: string;
  companionAvatar?: string;
  opportunityTitle?: string;
}

export interface IncidentReport {
  id: string;
  referenceNumber: string;
  category: 'harassment' | 'unsafe_behaviour' | 'fraud_scam' | 'accommodation_issue' | 'organizer_issue' | 'traveller_issue' | 'lost_item' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  dateTime: string;
  involvedPersons?: string;
  reportedBy: string;
  status: 'received' | 'investigating' | 'escalated' | 'resolved';
  assignedReviewer: string;
  evidenceName?: string;
  actionTakenNotes?: string;
}

export interface NotificationItem {
  id: string;
  type: 'application' | 'match' | 'safety' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  targetTab?: string;
}
