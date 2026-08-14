# Service LP

Single-page, conversion-focused landing page for a lead-gen agency serving Canadian drafting and design firms. Built to [`PRD_Landing_Page.md`](PRD_Landing_Page.md).

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Zod.

---

## ⚠️ Before this goes live

Two things are outstanding, both flagged deliberately rather than guessed at.

### 1. The copy is placeholder

PRD §3 names **`Landing_Page_Copy_Drafting.md`** as the verbatim copy source of truth. That file was not supplied with this build, so every string on the page is placeholder text written to the *structure* the PRD specifies (section order, item counts, named entities).

All of it lives in one file: **[`content/copy.ts`](content/copy.ts)**. Replace the strings there with the copy doc and the whole page updates — no component changes needed. Every section component is presentational and reads exclusively from that file.

Item counts already match the PRD: stats 3 · qualifier 8 + 8 · steps 3 · features 6 · comparison 5 + 5 · case studies 3 · FAQ 5.

Strings the PRD *does* specify (the CTA label, "The DraftFlow Framework", the case-study client names, the form field labels, etc.) are marked `PRD-SPECIFIED` in comments and should survive the swap.

### 2. `BRAND` is a placeholder

`BRAND` in `content/copy.ts` is set to the literal string `[Your Brand]`, rendered with brackets on purpose so it cannot ship unnoticed. Set that one constant and it propagates to the nav, footer, comparison table, page title, and OG image.

Assets from PRD §12 that are still outstanding render as clearly-marked dashed placeholders. Find them all with:

```bash
grep -rn "AssetPlaceholder\|PLACEHOLDER" app components content
```

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build       # production build
npm start           # serve the production build
npm run typecheck   # tsc --noEmit
```

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `LEAD_WEBHOOK_URL` | **Yes** | Where validated leads are forwarded. Provider-agnostic — a CRM endpoint, a Zapier/Make catch hook, or an email service webhook. Without it `/api/lead` returns 503 and logs the lead server-side rather than dropping it. |
| `NEXT_PUBLIC_META_PIXEL_ID` | No | Meta Pixel. The pixel is not mounted at all when unset. |
| `NEXT_PUBLIC_SITE_URL` | Before deploy | Production origin, used for canonical URL, OG tags, and the sitemap. |

## Deploying to Vercel

```bash
npx vercel        # preview
npx vercel --prod # production
```

Set the three environment variables in the Vercel project settings first. No other configuration is needed — the API route runs on the Node.js runtime by default.

---

## How it is put together

```
app/
  layout.tsx            Fonts, metadata, Meta Pixel, skip link, no-JS fallback
  page.tsx              Assembles the 15 sections in PRD order
  globals.css           Design tokens, type scale, ticker keyframes, reduced motion
  api/lead/route.ts     Lead handler: validate → honeypot → rate limit → forward
  opengraph-image.tsx   Generated 1200×630 social card
  icon.svg              Placeholder favicon
  robots.ts sitemap.ts
components/
  sections/             One component per page section
  ui/                   CTAButton, TrustLine, StatBar, Reveal, ChatBubble,
                        StickyMobileCTA, AssetPlaceholder
content/copy.ts         ← all page copy
lib/
  validation.ts         Zod schema shared by client and server
  analytics.ts          Meta Pixel helpers
  cn.ts
```

### Design tokens

All colour, radius, and type-scale values are CSS variables in the `@theme` block at the top of `app/globals.css`. Retune there and the whole page follows.

The palette is one accent plus neutrals, and every pairing is WCAG-AA verified against the surface it actually sits on:

| Token | Value | Used on | Ratio |
| --- | --- | --- | --- |
| `accent` | `#2563EB` | white text (primary CTA) | 5.17:1 |
| `accent-up` | `#6E9BFF` | accent text on ink | 7.29:1 |
| `muted` | `#9CA3AF` | body text on ink | 7.74:1 |
| `muted-on-light` | `#4B5563` | body text on white | 7.56:1 |

### The lead form

`components/sections/LeadForm.tsx` and `app/api/lead/route.ts` share the Zod schema in `lib/validation.ts`, so client and server never disagree about what is valid.

- Inline errors, with focus moved to the first invalid field on a failed submit.
- Submitting disables the button and shows a spinner; success replaces the form entirely; server errors surface in an `role="alert"`.
- Meta Pixel `Lead` fires on success.
- Honeypot: the schema accepts the `website` field permissively and the **route** inspects it, returning a normal `200 {ok:true}` without forwarding. Rejecting it in the schema would return a 422 naming the field, which tells a bot exactly what tripped it.
- Rate limit: 5 submissions per IP per minute, in-memory. Fine for a single instance — move to Vercel KV or Upstash if this is ever scaled horizontally.

### Chat bubble

`components/ui/ChatBubble.tsx` is a wired placeholder (PRD §15 puts a real chat backend out of scope). It dispatches a `chat:open` window event. To attach a real widget, replace the body of `handleOpen` with that widget's open call.

---

## Verified

Checked against a production build (`npm run build && npm start`) driven with Playwright and Chrome:

| Check | Result |
| --- | --- |
| Lighthouse mobile — Performance | **92** |
| Lighthouse mobile — Accessibility | **100** |
| Lighthouse mobile — Best Practices | **100** |
| Lighthouse mobile — SEO | **100** |
| axe-core (WCAG 2.1 A + AA), 375px and 1280px | **0 violations** |
| Horizontal overflow at 375 / 768 / 1200px | none |
| Console / page errors | none |
| Lead API: valid, invalid, honeypot, rate limit | all correct |
| Mobile menu, Escape-to-close, accordion, sticky CTA, form flow | all pass |

Notes on the remaining performance headroom: LCP is 3.3 s on the simulated mobile throttle, dominated by ~107 KiB of unused first-load JS (Framer Motion, which PRD §4 mandates). If that needs to come down, the cheapest win is swapping the scroll reveals for an IntersectionObserver + CSS transition and keeping Framer Motion only for the stat counters.

### Accessibility

One `h1` (hero) with a logical heading order below it, landmark regions, a skip link as the first tab stop, labelled inputs, visible focus states, ≥44px tap targets, keyboard-operable nav/accordion/carousel/form, and `prefers-reduced-motion` honoured globally (reveals, counters, and ticker all stand down).

Framer Motion serialises `opacity:0` into the SSR HTML for scroll reveals, so `app/layout.tsx` carries a `<noscript>` rule that forces those elements visible — without it the page renders blank with JavaScript disabled.
