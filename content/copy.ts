/* ===========================================================================
   ALL PAGE COPY LIVES HERE (PRD §5)
   ---------------------------------------------------------------------------
   ⚠️  PLACEHOLDER COPY — NOT THE SOURCE OF TRUTH.

   The PRD (§3) names `Landing_Page_Copy_Drafting.md` as the verbatim copy
   source of truth. That file was not supplied with this build, so every string
   below is placeholder text written to the *structure* the PRD specifies
   (section order, item counts, named entities) so the page could be built end
   to end without blocking.

   TO GO LIVE: replace the strings in this file with the copy doc, verbatim.
   Nothing else needs to change — every section component is presentational and
   reads exclusively from this file. Item counts are what the PRD mandates:
     stats 3 · qualifier 8 + 8 · steps 3 · features 6 · comparison 5 + 5
     · case studies 3 · FAQ 5

   Strings that ARE specified by the PRD itself (not invented here) are marked
   `PRD-SPECIFIED` and should survive the swap unless the copy doc says
   otherwise.
   =========================================================================== */

/** PRD-SPECIFIED as "[Your Brand]" — a real brand name was never supplied.
 *  Rendered with brackets on purpose so it is impossible to ship by accident.
 *  Set this one constant and it propagates everywhere. */
export const BRAND = "[Your Brand]";

/** PRD-SPECIFIED §7 — the single primary CTA label, repeated site-wide. */
export const CTA_LABEL = "See If You Qualify";

/** PRD-SPECIFIED §7 — the trust line under every CTA. */
export const TRUST_LINE = "Trusted by 25+ Canadian drafting firms";

export const nav = {
  /** PRD-SPECIFIED §7 — anchor links. */
  links: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "What You Get", href: "#what-you-get" },
    { label: "Our Reviews", href: "#our-reviews" },
  ],
} as const;

export const hero = {
  eyebrow: "FOR CANADIAN DRAFTING AND DESIGN FIRMS READY TO SCALE",
  /** Split so the accent-highlighted phrases can be styled individually. */
  headline: [
    { text: "Here's the " },
    { text: "Exact System", accent: true },
    { text: " We Use to Book " },
    { text: "Qualified Consults", accent: true },
    { text: " Into Canadian Drafting Firms on Autopilot." },
  ],
  subtext:
    "Watch the step-by-step breakdown of the funnel that fills drafting calendars with pre-qualified consults — without cold calling, chasing, or hiring an admin.",
  video: {
    /** PRD §12 — supply a YouTube/Vimeo/Wistia URL. Null renders the poster
     *  placeholder card instead of an iframe. */
    url: null as string | null,
    title: "How We Book Qualified Consults for Canadian Drafting Firms",
    presenter: "[Presenter Name]",
    posterAlt: "Placeholder — supply hero video poster image",
  },
} as const;

/** PRD-SPECIFIED §7 — three stats, animated count-up. `value` is the number to
 *  count to; `prefix`/`suffix` bracket it. */
export const stats = [
  { value: 1000000, prefix: "$", suffix: "+", display: "$1M+", caption: "In Booked Project Value\nfor Our Clients" },
  { value: 562, prefix: "", suffix: "+", display: "562+", caption: "Qualified Consults Booked\nfor Our Clients" },
  { value: 25, prefix: "", suffix: "+", display: "25+", caption: "Drafting & Design\nFirms Helped" },
] as const;

/** PRD-SPECIFIED §7 — label above the client logo strip. */
export const clientsLabel = "CLIENTS WE PARTNERED WITH:";

/** PRD §12 — supply real client logos. Placeholder frames render until then. */
export const clientLogos = [
  { name: "[Client Logo 1]" },
  { name: "[Client Logo 2]" },
  { name: "[Client Logo 3]" },
  { name: "[Client Logo 4]" },
] as const;

/** PRD-SPECIFIED §7 §4 — the full-width centred band. */
export const sectionHeadline = "You Don't Need More Leads. You Need More Booked Projects.";

export const problem = {
  /** Rhythmic short lines, rendered as spaced stanzas (PRD §7.5). */
  stanzas: [
    ["You're here because you're tired of guessing.", "Some months the calendar is full.", "Some months you're staring at gaps."],
    [
      "Word of mouth is not a plan.",
      "Referrals are not predictable.",
      "Boosting a post is not marketing.",
      'And "more leads" just means more chasing.',
    ],
    ["You don't need more noise.", "You need a system that does three things, every day."],
  ],
  /** PRD-SPECIFIED §7.5 — the three "system does three things" items, rendered
   *  as highlighted rows. */
  systemDoes: [
    "Gets the right people to raise their hand",
    "Filters out the tyre-kickers fast",
    "Books real consults into your calendar",
  ],
  closing: [
    ["Because the real problem isn't your drafting.", "It's what happens after someone enquires."],
    ["Most firms lose good projects for one reason.", "No speed. No follow-up. No clear next step."],
    ["So the enquiry goes cold.", "Someone else replies faster.", "And you lose the project."],
    [
      "A simple pipeline that turns ad clicks into qualified booked consults.",
      "So you stop chasing and start choosing better projects.",
      "So you can scale without hiring extra admin or living on your phone.",
    ],
  ],
} as const;

export const qualifier = {
  headline: "This Is For You If You Want Booked Projects Without Chasing Leads.",
  forYouLabel: "For you if",
  notForYouLabel: "Not for you if",
  /** PRD-SPECIFIED §7.6 — eight rows each. */
  forYou: [
    "You want more consistent project volume",
    "You want to stop relying on referrals alone",
    "You're sick of tyre-kickers and price shoppers",
    "You want a system that runs even when you're busy",
    "You can handle more work and want steadier volume",
    "You want ads that bring real enquiries in your area",
    "You want a clear plan and straight answers",
    "You want results without lock-in contracts",
  ],
  notForYou: [
    "You're not licensed or not yet operating",
    "You've got no capacity for new work",
    "Your margins are too thin to advertise",
    "You want results without doing your part",
    "You're shopping for the cheapest agency",
    'You want to "try it for a week"',
    "You hate quoting and following up",
    "You expect leads to close themselves",
  ],
} as const;

export const framework = {
  headline: "How You Get Qualified Booked Consults in 3 Easy Steps.",
  /** PRD-SPECIFIED §7.7 — names The DraftFlow Framework. */
  subtext:
    "The DraftFlow Framework is the backbone behind every campaign we run — a proven 3-part process that turns ad clicks into booked consults on autopilot.",
  steps: [
    {
      title: "Ads that demand attention",
      description:
        "We build hard-hitting ads that reach homeowners and builders in your service area, filter out price shoppers, and drive the kind of enquiries that actually turn into drawings.",
    },
    {
      title: "Landing pages engineered to convert",
      description:
        "Clean layouts, a clear offer, and real proof that builds trust. We don't design for looks. We design to generate qualified enquiries and lock in consults.",
    },
    {
      title: "The system that books projects for you",
      description:
        "No chasing. No missed calls. No admin headaches. Just qualified enquiries turning into booked consults every day, on autopilot.",
    },
  ],
  /** PRD-SPECIFIED §7.7 — the stylized qualification-chat mock. */
  chatMock: [
    { from: "system" as const, text: "What city is the project located in?" },
    { from: "lead" as const, text: "Victoria" },
    { from: "system" as const, text: "Perfect — and is the survey ready?" },
  ],
} as const;

export const whatGetsBuilt = {
  headline: "What Gets Built For You.",
  /** PRD-SPECIFIED §7.8 — six feature cards. `icon` maps to a lucide icon in
   *  the section component. */
  features: [
    {
      icon: "megaphone",
      title: "Scroll-Stopping Meta Ads",
      description:
        "Ads designed to hit your target market's pain points and drive real action. Every headline, image, and offer grabs attention and generates enquiries ready to book.",
    },
    {
      icon: "layout",
      title: "High-Converting Landing Page",
      description:
        "A page built around an offer your market actually wants. Clear, fast, and persuasive enough to turn ad clicks into booked consults.",
    },
    {
      icon: "filter",
      title: "Lead Qualification",
      description:
        "Every enquiry is contacted instantly and pre-qualified before booking. Only serious, high-intent projects make it onto your calendar.",
    },
    {
      icon: "calendar",
      title: "Auto-Booking to Your Calendar",
      description:
        "The system checks your availability, shows open times, and books qualified enquiries automatically.",
    },
    {
      icon: "mail",
      title: "Quote Follow-Up Automations",
      description:
        "Built-in email and SMS follow-up for every quote until the project is locked in, so nothing slips through the cracks.",
    },
    {
      icon: "chart",
      title: "Live ROI Dashboard",
      description:
        "24/7 access to ad data and live ROI tracking so you know exactly what every dollar delivers.",
    },
  ],
  /** PRD-SPECIFIED §7.8 — horizontal scrolling proof ticker. */
  ticker: [
    "$1M+ Revenue Generated",
    "562+ Consults Booked",
    "25+ Drafting Firms Helped",
    "5.0★ Client Reviews",
    "3× Return Guarantee",
  ],
} as const;

export const adShowcase = {
  headline: "Real Ads We Run For Drafting Firms.",
  /** PRD §12 — supply ad creative images. Placeholder frames render until then. */
  ads: [
    { alt: "[Ad creative 1]" },
    { alt: "[Ad creative 2]" },
    { alt: "[Ad creative 3]" },
    { alt: "[Ad creative 4]" },
    { alt: "[Ad creative 5]" },
    { alt: "[Ad creative 6]" },
  ],
} as const;

export const comparison = {
  headline: "What Happens When You Use a System, Not an Agency.",
  /** PRD-SPECIFIED §7.10 — five rows each. Left column is brand-favoured. */
  ours: [
    "Guaranteed to make at least $3 back for every $1 spent on ads in 90 days",
    "No lock-in agreements. Cancel anytime",
    "Instant follow-up so enquiries don't go cold",
    "Built to generate booked projects, not just leads",
    "You win first. We get paid second",
  ],
  theirsLabel: "Typical Agencies",
  theirs: [
    'No guarantees. Just "give it more time"',
    "Locked into long contracts",
    "You chase every enquiry yourself",
    "Focus on clicks and leads, not booked work",
    "You carry all the risk",
  ],
} as const;

export const results = {
  headline: "What Our Clients Say About Us",
  subtext:
    "We pride ourselves on delivering exceptional results, but don't just take our word for it.",
  proofBadge: { rating: "5.0", count: "12+", label: "Google Reviews" },
  /** PRD-SPECIFIED §7.11 — three real case studies. Metrics are emphasized.
   *  ⚠️ Verify these figures against the copy doc before publishing. */
  caseStudies: [
    {
      client: "Sepura Home",
      metric: "[Metric]",
      metricCaption: "[Metric caption]",
      quote:
        "[Case study summary for Sepura Home — pull verbatim from the copy doc.]",
    },
    {
      client: "myco:soul",
      metric: "[Metric]",
      metricCaption: "[Metric caption]",
      quote:
        "[Case study summary for myco:soul — pull verbatim from the copy doc.]",
    },
    {
      client: "Kitchen appliance brand",
      metric: "[Metric]",
      metricCaption: "[Metric caption]",
      quote:
        "[Case study summary for the kitchen appliance brand — pull verbatim from the copy doc.]",
    },
  ],
} as const;

export const qualify = {
  headline: "Find Out If This System Will Actually Work For Your Firm.",
  /** PRD-SPECIFIED §7.12 — three numbered value props. */
  valueProps: [
    {
      title: "A Done-For-You Project Booking System",
      description:
        "We build the ads, the landing page, and the tracking so people in your area actually enquire about real work, not tyre-kicking. No tech setup on your end.",
    },
    {
      title: "Instant Lead Filtering & Booking (24/7)",
      description:
        "Every enquiry is contacted immediately, filtered for budget and intent, then booked into your calendar automatically. So you only speak to people ready to start.",
    },
    {
      title: "The 3× Return Guarantee",
      description:
        "If you don't make at least $3 back for every $1 you spend on ads within 90 days, we keep working for free until you do. No lock-in agreements. You take the upside. We take the risk.",
    },
  ],
  /** PRD-SPECIFIED §8 — field labels. */
  form: {
    fields: {
      fullName: { label: "Full Name", placeholder: "Jane Doe", autoComplete: "name" },
      email: { label: "Email address", placeholder: "example@email.com", autoComplete: "email" },
      phone: { label: "Phone number", placeholder: "(604) 555-0123", autoComplete: "tel" },
      businessName: { label: "Business Name", placeholder: "Your firm", autoComplete: "organization" },
    },
    submitIdle: CTA_LABEL,
    submitPending: "Sending…",
    successTitle: "Thanks — you're in.",
    successBody: "We'll review your firm and be in touch within 48 hours.",
    errorGeneric: "Something went wrong. Please try again, or email us directly.",
  },
} as const;

export const faq = {
  headline: "Frequently Asked Questions",
  /** PRD-SPECIFIED §7.13 — five questions. */
  items: [
    {
      question: "How fast can this go live?",
      answer:
        "Most builds are live within 7 to 10 business days. We handle the ads, the landing page, and the booking system. All we need from you is a kickoff call and your calendar availability.",
    },
    {
      question: "What do I actually have to do?",
      answer:
        "Show up to the booked consults. We build and run everything else. You will get a short weekly summary so you always know what is working.",
    },
    {
      question: "How much do I need to spend on ads?",
      answer:
        "We will recommend a starting budget based on your service area and capacity. Ad spend goes directly to the platform, never to us.",
    },
    {
      question: "Do you lock me into a long-term contract?",
      answer:
        "No. There are no lock-in agreements and you can cancel anytime. We would rather earn the next month than trap you in a contract.",
    },
    {
      question: "Is there a limit to how many clients you take on?",
      answer:
        "Yes. We only work with one drafting firm per service area so our clients are never bidding against each other, which is why we qualify every application.",
    },
  ],
} as const;

export const finalCta = {
  headline: "Ready To Stop Chasing Leads And Start Getting Booked Projects?",
  subtext:
    "If you can handle more work, we'll build the system that turns ads into qualified booked consults. If you don't make back at least $3 for every $1 you spend on ads in 90 days, we work for free until you do. No lock-in agreements.",
} as const;

export const footer = {
  copyright: `©${BRAND} 2026, All rights reserved.`,
} as const;

/** PRD-SPECIFIED §7 — persistent floating chat bubble. */
export const chatBubble = {
  message: "Have a question? 👋 Ask me!",
  ariaLabel: "Open chat",
} as const;

export const meta = {
  title: `${BRAND} | Booked Projects for Canadian Drafting Firms`,
  description:
    "We build the ads, landing page, and booking system that fill Canadian drafting firms' calendars with qualified consults on autopilot. 3× return guarantee, no lock-in contracts.",
  /** PRD §13 — set to the production origin before deploy. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  ogImageAlt: `${BRAND} — booked projects for Canadian drafting firms`,
} as const;
