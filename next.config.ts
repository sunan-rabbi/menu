/* eslint-disable @typescript-eslint/no-explicit-any */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack configuration (empty config to silence the warning)
  turbopack: {},

  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.(pdf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/[hash][ext]'
      }
    });
    return config;
  },

  // Updated to use remotePatterns instead of deprecated domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

module.exports = nextConfig;
