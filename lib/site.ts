/** Site-wide constants (name, contact, links). Edit here, not in components. */
export const site = {
  name: "Kongphob Wangfaen",
  shortName: "Kongphob",
  role: "Creative Video Editor",
  focus: ["Storytelling", "Motion Graphics", "Visual Direction"],
  tagline: "I don’t just edit videos. I build the way stories are experienced.",
  description:
    "Kongphob Wangfaen, Creative Video Editor: storytelling, motion graphics and visual direction for documentary, product review, commercial, cinematic, podcast and social content.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://synysterpeaxhes.github.io/kp-portfolio",
  email: "kpsynyster.work@gmail.com",
  phoneDisplay: "+66 65 751 2475",
  phoneHref: "tel:+66657512475",
  /** YouTube video used as the muted hero background loop. */
  heroVideoId: "bLo_oQSDNK8",
} as const;
