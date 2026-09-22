import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  invert?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 text-xs font-medium uppercase tracking-[0.28em]",
            invert ? "text-blue" : "text-blue",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl leading-[1.1] font-semibold tracking-tight sm:text-5xl",
          invert ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            "mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            invert ? "text-white/70" : "text-muted",
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark" | "accent";
  className?: string;
  external?: boolean;
}) {
  const styles = {
    primary:
      "bg-blue text-white hover:bg-blue-deep shadow-[0_0_0_1px_rgba(39,168,224,0.35)]",
    accent:
      "bg-blue text-white hover:bg-blue-deep",
    ghost:
      "bg-transparent text-paper border border-white/25 hover:border-blue hover:text-blue",
    dark: "bg-ink text-white hover:bg-black",
  } as const;

  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200",
        styles[variant],
        className,
      )}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
