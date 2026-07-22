/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  //distDir: "docs",
  distDir: "out",
  reactStrictMode: false,
  // optimizeFonts: false,
  images: {
    unoptimized: true
  },
  assetPrefix: "/easy-three",
  basePath: "/easy-three",
  trailingSlash: true,
  allowedDevOrigins: ["bmini.local", "mair.local", "172.20.0.79"],
  // experimental: {
  //   urlImports: [
  //     "https://cdn.jsdelivr.net",
  //     "https://fonts.googleapis.com",
  //   ]
  // }
};

export default nextConfig;
