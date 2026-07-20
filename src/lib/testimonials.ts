/** Patient stories from https://vathala.com/home — shown as quote cards. */
export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "ranjith-doctor",
    name: "Ranjith",
    location: "Bengaluru",
    quote:
      "VaThala made doctor home visits effortless for my father. The doctor was patient, on time, and excellent.",
  },
  {
    id: "mohan-nursing",
    name: "Mohan Kumar",
    location: "Chennai",
    quote:
      "After surgery I needed nursing at home. The nurse was skilled, kind, and the whole process was stress-free.",
  },
  {
    id: "suresh-physio",
    name: "Suresh",
    location: "Hyderabad",
    quote:
      "Physiotherapy at home helped my back pain improve within weeks. Highly recommend their team.",
  },
  {
    id: "asif-elder",
    name: "Asif Ali",
    location: "Chennai",
    quote:
      "VaThala's elderly care services were a blessing. Their caregiver was compassionate and treated my grandmother like family.",
  },
  {
    id: "divya-yoga",
    name: "Divya",
    location: "Bengaluru",
    quote:
      "VaThala connected me with a certified prenatal yoga instructor at home. It made my pregnancy journey smooth and stress-free.",
  },
  {
    id: "manoj-vet",
    name: "Manoj",
    location: "Hyderabad",
    quote:
      "I booked a veterinary doctor through VaThala when my dog was unwell. Excellent check-up and treatment at home.",
  },
];
