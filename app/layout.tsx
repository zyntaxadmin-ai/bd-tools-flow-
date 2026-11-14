
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { LangProvider } from "@/lib/lang";
import { siteConfig } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "BD Tools Flow - Free Online Tools for Bangladesh",
    template: "%s | BD Tools Flow",
  },
  description:
    "ফ্রি অনলাইন টুলস: Age Calculator, GPA Calculator, bKash Calculator, Word Counter ও আরও অনেক কিছু। Fast, Free, No Signup.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: "BD Tools Flow - Free Online Tools for Bangladesh",
    description:
      "ফ্রি অনলাইন টুলস: Age Calculator, GPA Calculator, bKash Calculator, Word Counter ও আরও অনেক কিছু। Fast, Free, No Signup.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BD Tools Flow - Free Online Tools for Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BD Tools Flow - Free Online Tools for Bangladesh",
    description: "Free online tools for Bangladesh. Fast, free, no signup.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Google AdSense
  const adsenseId =
    process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-3581088994822973";

  // Chat widget switch (default: OFF). To show it again, set NEXT_PUBLIC_CHATBOT=on in Vercel and redeploy.
  const chatbotEnabled = process.env.NEXT_PUBLIC_CHATBOT === "on";

  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2. Denied by default in EEA/UK/CH until the visitor accepts; granted elsewhere unless the visitor declined. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
var c=null;try{c=localStorage.getItem('bdtf-consent');}catch(e){}
var d=c==='denied'?'denied':'granted';
if(c!=='granted'&&c!=='denied'){gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',region:['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH'],wait_for_update:500});}
gtag('consent','default',{ad_storage:d,ad_user_data:d,ad_personalization:d,analytics_storage:d});`,
          }}
        />
        {adsenseId ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>

      <body className={inter.className}>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N78SKNNJ9Z"
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('js', new Date());
              gtag('config', 'G-N78SKNNJ9Z');
            `,
          }}
        />

        <a href="#main" className="skip-link">Skip to content</a>
        <ThemeProvider>
          <LangProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <CookieConsent />
          </LangProvider>
        </ThemeProvider>

        {/* BD Flow Helper Chat Widget (hidden unless NEXT_PUBLIC_CHATBOT=on) */}
        {chatbotEnabled ? <Script src="/chatbot.js?v=1" strategy="lazyOnload" /> : null}
      </body>
    </html>
  );
  }
        
