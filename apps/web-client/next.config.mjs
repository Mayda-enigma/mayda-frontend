/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Suppress warnings for platform-specific SWC binaries not present on this machine
    config.infrastructureLogging = { level: 'error' };
    return config;
  },
}

export default nextConfig
