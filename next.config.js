/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/customers",
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
