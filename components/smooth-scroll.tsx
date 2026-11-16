"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

let instance: Lenis | null = null;

/** The running Lenis instance (null when reduced motion is on or before mount). */
export function getLenis() {
  return instance;
}

/**
 * Inertia ("buttery") wheel scrolling for the whole site, so scroll-driven
 * scenes glide instead of jumping one wheel notch at a time.
 * Touch devices keep native scrolling. Reduced-motion visitors get a shorter,
 * less floaty glide rather than none, because the home page is built around it.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    instance = new Lenis({ autoRaf: true, lerp: reduce ? 0.2 : 0.08, wheelMultiplier: 0.9 });
    return () => {
      instance?.destroy();
      instance = null;
    };
  }, []);
  return null;
}
