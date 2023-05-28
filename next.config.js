/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["i.ytimg.com", "yt3.ggpht.com", "yt3.googleusercontent.com"],
  },
  env: {
    RAPIDKEY1: process.env.RAPIDKEY1,
  },
};

module.exports = nextConfig;
