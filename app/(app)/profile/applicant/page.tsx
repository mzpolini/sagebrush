import { auth } from "@clerk/nextjs/server";
import { getApplicantProfile } from "@/app/actions/user";
import ApplicantForm from "./form";
import { redirect } from "next/navigation";

export default async function ApplicantPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const existingApplication = userId ? await getApplicantProfile(userId) : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-10 divide-y divide-border">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Cannabis License Application
          </h1>
          <p className="max-w-2xl text-sm text-foreground-muted">
            Complete this form to apply for a cannabis license. All information
            will be reviewed by our licensing team.
          </p>
        </div>

        {existingApplication && existingApplication.status === "pending" ? (
          <div className="rounded-md bg-yellow-50 p-4 mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Application Pending
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    You already have a pending application. You can edit it
                    below.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : existingApplication && existingApplication.status === "approved" ? (
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
                  Application Approved
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Your application has been approved! You can view your
                    license details in the dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="pt-10">
          <ApplicantForm initialData={existingApplication} />
        </div>
      </div>
    </div>
  );
}
