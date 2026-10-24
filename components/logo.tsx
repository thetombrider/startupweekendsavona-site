import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  priority = false,
  tone = "light",
}: {
  className?: string;
  priority?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center"
      aria-label="Techstars Startup Weekend Savona"
    >
      <Image
        src={
          tone === "dark"
            ? "/images/brand/lockup-dark.png"
            : "/images/brand/lockup.png"
        }
        alt="Techstars Startup Weekend Savona"
        width={350}
        height={120}
        priority={priority}
        className={cn("w-auto", className ?? "h-9 sm:h-11")}
      />
    </Link>
  );
}
