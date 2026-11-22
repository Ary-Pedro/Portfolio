/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return ['v1', 'v2', 'v3'].map((version) => ({
      source: `/images/projetos/${version}/:path*`,
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    }))
  },
}

export default nextConfig
