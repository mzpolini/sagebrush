export type UserRole = 'applicant' | 'investor';

export type LicenseType = 'dispensary' | 'cultivation' | 'processing' | 'microbusiness' | 'delivery';

export type SubscriptionTier = 'free' | 'basic' | 'pro';

export interface ApplicantProfile {
  id: string;
  fullName: string;
  email: string;
  primaryState: string;
  targetCounties: string[];
  licenseType: LicenseType;
  isSeaEligible: boolean;
  fundingCapacitySelf: number;
  fundingNeeded: number;
  subscriptionTier: SubscriptionTier;
}

export interface InvestorProfile {
  id: string;
  fullName: string;
  companyName?: string;
  email: string;
  targetStates: string[];
  investmentRangeMin: number;
  investmentRangeMax: number;
  licenseTypesInterested: LicenseType[];
  subscriptionTier: SubscriptionTier;
}

export interface ProbabilityData {
  state: string;
  county: string;
  licenseType: LicenseType;
  expectedLicenses: number;
  expectedApplications: number;
  expectedSeaApplications: number;
  baseWinProbability: number;
  seaWinProbability: number;
  seaMultiplier: number;
  population: number;
  marketValueEstimate: number;
  competitionDensity: 'low' | 'medium' | 'high' | 'extreme';
}

export interface CountyMetrics {
  county: string;
  state: string;
  probability: number;
  expectedValue: number;
  competition: number;
  seaBoost: number;
}

export interface PortfolioMetrics {
  totalInvested: number;
  activeDeals: number;
  avgROI: number;
  winRate: number;
}
