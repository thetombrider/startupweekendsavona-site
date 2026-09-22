import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [85, 75],
  },
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
