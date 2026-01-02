"use client";

export default function ErrorPage({
  error
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-slate-600">{error.message}</p>
    </div>
  );
}
