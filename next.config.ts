import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/bookshelf",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
