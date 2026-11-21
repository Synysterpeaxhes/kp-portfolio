import type { StaticImageData } from "next/image";
import ka3Countries from "@/public/images/ka-3-countries.webp";
import kaExplora from "@/public/images/ka-explora-journeys.webp";
import kaMediterranean from "@/public/images/ka-mediterranean.webp";
import kaOrientExpress from "@/public/images/ka-orient-express.webp";
import shortChaturong from "@/public/images/short-chaturong.webp";
import shortElements from "@/public/images/short-elements.webp";
import shortKali from "@/public/images/short-kali.webp";
import shortMoneyLeak from "@/public/images/short-money-leak.webp";

export type Category = "review" | "luxury" | "cinematic" | "podcast" | "variety" | "short";

export type Source =
  | { kind: "youtube"; id: string }
  | { kind: "drive"; id: string }
  | { kind: "tiktok"; id: string }
  | { kind: "instagram"; id: string };

export interface Work {
  /** Stable key, also used for React keys. */
  slug: string;
  title: string;
  description: string;
  category: Category;
  source: Source;
  /** Cover image: 16:9 for landscape cards, 9:16 for vertical cards. */
  thumbnail?: StaticImageData | string;
  /** Shown on the home page "Recent projects" scene (landscape works only). */
  featured?: boolean;
}

/**
 * Display order on the Works page. `vertical` categories use 9:16 cards that
 * play in place; the others use 16:9 cards that open a player dialog.
 */
export const categories: { id: Category; label: string; vertical: boolean }[] = [
  { id: "review", label: "Product Review", vertical: false },
  { id: "luxury", label: "Luxury Cinematic", vertical: true },
  { id: "cinematic", label: "Trailer & Teaser", vertical: false },
  { id: "podcast", label: "Podcast", vertical: false },
  { id: "variety", label: "Variety", vertical: false },
  { id: "short", label: "Short-form", vertical: true },
];

const yt = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

const driveThumb = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1280`;

// Selection supplied by the site owner on 2026-11-15. Of the earlier works only
// the two Harbinger House pieces were kept.
export const works: Work[] = [
  // Product review (added 2026-11-21). Owner did storyline, pacing, edit, motion graphics,
  // colour grading, voice-over, SFX and BGM.
  {
    slug: "mybest-whitening-toothpaste",
    title: "ยาสีฟันไวท์เทนนิ่ง ยี่ห้อไหนดี? ทดสอบ 10 แบรนด์",
    description:
      "mybest Thailand · Product Review 8 นาที วางโครงเรื่อง จัด Pace ตัดต่อ Motion Graphics เกรดสี พากย์เสียง SFX และ BGM",
    category: "review",
    source: { kind: "youtube", id: "nMibBQgaAYk" },
    thumbnail: yt("nMibBQgaAYk"),
    featured: true,
  },

  // Harbinger House (stage play)
  {
    slug: "harbinger-house-trailer",
    title: "Harbinger House (Trailer)",
    description: "Official trailer of the Harbinger House stage play project.",
    category: "cinematic",
    source: { kind: "drive", id: "1f7MM7bODFeFkia07lrWn92dOVMvTpeoY" },
    thumbnail: driveThumb("1f7MM7bODFeFkia07lrWn92dOVMvTpeoY"),
  },
  {
    slug: "harbinger-house-teaser",
    title: "Harbinger House Teaser",
    description: "Teaser for the Harbinger House project.",
    category: "cinematic",
    source: { kind: "youtube", id: "L_MOTl_8qBk" },
    thumbnail: "https://i.ytimg.com/vi/L_MOTl_8qBk/maxresdefault.jpg",
  },

  // K A Luxury Travel (Instagram reels)
  {
    slug: "ka-orient-express",
    title: "Discover the World of Orient Express",
    description: "K A Luxury Travel: รถไฟหรู พระราชวังเก่าแก่ และการเดินทางเหนือผืนน้ำ",
    category: "luxury",
    source: { kind: "instagram", id: "DeozhzGCHRW" },
    thumbnail: kaOrientExpress,
  },
  {
    slug: "ka-explora-journeys",
    title: "Explore a New World of Luxury with Explora Journeys",
    description: "K A Luxury Travel: การเดินทางที่มากกว่าการไปถึงจุดหมาย",
    category: "luxury",
    source: { kind: "instagram", id: "Det5DZtjZVW" },
    thumbnail: kaExplora,
  },
  {
    slug: "ka-3-countries",
    title: "3 Countries • 10 Days | One Exceptional Journey",
    description: "K A Luxury Travel: เมืองเก่า วัฒนธรรมท้องถิ่น และ Luxury Cruise ในยุโรป",
    category: "luxury",
    source: { kind: "instagram", id: "DfCfY7_CUVb" },
    thumbnail: ka3Countries,
  },
  {
    slug: "ka-mediterranean",
    title: "Grand Mediterranean Riviera & Island Escape",
    description: "K A Luxury Travel: ทะเลเมดิเตอร์เรเนียนบน Explora I",
    category: "luxury",
    source: { kind: "instagram", id: "DfR8J7ZDZuA" },
    thumbnail: kaMediterranean,
  },

  // AASB podcast (YouTube)
  {
    slug: "aasb-ep4",
    title: "มูตั้งนานทำไมไม่ปัง? เช็กด่วน มูผิดวิธีชีวิตเลยติดลบ!",
    description: "AASB As Above So Below · EP.4 · 49:02",
    category: "podcast",
    source: { kind: "youtube", id: "fQRS9F6cOBQ" },
    thumbnail: yt("fQRS9F6cOBQ"),
    featured: true,
  },
  {
    slug: "aasb-ep3",
    title: "มีแบบนี้ดวงจะดีกี่โมง",
    description: "AASB As Above So Below · EP.3 · 50:21",
    category: "podcast",
    source: { kind: "youtube", id: "J9UiSlqkBoE" },
    thumbnail: yt("J9UiSlqkBoE"),
  },
  {
    slug: "aasb-ep2",
    title: "ดวงแบบนี้ ชีวิตแบบไหน",
    description: "AASB As Above So Below · EP.2 · 58:11",
    category: "podcast",
    source: { kind: "youtube", id: "XZFNd1g23VU" },
    thumbnail: yt("XZFNd1g23VU"),
  },
  {
    slug: "aasb-ep1",
    title: "As Above, So Below โหราศาสตร์ เพราะทุกสิ่งล้วนสัมพันธ์กัน",
    description: "AASB As Above So Below · EP.1 · 46:57",
    category: "podcast",
    source: { kind: "youtube", id: "MHxF7WgWnT0" },
    thumbnail: yt("MHxF7WgWnT0"),
  },

  // Variety (YouTube)
  {
    slug: "take-hormones-ep5",
    title: "Take Hormones Thailand EP.5 (Full)",
    description: "รายการวาไรตี้ · ตอนเต็ม",
    category: "variety",
    source: { kind: "youtube", id: "R5R2zHCZ74Q" },
    thumbnail: yt("R5R2zHCZ74Q"),
    featured: true,
  },

  // AASB short-form (YouTube Shorts; the four most viewed on the AASB Facebook page)
  {
    slug: "short-money-leak",
    title: "ดวงมีแบบนี้ เงินรั่วไหล เหมือนไหลผ่านมือ",
    description: "AASB · ศาสตร์จีน",
    category: "short",
    source: { kind: "youtube", id: "cJhgqHAgX_I" },
    thumbnail: shortMoneyLeak,
  },
  {
    slug: "short-elements",
    title: "ดวงมีธาตุแบบนี้ ชีวิตย่อมไม่ธรรมดา",
    description: "AASB · ศาสตร์จีน",
    category: "short",
    source: { kind: "youtube", id: "TVnRjjIDiEg" },
    thumbnail: shortElements,
  },
  {
    slug: "short-chaturong",
    title: "จตุรงคโชค ใช้สีถูกดวง โชติช่วงตลอดไป",
    description: "AASB · โหราศาสตร์ไทย",
    category: "short",
    source: { kind: "youtube", id: "-6wTiHzibjE" },
    thumbnail: shortChaturong,
  },
  {
    slug: "short-kali",
    title: "“ดาวกาลี” ไม่น่ากลัว ถ้าไม่มี “กำลัง”",
    description: "AASB · โหราศาสตร์ไทย",
    category: "short",
    source: { kind: "youtube", id: "82ViwFU5oc8" },
    thumbnail: shortKali,
  },
];

/** Embed URL for the in-page player. Autoplay only for click-to-play players. */
export function embedUrl(source: Source, autoplay = false): string {
  switch (source.kind) {
    case "youtube":
      return `https://www.youtube-nocookie.com/embed/${source.id}?rel=0&playsinline=1${autoplay ? "&autoplay=1" : ""}`;
    case "drive":
      return `https://drive.google.com/file/d/${source.id}/preview`;
    case "tiktok":
      return `https://www.tiktok.com/player/v1/${source.id}?description=0&music_info=0&rel=0`;
    case "instagram":
      return `https://www.instagram.com/p/${source.id}/embed/`;
  }
}

/** Link to watch the work on its original platform. */
export function externalUrl(source: Source): string {
  switch (source.kind) {
    case "youtube":
      return `https://www.youtube.com/watch?v=${source.id}`;
    case "drive":
      return `https://drive.google.com/file/d/${source.id}/view`;
    case "tiktok":
      return `https://www.tiktok.com/@tiktok/video/${source.id}`;
    case "instagram":
      return `https://www.instagram.com/p/${source.id}/`;
  }
}
