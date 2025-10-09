/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.dummyjson.com',
      'images.unsplash.com',
      'images.pexels.com' // Add this line
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // Add this pattern
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;