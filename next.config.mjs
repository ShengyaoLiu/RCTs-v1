// next.config.mjs
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "RCTs"; // your exact repo name (case-sensitive)

export default {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath:   isProd ? `/${repo}` : undefined,
  assetPrefix: isProd ? `/${repo}/` : undefined,
  // optional
  typescript: { ignoreBuildErrors: true },
};
