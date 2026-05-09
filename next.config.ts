import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        // Devicons CDN used in tech-stack orbiting display
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/**",
      },
    ],
  },
};

export default nextConfig;
