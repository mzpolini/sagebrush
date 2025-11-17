import { DashboardHeader } from '@/components/dashboard/shared/DashboardHeader';
import { StatCard } from '@/components/dashboard/shared/StatCard';
import { ProbabilityRadial } from '@/components/dashboard/shared/ProbabilityRadial';
import { CompetitionBar } from '@/components/dashboard/shared/CompetitionBar';
import { CountyTable } from '@/components/dashboard/shared/CountyTable';
import { MyOddsCard } from '@/components/dashboard/applicant/MyOddsCard';
import { TargetCounties } from '@/components/dashboard/applicant/TargetCounties';
import { generateProbabilityData, generateMockApplicant, calculateUserProbability } from '@/lib/mock-data/generators';
import { Target, DollarSign, Users, TrendingUp } from 'lucide-react';

export default function ApplicantDashboard() {
  // Mock data generation
  const applicant = generateMockApplicant();
  const probabilityData = generateProbabilityData(applicant.primaryState);

  // Calculate user-specific probabilities
  const enrichedData = probabilityData.map(p => ({
    ...p,
    userProbability: calculateUserProbability(p, applicant.isSeaEligible),
  })).sort((a, b) => b.userProbability - a.userProbability);

  const topCounty = enrichedData[0];
  const top5 = enrichedData.slice(0, 5);
  const avgProbability = top5.reduce((sum, p) => sum + p.userProbability, 0) / 5;

  // Prepare chart data
  const radialData = top5.map((p, idx) => ({
    name: p.county,
    probability: p.userProbability,
    fill: ['#22c55e', '#4ade80', '#22d3ee', '#fbbf24', '#c084fc'][idx],
  }));

  const barData = top5.map(p => ({
    county: p.county,
    applicants: p.expectedApplications,
    licenses: p.expectedLicenses,
  }));

  const countyMetrics = enrichedData.map(p => ({
    county: p.county,
    state: p.state,
    probability: p.userProbability,
    expectedValue: p.marketValueEstimate,
    competition: p.expectedApplications,
    seaBoost: p.seaMultiplier,
  }));

  const targetCounties = applicant.targetCounties.map(name => {
    const data = enrichedData.find(p => p.county === name)!;
    return {
      name,
      state: applicant.primaryState,
      probability: data.userProbability,
      status: 'tracking' as const,
    };
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardHeader
        userName={applicant.fullName}
        userEmail={applicant.email}
        role="applicant"
        subscriptionTier={applicant.subscriptionTier}
      />

      <main className="p-6 max-w-[1900px] mx-auto space-y-6">

        {/* Welcome Section */}
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">
            Welcome back, {applicant.fullName.split(' ')[0]}
          </h2>
          <p className="text-slate-400 text-lg">
            {applicant.primaryState} • {applicant.licenseType} • {applicant.isSeaEligible ? 'SEA Eligible ✓' : 'General Applicant'}
          </p>
        </div>

        {/* Hero Card */}
        <MyOddsCard
          topCounty={topCounty.county}
          topProbability={topCounty.userProbability}
          averageProbability={avgProbability}
          isSeaEligible={applicant.isSeaEligible}
          seaBoost={topCounty.seaMultiplier}
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6">
          <StatCard
            title="Top County"
            value={`${topCounty.userProbability.toFixed(1)}%`}
            subtitle={topCounty.county}
            icon={Target}
            colorScheme="emerald"
          />
          <StatCard
            title="Portfolio Avg"
            value={`${avgProbability.toFixed(1)}%`}
            subtitle="Top 5 counties"
            icon={TrendingUp}
            colorScheme="cyan"
            trend={{ value: 12, direction: 'up' }}
          />
          <StatCard
            title="Expected Value"
            value={`$${(topCounty.marketValueEstimate / 1000000).toFixed(1)}M`}
            subtitle="License value"
            icon={DollarSign}
            colorScheme="amber"
          />
          <StatCard
            title="Competition"
            value={topCounty.expectedApplications}
            subtitle="Expected applicants"
            icon={Users}
            colorScheme="purple"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-5">
            <ProbabilityRadial
              data={radialData}
              title="Your Win Probabilities"
              description={`Top 5 counties in ${applicant.primaryState}`}
            />
          </div>
          <div className="col-span-7">
            <CompetitionBar data={barData} />
          </div>
        </div>

        {/* Target Counties + Table */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <TargetCounties counties={targetCounties} />
          </div>
          <div className="col-span-8">
            <CountyTable data={countyMetrics} />
          </div>
        </div>

      </main>
    </div>
  );
}
