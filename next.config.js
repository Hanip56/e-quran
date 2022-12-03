/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
};

const { withSuperjson } = require("next-superjson");

module.exports = withSuperjson()(nextConfig);
