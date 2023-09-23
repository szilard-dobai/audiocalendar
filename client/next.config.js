/** @type {import('next').NextConfig} */

require("dotenv").config({ path: "../.env" });

const nextConfig = {
  images: {
    domains: ["i.scdn.co"],
  },
};

module.exports = nextConfig;
