import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude test files from build
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(
    (ext) => !ext.includes('test')
  ),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
