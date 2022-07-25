/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
};

const { withSuperjson } = require("next-superjson");

module.exports = withSuperjson()(nextConfig);
