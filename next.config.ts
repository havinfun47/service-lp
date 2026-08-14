import path from "node:path";
import type { NextConfig } from "next";

/**
 * Configured for a static export deployed to GitHub Pages at
 * https://havinfun47.github.io/service-lp/
 *
 * Consequences of `output: "export"` (see README "Deployment"):
 *   - No server at runtime, so there is no /api/lead route handler. The lead
 *     form posts straight to NEXT_PUBLIC_LEAD_ENDPOINT from the browser.
 *   - next/image optimization is unavailable, hence `unoptimized`.
 *   - Everything is served under the /service-lp subpath, hence `basePath`.
 */
const repo = "/service-lp";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repo,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  // Emit `about/index.html` style paths, which GitHub Pages resolves cleanly.
  trailingSlash: true,
  // An unrelated package.json in the home directory makes Turbopack infer the
  // wrong workspace root. Pin it to this project.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
