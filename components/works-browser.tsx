"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { SocialCard } from "@/components/social-card";
import { WorkThumb } from "@/components/work-thumb";
import { cn } from "@/lib/utils";
import { categories, works, type Category } from "@/lib/works";

type Filter = "all" | Category;

const filters: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...categories];

/** Category filter + one grid per category (16:9 for video, 9:16 for social). */
export function WorksBrowser() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = categories.filter((c) => filter === "all" || c.id === filter);

  return (
    <>
      <div
        role="group"
        aria-label="Filter by category"
        className="-mx-4 mb-10 flex gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {filters.map((f) => {
          const count = f.id === "all" ? works.length : works.filter((w) => w.category === f.id).length;
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={cn(
                "inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3.5 text-sm sm:px-4 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {f.label}
              <span
                className={cn(
                  "hidden text-xs tabular-nums sm:inline",
                  active ? "text-white/80" : "text-muted-foreground/70",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-16"
        >
          {visible.map((c) => {
            const items = works.filter((w) => w.category === c.id);
            return (
              <section key={c.id} aria-labelledby={`cat-${c.id}`}>
                <div className="mb-5 flex items-baseline gap-3">
                  <h2 id={`cat-${c.id}`} className="text-xl font-semibold sm:text-2xl">
                    {c.label}
                  </h2>
                  <span className="text-sm text-muted-foreground tabular-nums">{items.length}</span>
                </div>
                {c.vertical ? (
                  <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
                    {items.map((w) => (
                      <Reveal key={w.slug} className="h-full">
                        <SocialCard work={w} />
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {items.map((w) => (
                      <Reveal key={w.slug}>
                        <WorkThumb work={w} />
                      </Reveal>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
