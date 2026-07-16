export type GeneralEnquiryPayload = {
  name: string;
  phone: string;
  city: string;
  serviceSlug: string;
  serviceDetails?: string;
  urgency: "normal" | "immediate";
  cfTurnstileToken: string;
};

export type CreateGeneralEnquiryResult =
  | { ok: true; message: string }
  | { ok: false; message: string };
  const DEFAULT_API_ORIGIN = "https://52.66.187.242:3001";

// const DEFAULT_API_ORIGIN = "https://dev.vathala.com";

const getApiOrigin = (): string =>
  process.env.NEXT_PUBLIC_VATHALA_API_URL?.replace(/\/$/, "") ||
  DEFAULT_API_ORIGIN;

/** API still returns legacy reCAPTCHA copy when Turnstile is not enabled server-side. */
const normalizeEnquiryErrorMessage = (message: string | undefined): string => {
  if (message && /invalid\s*recaptcha/i.test(message)) {
    return "Human verification passed in your browser, but the enquiry API still validates Google reCAPTCHA. The API team must verify Cloudflare Turnstile tokens — see docs/TURNSTILE.md.";
  }
  return (
    message ??
    "We could not submit your request. Please try again in a moment."
  );
};

export const phoneToApiMobile = (phone: string): string =>
  phone.replace(/\D/g, "");

/** Customer-provided service description only (no urgency or other metadata). */
export const buildEnquiryMessage = (serviceDetails?: string): string =>
  serviceDetails?.trim() ?? "";

export const createGeneralEnquiry = async (
  payload: GeneralEnquiryPayload,
): Promise<CreateGeneralEnquiryResult> => {
  const body = {
    name: payload.name.trim(),
    mobile: phoneToApiMobile(payload.phone),
    location: payload.city.trim(),
    message: buildEnquiryMessage(payload.serviceDetails),
    enquiryType: payload.serviceSlug,
    urgency: payload.urgency,
    /** Cloudflare Turnstile token (API verifies via siteverify). */
    cfTurnstileToken: payload.cfTurnstileToken,
  };

  let response: Response;
  try {
    response = await fetch(`${getApiOrigin()}/general/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return {
      ok: false,
      message: "Network error. Check your connection and try again.",
    };
  }

  let data: { message?: string } | null = null;
  try {
    data = (await response.json()) as { message?: string };
  } catch {
    data = null;
  }

  if (!response.ok) {
    return {
      ok: false,
      message: normalizeEnquiryErrorMessage(data?.message),
    };
  }

  return {
    ok: true,
    message: data?.message ?? "Enquiry submitted successfully",
  };
};
