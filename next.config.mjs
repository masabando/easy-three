/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "max-age=0",
          }
        ]
      }
    ]
  },
  output: "export",
  //distDir: "docs",
  distDir: "out",
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
};

export default nextConfig;
