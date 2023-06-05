/* eslint-disable @typescript-eslint/no-var-requires */
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
    RAPIDKEY2: process.env.RAPIDKEY2,
    RAPIDKEY3: process.env.RAPIDKEY3,
    RAPIDKEY4: process.env.RAPIDKEY4,
    ONEKEY: process.env.ONEKEY,
  },
};

module.exports = nextConfig;
