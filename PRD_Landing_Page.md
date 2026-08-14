# PRD — [Your Brand] Landing Page
### Lead-generation site for Canadian drafting businesses

**Owner:** [Your Name]
**Build agent:** Claude Code
**Status:** Ready to build
**Last updated:** 2026-08-13

---

## 1. Summary

Build a single-page, conversion-focused marketing landing page for [Your Brand], an agency that runs paid-ads funnels for Canadian drafting and design firms. The page sells one outcome: qualified consults booked into the firm's calendar on autopilot. The primary call to action, repeated throughout, is a lead form ("See If You Qualify").

This is a static marketing site with one dynamic piece: a lead-capture form. No login, no dashboard, no CMS.

---

## 2. Goals and success criteria

- Convert cold and warm traffic (mostly Meta ads) into submitted lead forms.
- Load fast, look premium on mobile first, and read as high-trust.
- Every section drives toward the form. The CTA is never more than one scroll away.

**Definition of success:** a fully responsive page that matches the copy document exactly, mirrors the reference layout's structure and energy, submits the lead form reliably, and scores 90+ on Lighthouse Performance, Accessibility, Best Practices, and SEO on mobile.

---

## 3. Reference materials and source of truth

Two inputs are attached to this build. Treat them differently.

1. **`Landing_Page_Copy_Drafting.md` — the copy source of truth.** Every headline, subhead, button label, list item, table cell, testimonial, FAQ, and trust line comes from this file, verbatim. Do not rewrite, shorten, or "improve" the copy. Implement it as written. Section order in that file is the section order on the page.

2. **`Evoweb.pdf` — visual and layout inspiration only.** Use it to understand section rhythm, component types, spacing energy, and the conversion-page feel (bold hero, stat bars, for-you/not-for-you split, 3-step framework, feature grid, comparison table, results block, FAQ accordion, sticky CTA, floating chat bubble). Do NOT copy its text, its brand name, its colors, or its images. It is a different company. It is a structural mood board, nothing more.

If the copy file and the PDF ever disagree, the copy file wins.

---

## 4. Tech stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **UI primitives:** shadcn/ui for the accordion, inputs, and buttons (optional but preferred)
- **Icons:** lucide-react
- **Animation:** Framer Motion for scroll reveals and stat counters
- **Fonts:** self-hosted via next/font. Use a bold geometric sans for headlines and a clean neutral sans for body (e.g. a Helvetica-style display face for headings, Inter for body). Match the weight contrast seen in the reference.
- **Deployment target:** Vercel
- **Form backend:** Next.js Route Handler (`/api/lead`) that validates and forwards the submission (see section 9).

A plain static HTML + Tailwind build is an acceptable fallback if Next.js is overkill for the hosting plan, but Next.js is preferred for SEO, the API route, and image optimization.

---

## 5. Project structure

```
/app
  /layout.tsx          Root layout, fonts, metadata, analytics
  /page.tsx            Assembles all sections in order
  /api/lead/route.ts   Lead form handler
/components
  /sections            One component per page section (see section 7)
  /ui                  Shared primitives (Button, StatBar, TrustLine, CTAButton, ChatBubble)
/content
  copy.ts              All copy imported from the copy doc, typed and centralized
/public
  /images              Supplied assets
/lib
  validation.ts        Zod schema for the lead form
```

Put all copy in `/content/copy.ts` so text lives in one place and the sections stay presentational.

---

## 6. Design system

The reference is a high-contrast, conversion-first trade page. Recreate that energy with [Your Brand]'s own look. Choose real values and expose them as Tailwind theme tokens and CSS variables so they are easy to retune.

- **Palette:** a dark, confident base with one high-energy accent for CTAs and emphasis. Suggested starting point: near-black ink (#0B0B0F), clean white surfaces, a strong accent (e.g. an electric blue or safety-orange) reserved for buttons, the eyebrow alert, and key numbers. Keep it to one accent plus neutrals.
- **Type scale:** oversized bold hero headline (clamp from ~34px mobile to ~64px desktop), section headlines ~28 to 44px, body 16 to 18px, captions 13 to 14px. Tight line-height on headlines, relaxed on body.
- **Buttons:** one primary CTA style used everywhere ("See If You Qualify"), large tap target, high contrast, subtle hover lift. A secondary/ghost variant for the nav.
- **Cards:** soft radius (12 to 16px), light borders or subtle shadows, generous padding.
- **Layout width:** max content width ~1200px, comfortable section vertical padding (~80 to 120px desktop, ~56px mobile).
- **Tone:** premium, punchy, trustworthy. Not clip-arty.

---

## 7. Page sections (in order)

Each maps to a section in the copy doc. Build one component per section. Layout notes describe structure; pull all text from the copy file.

1. **Nav bar (sticky).** Logo left ([Your Brand]), anchor links center or right (How It Works, What You Get, Our Reviews), primary CTA button right (See If You Qualify). Collapses to a mobile menu. Stays pinned on scroll with a slight background blur once scrolled.

2. **Hero.** Red-alert eyebrow, oversized headline, subtext, a video placeholder card with the video title and presenter name, primary CTA, and the trust line beneath. Reserve a 16:9 video embed slot (accept a YouTube/Vimeo/Wistia URL via prop).

3. **Stats bar.** Three large numbers with captions, evenly split. Numbers animate up on scroll into view. Below it, the "CLIENTS WE PARTNERED WITH:" label with a logo strip slot.

4. **Section headline.** The single centered "You Don't Need More Leads" line as a full-width band.

5. **Problem / agitation block.** The stacked short-line copy. Render as centered, rhythmic short paragraphs with clear vertical spacing. The three "system does three things" items render as three highlighted rows or chips. Ends with CTA + trust line.

6. **Qualifier section (For you / Not for you).** Two columns side by side on desktop, stacked on mobile. Green checks on the left column, muted x marks on the right. Eight rows each. CTA + trust line below.

7. **3-step framework.** Headline + subtext naming The DraftFlow Framework. Three numbered steps with title and description. Include the small qualification-chat UI mock as a stylized chat card near the steps (the "What city / Victoria / survey ready?" exchange). Repeat the stats bar at the bottom.

8. **What Gets Built (feature grid).** Six feature cards in a responsive grid (3 x 2 desktop, 1 col mobile), each with title and description. Below the grid, a horizontal scrolling proof ticker (the "$1M+ Revenue Generated ..." line). CTA + trust line.

9. **Ad showcase.** Section headline plus a grid or carousel of ad-creative image slots (supplied assets). Placeholder frames if assets are not yet provided.

10. **Comparison table.** Two-column table, [Your Brand] versus Typical Agencies, five rows each. Left column visually favored (accent header, checks); right column muted (x marks). CTA + trust line.

11. **Results / social proof.** Headline, subtext, the proof badge, then three case-study cards (Sepura Home, myco:soul, kitchen appliance brand) each with the summary text and room for the numeric callouts. These are real results, present them cleanly with the metrics emphasized.

12. **Qualify / application section.** Headline, the three numbered value props (Done-For-You system, Instant filtering, 3x guarantee) on one side, the lead form on the other (stacked on mobile). This is the primary conversion block. See section 9 for the form.

13. **FAQ.** Accordion of five questions with the answers from the copy doc. One open at a time, smooth expand. CTA + trust line.

14. **Final CTA.** Bold closing headline, subtext, one last primary CTA button, full-width accent band.

15. **Footer.** Brand mark, copyright line, repeated nav links.

**Global elements:**
- **Sticky mobile CTA:** a pinned bottom bar on mobile with the primary CTA once the user scrolls past the hero.
- **Floating chat bubble:** a persistent bottom-right "Have a question? 👋 Ask me!" bubble. Wire it to a placeholder handler (or a chat widget embed slot) that is easy to swap.
- **Trust line + CTA pattern:** repeated between most sections. Build these once as shared components and reuse.

---

## 8. Lead form

**Fields (from the copy doc):** Full Name, Email address, Phone number, Business Name. All required except where noted.

**Behavior:**
- Client-side validation with clear inline errors. Validate email format and a plausible phone.
- Use a shared Zod schema in `/lib/validation.ts` for both client and server.
- On submit: disable the button, show a loading state, then a success state ("Thanks, we'll be in touch within 48 hours" or similar) that replaces the form. Handle and display server errors gracefully.
- POST to `/api/lead`. The handler validates, then forwards the lead. Make the destination pluggable via env var: support a generic webhook URL (`LEAD_WEBHOOK_URL`) so it can point at a CRM, Zapier, or an email service. Do not hardcode a provider.
- Never store secrets in the client bundle. Spam protection: add a honeypot field and basic rate limiting on the route.

---

## 9. Interactions and animation

- Subtle fade-and-rise on section entry (Framer Motion, respecting `prefers-reduced-motion`).
- Stat numbers count up when the stats bar enters the viewport.
- Proof ticker scrolls horizontally, pauses on hover, loops seamlessly.
- Accordion expands smoothly, one item at a time.
- Buttons lift slightly on hover, press on click.
- Keep all animation tasteful and fast. Nothing should delay content or block interaction.

---

## 10. Responsive and accessibility

- **Mobile first.** Design and verify at 375px, then 768px, then 1200px+.
- All tap targets at least 44px. No horizontal scroll except the intentional ticker and any ad carousel.
- Semantic HTML: one h1 (hero), logical heading order, landmark regions, labelled form inputs, alt text on all images.
- Full keyboard operability for nav, accordion, form, and CTAs. Visible focus states.
- Color contrast meets WCAG AA.
- Honor `prefers-reduced-motion`.

---

## 11. SEO, analytics, performance

- **Metadata:** set title and description via Next metadata. Suggested title: "[Your Brand] | Booked Projects for Canadian Drafting Firms". Description drawn from the hero promise. Add Open Graph and Twitter tags and an OG image slot.
- **Analytics:** include a Meta Pixel, pixel ID via env var (`NEXT_PUBLIC_META_PIXEL_ID`). Fire a Lead event on successful form submit. Leave a slot for Google Analytics if wanted.
- **Performance:** optimize images with next/image, lazy-load below-the-fold media, self-host fonts, minimize JS. Target Lighthouse 90+ across the board on mobile.
- Add a favicon, robots.txt, and a sitemap.

---

## 12. Assets to supply

Claude Code should scaffold with clearly labelled placeholders where assets are missing, so nothing blocks the build:

- Logo (light and dark), favicon
- Hero video URL (or a poster image if no video yet)
- Client / brand logos for the "CLIENTS WE PARTNERED WITH" strip
- Ad-creative images for the ad showcase
- Case-study images for the results section
- OG social image

---

## 13. Environment and deployment

- `.env.example` with: `LEAD_WEBHOOK_URL`, `NEXT_PUBLIC_META_PIXEL_ID`, and any chat widget key.
- README with local dev, env setup, and a one-command Vercel deploy.
- Clean, componentized, typed code with sensible commits.

---

## 14. Acceptance criteria (definition of done)

- [ ] All 15 sections present, in the copy doc's order, text matching the copy doc verbatim.
- [ ] Fully responsive at 375 / 768 / 1200px with no layout breakage.
- [ ] Lead form validates, submits to `/api/lead`, forwards to the webhook, and shows success and error states.
- [ ] Meta Pixel fires a Lead event on submit.
- [ ] Sticky nav, sticky mobile CTA, floating chat bubble, and repeated CTA/trust-line blocks all work.
- [ ] Stat counters, scroll reveals, ticker, and accordion all function and respect reduced motion.
- [ ] Lighthouse 90+ (Performance, Accessibility, Best Practices, SEO) on mobile.
- [ ] No console errors. Placeholders clearly marked for any missing asset.

---

## 15. Out of scope

- Multi-page site, blog, or CMS
- User accounts or auth
- Payment or checkout
- Actual chat/AI backend (bubble is a wired placeholder only)
- Copywriting changes (copy is final in the copy doc)

---

## 16. Suggested build sequence

1. Scaffold Next.js + Tailwind + fonts + theme tokens.
2. Centralize copy in `/content/copy.ts`.
3. Build shared UI (Button, CTAButton, TrustLine, StatBar, ChatBubble, sticky nav, footer).
4. Build sections top to bottom, wiring copy as you go.
5. Build the lead form + API route + validation + success/error states.
6. Add animations, then analytics and SEO.
7. Responsive pass, accessibility pass, Lighthouse pass.
8. README, env example, deploy.
