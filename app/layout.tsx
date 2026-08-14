import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Manrope } from "next/font/google";
import { META_PIXEL_ID } from "@/lib/analytics";
import { meta } from "@/content/copy";
import "./globals.css";

/* Self-hosted at build time by next/font (PRD §4, §11) — no runtime request to
   Google, no layout shift. Manrope is the bold display face, Inter the body. */
const display = Manrope({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: meta.title,
    description: meta.description,
    siteName: meta.title,
    // OG image comes from app/opengraph-image.tsx (file convention), so there
    // is no images[] entry here.
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${display.variable} ${body.variable}`}>
      <body>
        {/*
          Framer Motion serialises the scroll-reveal start state (opacity:0) into
          the SSR HTML, so with JavaScript disabled the page would render blank.
          Force those elements visible when JS is off.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>

        {/* Skip link — first tab stop (PRD §10). */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-accent-fg"
        >
          Skip to content
        </a>

        {children}

        {/* Meta Pixel (PRD §11). Only mounted when an ID is configured. */}
        {META_PIXEL_ID ? (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        ) : null}

        {/* PRD §11 — Google Analytics slot. Add NEXT_PUBLIC_GA_ID and a
            <Script src="https://www.googletagmanager.com/gtag/js?id=…" /> here
            if GA is wanted alongside the pixel. */}
      </body>
    </html>
  );
}
