import type { Metadata } from "next";
import { EventPage } from "@/components/event-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { edition2024 } from "@/lib/content";

export const metadata: Metadata = {
  title: "Edizione 2024",
  description:
    "La prima Startup Weekend Savona: 6-8 dicembre 2024 alla Fortezza del Priamar.",
};

export default function Edition2024Page() {
  return (
    <>
      <SiteHeader edition={edition2024} overlay />
      <EventPage edition={edition2024} />
      <SiteFooter edition={edition2024} />
    </>
  );
}
