/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: "en",
    localeDetection: false,
    locales: ["en", "ja"],
  },
  optimizeFonts: true,
  pageExtensions: ["page.jsx", "page.tsx"],
  productionBrowserSourceMaps: false,
  reactStrictMode: false,
}

export default nextConfig
