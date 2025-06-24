/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },  typescript: {
    // Enable strict type checking during build
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
