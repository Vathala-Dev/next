/** Indian mobile: 10 digits starting with 6–9, optional +91 / 91 prefix. */
const INDIAN_MOBILE_RE = /^\+91[6-9]\d{9}$/;

export const INDIAN_PHONE_MAX_LENGTH = 13;

export const isValidIndianPhone = (value: string): boolean =>
  INDIAN_MOBILE_RE.test(value.trim());

export const getIndianPhoneValidationError = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "+91") {
    return "Phone number is required";
  }
  if (!isValidIndianPhone(trimmed)) {
    return "Enter a valid 10-digit Indian mobile number";
  }
  return null;
};

/** Keeps +91 prefix and up to 10 local digits (6–9 start enforced on submit). */
export const formatIndianPhoneInput = (value: string): string => {
  if (!value.trim()) return "";

  const digits = value.replace(/\D/g, "");
  let local = digits.startsWith("91") ? digits.slice(2) : digits;
  local = local.slice(0, 10);

  return local.length > 0 ? `+91${local}` : "+91";
};
