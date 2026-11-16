import type { Metadata } from "next";
import { WorksBrowser } from "@/components/works-browser";

export const metadata: Metadata = {
  title: "Works",
  description: "Luxury cinematic, podcast, variety and short-form work edited by Kongphob Wangfaen.",
};

export default function WorksPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-14 pb-24 sm:px-6 md:pt-20 lg:px-8">
      <h1 className="mb-8 text-[clamp(2.25rem,7vw,4rem)] leading-none font-bold tracking-[0.04em] uppercase">
        Works
      </h1>
      <WorksBrowser />
    </div>
  );
}
