import type { NextConfig } from "next";

// Static export: the site is plain HTML/CSS/JS, so it can be hosted anywhere.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
