import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { edition2026 } from "@/lib/content";

export const alt = `Startup Weekend Savona ${edition2026.year} · ${edition2026.datesLabel} · ${edition2026.venue}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [hero, logo] = await Promise.all([
    readFile(join(process.cwd(), "public", edition2026.heroImage)),
    readFile(join(process.cwd(), "public/images/brand/lockup.png")),
  ]);
  const heroSrc = `data:image/jpeg;base64,${hero.toString("base64")}`;
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#111111",
          color: "#ffffff",
        }}
      >
        <img
          alt=""
          src={heroSrc}
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0, objectFit: "cover", opacity: 0.45 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "64px 72px",
            backgroundImage:
              "linear-gradient(180deg, rgba(17,17,17,0.2) 0%, rgba(17,17,17,0.9) 100%)",
          }}
        >
            <img alt="" src={logoSrc} width={350} height={120} style={{ marginBottom: 36, objectFit: "contain", alignSelf: "flex-start" }} />
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            {edition2026.headline}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: "#27a8e0" }}>
            {`${edition2026.datesLabel} · ${edition2026.venue}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
