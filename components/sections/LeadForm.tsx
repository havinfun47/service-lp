"use client";

import { useId, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { buttonClass } from "@/components/ui/CTAButton";
import { TrustLine } from "@/components/ui/TrustLine";
import { collectFieldErrors, leadSchema, type LeadFieldErrors } from "@/lib/validation";
import { trackLead } from "@/lib/analytics";
import { qualify } from "@/content/copy";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER = ["fullName", "email", "phone", "businessName"] as const;
type FieldName = (typeof FIELD_ORDER)[number];

/** PRD §8 — the lead form. Same Zod schema runs here and on the route handler. */
export function LeadForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    const parsed = leadSchema.safeParse(data);

    if (!parsed.success) {
      const fieldErrors = collectFieldErrors(parsed.error);
      setErrors(fieldErrors);
      // Move focus to the first invalid field so keyboard and screen reader
      // users are taken straight to the problem.
      const firstBad = FIELD_ORDER.find((name) => fieldErrors[name]);
      if (firstBad) document.getElementById(`${formId}-${firstBad}`)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        setFormError(body?.message ?? qualify.form.errorGeneric);
        setStatus("error");
        return;
      }

      trackLead(); // PRD §11 — fire Lead on successful submit.
      setStatus("success");
    } catch {
      setFormError(qualify.form.errorGeneric);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-line bg-ink-card p-8 text-center md:p-10"
      >
        <CheckCircle2 aria-hidden="true" className="size-10 text-affirm" />
        <h3 className="font-display text-xl font-extrabold text-white">{qualify.form.successTitle}</h3>
        <p className="text-sm leading-relaxed text-muted">{qualify.form.successBody}</p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[var(--radius-card)] border border-line bg-ink-card p-6 md:p-8"
    >
      <div className="flex flex-col gap-4">
        {FIELD_ORDER.map((name) => {
          const field = qualify.form.fields[name];
          const inputId = `${formId}-${name}`;
          const errorId = `${inputId}-error`;
          const error = errors[name];

          return (
            <div key={name} className="flex flex-col gap-1.5">
              <label htmlFor={inputId} className="text-sm font-medium text-white">
                {field.label}
              </label>
              <input
                id={inputId}
                name={name}
                type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
                inputMode={name === "phone" ? "tel" : undefined}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                required
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                disabled={submitting}
                className={`min-h-12 w-full rounded-xl border bg-ink px-4 text-base text-white placeholder:text-muted/70 disabled:opacity-60 ${
                  error ? "border-alert" : "border-line focus:border-accent-up"
                }`}
              />
              {error ? (
                <p id={errorId} className="text-xs font-medium text-alert">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}

        {/* Honeypot (PRD §8) — hidden from humans and assistive tech alike. */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor={`${formId}-website`}>Website</label>
          <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {formError ? (
        <p role="alert" className="mt-4 text-sm font-medium text-alert">
          {formError}
        </p>
      ) : null}

      <button type="submit" disabled={submitting} className={`${buttonClass()} mt-6 w-full disabled:opacity-70`}>
        {submitting ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            {qualify.form.submitPending}
          </>
        ) : (
          qualify.form.submitIdle
        )}
      </button>

      <TrustLine className="mt-4" />
    </form>
  );
}
