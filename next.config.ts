/* eslint-disable @typescript-eslint/no-explicit-any */
/** @type {import('next').NextConfig} */
const nextConfig = {
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

  // Add this to allow images from Cloudinary
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'localhost']
  },
};

module.exports = nextConfig;
