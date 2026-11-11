/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Allows instant local SVGs, PNGs and data URLs without external sharp dependency issues
  },
};

export default nextConfig;
