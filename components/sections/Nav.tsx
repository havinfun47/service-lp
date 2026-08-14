"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { BRAND, nav } from "@/content/copy";

/** Sticky nav that gains a blurred background once scrolled (PRD §7.1). */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-ink/80 backdrop-blur-lg" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="shell flex h-18 items-center justify-between gap-6">
        <Link
          href="#hero"
          className="font-display text-lg font-extrabold tracking-tight whitespace-nowrap text-white"
        >
          {BRAND}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Wrapped rather than given `hidden md:inline-flex`: the button's own
              base class sets `inline-flex`, and two display utilities of equal
              specificity would leave the winner up to stylesheet order. */}
          <span className="hidden md:block">
            <CTAButton size="md" />
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-line text-white md:hidden"
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-ink md:hidden">
          <ul className="shell flex flex-col gap-1 py-4">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center text-base font-medium text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Close the menu when the CTA inside it is followed. */}
            <li className="pt-2" onClick={() => setOpen(false)}>
              <CTAButton className="w-full" />
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
