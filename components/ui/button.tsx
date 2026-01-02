import { cn } from "@/lib/utils";

export function Button({
  children,
  className,
  type = "button"
}: {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      className={cn(
        "rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700",
        className
      )}
    >
      {children}
    </button>
  );
}
