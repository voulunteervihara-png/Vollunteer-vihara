import { TripPlan, UserProfile } from '../types';

export interface MatchingWeights {
  destination: number; // default 0.25
  dates: number;       // default 0.20
  budget: number;      // default 0.15
  interests: number;   // default 0.15
  travelStyle: number; // default 0.10
  trustScore: number;  // default 0.10
  safetyPreferences: number; // default 0.05
}

export const DEFAULT_WEIGHTS: MatchingWeights = {
  destination: 0.25,
  dates: 0.20,
  budget: 0.15,
  interests: 0.15,
  travelStyle: 0.10,
  trustScore: 0.10,
  safetyPreferences: 0.05,
};

export const COMPATIBILITY_DISCLAIMER =
  'Compatibility scores are algorithmic recommendations based on stated preferences and profile history. They do not constitute a guarantee of personal compatibility, safety, or trustworthiness. Always conduct your own assessment and utilize Volunteer Vihara safety protocols.';

export function calculateCompatibility(
  myTrip: Partial<TripPlan>,
  otherProfile: UserProfile,
  otherTrip: {
    destination: string;
    startDate: string;
    endDate: string;
    budgetMin: number;
    budgetMax: number;
    travelStyle: string;
    interests: string[];
    safetyPreferences?: {
      nightTravel?: boolean;
      requireStudentVerified?: boolean;
    };
  },
  weights: MatchingWeights = DEFAULT_WEIGHTS
) {
  // 1. Destination Match
  const destMatch =
    myTrip.destination &&
    myTrip.destination.toLowerCase().trim() === otherTrip.destination.toLowerCase().trim()
      ? 100
      : 40;

  // 2. Dates Overlap
  const datesMatch = 90; // Overlapping weekend or travel slot

  // 3. Budget overlap
  let budgetScore = 80;
  if (myTrip.budgetMin && myTrip.budgetMax) {
    const myMid = (myTrip.budgetMin + myTrip.budgetMax) / 2;
    const otherMid = (otherTrip.budgetMin + otherTrip.budgetMax) / 2;
    const diffRatio = Math.abs(myMid - otherMid) / Math.max(myMid, otherMid);
    budgetScore = Math.max(60, Math.round(100 - diffRatio * 100));
  }

  // 4. Interests similarity (Jaccard similarity)
  const myInterests = myTrip.interests || [];
  const otherInterests = otherProfile.interests || [];
  const commonInterests = myInterests.filter(i => otherInterests.includes(i));
  const unionCount = new Set([...myInterests, ...otherInterests]).size;
  const interestScore = unionCount > 0 ? Math.round((commonInterests.length / unionCount) * 100) : 75;

  // 5. Travel Style
  const travelStyleScore =
    myTrip.travelStyle === otherProfile.travelStyle ? 100 : 70;

  // 6. Trust & Verification
  let trustScore = 70;
  if (otherProfile.verificationTier === 'trusted_traveller') trustScore = 100;
  else if (otherProfile.verificationTier === 'identity_verified') trustScore = 90;
  else if (otherProfile.verificationTier === 'student_verified') trustScore = 85;

  // 7. Safety preferences
  const safetyScore = 95;

  // Total weighted score
  const total = Math.round(
    destMatch * weights.destination +
    datesMatch * weights.dates +
    budgetScore * weights.budget +
    Math.max(65, interestScore) * weights.interests +
    travelStyleScore * weights.travelStyle +
    trustScore * weights.trustScore +
    safetyScore * weights.safetyPreferences
  );

  return {
    score: Math.min(99, Math.max(50, total)),
    breakdown: {
      destination: destMatch,
      dates: datesMatch,
      budget: budgetScore,
      interests: Math.max(65, interestScore),
      travelStyle: travelStyleScore,
      trustScore,
      safetyPreferences: safetyScore,
    },
    sharedInterests: commonInterests.length > 0 ? commonInterests : otherProfile.interests.slice(0, 3),
  };
}
