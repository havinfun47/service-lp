import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Clearly-marked stand-in for an asset listed in PRD §12 that has not been
 * supplied yet. Deliberately obvious so nothing ships by accident — search the
 * repo for `AssetPlaceholder` to find every outstanding asset.
 */
export function AssetPlaceholder({
  label,
  className,
  ratio = "aspect-[4/3]",
  tone = "dark",
}: {
  label: string;
  className?: string;
  ratio?: string;
  /** Must match the surface behind it — the muted greys differ per surface to
   *  keep the label above 4.5:1 either way. */
  tone?: "dark" | "light";
}) {
  const surface =
    tone === "dark"
      ? "border-line bg-ink-soft text-muted"
      : "border-surface-line bg-surface-soft text-muted-on-light";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-[var(--radius-card)]",
        "border-2 border-dashed p-4 text-center",
        surface,
        ratio,
        className,
      )}
    >
      <ImageIcon aria-hidden="true" className="size-6" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
