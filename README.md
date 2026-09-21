# Startup Weekend Savona

Modern rebuild of [startupweekendsavona.com](https://startupweekendsavona.com): same event structure, new stack and UI.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Static content in `lib/content.ts`
- Ready for **Vercel**

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Import this repository in [Vercel](https://vercel.com/new)
2. Framework preset: **Next.js** (auto-detected)
3. Build command: `npm run build`
4. Output: Next.js default
5. Add the custom domain `startupweekendsavona.com`

Optional env: none required. Ticket, brochure and map URLs live in `lib/content.ts`.

## Pages

- `/` — edizione 2026
- `/edizioni` — archivio
- `/edizioni/2025` — archivio completo 2025 (giuria, mentors, premi, sponsor)
- `/edizioni/2024` — archivio completo 2024
- `/startup-weekend-2025` and `/startup-weekend-2024` redirect to the new archive routes

Palette from the original WordPress site: black `#111111` / `#000000`, white `#ffffff`, accent blue `#27a8e0`.
