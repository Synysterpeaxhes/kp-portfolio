"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import { embedUrl, type Work } from "@/lib/works";

const platformName = { youtube: "YouTube", drive: "Google Drive", tiktok: "TikTok", instagram: "Instagram" };

/**
 * Vertical (9:16) card for TikTok / Instagram work.
 * The third-party player is only loaded after a tap, so the Works page does not
 * pull in a dozen embeds (and their trackers) on first load.
 */
export function SocialCard({ work }: { work: Work }) {
  const [loaded, setLoaded] = useState(false);
  const platform = platformName[work.source.kind];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[9/16] bg-black">
        {loaded ? (
          <iframe
            src={embedUrl(work.source, true)}
            title={work.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="group absolute inset-0 cursor-pointer overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgb(229_38_47/0.28),transparent_65%)] text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset"
            aria-label={`Play ${platform} video: ${work.title}`}
          >
            {work.thumbnail && (
              <Image
                src={work.thumbnail}
                alt=""
                fill
                sizes="(min-width: 1280px) 18rem, (min-width: 768px) 30vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            )}
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />
            <span className="absolute top-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.16em] text-white/85 uppercase ring-1 ring-white/15 backdrop-blur-sm">
              {platform}
            </span>
            <span className="absolute bottom-3 left-3 grid size-11 place-items-center rounded-full bg-black/55 ring-1 ring-white/20 backdrop-blur-sm transition group-hover:bg-primary group-hover:ring-primary sm:size-12">
              <Play className="size-4 translate-x-px fill-current" aria-hidden />
            </span>
          </button>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-sm leading-snug font-semibold sm:text-[0.95rem]">{work.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:text-sm">{work.description}</p>
      </div>
    </article>
  );
}
