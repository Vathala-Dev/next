"use client";

import { useCallback, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { createGeneralEnquiry } from "@/lib/api/create-general-enquiry";
import {
  CaptchaField,
  isCaptchaConfigured,
} from "@/components/vathala/ui/captcha-field";
import {
  formatIndianPhoneInput,
  getIndianPhoneValidationError,
  INDIAN_PHONE_MAX_LENGTH,
  isValidIndianPhone,
} from "@/lib/indian-phone";
import { OTHER_SERVICES_SLUG } from "@/lib/vathala-services";

const inputClass =
  "mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-vathala-text outline-none transition-colors focus:border-vathala-forest/40 focus:ring-2 focus:ring-vathala-forest/15";

export const ContactUsForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const phoneError = getIndianPhoneValidationError(form.phone);
  const showPhoneError = phoneTouched && phoneError !== null;

  const handleCaptchaToken = useCallback((token: string | null) => {
    setCaptchaToken(token);
  }, []);

  const captchaRequired = isCaptchaConfigured();

  const canSubmit =
    form.name.trim().length > 1 &&
    isValidIndianPhone(form.phone) &&
    form.location.trim().length > 1 &&
    form.message.trim().length > 3 &&
    (!captchaRequired || Boolean(captchaToken));

  const resetForm = () => {
    setForm({ name: "", phone: "", location: "", message: "" });
    setCaptchaToken(null);
    setCaptchaResetKey((key) => key + 1);
    setPhoneTouched(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || status === "sending") return;

    setStatus("sending");
    setSubmitError(null);

    const result = await createGeneralEnquiry({
      name: form.name,
      phone: form.phone,
      city: form.location,
      serviceSlug: OTHER_SERVICES_SLUG,
      serviceDetails: form.message,
      urgency: "normal",
      cfTurnstileToken: captchaToken ?? "",
    });

    if (result.ok) {
      setStatus("sent");
      resetForm();
      return;
    }

    setStatus("error");
    setSubmitError(result.message);
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center py-6 text-center sm:py-10">
          <CheckCircle2
            className="size-14 text-vathala-sage-deep"
            aria-hidden
          />
          <h2 className="mt-4 font-heading text-xl font-medium text-vathala-forest sm:text-2xl">
            Message sent
          </h2>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-vathala-muted">
            Thank you. Our team will get back to you as soon as possible.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-vathala-forest/25 px-6 text-sm font-semibold text-vathala-forest transition-colors hover:bg-vathala-band"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-8">
      <h2 className="font-heading text-lg font-medium text-vathala-forest sm:text-2xl">
        Have Question? Write a Message
      </h2>

      <form className="mt-4 space-y-4 sm:mt-6 sm:space-y-5" onSubmit={onSubmit} noValidate>
        <div>
          <label
            htmlFor="contact-name"
            className="block text-base font-semibold text-vathala-forest"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter Your Name"
            className={inputClass}
            autoComplete="name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-base font-semibold text-vathala-forest"
          >
            Phone Number
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            inputMode="tel"
            maxLength={INDIAN_PHONE_MAX_LENGTH}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                phone: formatIndianPhoneInput(e.target.value),
              }))
            }
            onBlur={() => setPhoneTouched(true)}
            placeholder="+91"
            className={`${inputClass}${showPhoneError ? " border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
            autoComplete="tel"
            aria-invalid={showPhoneError}
            aria-describedby={
              showPhoneError ? "contact-phone-error" : undefined
            }
            required
          />
          {showPhoneError ? (
            <p
              id="contact-phone-error"
              role="alert"
              className="mt-1.5 text-sm font-medium text-red-600"
            >
              {phoneError}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-location"
            className="block text-base font-semibold text-vathala-forest"
          >
            Location
          </label>
          <input
            id="contact-location"
            type="text"
            value={form.location}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, location: e.target.value }))
            }
            placeholder="Enter Your Location"
            className={inputClass}
            autoComplete="address-level2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-base font-semibold text-vathala-forest"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            value={form.message}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, message: e.target.value }))
            }
            placeholder="Enter Message"
            rows={3}
            className={`${inputClass} resize-y min-h-[5rem] sm:min-h-[8rem]`}
            required
          />
        </div>

        {captchaRequired ? (
          <div className="rounded-xl border border-black/10 bg-vathala-band/40 px-4 py-3">
            <p className="text-base font-semibold text-vathala-forest">
              Verify you&apos;re human
            </p>
            <div className="mt-3">
              <CaptchaField
                resetKey={captchaResetKey}
                onTokenChange={handleCaptchaToken}
              />
            </div>
          </div>
        ) : null}

        {submitError ? (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit || status === "sending"}
          className="inline-flex min-h-11 min-w-[7rem] items-center justify-center rounded-full bg-vathala-forest px-8 text-base font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending"
            ? "Sending…"
            : status === "error"
              ? "Try again"
              : "Send"}
        </button>
      </form>
    </div>
  );
};
