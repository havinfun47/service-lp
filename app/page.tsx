import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { SectionHeadline } from "@/components/sections/SectionHeadline";
import { Problem } from "@/components/sections/Problem";
import { Qualifier } from "@/components/sections/Qualifier";
import { Framework } from "@/components/sections/Framework";
import { WhatGetsBuilt } from "@/components/sections/WhatGetsBuilt";
import { AdShowcase } from "@/components/sections/AdShowcase";
import { Comparison } from "@/components/sections/Comparison";
import { Results } from "@/components/sections/Results";
import { Qualify } from "@/components/sections/Qualify";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";

/** Section order is fixed by PRD §7 and must match the copy doc. */
export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <StatsSection />
        <SectionHeadline />
        <Problem />
        <Qualifier />
        <Framework />
        <WhatGetsBuilt />
        <AdShowcase />
        <Comparison />
        <Results />
        <Qualify />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
      <ChatBubble />
    </>
  );
}
