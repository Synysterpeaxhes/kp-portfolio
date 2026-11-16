"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  ChevronDown,
  Clapperboard,
  Film,
  Lightbulb,
  Mail,
  Phone,
  Shapes,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { HeroBackground, HeroContent } from "@/components/hero";
import { ScrollStory, ScrubWords, useSceneClock, useSceneStep, type Scene } from "@/components/scroll-story";
import { WorkThumb } from "@/components/work-thumb";
import { cn } from "@/lib/utils";
import {
  experience,
  philosophy,
  process,
  profile,
  services,
  strengths,
  type ServiceIcon,
} from "@/lib/profile";
import { site } from "@/lib/site";
import { works } from "@/lib/works";
import portrait from "@/public/images/portrait.webp";

const featured = works.filter((w) => w.featured).slice(0, 3);

const icons: Record<ServiceIcon, LucideIcon> = {
  film: Film,
  lightbulb: Lightbulb,
  shapes: Shapes,
  audio: AudioLines,
  clapperboard: Clapperboard,
  sparkles: Sparkles,
};

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8 md:pr-16 lg:px-10";
const thai = "leading-[1.8]";

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-primary uppercase">{children}</p>;
}

/* ---------- scenes ---------- */

function IntroScene() {
  const { local } = useSceneClock();
  const hint = useTransform(local, [0, 0.3], [1, 0]);
  return (
    <div className="relative">
      <HeroContent />
      <motion.div
        style={{ opacity: hint }}
        className="mt-12 flex flex-col items-center gap-1 text-[0.7rem] tracking-[0.3em] text-white/55 uppercase"
      >
        Scroll
        <ChevronDown className="size-4 animate-bounce" aria-hidden />
      </motion.div>
    </div>
  );
}

function TaglineScene() {
  const [first, second] = splitTagline(site.tagline);
  return (
    <div className={cn(wrap, "max-w-5xl")}>
      <p className="text-[clamp(2rem,6.5vw,4.75rem)] leading-[1.08] font-semibold tracking-tight text-balance">
        <ScrubWords text={first} from={0.05} to={0.55} />{" "}
        <ScrubWords text={second} from={0.5} to={1.15} className="text-primary" />
      </p>
    </div>
  );
}

function splitTagline(t: string): [string, string] {
  const i = t.indexOf(". ");
  return i < 0 ? [t, ""] : [t.slice(0, i + 1), t.slice(i + 2)];
}

function ProfileScene() {
  return (
    <div className={cn(wrap, "grid items-center gap-6 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-14 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]")}>
      <div className="relative mx-auto aspect-[4/5] w-36 overflow-hidden rounded-2xl ring-1 ring-border sm:w-44 md:w-full">
        <Image
          src={portrait}
          alt="Portrait of Kongphob Wangfaen"
          placeholder="blur"
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 768px) 17rem, 11rem"
          className="object-cover object-top"
        />
      </div>
      <div>
        <Kicker>Profile</Kicker>
        <div lang="th" className={cn("space-y-3 text-[0.95rem] text-white/80 sm:text-lg", thai)}>
          <p className="text-lg text-foreground sm:text-2xl">{profile[0]}</p>
          <p>{profile[1]}</p>
        </div>
      </div>
    </div>
  );
}

function BeliefScene() {
  return (
    <div className={cn(wrap, "max-w-4xl")}>
      <div lang="th" className={cn("space-y-6 text-lg text-white/80 sm:text-2xl", thai)}>
        <p>{profile[2]}</p>
        <p className="text-foreground">
          <ScrubWords text={profile[3]} from={0.1} to={0.85} />
        </p>
      </div>
    </div>
  );
}

function ServicesScene({ part }: { part: 0 | 1 }) {
  const items = services.slice(part * 3, part * 3 + 3);
  return (
    <div className={wrap}>
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-10">
        <div>
          <Kicker>Core services & skills</Kicker>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">
            {part === 0 ? "What I bring to a project" : "From the cut to the finish"}
          </h2>
        </div>
        <span className="hidden text-sm text-white/50 tabular-nums sm:block">{part + 1} / 2</span>
      </div>
      <ul className="grid gap-3 sm:gap-5 md:grid-cols-3">
        {items.map((s) => {
          const Icon = icons[s.icon];
          return (
            <li
              key={s.title}
              className="flex gap-4 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-md sm:p-6 md:block"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold sm:text-lg md:mt-5">{s.title}</h3>
                <p lang="th" className={cn("mt-1 text-sm text-white/65 md:mt-2", thai)}>
                  {s.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Numbered list where the scroll position picks the highlighted step. */
function StepScene({
  kicker,
  title,
  items,
}: {
  kicker: string;
  title: string;
  items: { title: string; detail: string }[];
}) {
  const step = useSceneStep(items.length);
  return (
    <div className={cn(wrap, "grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center md:gap-14")}>
      <div>
        <Kicker>{kicker}</Kicker>
        <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
        <p className="mt-4 hidden text-[clamp(4rem,10vw,8rem)] leading-none font-bold text-white/10 tabular-nums md:block">
          {String(step + 1).padStart(2, "0")}
        </p>
      </div>
      <ol className="border-t border-white/10">
        {items.map((it, i) => {
          const on = i === step;
          return (
            <li key={it.title} className="border-b border-white/10 py-3 sm:py-4">
              <div className="flex items-baseline gap-4">
                <span className={cn("text-sm font-semibold tabular-nums transition-colors duration-500", on ? "text-primary" : "text-white/30")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={cn("text-base font-semibold transition-colors duration-500 sm:text-xl", on ? "text-foreground" : "text-white/40")}>
                  {it.title}
                </h3>
              </div>
              <div
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                  on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <p lang="th" className={cn("overflow-hidden pl-9 text-sm text-white/70 sm:text-base", thai)}>
                  <span className="block pt-2">{it.detail}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function PhilosophyScene() {
  const { local } = useSceneClock();
  const body = useTransform(local, [0.55, 0.95], [0, 1]);
  const bodyY = useTransform(local, [0.55, 0.95], [16, 0]);
  return (
    <div className={cn(wrap, "max-w-4xl text-center")}>
      <Kicker>Creative philosophy</Kicker>
      <h2 className="text-[clamp(2.4rem,8vw,5.5rem)] leading-[1.02] font-bold tracking-tight text-balance">
        <ScrubWords text={philosophy.title} from={0.05} to={0.55} />
      </h2>
      <motion.div
        lang="th"
        style={{ opacity: body, y: bodyY }}
        className={cn("mx-auto mt-6 max-w-2xl space-y-2 text-[0.95rem] text-white/70 sm:mt-8 sm:space-y-3 sm:text-lg", thai)}
      >
        {philosophy.body.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </motion.div>
    </div>
  );
}

function StrengthsScene() {
  return (
    <div className={wrap}>
      <div className="mb-5 sm:mb-8">
        <Kicker>Key strengths</Kicker>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">How I work</h2>
      </div>
      <ul className="grid divide-y divide-white/10 border-y border-white/10 sm:grid-cols-2 sm:gap-4 sm:divide-y-0 sm:border-0 lg:grid-cols-3">
        {strengths.map((s) => (
          <li
            key={s.title}
            className="py-2.5 sm:rounded-2xl sm:border sm:border-white/10 sm:bg-black/45 sm:p-5 sm:backdrop-blur-md"
          >
            <h3 className="flex items-center gap-2.5 text-[0.95rem] font-semibold sm:text-base">
              <span aria-hidden className="size-1.5 rounded-full bg-primary" />
              {s.title}
            </h3>
            <p lang="th" className={cn("mt-1 text-[0.82rem] text-white/65 sm:text-sm", thai)}>
              {s.detail}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkScene() {
  return (
    <div className={wrap}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-8">
        <div>
          <Kicker>Selected work</Kicker>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">Recent projects</h2>
        </div>
        <Link
          href="/works/"
          className="group inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-white/70 hover:text-foreground"
        >
          All works
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-3 sm:gap-5">
        {featured.map((w) => (
          <WorkThumb key={w.slug} work={w} rowOnMobile />
        ))}
      </div>
    </div>
  );
}

function ContactScene() {
  return (
    <div className={cn(wrap, "max-w-3xl text-center")}>
      <Kicker>Contact</Kicker>
      <h2 className="text-[clamp(2rem,6vw,4rem)] leading-tight font-semibold tracking-tight text-balance">
        Have a project in mind?
      </h2>
      <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-8px] shadow-primary/70 transition hover:bg-primary/90"
        >
          <Mail className="size-4 shrink-0" aria-hidden />
          <span className="truncate">{site.email}</span>
        </a>
        <a
          href={site.phoneHref}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-black/30 px-6 text-sm font-semibold backdrop-blur-md transition hover:bg-white/10"
        >
          <Phone className="size-4" aria-hidden />
          {site.phoneDisplay}
        </a>
      </div>
    </div>
  );
}

/* ---------- background ---------- */

function StoryBackground({ t }: { t: MotionValue<number> }) {
  // Showreel stays put; it dims and drifts as the story moves on, with a red glow
  // that wanders across the stage so the backdrop never feels static.
  const videoOpacity = useTransform(t, [0, 1.2, 14], [1, 0.38, 0.3]);
  const videoScale = useTransform(t, [0, 14], [1, 1.15]);
  const glowX = useTransform(t, [0, 4, 8, 12, 15], ["70%", "20%", "75%", "30%", "50%"]);
  const glowY = useTransform(t, [0, 4, 8, 12, 15], ["20%", "70%", "30%", "75%", "40%"]);
  const glow = useTransform(
    [glowX, glowY] as MotionValue<string>[],
    ([x, y]: string[]) => `radial-gradient(40rem 30rem at ${x} ${y}, rgb(229 38 47 / 0.16), transparent 70%)`,
  );
  return (
    <>
      <motion.div className="absolute inset-0" style={{ opacity: videoOpacity, scale: videoScale }}>
        <HeroBackground />
      </motion.div>
      <motion.div aria-hidden className="absolute inset-0" style={{ backgroundImage: glow }} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px)] [background-size:calc(100%/6)_100%]"
      />
    </>
  );
}

/* ---------- story ---------- */

const scenes: Scene[] = [
  { id: "intro", label: "Intro", span: 1, content: <IntroScene /> },
  { id: "tagline", label: "Tagline", span: 1.4, content: <TaglineScene /> },
  { id: "profile", label: "Profile", span: 1, content: <ProfileScene /> },
  { id: "belief", label: "Profile", span: 1.2, content: <BeliefScene /> },
  { id: "services-1", label: "Services", span: 1, content: <ServicesScene part={0} /> },
  { id: "services-2", label: "Services", span: 1, content: <ServicesScene part={1} /> },
  {
    id: "process",
    label: "Process",
    span: 2.5,
    content: <StepScene kicker="Creative process" title="From brief to final cut" items={process} />,
  },
  { id: "philosophy", label: "Philosophy", span: 1.5, content: <PhilosophyScene /> },
  {
    id: "experience",
    label: "Experience",
    span: 2.5,
    content: <StepScene kicker="Selected experience" title="Project categories" items={experience} />,
  },
  { id: "strengths", label: "Strengths", span: 1, content: <StrengthsScene /> },
  { id: "work", label: "Work", span: 1, content: <WorkScene /> },
  { id: "contact", label: "Contact", span: 1, content: <ContactScene /> },
];

/**
 * Home page as scroll-driven scenes. Visitors who ask for reduced motion get the
 * same scenes with plain cross-fades (no movement, scaling or blur).
 */
export function HomeStory() {
  const reduce = useReducedMotion() ?? false;
  return <ScrollStory scenes={scenes} gentle={reduce} background={(t) => <StoryBackground t={t} />} />;
}
