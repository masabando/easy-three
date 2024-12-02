/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "../docs",
  reactStrictMode: false,
  optimizeFonts: false,
  images: {
    unoptimized: true
  },
  assetPrefix: "/easy-three",
  basePath: "/easy-three",
  trailingSlash: true,
  experimental: {
    urlImports: [
      "https://cdn.jsdelivr.net",
      "https://fonts.googleapis.com",
    ]
  }
}

module.exports = nextConfig
