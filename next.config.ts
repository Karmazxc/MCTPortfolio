import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable strict TypeScript checking to catch errors at build time
  // This prevents runtime errors that could cause "page couldn't load" issues
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      {
        source: "/admin/dashboard",
        destination: "/admin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
