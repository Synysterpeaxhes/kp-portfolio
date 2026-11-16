"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * Muted YouTube showreel loop that always covers its box.
 * The poster frame shows first (and stays, for reduced-motion visitors); the
 * iframe is scaled up slightly so YouTube's title bar sits outside the box.
 */
export function HeroBackground({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => setPlayVideo(true), 300);
    return () => window.clearTimeout(t);
  }, [reduce]);

  const id = site.heroVideoId;
  const src =
    `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}` +
    "&controls=0&rel=0&playsinline=1&disablekb=1&modestbranding=1&iv_load_policy=3";

  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- remote poster, static export */}
      <img
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        alt=""
        className="absolute inset-0 size-full object-cover opacity-40"
        fetchPriority="high"
      />
      {playVideo && (
        <iframe
          src={src}
          title="Showreel background"
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute top-1/2 left-1/2 h-[max(100%,56.25vw)] w-[max(100%,177.78svh)] -translate-x-1/2 -translate-y-1/2 scale-[1.2] border-0 opacity-50"
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(9_9_11/0.55)_60%,rgb(9_9_11)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background from-15% via-background/85 to-transparent" />
    </div>
  );
}

/** Name, role and focus line. Shared by the scroll story and the static layout. */
export function HeroContent() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center sm:px-6">
      <h1 className="text-[clamp(2.1rem,9vw,5.5rem)] leading-[1.05] font-bold tracking-[0.04em] text-balance uppercase">
        {site.name}
      </h1>
      <p className="mt-5 text-sm font-semibold tracking-[0.3em] text-primary uppercase sm:text-base">
        {site.role}
      </p>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-white/75 sm:text-lg">
        {site.focus.map((f, i) => (
          <span key={f} className="inline-flex items-center gap-3">
            {i > 0 && <span aria-hidden className="size-1 rounded-full bg-white/40" />}
            {f}
          </span>
        ))}
      </p>
      <Link
        href="/works/"
        className="group mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-8px] shadow-primary/70 transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      >
        View all works
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </div>
  );
}
