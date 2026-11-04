import fs from "fs";

// If a previous production build left a BUILD_ID in .next, clear it when running dev
// to prevent "Cannot find module './xxx.js'" chunk mismatch errors between prod and dev.
const isDev = process.argv.some((arg) => arg.includes("dev"));
if (isDev && fs.existsSync(".next/BUILD_ID")) {
  try {
    fs.rmSync(".next", { recursive: true, force: true });
  } catch {}
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optional separate build folder, so a production build can run alongside `next dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  webpack: (config, { dev }) => {
    if (dev) {
      // Use in-memory caching in development to prevent Windows PackFileCacheStrategy
      // ENOENT rename errors while keeping module references intact.
      config.cache = { type: "memory" };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};
export default nextConfig;
