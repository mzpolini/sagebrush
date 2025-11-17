import { DashboardHeader } from '@/components/dashboard/shared/DashboardHeader';
import { ProbabilityRadial } from '@/components/dashboard/shared/ProbabilityRadial';
import { CompetitionBar } from '@/components/dashboard/shared/CompetitionBar';
import { CountyTable } from '@/components/dashboard/shared/CountyTable';
import { ScenarioSliders } from '@/components/dashboard/investor/ScenarioSliders';
import { PortfolioMetrics } from '@/components/dashboard/investor/PortfolioMetrics';
import { generateProbabilityData, generateMockInvestor } from '@/lib/mock-data/generators';

export default function InvestorDashboard() {
  const investor = generateMockInvestor();
  const virginiaData = generateProbabilityData('Virginia');
  const floridaData = generateProbabilityData('Florida');

  const allData = [...virginiaData, ...floridaData]
    .filter(p => investor.licenseTypesInterested.includes(p.licenseType))
    .sort((a, b) => b.baseWinProbability - a.baseWinProbability);

  const top5 = allData.slice(0, 5);

  const radialData = top5.map((p, idx) => ({
    name: `${p.county}, ${p.state}`,
    probability: p.baseWinProbability,
    fill: ['#22c55e', '#4ade80', '#22d3ee', '#fbbf24', '#c084fc'][idx],
  }));

  const barData = top5.map(p => ({
    county: `${p.county}, ${p.state}`,
    applicants: p.expectedApplications,
    licenses: p.expectedLicenses,
  }));

  const countyMetrics = allData.map(p => ({
    county: p.county,
    state: p.state,
    probability: p.baseWinProbability,
    expectedValue: p.marketValueEstimate,
    competition: p.expectedApplications,
    seaBoost: p.seaMultiplier,
  }));

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardHeader
        userName={investor.fullName}
        userEmail={investor.email}
        role="investor"
        subscriptionTier={investor.subscriptionTier}
      />

      <main className="p-6 max-w-[1900px] mx-auto space-y-6">

        {/* Welcome */}
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">
            Investor Portal
          </h2>
          <p className="text-slate-400 text-lg">
            {investor.companyName || investor.fullName} • {investor.targetStates.join(', ')}
          </p>
        </div>

        {/* Portfolio Metrics */}
        <PortfolioMetrics
          totalInvested={3500000}
          activeDeals={8}
          avgROI={145}
          winRate={62}
        />

        {/* Scenario Modeling */}
        {investor.subscriptionTier === 'pro' && (
          <ScenarioSliders
            initialLicenses={top5[0].expectedLicenses}
            initialApplications={top5[0].expectedApplications}
            state={top5[0].state}
            county={top5[0].county}
          />
        )}

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <ProbabilityRadial
            data={radialData}
            title="Market Opportunities"
            description="Top 5 counties across all target states"
          />
          <CompetitionBar data={barData} />
        </div>

        {/* Full Table */}
        <CountyTable
          data={countyMetrics}
          title="All Target Markets"
          description={`${allData.length} counties across ${investor.targetStates.length} states`}
        />

      </main>
    </div>
  );
}
