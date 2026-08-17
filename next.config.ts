import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Required: do not consume Vercel image-optimization limits.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    optimizePackageImports: ["@react-pdf/renderer"],
  },
};

export default nextConfig;
