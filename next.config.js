/** @type {import('next').NextConfig} */
const envImageUnoptimize = process.env.NODE_ENV !== "production" ? false : true;
const hosts = ["0.gravatar.com", "1.gravatar.com", "2.gravatar.com"];

const nextConfig = {
  output: process.env.NODE_ENV !== "production" ? undefined : "export",
  images: {
    remotePatterns: hosts.map((host) => ({
      protocol: "https",
      hostname: host,
    })),

    unoptimized: envImageUnoptimize,
  },
};

module.exports = nextConfig;
