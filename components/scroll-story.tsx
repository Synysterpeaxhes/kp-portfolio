"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { createContext, useContext, useRef, useState } from "react";
import { getLenis } from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven "single screen" story.
 *
 * A tall track gives the page its scroll length; inside it a sticky stage fills
 * the viewport and never moves. Scroll progress is converted to a scene clock
 * `t` (one unit ≈ one screen of scrolling), and each scene cross-fades in and
 * out on that clock, so the visitor sees scenes change rather than the page move.
 */

export interface Scene {
  id: string;
  label: string;
  /** Scroll length in screens. Longer scenes can animate their own content. */
  span: number;
  content: React.ReactNode;
}

/** Local clock of the current scene: 0 → span while it is on stage. */
const SceneClock = createContext<{ local: MotionValue<number>; span: number } | null>(null);

export function useSceneClock() {
  const ctx = useContext(SceneClock);
  if (!ctx) throw new Error("useSceneClock must be used inside a ScrollStory scene");
  return ctx;
}

const FADE = 0.26; // length (in scene units) of each fade-out / fade-in at a boundary

export function ScrollStory({
  scenes,
  background,
  unitVh = 85,
  gentle = false,
}: {
  scenes: Scene[];
  background?: (t: MotionValue<number>) => React.ReactNode;
  /** Reduced motion: scenes only cross-fade (no slide, scale or blur). */
  gentle?: boolean;
  /** Scroll distance per scene unit, in svh. */
  unitVh?: number;
}) {
  const track = useRef<HTMLDivElement>(null);
  const total = scenes.reduce((s, x) => s + x.span, 0);
  const starts = scenes.reduce<number[]>((acc, _, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + scenes[i - 1].span);
    return acc;
  }, []);

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const t = useTransform(scrollYProgress, [0, 1], [0, total]);

  const [active, setActive] = useState(0);
  useMotionValueEvent(t, "change", (v) => {
    let idx = 0;
    for (let i = 0; i < starts.length; i++) if (v >= starts[i] - 0.001) idx = i;
    setActive(idx); // React skips the render when unchanged
  });

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    const target = top + ((starts[i] + Math.min(0.35, scenes[i].span / 2)) / total) * range;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div ref={track} className="relative" style={{ height: `calc(${total * unitVh}svh + 100svh)` }}>
      <div className="sticky top-[calc(4rem+env(safe-area-inset-top))] h-[calc(100svh-4rem-env(safe-area-inset-top))] overflow-hidden">
        {background?.(t)}

        {scenes.map((scene, i) => (
          <SceneLayer
            key={scene.id}
            t={t}
            start={starts[i]}
            span={scene.span}
            first={i === 0}
            last={i === scenes.length - 1}
            active={i === active}
            label={scene.label}
            gentle={gentle}
          >
            {scene.content}
          </SceneLayer>
        ))}

        <StoryProgress
          progress={scrollYProgress}
          scenes={scenes}
          active={active}
          onSelect={goTo}
        />
      </div>
    </div>
  );
}

function SceneLayer({
  t,
  start,
  span,
  first,
  last,
  active,
  label,
  gentle,
  children,
}: {
  t: MotionValue<number>;
  start: number;
  span: number;
  first: boolean;
  last: boolean;
  active: boolean;
  label: string;
  gentle: boolean;
  children: React.ReactNode;
}) {
  const end = start + span;
  // Out-then-in (no overlap): the old scene clears just before the boundary and
  // the next one arrives just after it, like a cut through black.
  const inA = first ? -2 : start + 0.02;
  const inB = first ? -1 : start + FADE;
  const outA = last ? end + 1 : end - FADE;
  const outB = last ? end + 2 : end - 0.02;
  const keys = [inA, inB, outA, outB];

  const m = gentle ? 0 : 1; // reduced motion: cross-fade only
  const opacity = useTransform(t, keys, [0, 1, 1, 0]);
  const y = useTransform(t, keys, [56 * m, 0, 0, -56 * m]);
  const scale = useTransform(t, keys, [1 - 0.03 * m, 1, 1, 1 + 0.02 * m]);
  const blur = useTransform(t, keys, [10 * m, 0, 0, 10 * m]);
  const filter = useTransform(blur, (b) => (b < 0.2 ? "none" : `blur(${b.toFixed(1)}px)`));
  const local = useTransform(t, (v) => Math.min(span, Math.max(0, v - start)));
  const visibility = useTransform(opacity, (o) => (o < 0.01 ? "hidden" : "visible"));

  return (
    <SceneClock.Provider value={{ local, span }}>
      <motion.section
        aria-label={label}
        inert={!active}
        style={{ opacity, y, scale, filter, visibility }}
        className={cn(
          "absolute inset-0 flex items-center overflow-y-auto pt-6 pb-16 sm:pb-20",
          !active && "pointer-events-none",
        )}
      >
        <div className="my-auto w-full">{children}</div>
      </motion.section>
    </SceneClock.Provider>
  );
}

function StoryProgress({
  progress,
  scenes,
  active,
  onSelect,
}: {
  progress: MotionValue<number>;
  scenes: Scene[];
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <>
      {/* Bottom bar: scene counter + progress line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 pb-5 sm:px-6 lg:px-8">
          <span className="text-xs font-medium text-white/70 tabular-nums">
            {String(active + 1).padStart(2, "0")}
            <span className="text-white/35"> / {String(scenes.length).padStart(2, "0")}</span>
          </span>
          <div className="relative h-px flex-1 overflow-hidden bg-white/15">
            <motion.div
              className="absolute inset-0 origin-left bg-primary"
              style={{ scaleX: progress }}
            />
          </div>
          <span className="min-w-0 truncate text-xs tracking-[0.2em] text-white/60 uppercase">
            {scenes[active]?.label}
          </span>
        </div>
      </div>

      {/* Right rail: one dot per scene, jumps to it (desktop/tablet only) */}
      <nav
        aria-label="Sections"
        className="absolute top-1/2 right-3 z-10 hidden -translate-y-1/2 flex-col md:flex lg:right-6"
      >
        {scenes.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={s.label}
            aria-current={i === active ? "step" : undefined}
            className="group flex size-10 cursor-pointer items-center justify-center focus-visible:outline-none"
          >
            <span
              className={cn(
                "block rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-ring",
                i === active ? "h-6 w-1.5 bg-primary" : "size-1.5 bg-white/35 group-hover:bg-white/70",
              )}
            />
          </button>
        ))}
      </nav>
    </>
  );
}

/** Words that light up one by one as the scene clock advances from `from` to `to`. */
export function ScrubWords({
  text,
  from = 0,
  to = 1,
  className,
}: {
  text: string;
  from?: number;
  to?: number;
  className?: string;
}) {
  const { local } = useSceneClock();
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <ScrubWord
          key={`${w}-${i}`}
          local={local}
          a={from + ((to - from) * i) / words.length}
          b={from + ((to - from) * (i + 1)) / words.length}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </ScrubWord>
      ))}
    </span>
  );
}

function ScrubWord({
  local,
  a,
  b,
  children,
}: {
  local: MotionValue<number>;
  a: number;
  b: number;
  children: React.ReactNode;
}) {
  const opacity = useTransform(local, [a, b], [0.18, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/** Index (0..count-1) that advances evenly across the scene's span. */
export function useSceneStep(count: number, lead = 0.15) {
  const { local, span } = useSceneClock();
  const [step, setStep] = useState(0);
  useMotionValueEvent(local, "change", (v) => {
    const usable = Math.max(0.001, span - lead * 2);
    const s = Math.min(count - 1, Math.max(0, Math.floor(((v - lead) / usable) * count)));
    setStep(s);
  });
  return step;
}
