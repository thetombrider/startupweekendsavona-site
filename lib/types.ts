export type Person = {
  name: string;
  role: string;
  image: string;
};

export type AgendaItem = {
  time: string;
  title: string;
};

export type AgendaDay = {
  id: string;
  label: string;
  date: string;
  items: AgendaItem[];
};

export type PrizeTier = {
  place: string;
  rank: 1 | 2 | 3;
  items: string[];
};

export type TicketTier = {
  name: string;
  price: number;
  seats: number;
  startAt: string;
  endAt: string;
  hiddenUntilStart?: boolean;
};

export type Sponsor = {
  name: string;
  image: string;
};

export type SponsorGroup = {
  title: string;
  comingSoon?: boolean;
  sponsors: Sponsor[];
};

export type Edition = {
  year: number;
  slug: string;
  isCurrent: boolean;
  kicker: string;
  headline: string;
  lead?: string;
  datesLabel: string;
  datesShort: string;
  venue: string;
  startAt: string;
  ticketUrl?: string;
  tickets?: TicketTier[];
  ticketLabel: string;
  brochureUrl: string;
  mapUrl: string;
  heroImage: string;
  aboutImage: string;
  gallery: string[];
  moments?: { image: string; when: string; caption: string }[];
  reel?: { youtubeId: string; poster: string };
  recapVideoUrl?: string;
  jury: Person[];
  mentors: Person[];
  facilitator: Person;
  prizes: PrizeTier[];
  prizesNote?: string;
  agenda: AgendaDay[];
  sponsorGroups: SponsorGroup[];
  peopleComingSoon?: boolean;
  peopleMoreComing?: boolean;
  prizesComingSoon?: boolean;
  recap: string;
};
