/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90, 95],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

// const withPWA: import("next").NextConfig = {
//   ...nextConfig,
//   pwa: {
//     dest: "public",
//   },
// };

export default nextConfig;
