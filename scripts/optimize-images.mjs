// Converts the full-size source images in assets/source (not deployed) into
// resized WebP files in public/images, which is what the site serves.
// Run: npm run images
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const dir = path.resolve("assets/source");
const outDir = path.resolve("public/images");
const jobs = {
  // Profile photo supplied 2026-11-15.
  "profile-2026.webp": { out: "portrait.webp", width: 1000 },
  // K A Luxury Travel reel covers, saved from the Instagram embeds (2026-11-15).
  "ka-DeozhzGCHRW.jpg": { out: "ka-orient-express.webp", width: 540 },
  "ka-Det5DZtjZVW.jpg": { out: "ka-explora-journeys.webp", width: 540 },
  "ka-DfCfY7_CUVb.jpg": { out: "ka-3-countries.webp", width: 540 },
  "ka-DfR8J7ZDZuA.jpg": { out: "ka-mediterranean.webp", width: 540 },
  // AASB YouTube Shorts covers (i.ytimg.com oar2 frames).
  "short-cJhgqHAgX_I.jpg": { out: "short-money-leak.webp", width: 540 },
  "short-TVnRjjIDiEg.jpg": { out: "short-elements.webp", width: 540 },
  "short--6wTiHzibjE.jpg": { out: "short-chaturong.webp", width: 540 },
  "short-82ViwFU5oc8.jpg": { out: "short-kali.webp", width: 540 },
};

for (const file of await readdir(dir)) {
  const job = jobs[file];
  if (!job) continue;
  const info = await sharp(path.join(dir, file))
    .rotate()
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(outDir, job.out));
  console.log(`${file} -> ${job.out} ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB`);
}
