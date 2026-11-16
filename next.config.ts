import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * The site is served from https://<user>.github.io/kp-portfolio, so the deploy
 * workflow sets NEXT_PUBLIC_BASE_PATH=/kp-portfolio. Locally it stays empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
