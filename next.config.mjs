const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://*.google-analytics.com https://cdnjs.cloudflare.com https://*.googlesyndication.com https://*.doubleclick.net https://www.google.com https://ep2.adtrafficquality.google",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.doubleclick.net https://cdn.jsdelivr.net https://latest.currency-api.pages.dev https://cdnjs.cloudflare.com https://ep1.adtrafficquality.google",
  "worker-src 'self' blob: https://cdnjs.cloudflare.com",
  "frame-src https://googleads.g.doubleclick.net https://*.googlesyndication.com https://tpc.googlesyndication.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: { optimizePackageImports: ['lucide-react'] },
  // Send the old default Vercel domain to the real domain so Google sees one site, not two.
  // Only the exact production host matches, so Vercel preview URLs (e.g. bd-tools-hub-git-*.vercel.app) still work for testing.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bd-tools-hub.vercel.app" }],
        destination: "https://bdtoolsflow.cyou/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=(), payment=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          // Report-Only first: it logs problems in the browser console but blocks nothing. Switch to "Content-Security-Policy" after checking ads, analytics, PDF and QR tools show no violations.
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
  // Safe switch: set STRICT_BUILD=1 in Vercel (Environment Variables) to make the build fail on TypeScript/lint errors.
  // Without it the build behaves as before, so the live site cannot break by surprise.
  typescript: { ignoreBuildErrors: process.env.STRICT_BUILD !== "1" },
  eslint: { ignoreDuringBuilds: process.env.STRICT_BUILD !== "1" },
};
export default nextConfig;
