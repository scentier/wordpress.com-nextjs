/** @type {import('next').NextConfig} */
const hosts = ["0.gravatar.com", "1.gravatar.com", "2.gravatar.com"];

const nextConfig = {
  output: "export",
  images: {
    remotePatterns: hosts.map((host) => ({
      protocol: "https",
      hostname: host,
    })),

    unoptimized: false,
  },
};

module.exports = nextConfig;
