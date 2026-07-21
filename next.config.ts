import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  basePath: process.env.NODE_ENV === 'production' ? '/FinanceOS' : '',
};

export default nextConfig;
