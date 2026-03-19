const path = require("path");

/** @type {import('next').NextConfig} */

module.exports = {
  output: "standalone",
  turbopack: {
    root: path.join(__dirname),
  },
  allowedDevOrigins: ["192.168.1.211"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "*.vercel.com",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "content.tinajs.io",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        // TODO add to documentation that this needs to be added for the tina admin to work properly
        hostname: "tienholzdesign.at",
        port: "",
        search: "",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};
