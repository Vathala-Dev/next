/** Short descriptive alts for service card photos (homepage grid). */
const serviceImageAltBySlug: Record<string, string> = {
  "home-doctor":
    "Doctor speaking with an elderly patient during a home visit",
  "nursing-services":
    "Nurse checking an elderly patient’s health at home",
  physiotherapy:
    "Physiotherapist helping a patient with leg exercises at home",
  "elder-care-services":
    "Caregiver sitting with an elderly person at home",
  "yoga-classes": "Yoga instructor guiding a student on a mat outdoors",
  "wound-care": "Caregiver bandaging a patient’s hand at home",
  "veterinary-doctor":
    "Veterinarian examining a small dog on a table",
  "blood-test": "Healthcare professional handling blood sample tubes",
};

export const getServiceImageAlt = (slug: string, title: string): string =>
  serviceImageAltBySlug[slug] ?? `Photo illustrating ${title}`;
