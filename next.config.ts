import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/startup-weekend-2025",
        destination: "/edizioni/2025",
        permanent: true,
      },
      {
        source: "/startup-weekend-2024",
        destination: "/edizioni/2024",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
