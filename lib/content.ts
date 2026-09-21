import type { AgendaDay, Edition, Person, Sponsor, SponsorGroup } from "./types";

export const site = {
  name: "Startup Weekend Savona",
  organizer: "Savona Startup",
  organizerUrl: "https://www.savonastartup.it",
  email: "info@startupweekendsavona.com",
  instagram: "https://www.instagram.com/startupweekendsavona/",
  linkedin: "https://www.linkedin.com/company/startupweekendsavona",
  organizerInstagram: "https://www.instagram.com/savonastartup",
  organizerLinkedin: "https://www.linkedin.com/company/savona-startup",
  description:
    "In un weekend a Savona di azione, incontrerai i migliori mentors, investitori, co-founder, per trasformare una idea in una startup!",
  url: "https://startupweekendsavona.com",
};

export const valueProps = [
  {
    index: "01",
    title: "Conosci altri aspiranti imprenditori",
    body: "Conosci altri innovatori con cui confrontarti e lavorare in squadra.",
  },
  {
    index: "02",
    title: "Realizza la tua idea di startup",
    body: "Metti alla prova la tua idea con le tecniche di fast prototyping tipiche del metodo Lean Startup.",
  },
  {
    index: "03",
    title: "Impara dai migliori mentori",
    body: "Impara da founder e altri esperti che ti supporteranno durante tutto il weekend.",
  },
  {
    index: "04",
    title: "Incontra investitori",
    body: "Incontra potenziali investitori per la tua impresa e metti alla prova le tue skills di public speaking.",
  },
];

export const stats = [
  { value: "7K+", label: "Eventi organizzati" },
  { value: "150+", label: "Paesi ospitanti" },
  { value: "19K+", label: "Community leaders" },
  { value: "428K+", label: "Partecipanti" },
];

export const faqs = [
  {
    question: "Cosa include il biglietto?",
    answer: [
      "Comprando un biglietto per Startup Weekend:",
      "1. Impari a trasformare un’idea in un progetto imprenditoriale",
      "2. Incontri e collabori con altri possibili co-founder",
      "3. Hai accesso a un gruppo riservato di top mentor",
      "4. Partecipi a workshop sulle competenze chiave per creare una startup",
      "5. Impari a pitchare il tuo progetto a una giuria di imprenditori e investor",
      "6. Espandi drasticamente il tuo network",
      "7. Hai tutti i pasti inclusi: colazioni, pranzi, cene, snack, drink, dal venerdì alla domenica.",
    ].join("\n"),
  },
  {
    question: "Quali pasti sono inclusi?",
    answer:
      "Cena del venerdì. Colazione, pranzo e cena del sabato. Colazione, pranzo e aperitivo della domenica. Se hai allergie o segui particolari regimi alimentari, segnalacelo nel form di acquisto dei biglietti.",
  },
  {
    question: "Devo presentare un’idea per partecipare?",
    answer:
      "No, ma vi invitiamo a farlo. Potete proporre un’idea a cui state pensando da anni, o qualcosa che vi viene in mente all’ultimo minuto durante l’evento. Non proponete un’idea che avete già sviluppato o su cui avete lavorato al di fuori dello Startup Weekend. Lo scopo dell’evento è imparare a passare dall’ideazione al prodotto. Il pitching fornisce una preziosa pratica per parlare in pubblico. Non vi pentirete di averlo fatto, ma potreste pentirvi di non averlo fatto.",
  },
  {
    question: "Posso portare come idea la startup che ho fondato?",
    answer:
      "No, questa è una competizione per idee embrionali. Se la tua idea è già pubblicata e presente online (sito, pagine social) e ci stai già lavorando, non sarà ammessa alla competizione. Ma non temere, ne puoi proporre un’altra.",
  },
  {
    question: "Ho bisogno di un team o posso iscrivermi da solo?",
    answer:
      "La competizione è per singoli. Puoi partecipare con i tuoi amici, ma dovrete iscrivervi singolarmente. Durante l’evento, dopo la presentazione delle idee, verranno formati i team. Il team ideale è composto da membri con background ed esperienze diverse che collaborano.",
  },
  {
    question: "Questo evento è adatto a me?",
    answer:
      "Se siete interessati all’imprenditorialità, la risposta è molto probabilmente sì. Sia che siate imprenditori seriali o nuovi nella scena delle startup, vi troverete bene, purché siate motivati a costruire un prodotto o una startup e siate aperti a nuove idee. Crediamo che le grandi idee possano provenire da qualsiasi luogo. L’evento vuole essere un forum collaborativo e inclusivo per condividere, imparare, costruire e divertirsi. Diamo il benvenuto a tutti, indipendentemente dall’esperienza, dal settore o dal background.",
  },
  {
    question: "Perché dovrei partecipare?",
    answer:
      "Durante l’evento, i partecipanti hanno l’opportunità di trasformare le loro idee in prototipi, di apprendere nuove competenze e di incontrare altri imprenditori. Inoltre possono chiedere consigli ai mentors, che sono imprenditori o persone esperte nell’ambiente startup: saranno ben felici di condividere le loro conoscenze ed esperienze.",
  },
];

const sharedAbout =
  "Techstars Startup Weekend è il più grande programma di imprenditorialità di base al mondo. Impara a pensare, lavorare e costruire come una startup in sole 54 ore. Startup Weekend Savona è un tuffo coinvolgente nel mondo delle startup: in tre giorni ricchi di azione incontrerai mentors, investitori, co-founder e sponsor, e capirai come si lavora a una startup partendo dall’idea.";

const brochureUrl =
  "https://www.papermark.com/view/cmge6qk6n0001jv046ry9t1wh";
const mapUrl = "https://maps.app.goo.gl/LSpGisuwu3XicGLH9";

const globalSponsors: Sponsor[] = [
  { name: "Deel", image: "/images/sponsors/deel.png" },
  { name: "Mercury", image: "/images/sponsors/mercury.png" },
  { name: "HSBC Innovation Banking", image: "/images/sponsors/hsbc.png" },
  { name: "Brex", image: "/images/sponsors/brex.png" },
  { name: "Google for Startups", image: "/images/sponsors/google.png" },
];

const patrocinioBase: Sponsor[] = [
  { name: "Città di Savona", image: "/images/sponsors/citta-savona.png" },
  { name: "Orientaragazzi Savona", image: "/images/sponsors/orientaragazzi.png" },
  { name: "Giovani Savona", image: "/images/sponsors/giovani-savona.jpeg" },
];

function group(
  title: string,
  sponsors: Sponsor[],
  comingSoon = false,
): SponsorGroup {
  return { title, sponsors, comingSoon };
}

const agenda2026: AgendaDay[] = [
  {
    id: "ven",
    label: "Venerdì",
    date: "4 dicembre",
    items: [
      { time: "18:00", title: "Welcome e registrazione dei partecipanti" },
      { time: "18:45", title: "Apertura lavori" },
      { time: "19:00", title: "Ice breaker" },
      { time: "19:30", title: "Pitch idee" },
      { time: "20:30", title: "Votazione idee e pitch" },
      { time: "21:00", title: "Cena / Definizione dei team" },
      { time: "21:30", title: "Annuncio team e inizio lavori" },
      { time: "21:40", title: "Kick-off speech by Pancrazio Auteri" },
      { time: "22:00", title: "Teamwork" },
      { time: "23:00", title: "Chiusura lavori" },
    ],
  },
  {
    id: "sab",
    label: "Sabato",
    date: "5 dicembre",
    items: [
      { time: "09:00", title: "Welcome coffee" },
      { time: "09:20", title: "Presentazione mentori" },
      { time: "09:35", title: "Prenotazioni slot mentori" },
      { time: "09:45", title: "Presentazione idee ai mentori" },
      { time: "11:45", title: "Mentoring individuale" },
      { time: "13:00", title: "Pranzo" },
      { time: "14:00", title: "Workshop — Vibe Coding with Lovable" },
      {
        time: "14:30",
        title: "Presentazione idee ai mentori + attività di validazione",
      },
      { time: "16:45", title: "Mentoring individuale" },
      { time: "20:00", title: "Cena" },
      { time: "21:00", title: "Teamwork" },
      { time: "23:00", title: "Chiusura dei lavori" },
    ],
  },
  {
    id: "dom",
    label: "Domenica",
    date: "6 dicembre",
    items: [
      { time: "09:00", title: "Welcome coffee" },
      { time: "09:30", title: "Presentazione agenda della giornata" },
      { time: "09:45", title: "Teamwork + preparazione pitch" },
      { time: "11:00", title: "Pitch training" },
      { time: "13:00", title: "Pranzo" },
      { time: "14:00", title: "Teamwork" },
      { time: "14:30", title: "Consegna pitches" },
      { time: "15:15", title: "Presentazione giudici" },
      { time: "15:30", title: "Inizio pitch finali" },
      { time: "17:00", title: "Riunione giuria" },
      { time: "17:30", title: "Saluti istituzionali" },
      { time: "18:00", title: "Premiazione" },
      { time: "18:30", title: "Aperitivo" },
      { time: "21:00", title: "Chiusura e saluti" },
    ],
  },
];

const agenda2025: AgendaDay[] = agenda2026.map((day, i) => ({
  ...day,
  date: ["5 dicembre", "6 dicembre", "7 dicembre"][i],
}));

const agenda2024: AgendaDay[] = [
  {
    id: "ven",
    label: "Venerdì",
    date: "6 dicembre",
    items: [
      { time: "18:00", title: "Welcome e registrazione dei partecipanti" },
      { time: "18:45", title: "Apertura lavori" },
      { time: "19:00", title: "Ice breaker" },
      { time: "19:30", title: "Pitch idee" },
      { time: "20:30", title: "Votazione idee e pitch" },
      { time: "21:00", title: "Cena / Definizione dei team" },
      { time: "21:30", title: "Kick-off speech" },
      { time: "21:45", title: "Teamwork" },
      { time: "23:00", title: "Chiusura lavori" },
    ],
  },
  {
    id: "sab",
    label: "Sabato",
    date: "7 dicembre",
    items: [
      { time: "09:00", title: "Welcome coffee" },
      { time: "09:30", title: "Presentazione mentori" },
      { time: "10:00", title: "Teamwork + mentoring" },
      { time: "11:30", title: "Mentoring individuale" },
      { time: "13:00", title: "Pranzo" },
      { time: "14:00", title: "Workshop [Fundraising]" },
      { time: "14:30", title: "Teamwork + mentoring" },
      { time: "16:30", title: "Mentoring individuale" },
      { time: "18:30", title: "Workshop [Pitch]" },
      { time: "20:00", title: "Cena" },
      { time: "21:00", title: "Teamwork" },
      { time: "23:00", title: "Chiusura dei lavori" },
    ],
  },
  {
    id: "dom",
    label: "Domenica",
    date: "8 dicembre",
    items: [
      { time: "09:00", title: "Welcome coffee" },
      { time: "09:30", title: "Programma giornata" },
      { time: "09:45", title: "Teamwork + improving pitch" },
      { time: "11:00", title: "Pitch training" },
      { time: "13:00", title: "Pranzo" },
      { time: "14:00", title: "Teamwork" },
      { time: "14:30", title: "Consegna pitches" },
      { time: "15:00", title: "Inspirational speech" },
      { time: "15:15", title: "Presentazione giudici" },
      { time: "15:30", title: "Inizio pitch finali" },
      { time: "17:30", title: "Saluti istituzionali" },
      { time: "18:00", title: "Premiazione" },
      { time: "18:30", title: "Aperitivo" },
      { time: "21:00", title: "Chiusura e saluti" },
    ],
  },
];

const facilitatorNox: Person = {
  name: "Francesco Salvatore",
  role: "Innovation Strategy Advisor · Facilitatore",
  image: "/images/people/nox.jpg",
};

const facilitator2024: Person = {
  name: "Francesco Salvatore",
  role: "Open Innovation Expert · Content Creator · Facilitatore",
  image: "/images/people/nox-alt.jpg",
};

export const edition2026: Edition = {
  year: 2026,
  slug: "/",
  isCurrent: true,
  kicker: "Learn. Network. Startup.",
  headline: "Realizza la tua startup in 54 ore",
  datesLabel: "4–6 dicembre 2026",
  datesShort: "4-5-6 Dicembre 2026",
  venue: "Fortezza del Priamar, Savona",
  startAt: "2026-12-04T18:00:00+01:00",
  ticketUrl: "https://dub.sh/sws25sitosws",
  ticketLabel: "Compra il tuo biglietto",
  brochureUrl,
  mapUrl,
  heroImage: "/images/gallery/hero.jpg",
  aboutImage: "/images/gallery/g1.jpg",
  gallery: [
    "/images/gallery/g1.jpg",
    "/images/gallery/g2.jpg",
    "/images/gallery/g3.jpg",
    "/images/gallery/g4.jpg",
    "/images/gallery/g6.jpg",
    "/images/gallery/g8.jpg",
  ],
  jury: [],
  mentors: [],
  facilitator: facilitatorNox,
  prizes: [
    { place: "Primo classificato", rank: 1, items: [] },
    { place: "Secondo classificato", rank: 2, items: [] },
    { place: "Terzo classificato", rank: 3, items: [] },
  ],
  prizesNote: "I premi dell’edizione 2026 saranno annunciati a breve.",
  agenda: agenda2026,
  sponsorGroups: [
    group("Global Sponsors", globalSponsors),
    group("Main Sponsors", [], true),
    group("Local Sponsors", [], true),
    group("Partners", [], true),
    group("Partners tecnici", [], true),
    group("Patrocinio", patrocinioBase),
  ],
  peopleComingSoon: true,
  prizesComingSoon: true,
};

export const edition2025: Edition = {
  year: 2025,
  slug: "/edizioni/2025",
  isCurrent: false,
  kicker: "Edizione 2025",
  headline: "54 ore alla Fortezza del Priamar",
  datesLabel: "5–7 dicembre 2025",
  datesShort: "5-6-7 Dicembre 2025",
  venue: "Fortezza del Priamar, Savona",
  startAt: "2025-12-05T18:00:00+01:00",
  ticketLabel: "Scopri l’edizione 2026",
  brochureUrl,
  mapUrl,
  heroImage: "/images/gallery/g1.jpg",
  aboutImage: "/images/gallery/g2.jpg",
  gallery: [
    "/images/gallery/g1.jpg",
    "/images/gallery/g2.jpg",
    "/images/gallery/g3.jpg",
    "/images/gallery/g4.jpg",
  ],
  jury: [
    {
      name: "Francesco Lato",
      role: "Talent Investor",
      image: "/images/people/lato.jpg",
    },
    {
      name: "Carlotta Cattaneo",
      role: "CIO @ La Casa della Salute",
      image: "/images/people/cattaneo.jpg",
    },
    {
      name: "Luca Bucchianica",
      role: "PQE Group",
      image: "/images/people/bucchianica.jpg",
    },
    {
      name: "Virginia Pigato",
      role: "VC @ Techstars",
      image: "/images/people/pigato.jpg",
    },
    {
      name: "Alberto Giusti",
      role: "Business Angel",
      image: "/images/people/giusti.jpg",
    },
  ],
  mentors: [
    {
      name: "Leopoldo Angelini",
      role: "Founder @ Menumal",
      image: "/images/people/angelini.jpg",
    },
    {
      name: "Giovanni Ciferri",
      role: "Founder @ Buddyfit",
      image: "/images/people/ciferri.jpg",
    },
    {
      name: "Francesco Manicardi",
      role: "CTO @ JustSolve",
      image: "/images/people/manicardi.jpg",
    },
    {
      name: "Chiara Mugnai",
      role: "Co-Founder @ Eoliann",
      image: "/images/people/mugnai.jpg",
    },
    {
      name: "Simone Martinelli",
      role: "HiFounders",
      image: "/images/people/martinelli.webp",
    },
    {
      name: "Pietro Galimberti",
      role: "CEO @ Plino.ai",
      image: "/images/people/galimberti.jpg",
    },
    {
      name: "Lucia Gambuzzi",
      role: "Startup Ecosystem Manager @ SMAU · ex Techstars",
      image: "/images/people/gambuzzi.jpg",
    },
    {
      name: "Davide Giacomini",
      role: "Venture Architect @ Kakashi Venture Accelerator",
      image: "/images/people/giacomini.jpg",
    },
    {
      name: "Miriam Molinari",
      role: "Senior Innovation Manager · Technology Transfer @ IIT",
      image: "/images/people/molinari.jpg",
    },
    {
      name: "Mattia Zarrelli",
      role: "Founder @ Gyver",
      image: "/images/people/zarrelli-2025.jpeg",
    },
  ],
  facilitator: {
    name: "Francesco Salvatore",
    role: "Open Innovation Expert · Content Creator · Facilitatore",
    image: "/images/people/nox-alt.jpg",
  },
  prizes: [
    {
      place: "Primo classificato",
      rank: 1,
      items: [
        "Accesso alla piattaforma di e-learning Women Lead per un anno",
        "Fast-track application B4I Pre-Acceleration program",
        "4h di consulenza AI by Francesco Gruner",
        "30 giorni di ingresso gratuito a Talent Garden Genova",
        "Un posto in una pitch night di BAC Savona nel 2026",
        "2h intro meeting con Angels del network IAG",
      ],
    },
    {
      place: "Secondo classificato",
      rank: 2,
      items: [
        "2h di consulenza societaria by Bird & Bird",
        "3h di consulenza AI by Francesco Gruner",
        "Un posto in una pitch night di BAC Savona nel 2026",
        "2h intro meeting con Angels del network IAG",
      ],
    },
    {
      place: "Terzo classificato",
      rank: 3,
      items: [
        "2h di consulenza AI by Francesco Gruner",
        "Un posto in una pitch night di BAC Savona nel 2026",
        "2h intro meeting con Angels del network IAG",
      ],
    },
  ],
  agenda: agenda2025,
  sponsorGroups: [
    group("Global Sponsors", globalSponsors),
    group("Main Sponsors", [
      { name: "Azimut Capital Management", image: "/images/sponsors/azimut.png" },
      { name: "Fondazione De Mari", image: "/images/sponsors/fmd.png" },
    ]),
    group("Local Sponsors", [
      {
        name: "Unione Industriali",
        image: "/images/sponsors/unione-industriali.jpg",
      },
      { name: "CNA", image: "/images/sponsors/cna.jpg" },
      { name: "Mesa", image: "/images/sponsors/mesa.png" },
      { name: "Evergon", image: "/images/sponsors/evergon.png" },
      { name: "Besio", image: "/images/sponsors/besio.jpg" },
      { name: "Fideuram", image: "/images/sponsors/fideuram.jpg" },
    ]),
    group("Partners", [
      { name: "Talent Garden", image: "/images/sponsors/tag.svg" },
      { name: "Lovable", image: "/images/sponsors/lovable.png" },
      { name: "B4i", image: "/images/sponsors/b4i.svg" },
      { name: "HiFounders", image: "/images/sponsors/hifounders.png" },
      { name: "Women Lead", image: "/images/sponsors/women-lead.webp" },
      {
        name: "Starting Finance UniGe",
        image: "/images/sponsors/starting-finance.png",
      },
    ]),
    group("Partners tecnici", [
      { name: "Partner tecnico", image: "/images/sponsors/opera.jpg" },
      { name: "Drop Savona", image: "/images/sponsors/drop.jpg" },
      { name: "Partner tecnico", image: "/images/sponsors/2123.png" },
      { name: "Cellini", image: "/images/sponsors/cellini.png" },
    ]),
    group("Patrocinio", [
      ...patrocinioBase,
      {
        name: "Camera di Commercio",
        image: "/images/sponsors/camera-commercio.jpg",
      },
    ]),
  ],
};

export const edition2024: Edition = {
  year: 2024,
  slug: "/edizioni/2024",
  isCurrent: false,
  kicker: "Edizione 2024",
  headline: "La prima Startup Weekend a Savona",
  datesLabel: "6–8 dicembre 2024",
  datesShort: "6-7-8 Dicembre 2024",
  venue: "Fortezza del Priamar, Savona",
  startAt: "2024-12-06T18:00:00+01:00",
  ticketLabel: "Scopri l’edizione 2026",
  brochureUrl,
  mapUrl,
  heroImage: "/images/gallery/hero.jpg",
  aboutImage: "/images/gallery/g7.jpg",
  gallery: [
    "/images/gallery/hero.jpg",
    "/images/gallery/g5.jpg",
    "/images/gallery/g6.jpg",
    "/images/gallery/g7.jpg",
    "/images/gallery/g8.jpg",
    "/images/gallery/g9.jpg",
    "/images/gallery/g10.jpg",
  ],
  jury: [
    {
      name: "Martina Vinci",
      role: "Vento Ventures",
      image: "/images/people/vinci.jpg",
    },
    {
      name: "Vincenzo Cioffi",
      role: "Angel Investor",
      image: "/images/people/cioffi.jpg",
    },
    {
      name: "Francesco Lato",
      role: "Talent Investor",
      image: "/images/people/lato.jpg",
    },
    {
      name: "Paolo Marenco",
      role: "Silicon Valley Study Tour",
      image: "/images/people/marenco.jpg",
    },
    {
      name: "Luca Bucchianica",
      role: "PQE Group",
      image: "/images/people/bucchianica.jpg",
    },
  ],
  mentors: [
    {
      name: "Giovanni Ciferri",
      role: "Founder @ Buddyfit",
      image: "/images/people/ciferri.jpg",
    },
    {
      name: "Mattia Zarrelli",
      role: "Founder @ Parc",
      image: "/images/people/zarrelli.jpg",
    },
    {
      name: "Matteo Mosca",
      role: "Founder @ Leva.io",
      image: "/images/people/mosca.jpg",
    },
    {
      name: "Alberto Dietze",
      role: "Startup Mentor",
      image: "/images/people/dietze.jpg",
    },
    {
      name: "Francesco Manicardi",
      role: "CTO @ JustSolve",
      image: "/images/people/manicardi.jpg",
    },
    {
      name: "Luca Mossa",
      role: "Growth Hacker",
      image: "/images/people/mossa.jpg",
    },
    {
      name: "Leopoldo Angelini",
      role: "Founder @ Menumal",
      image: "/images/people/angelini.jpg",
    },
    {
      name: "Marco Maddiona",
      role: "CTO @ Crono",
      image: "/images/people/maddiona.jpg",
    },
    {
      name: "Alessandro Cricchio",
      role: "TAG Genova",
      image: "/images/people/cricchio.jpg",
    },
    {
      name: "Saverio Murgia",
      role: "Serial Entrepreneur",
      image: "/images/people/murgia.jpg",
    },
  ],
  facilitator: facilitator2024,
  prizes: [
    {
      place: "Primo classificato",
      rank: 1,
      items: [
        "Supporto legale gratuito alla costituzione della startup by Startup Legal",
        "Due sessioni di consulenza legale gratuita by Startup Legal",
        "25% di sconto su assistenza legale annuale by Startup Legal",
        "30 giorni di ingresso gratuito a Talent Garden Genova",
        "Accesso per un anno alla piattaforma Club di Startup Geeks",
        "Accesso gratuito al percorso di accelerazione Genoa Ventures",
        "Accesso scontato del 75% al master di Genoa Entrepreneurship School (valore borsa ~20k, previo selezione)",
        "10h di mentoring dal network di Genoa Entrepreneurship School (Apple, Tesla, Klarna)",
      ],
    },
    {
      place: "Secondo classificato",
      rank: 2,
      items: [
        "Una sessione di consulenza legale gratuita by Startup Legal",
        "10% di sconto su assistenza legale annuale by Startup Legal",
        "Manuale dello Startupper by Startup Geeks",
        "Accesso scontato del 75% al percorso di accelerazione Genoa Ventures",
        "Accesso scontato del 50% al master di Genoa Entrepreneurship School (valore borsa ~15k, previo selezione)",
        "5h di mentoring dal network di Genoa Entrepreneurship School",
      ],
    },
    {
      place: "Terzo classificato",
      rank: 3,
      items: [
        "Una sessione di consulenza legale gratuita by Startup Legal",
        "Manuale dello Startupper by Startup Geeks",
        "Accesso scontato del 50% al percorso di accelerazione Genoa Ventures",
        "Accesso scontato del 25% al master di Genoa Entrepreneurship School",
        "3h di mentoring dal network di Genoa Entrepreneurship School",
      ],
    },
  ],
  agenda: agenda2024,
  sponsorGroups: [
    group("Global Sponsors", globalSponsors),
    group("Main Sponsors", [
      { name: "Azimut Capital Management", image: "/images/sponsors/azimut.png" },
    ]),
    group("Local Sponsors", [
      {
        name: "Unione Industriali",
        image: "/images/sponsors/unione-industriali.jpg",
      },
      { name: "Studio Murialdo", image: "/images/sponsors/murialdo.jpg" },
      { name: "Besio", image: "/images/sponsors/besio.jpg" },
      { name: "Metakol", image: "/images/sponsors/metakol.jpg" },
    ]),
    group("Partners", [
      { name: "Talent Garden", image: "/images/sponsors/tag.svg" },
      { name: "Genoa Entrepreneurship School", image: "/images/sponsors/genoaes.png" },
      { name: "Vento Ventures", image: "/images/sponsors/vento.png" },
      { name: "Startup Geeks", image: "/images/sponsors/startup-geeks.png" },
      { name: "HiFounders", image: "/images/sponsors/hifounders.png" },
      {
        name: "Starting Finance UniGe",
        image: "/images/sponsors/starting-finance.png",
      },
      { name: "Genoa Ventures", image: "/images/sponsors/genoa-ventures.png" },
    ]),
    group("Partners tecnici", [
      { name: "Appbox", image: "/images/sponsors/appbox.png" },
      { name: "GDG Genova", image: "/images/sponsors/gdg.jpg" },
      { name: "Startup Legal", image: "/images/sponsors/startup-legal.png" },
      { name: "Partner tecnico", image: "/images/sponsors/opera.jpg" },
      { name: "Drop Savona", image: "/images/sponsors/drop.jpg" },
      { name: "Danielli", image: "/images/sponsors/danielli.png" },
      { name: "Partner tecnico", image: "/images/sponsors/2123.png" },
      { name: "Cellini", image: "/images/sponsors/cellini.png" },
      { name: "Calcagno", image: "/images/sponsors/calcagno.jpg" },
    ]),
    group("Patrocinio", [
      ...patrocinioBase,
      { name: "Camera di Commercio", image: "/images/sponsors/camcom.jpg" },
    ]),
  ],
};

export const editions = [edition2026, edition2025, edition2024];
export const pastEditions = [edition2025, edition2024];
export const aboutCopy = sharedAbout;
