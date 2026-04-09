import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix: Force correct workspace root to prevent Client Component resolution errors
  // Without this, Next.js picks up D:\Abel paginas\package-lock.json as root
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cesarweb.b-cdn.net',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
