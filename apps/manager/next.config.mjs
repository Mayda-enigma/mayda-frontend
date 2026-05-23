/** @type {import('next').NextConfig} */
const nextConfig = {
  // `eslint` was removed in Next 16. Lint runs via the standalone ESLint CLI now.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
