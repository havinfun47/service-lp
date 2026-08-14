# Service LP

Single-page, conversion-focused landing page for a lead-gen agency serving Canadian drafting and design firms. Built to [`PRD_Landing_Page.md`](PRD_Landing_Page.md).

Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS v4 · Framer Motion · Zod.

**Live:** https://havinfun47.github.io/service-lp/

---

## ⚠️ Three things before this is really live

### 1. Turn on the GitHub Actions deploy — *required, one-time*

The repo now ships a workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that builds the site and publishes it. It will not take effect until Pages is switched off Jekyll:

> **Settings → Pages → Build and deployment → Source → "GitHub Actions"**

Until that is flipped, Pages keeps running its default Jekyll pipeline, which renders `README.md` and `PRD_Landing_Page.md` as plain markdown pages instead of serving the app. That is exactly why the URL showed the PRD.

### 2. Set the lead endpoint — *the form does not work without it*

This is a **static** build with no server, so the browser posts leads directly to a third-party endpoint. Set it as a repository **variable** (not a secret — see below):

> **Settings → Secrets and variables → Actions → Variables → New repository variable**
> `NEXT_PUBLIC_LEAD_ENDPOINT` = your Formspree form URL, Zapier/Make catch hook, or CRM inbound URL

With it unset, the form validates normally but shows an error on submit and logs to the console. It deliberately does **not** fake a success state — a lead that was never delivered must not look delivered.

> ⚠️ **This URL is public.** Anything prefixed `NEXT_PUBLIC_` is baked into the JavaScript bundle and readable by anyone. Use an endpoint that only *accepts* submissions and carries no account secret. Never put an API key there. This is the security cost of static hosting, and it is the one PRD §8 requirement this deployment target cannot meet — see [Deployment trade-offs](#deployment-trade-offs).

### 3. The copy is placeholder

PRD §3 names **`Landing_Page_Copy_Drafting.md`** as the verbatim copy source of truth. That file was never supplied, so every string on the page is placeholder text written to the *structure* the PRD specifies (section order, item counts, named entities).

All of it lives in one file: **[`content/copy.ts`](content/copy.ts)**. Replace the strings there and the whole page updates — no component changes. Every section component is presentational and reads exclusively from that file.

Item counts already match the PRD: stats 3 · qualifier 8 + 8 · steps 3 · features 6 · comparison 5 + 5 · case studies 3 · FAQ 5. Strings the PRD *does* specify (the CTA label, "The DraftFlow Framework", the case-study client names, the form field labels) are marked `PRD-SPECIFIED` in comments and should survive the swap.

`BRAND` is set to the literal `[Your Brand]`, rendered with brackets on purpose so it cannot ship unnoticed. Set that one constant and it propagates to the nav, footer, comparison table, page title, and OG image.

Outstanding assets from PRD §12 render as clearly-marked dashed placeholders:

```bash
grep -rn "AssetPlaceholder\|PLACEHOLDER" app components content
```

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000/service-lp
```

Note the `/service-lp` path even locally — `basePath` is set so the build matches the GitHub Pages project-site URL.

```bash
npm run build       # static export to ./out
npm run typecheck   # tsc --noEmit
```

`npm start` is not useful here: `output: "export"` produces plain files, so serve `./out` with any static server instead.

## Environment

All three are `NEXT_PUBLIC_*`, baked in at build time and publicly visible. Set them as repository **Variables**, not Secrets — GitHub masks secrets in logs, which does nothing for values already embedded in shipped JavaScript, and the masking gives a false sense of protection.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_LEAD_ENDPOINT` | **Yes** | Where the browser posts leads. Must send permissive CORS headers (Formspree and Zapier catch hooks do). |
| `NEXT_PUBLIC_META_PIXEL_ID` | No | Meta Pixel. Not mounted at all when unset. |
| `NEXT_PUBLIC_SITE_URL` | No | Public origin for canonical/OG tags and the sitemap. Defaults to the Pages URL. |

---

## Deployment trade-offs

The PRD (§4, §8) specifies Vercel with a `/api/lead` Route Handler. GitHub Pages cannot run server code, so choosing it meant three deliberate losses:

| PRD requirement | Status on GitHub Pages |
| --- | --- |
| `/api/lead` route validates server-side | **Removed.** Validation is client-side only; anyone can post to the endpoint directly. |
| Webhook URL kept out of the client bundle (§8) | **Not possible.** The endpoint is public by construction. |
| Server-side rate limiting (§8) | **Removed.** Rely on the form provider's own spam controls (Formspree and Zapier both have them). |

Kept: the shared Zod schema still validates in the browser, and the honeypot still works — a filled honeypot shows the success state and silently drops the submission, so bots learn nothing.

The deleted route handler is preserved in git history at commit `3bade69` and can be restored verbatim if this ever moves to Vercel. Switching back means: restore `app/api/lead/route.ts`, drop `output/basePath/trailingSlash` from `next.config.ts`, and point the form at `/api/lead` again.

---

## How it is put together

```
.github/workflows/deploy.yml   Build + publish to GitHub Pages
app/
  layout.tsx            Fonts, metadata, Meta Pixel, skip link, no-JS fallback
  page.tsx              Assembles the 15 sections in PRD order
  globals.css           Design tokens, type scale, ticker keyframes, reduced motion
  opengraph-image.tsx   Generated 1200×630 social card
  icon.svg              Placeholder favicon
  robots.ts sitemap.ts
components/
  sections/             One component per page section
  ui/                   CTAButton, TrustLine, StatBar, Reveal, ChatBubble,
                        StickyMobileCTA, AssetPlaceholder
content/copy.ts         ← all page copy
lib/
  validation.ts         Zod schema
  analytics.ts          Meta Pixel helpers
  cn.ts
public/.nojekyll        Stops Pages mangling the _next directory
```

### Design tokens

Colour, radius, and type-scale values are CSS variables in the `@theme` block at the top of `app/globals.css`. Retune there and the whole page follows. One accent plus neutrals, every pairing WCAG-AA verified against the surface it actually sits on:

| Token | Value | Used on | Ratio |
| --- | --- | --- | --- |
| `accent` | `#2563EB` | white text (primary CTA) | 5.17:1 |
| `accent-up` | `#6E9BFF` | accent text on ink | 7.29:1 |
| `muted` | `#9CA3AF` | body text on ink | 7.74:1 |
| `muted-on-light` | `#4B5563` | body text on white | 7.56:1 |

### Chat bubble

`components/ui/ChatBubble.tsx` is a wired placeholder (PRD §15 puts a real chat backend out of scope). It dispatches a `chat:open` window event. To attach a real widget, replace the body of `handleOpen`.

---

## Verified

Checked against the actual static export, served under the `/service-lp` prefix with gzip and cache headers to match GitHub Pages, driven with Playwright and Chrome:

| Check | Result |
| --- | --- |
| Lighthouse mobile — Performance | **93** |
| Lighthouse mobile — Accessibility | **100** |
| Lighthouse mobile — Best Practices | **100** |
| Lighthouse mobile — SEO | **100** |
| axe-core (WCAG 2.1 A + AA), 375px and 1280px | **0 violations** |
| Horizontal overflow at 375 / 768 / 1200px | none |
| Console / page errors | none |
| CSS, self-hosted fonts, OG image, favicon at the subpath | all load |
| Hydration (accordion, menu, sticky CTA) | works |
| Form: invalid, valid, honeypot, endpoint-unset | all correct |

Measure performance on a compression-enabled server. A plain static server without gzip scores ~75 and blames "enable text compression" for ~881 KiB — an artifact of the test server, not the build. GitHub Pages compresses automatically.

Remaining headroom: LCP is 3.2 s on the simulated mobile throttle, dominated by first-load JS from Framer Motion (PRD §4 mandates it). The cheapest win is swapping the scroll reveals for IntersectionObserver + CSS transitions and keeping Framer Motion only for the stat counters.

### Accessibility

One `h1` (hero) with a logical heading order below it, landmark regions, a skip link as the first tab stop, labelled inputs, visible focus states, ≥44px tap targets, keyboard-operable nav/accordion/carousel/form, and `prefers-reduced-motion` honoured globally.

Framer Motion serialises `opacity:0` into the prerendered HTML for scroll reveals, so `app/layout.tsx` carries a `<noscript>` rule forcing those elements visible — without it the page renders blank with JavaScript disabled.
