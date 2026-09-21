import type { Metadata } from "next";
import { EventPage } from "@/components/event-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { edition2025 } from "@/lib/content";

export const metadata: Metadata = {
  title: "Edizione 2025",
  description:
    "Techstars Startup Weekend Savona 2025: giuria, mentors, premi e momenti alla Fortezza del Priamar.",
};

export default function Edition2025Page() {
  return (
    <>
      <SiteHeader edition={edition2025} />
      <EventPage edition={edition2025} />
      <SiteFooter edition={edition2025} />
    </>
  );
}
