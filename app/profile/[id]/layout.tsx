import Link from "next/link";

export default function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="flex gap-4 py-4">
        <Link href={`/profile/${params.id}/general`}>General</Link>
        <Link href={`/profile/${params.id}/applicant`}>Applicant</Link>
        <Link href={`/profile/${params.id}/investor`}>Investor</Link>
      </nav>
      {children}
    </div>
  );
}
