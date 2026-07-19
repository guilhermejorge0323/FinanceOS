import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  output: "export",

  images: {
    unoptimized: true,
  },

  basePath: process.env.NODE_ENV === "production" ? "/FinanceOS" : "",
};

export default nextConfig;
