/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optional separate build folder, so a production build can run alongside `next dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable webpack filesystem caching in dev to prevent Windows PackFileCacheStrategy ENOENT rename errors
      config.cache = false;
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
