import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "thumb.wikimedia.org",
        pathname: "/wikipedia/commons/thumb/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "media.springernature.com",
        pathname: "/full/springer-static/image/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "media.springernature.com",
        pathname: "/lw685/springer-static/image/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
