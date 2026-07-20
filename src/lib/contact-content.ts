export const contactAddress =
  "Muniah Technologies Pvt Ltd, No.3, 4th Main Road, Kottur Gardens, 1st Floor, Above NILGIRIS, Kotturpuram, Chennai, Tamil Nadu 600085";

export const contactPhoneDisplay = "+91 9150064364";
export const contactPhoneE164 = "+919150064364";

export const contactEmail = "support@vathala.com";

export const contactReplyNote = "We reply within 24 hours";

export const contactDetails = [
  {
    label: "Address",
    Icon: "map" as const,
    lines: [contactAddress],
  },
] as const;

export const contactReachUs = [
  {
    label: "Phone",
    Icon: "phone" as const,
    value: contactPhoneDisplay,
    href: `tel:${contactPhoneE164}`,
  },
  {
    label: "Email",
    Icon: "mail" as const,
    value: contactEmail,
    href: `mailto:${contactEmail}`,
  },
] as const;
