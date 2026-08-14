import Link from "next/link";
import { BRAND, footer, nav } from "@/content/copy";

/** PRD §7.15 — brand mark, copyright, repeated nav links. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      {/* pb clears the sticky mobile CTA bar so the last row is never covered. */}
      <div className="shell flex flex-col items-center gap-6 py-12 pb-28 md:flex-row md:justify-between md:pb-12">
        <Link href="#hero" className="font-display text-lg font-extrabold tracking-tight text-white">
          {BRAND}
        </Link>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
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
        </nav>

        <p className="text-sm text-muted">{footer.copyright}</p>
      </div>
    </footer>
  );
}
