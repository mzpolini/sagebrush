import { ProbabilityData, ApplicantProfile, InvestorProfile } from '@/lib/types/dashboard';
import { VIRGINIA_COUNTIES, FLORIDA_COUNTIES } from './constants';

export function generateProbabilityData(state: string): ProbabilityData[] {
  const counties = state === 'Virginia' ? VIRGINIA_COUNTIES : FLORIDA_COUNTIES;

  return counties.map(county => {
    const expectedLicenses = Math.floor(Math.random() * 10) + 5;
    const expectedApplications = Math.floor(Math.random() * 800) + 200;
    const expectedSeaApplications = Math.floor(expectedApplications * (Math.random() * 0.3 + 0.2));
    const seaMultiplier = 2.0 + (Math.random() * 0.5);

    const baseWinProbability = (expectedLicenses / expectedApplications) * 100;
    const seaWinProbability = baseWinProbability * seaMultiplier;

    return {
      state,
      county,
      licenseType: 'dispensary',
      expectedLicenses,
      expectedApplications,
      expectedSeaApplications,
      baseWinProbability: parseFloat(baseWinProbability.toFixed(2)),
      seaWinProbability: parseFloat(seaWinProbability.toFixed(2)),
      seaMultiplier: parseFloat(seaMultiplier.toFixed(2)),
      population: Math.floor(Math.random() * 1000000) + 100000,
      marketValueEstimate: Math.floor(Math.random() * 2000000) + 1000000,
      competitionDensity: expectedApplications > 500 ? 'extreme' :
                         expectedApplications > 200 ? 'high' :
                         expectedApplications > 50 ? 'medium' : 'low',
    };
  });
}

export function generateMockApplicant(): ApplicantProfile {
  return {
    id: 'app-001',
    fullName: 'Jordan Martinez',
    email: 'jordan@example.com',
    primaryState: 'Virginia',
    targetCounties: ['Fairfax', 'Arlington', 'Loudoun'],
    licenseType: 'dispensary',
    isSeaEligible: true,
    fundingCapacitySelf: 250000,
    fundingNeeded: 750000,
    subscriptionTier: 'pro',
  };
}

export function generateMockInvestor(): InvestorProfile {
  return {
    id: 'inv-001',
    fullName: 'Alex Thompson',
    companyName: 'Green Capital Partners',
    email: 'alex@greencap.com',
    targetStates: ['Virginia', 'Florida', 'Georgia'],
    investmentRangeMin: 500000,
    investmentRangeMax: 2000000,
    licenseTypesInterested: ['dispensary', 'cultivation'],
    subscriptionTier: 'pro',
  };
}

export function calculateUserProbability(
  countyData: ProbabilityData,
  isSeaEligible: boolean
): number {
  return isSeaEligible
    ? countyData.seaWinProbability
    : countyData.baseWinProbability;
}
