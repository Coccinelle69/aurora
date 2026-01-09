import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack: (config) => {
  //   config.watchOptions = { poll: 1000, aggregateTimeout: 300 };
  //   return config;
  // },
  // turbopack: {},
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/**", // allow any path from this host
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
