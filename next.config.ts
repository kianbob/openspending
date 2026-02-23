import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/pentagon-spending', destination: '/pentagon-deep-dive', permanent: true },
      { source: '/doge-savings-reality', destination: '/doge-reality', permanent: true },
      { source: '/countries', destination: '/international-spending', permanent: true },
    ];
  },
};

export default nextConfig;
