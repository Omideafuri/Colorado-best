import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/*': ['./node_modules/pg-cloudflare/**/*'],
  },
  serverExternalPackages: ['pg', 'pg-cloudflare'],
};

export default nextConfig;
