/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["img.clerk.com"],
  },
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@the-bank/api", "@the-bank/db"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
