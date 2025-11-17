import {
  getApplicantProfile,
  getInvestorProfile,
  getUserProfile,
} from "@/app/actions/user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserProfile();
  const investorProfile = await getInvestorProfile();
  const applicantProfile = await getApplicantProfile();

  if (!user) {
    redirect("/sign-in");
  }

  // Calculate profile completion percentage
  const profileSections = [
    {
      name: "General Information",
      path: "/profile/general",
      completed: !!user.firstName,
    },
    {
      name: "Investor Details",
      path: "/profile/investor",
      completed: !!investorProfile,
    },
    {
      name: "Applicant Details",
      path: "/profile/applicant",
      completed: !!applicantProfile,
    },
  ];

  const relevantSections = profileSections.filter(
    (section) =>
      section.name === "General Information" ||
      section.name === "Investor Details" ||
      section.name === "Applicant Details"
  );

  const completedSections = relevantSections.filter(
    (section) => section.completed
  ).length;
  const totalSections = relevantSections.length;
  const completionPercentage = Math.round(
    (completedSections / totalSections) * 100
  );

  // Calculate viability score (simple version)
  let viabilityScore = 0;
  if (applicantProfile) {
    // Add points for different completed sections
    viabilityScore += applicantProfile.businessPlan ? 25 : 0;
    viabilityScore += applicantProfile.financialInvestment ? 25 : 0;
    viabilityScore += applicantProfile.criminalHistory ? 25 : 0;
    viabilityScore += applicantProfile.experience ? 25 : 0;
  } else if (investorProfile) {
    // For investors, viability could be investment readiness
    viabilityScore += investorProfile.accreditedStatus ? 33 : 0;
    viabilityScore += investorProfile.investmentHistory ? 33 : 0;
    viabilityScore += investorProfile.riskTolerance ? 34 : 0;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Profile Completion Card */}
        <div className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Profile Completion
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-green-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-lg mb-4 font-medium text-gray-700">
            {completionPercentage}% Complete
          </p>

          <h3 className="font-medium mb-2 text-gray-700">
            Sections to Complete:
          </h3>
          <ul className="space-y-3">
            {relevantSections.map((section) => (
              <li key={section.name} className="flex items-center">
                {section.completed ? (
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span
                  className={
                    section.completed
                      ? "line-through text-gray-500"
                      : "text-gray-700"
                  }
                >
                  {section.name}
                </span>
                {!section.completed && (
                  <Link
                    href={section.path}
                    className="ml-auto text-green-600 hover:text-green-800 font-medium hover:underline"
                  >
                    Complete
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Viability Score Card */}
        <div className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {applicantProfile
              ? "Funding Viability Score"
              : "Investment Readiness"}
          </h2>

          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={
                    viabilityScore > 75
                      ? "#10b981"
                      : viabilityScore > 50
                      ? "#3b82f6"
                      : viabilityScore > 25
                      ? "#f59e0b"
                      : "#ef4444"
                  }
                  strokeWidth="10"
                  strokeDasharray={`${viabilityScore * 2.83} 283`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="bold"
                  fill="currentColor"
                >
                  {viabilityScore}%
                </text>
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {applicantProfile
                ? "This score represents how complete your funding application is and how likely you are to attract investors."
                : "This score represents how ready you are to make investments based on your profile completion."}
            </p>
            <p className="text-sm text-gray-600">
              Complete all sections of your profile to improve your score.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity or Recommendations */}
      <div className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {applicantProfile
            ? "Recommendations to Improve Your Application"
            : "Potential Investment Opportunities"}
        </h2>

        {applicantProfile ? (
          <ul className="space-y-3">
            {!applicantProfile?.businessPlan && (
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Add a detailed business plan to increase your chances of
                  funding.
                </span>
              </li>
            )}
            {!applicantProfile?.financialInvestment && (
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Include financial projections to show potential return on
                  investment.
                </span>
              </li>
            )}
            {completionPercentage < 100 && (
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Complete your profile to be more visible to potential
                  investors.
                </span>
              </li>
            )}
          </ul>
        ) : (
          <p className="text-gray-700">
            Based on your investment preferences, we&apos;ll show matching
            opportunities here once you complete your profile.
          </p>
        )}
      </div>
    </div>
  );
}
