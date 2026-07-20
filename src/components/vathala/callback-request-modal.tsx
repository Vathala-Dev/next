"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { ServiceSelect } from "@/components/vathala/ui/service-select";
import {
  formatIndianPhoneInput,
  getIndianPhoneValidationError,
  INDIAN_PHONE_MAX_LENGTH,
  isValidIndianPhone,
} from "@/lib/indian-phone";
import {
  CaptchaField,
  isCaptchaConfigured,
} from "@/components/vathala/ui/captcha-field";
import { createGeneralEnquiry } from "@/lib/api/create-general-enquiry";
import { OTHER_SERVICES_SLUG } from "@/lib/vathala-services";

type CallbackRequestModalProps = {
  open: boolean;
  initialService?: string;
  onClose: () => void;
};

type Urgency = "" | "normal" | "immediate";

const urgencyOptions: { value: Exclude<Urgency, "">; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "immediate", label: "Immediate" },
];

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const CallbackRequestModal = ({
  open,
  initialService = "",
  onClose,
}: CallbackRequestModalProps) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const successCloseRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    service: "",
    serviceDetails: "",
    urgency: "" as Urgency,
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const handleCaptchaToken = useCallback((token: string | null) => {
    setCaptchaToken(token);
  }, []);

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-[#EAF6F6] px-4 py-2.5 text-base outline-none focus:border-vathala-forest/40 focus:ring-2 focus:ring-vathala-forest/20 sm:py-3";
  const fieldClass = `mt-1.5 sm:mt-2 ${inputClass}`;

  const isOtherServices = form.service === OTHER_SERVICES_SLUG;
  const phoneError = getIndianPhoneValidationError(form.phone);
  const showPhoneError = phoneTouched && phoneError !== null;

  const captchaRequired = isCaptchaConfigured();

  const canSubmit = useMemo(() => {
    const otherServicesOk =
      !isOtherServices || form.serviceDetails.trim().length > 2;
    const captchaOk = !captchaRequired || Boolean(captchaToken);

    return (
      form.name.trim().length > 1 &&
      isValidIndianPhone(form.phone) &&
      form.city.trim().length > 1 &&
      form.service.length > 0 &&
      otherServicesOk &&
      form.urgency.length > 0 &&
      captchaOk
    );
  }, [
    form.name,
    form.phone,
    form.city,
    form.service,
    form.serviceDetails,
    form.urgency,
    isOtherServices,
    captchaRequired,
    captchaToken,
  ]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      setStatus("idle");
      setSubmitError(null);
      setCaptchaToken(null);
      setPhoneTouched(false);
      setForm({
        name: "",
        phone: "",
        city: "",
        service: initialService,
        serviceDetails: "",
        urgency: "",
      });
      nameRef.current?.focus();
    }, 50);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, initialService]);

  useEffect(() => {
    if (status !== "sent") return;
    const t = window.setTimeout(() => successCloseRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [status]);

  if (!open) return null;

  const isSuccess = status === "sent";

  const trapFocus = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const root = modalRef.current;
    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>(focusableSelector),
    ).filter((el) => !el.hasAttribute("data-focus-skip"));

    if (nodes.length === 0) return;

    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    trapFocus(e);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || status === "sending") return;

    setStatus("sending");
    setSubmitError(null);

    const result = await createGeneralEnquiry({
      name: form.name,
      phone: form.phone,
      city: form.city,
      serviceSlug: form.service,
      serviceDetails: form.serviceDetails,
      urgency: form.urgency as "normal" | "immediate",
      cfTurnstileToken: captchaToken ?? "",
    });

    if (result.ok) {
      setStatus("sent");
      return;
    }

    setStatus("error");
    setSubmitError(result.message);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-3 backdrop-blur-sm sm:p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={
          isSuccess ? "Request submitted successfully" : "Request a call back"
        }
        tabIndex={-1}
        onKeyDown={onKeyDown}
        onMouseDown={(e) => e.stopPropagation()}
        className="vathala-modal-glass flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-3xl shadow-2xl sm:max-h-[calc(100dvh-2rem)]"
      >
        {isSuccess ? (
          <div className="flex flex-col px-6 py-8 text-center sm:px-8 sm:py-10">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-vathala-forest/10 sm:size-20">
              <CheckCircle2
                className="size-10 text-vathala-forest sm:size-12"
                aria-hidden
              />
            </div>
            <h2 className="mt-6 font-heading text-2xl font-semibold text-vathala-forest sm:text-3xl">
              Request submitted
            </h2>
            <p className="mt-3 text-base leading-relaxed text-vathala-muted sm:mt-4 sm:text-lg">
              Your request has been submitted successfully. Our representative
              will reach out to you shortly.
            </p>
            <button
              ref={successCloseRef}
              type="button"
              onClick={onClose}
              className="mt-8 flex w-full min-h-[52px] items-center justify-center rounded-full bg-vathala-forest px-6 text-base font-semibold text-white shadow-lg transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest sm:min-h-[56px]"
            >
              Done
            </button>
          </div>
        ) : (
          <>
        <div className="flex shrink-0 items-start justify-between gap-4 px-4 pt-4 sm:gap-6 sm:px-6 sm:pt-6">
          <div>
            <h2 className="font-heading text-xl font-semibold text-vathala-forest sm:text-2xl">
              Need help?
            </h2>
            <p className="mt-1 text-sm text-vathala-muted sm:mt-2 sm:text-base">
              Let our Healthcare Advisor call you
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-1 rounded-full p-2 text-vathala-muted hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest"
            aria-label="Close modal"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <form
          className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-4"
          onSubmit={onSubmit}
        >
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain sm:space-y-4">
            <div>
              <label
                htmlFor="callback-name"
                className="block text-base font-semibold text-vathala-forest"
              >
                Name
              </label>
              <input
                ref={nameRef}
                id="callback-name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter full name"
                className={fieldClass}
                autoComplete="name"
              />
            </div>

            <div>
              <label
                htmlFor="callback-phone"
                className="block text-base font-semibold text-vathala-forest"
              >
                Phone Number
              </label>
              <input
                id="callback-phone"
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
                className={`${fieldClass}${showPhoneError ? " border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                autoComplete="tel"
                aria-invalid={showPhoneError}
                aria-describedby={
                  showPhoneError ? "callback-phone-error" : undefined
                }
              />
              {showPhoneError ? (
                <p
                  id="callback-phone-error"
                  role="alert"
                  className="mt-1.5 text-sm font-medium text-red-600"
                >
                  {phoneError}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="callback-city"
                className="block text-base font-semibold text-vathala-forest"
              >
                City
              </label>
              <input
                id="callback-city"
                value={form.city}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, city: e.target.value }))
                }
                placeholder="Enter your city"
                className={fieldClass}
                autoComplete="address-level2"
              />
            </div>

            <div>
              <label
                htmlFor="callback-service"
                className="block text-base font-semibold text-vathala-forest"
              >
                Service
              </label>
              <div className="mt-1.5 sm:mt-2">
                <ServiceSelect
                  id="callback-service"
                  value={form.service}
                  onChange={(slug) =>
                    setForm((prev) => ({
                      ...prev,
                      service: slug,
                      serviceDetails:
                        slug === OTHER_SERVICES_SLUG ? prev.serviceDetails : "",
                    }))
                  }
                  triggerClassName={inputClass}
                />
              </div>
              {isOtherServices ? (
                <div className="mt-3">
                  <label
                    htmlFor="callback-service-details"
                    className="block text-base font-semibold text-vathala-forest"
                  >
                    Describe the service you need
                  </label>
                  <textarea
                    id="callback-service-details"
                    value={form.serviceDetails}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        serviceDetails: e.target.value,
                      }))
                    }
                    placeholder="Tell us what kind of care or support you’re looking for"
                    rows={3}
                    className={`${fieldClass} resize-y min-h-[5.5rem]`}
                  />
                </div>
              ) : null}
            </div>

            <fieldset>
              <legend className="text-base font-semibold text-vathala-forest">
                Urgency
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {urgencyOptions.map((option) => {
                  const selected = form.urgency === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex min-h-[48px] cursor-pointer items-center justify-center rounded-xl border px-2 py-3 text-center text-sm font-semibold transition-colors sm:px-4 sm:text-base ${
                        selected
                          ? "border-vathala-forest bg-vathala-forest text-white"
                          : "border-black/10 bg-[#EAF6F6] text-vathala-forest hover:border-vathala-forest/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="callback-urgency"
                        value={option.value}
                        checked={selected}
                        onChange={() =>
                          setForm((prev) => ({
                            ...prev,
                            urgency: option.value,
                          }))
                        }
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="rounded-xl border border-black/10 bg-white px-4 py-3">
              <p className="text-base font-semibold text-vathala-forest">
                Verify you&apos;re human
              </p>
              <div className="mt-3">
                <CaptchaField
                  resetKey={captchaResetKey}
                  mountDelayMs={120}
                  onTokenChange={handleCaptchaToken}
                />
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-black/5 pt-3 sm:pt-4">
            {submitError ? (
              <p
                role="alert"
                className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {submitError}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={!canSubmit || status === "sending"}
              className="flex w-full min-h-[52px] items-center justify-center rounded-full bg-vathala-forest px-6 text-base font-semibold text-white shadow-lg transition-opacity disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-[56px]"
            >
              {status === "sending"
                ? "Sending…"
                : status === "error"
                  ? "Try again"
                  : "Send"}
            </button>

            <div className="mt-2 text-center text-sm text-vathala-muted sm:mt-3">
              By clicking you agree on our{" "}
              <Link
                href="/terms-conditions"
                className="font-semibold text-vathala-forest underline-offset-2 hover:underline"
                onClick={onClose}
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </form>
          </>
        )}
      </div>
    </div>
  );
};

