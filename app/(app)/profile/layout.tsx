import Link from "next/link";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="flex gap-4 py-4">
        <Link href="/profile/dashboard">Dashboard</Link>
        <Link href="/profile/general">General</Link>
        <Link href="/profile/applicant">Applicant</Link>
        <Link href="/profile/investor">Investor</Link>
      </nav>
      {children}
    </div>
  );
}
