import withBundleAnalyzer from '@next/bundle-analyzer';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.medium.com",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
      {protocol: 'https',
        hostname: 'cdn-images-1.medium.com',}
    ],
  },

};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);