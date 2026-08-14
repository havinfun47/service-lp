import { z } from "zod";

/** Shared by the client form and the /api/lead route handler (PRD §8). */
export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "That email is too long.")
    .pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    // Plausible NA/international phone: 10-15 digits once punctuation is stripped.
    .refine((v) => {
      const digits = v.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    }, "Please enter a valid phone number."),
  businessName: z
    .string()
    .trim()
    .min(2, "Please enter your business name.")
    .max(120, "That business name is too long."),
  /**
   * Honeypot (PRD §8). Real users never see or fill this.
   *
   * Deliberately permissive: rejecting a filled honeypot here would return a
   * 422 naming the field, which tells a bot exactly what tripped it. The route
   * handler inspects the value instead and accepts silently.
   */
  website: z.string().max(200).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Field-keyed error map, used to render inline errors. */
export type LeadFieldErrors = Partial<Record<keyof LeadInput, string>>;

export function collectFieldErrors(error: z.ZodError<LeadInput>): LeadFieldErrors {
  const out: LeadFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof LeadInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
