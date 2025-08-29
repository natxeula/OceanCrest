/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the 'output: "export"' configuration if you want to use API routes dynamically
  images: {
    unoptimized: true
  },
  basePath: '/OceanCrest'
}

module.exports = nextConfig
