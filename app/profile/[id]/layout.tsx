import Link from "next/link";

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="flex gap-4 py-4">
        <Link href={`/profile/${id}/dashboard`}>Dashboard</Link>
        <Link href={`/profile/${id}/general`}>General</Link>
        <Link href={`/profile/${id}/applicant`}>Applicant</Link>
        <Link href={`/profile/${id}/investor`}>Investor</Link>
      </nav>
      {children}
    </div>
  );
}
