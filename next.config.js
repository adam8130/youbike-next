/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/stations',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
