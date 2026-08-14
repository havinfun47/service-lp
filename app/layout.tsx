import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { META_PIXEL_ID } from "@/lib/analytics";
import { meta } from "@/content/copy";
import "./globals.css";

/*
  Fonts are vendored into app/fonts/ and loaded with next/font/local (PRD §4:
  self-hosted via next/font). Deliberately NOT next/font/google — that resolves
  Google Fonts URLs at build time from metadata bundled with Next, and the
  Manrope entries currently 404 against fonts.gstatic.com, which fails any
  clean build (CI included). Vendoring removes the network from the build
  entirely and makes it reproducible.

  Both files are the latin subset of the upstream variable font, so one file
  covers the whole weight range. Licensed under the SIL Open Font License —
  see app/fonts/OFL.txt.
*/
const display = localFont({
  src: "./fonts/manrope-latin-var.woff2",
  weight: "400 800",
  style: "normal",
  variable: "--font-display-face",
  display: "swap",
});

const body = localFont({
  src: "./fonts/inter-latin-var.woff2",
  weight: "400 700",
  style: "normal",
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
