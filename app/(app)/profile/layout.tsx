import Link from "next/link";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="flex gap-6 py-6 border-b border-gray-200">
        <div className="flex gap-4">
          <Link
            href="/profile/general"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            General
          </Link>
          <Link
            href="/profile/applicant"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Applicant Profile
          </Link>
          <Link
            href="/profile/investor"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Investor Profile
          </Link>
        </div>
        <div className="flex gap-4 ml-auto">
          <Link
            href="/dashboard/applicant"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Applicant Dashboard
          </Link>
          <Link
            href="/dashboard/investor"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Investor Dashboard
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
