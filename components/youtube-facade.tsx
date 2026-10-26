"use client";

import Image from "next/image";
import { useState } from "react";

export function YouTubeFacade({
  id,
  poster,
  title,
  sizes = "(min-width: 1024px) 25vw, 17rem",
}: {
  id: string;
  poster: string;
  title: string;
  sizes?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 h-full w-full"
      aria-label={`Guarda il video: ${title}`}
    >
      <Image
        src={poster}
        alt=""
        fill
        className="object-cover"
        sizes={sizes}
      />
      <span className="absolute inset-0 grid place-items-center bg-black/15 transition group-hover:bg-black/5">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-blue text-white shadow-xl transition group-hover:scale-105">
          <svg
            viewBox="0 0 24 24"
            className="ml-1 h-7 w-7"
            fill="currentColor"
            aria-hidden
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
