import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/admin",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/**",
      },
    ],
    qualities: [25, 50, 75, 100],
  },
  reactStrictMode: false,
};

export default nextConfig;
