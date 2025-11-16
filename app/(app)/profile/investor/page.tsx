import { auth } from "@clerk/nextjs/server";
import { getInvestorProfile } from "@/app/actions/user";
import InvestorForm from "./form";
import { redirect } from "next/navigation";

export default async function InvestorPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const existingProfile = userId ? await getInvestorProfile(userId) : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-10 divide-y divide-border">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Investor Profile
          </h1>
          <p className="max-w-2xl text-sm text-foreground-muted">
            Complete this form to set up your investor profile. This information
            will help match you with cannabis business opportunities.
          </p>
        </div>

        {existingProfile ? (
          <div className="rounded-md bg-green-50 p-4 mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Profile Active
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Your investor profile is active. You can update your
                    information below.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="pt-10">
          <InvestorForm initialData={existingProfile} />
        </div>
      </div>
    </div>
  );
}
