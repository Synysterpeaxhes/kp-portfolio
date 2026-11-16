"use client";

import Image from "next/image";
import { ExternalLink, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getLenis } from "@/components/smooth-scroll";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { categories, embedUrl, externalUrl, type Work } from "@/lib/works";

const platformName = { youtube: "YouTube", drive: "Google Drive", tiktok: "TikTok", instagram: "Instagram" };

/**
 * 16:9 work card (cinematic / podcast). Clicking opens the player in a dialog;
 * the iframe only exists while the dialog is open, so closing stops playback.
 */
export function WorkThumb({ work, rowOnMobile = false }: { work: Work; rowOnMobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const label = categories.find((c) => c.id === work.category)?.label;

  // Freeze smooth scrolling behind the dialog so the wheel doesn't move the page.
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group block w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card text-left transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px] hover:shadow-primary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          rowOnMobile && "max-sm:flex max-sm:items-stretch",
        )}
        aria-label={`Play ${work.title}`}
      >
        <div
          className={cn(
            "relative aspect-video overflow-hidden bg-muted",
            rowOnMobile && "max-sm:aspect-auto max-sm:min-h-24 max-sm:w-36 max-sm:shrink-0",
          )}
        >
          {work.thumbnail && (
            <Image
              src={work.thumbnail}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 grid size-11 max-sm:size-9 place-items-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur-sm transition group-hover:bg-primary group-hover:ring-primary">
            <Play className="size-4 translate-x-px fill-current" aria-hidden />
          </span>
        </div>
        <div className={cn("p-5", rowOnMobile && "max-sm:min-w-0 max-sm:p-3.5")}>
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">{label}</p>
          <h3 className={cn("mt-1.5 text-lg leading-snug font-semibold", rowOnMobile && "max-sm:text-[0.95rem]")}>
            {work.title}
          </h3>
          <p className={cn("mt-1.5 line-clamp-2 text-sm text-muted-foreground", rowOnMobile && "max-sm:hidden")}>
            {work.description}
          </p>
        </div>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[calc(100svh-2rem)] gap-0 overflow-y-auto border-0 bg-popover p-0 sm:max-w-4xl"
        >
          <div className="flex items-center justify-between gap-3 py-1.5 pr-1.5 pl-5">
            <DialogTitle className="truncate text-base font-semibold">{work.title}</DialogTitle>
            <DialogClose
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              aria-label="Close"
            >
              <X className="size-5" aria-hidden />
            </DialogClose>
          </div>
          <div className="aspect-video w-full bg-black">
            {open && (
              <iframe
                src={embedUrl(work.source, true)}
                title={work.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="size-full border-0"
              />
            )}
          </div>
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
            <DialogDescription className="min-w-0 text-sm">{work.description}</DialogDescription>
            <a
              href={externalUrl(work.source)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 shrink-0 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              Open on {platformName[work.source.kind]}
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
