import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center"
      aria-label="Techstars Startup Weekend Savona"
    >
      <Image
        src="/images/brand/lockup.png"
        alt="Techstars Startup Weekend Savona"
        width={1600}
        height={549}
        priority={priority}
        className={cn("w-auto", className ?? "h-9 sm:h-11")}
      />
    </Link>
  );
}
