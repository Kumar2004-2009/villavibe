import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a0.muscache.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: "ngiisizuilzftcobbluu.supabase.co",
        port: '',
      },
      {
        protocol: 'https',
        hostname: "lh3.googleusercontent.com",
        port: '',
      }

    ]
  }
};

export default nextConfig;
