/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["i.dummyjson.com", "dummyjson.com", "cdn.dummyjson.com","images.remotePatterns.com"],
  },

};

export default nextConfig;
