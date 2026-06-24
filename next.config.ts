import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a minimal, self-contained server bundle for Docker.
  // See node_modules/next/dist/docs/01-app/01-getting-started/17-deploying.md
  output: "standalone",
};

export default nextConfig;
