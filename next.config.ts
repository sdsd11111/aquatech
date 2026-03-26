import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "D:/Abel paginas/Aquatech/Crm Aquatech",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
