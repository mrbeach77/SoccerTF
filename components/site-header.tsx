import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-brand-700">
          Soccer Trainer Directory
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link href="/results">Find Trainers</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
