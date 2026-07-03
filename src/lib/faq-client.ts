const FAQ_API_URL = "https://vathala.com/users/getHomeFaq";

type ApiFaq = {
  _id: string;
  question: string;
  answer: string;
  service: string;
  created_on: number;
};

type ApiResponse = {
  message: string;
  data: ApiFaq[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

const SERVICE_MAP: Record<string, string> = {
  "/doctor-visit-at-home": "Home Doctor",
  "/nursing-care": "Nursingcare",
  "/physio-care": "Physiothraphy",
  "/elder-care": "Eldercare",
  "/wound-care-dressing": "Woundcare",
  "/veterinary-doctor-home-visit": "Veterinary",
  "/blood-test-at-home": "Blood Test",
  "/yoga-at-home": "Yoga classes",
};

export const fetchFaqs = async (
  serviceCategory: string,
): Promise<FaqItem[]> => {
  const res = await fetch(FAQ_API_URL);
  if (!res.ok) throw new Error(`FAQ API responded with ${res.status}`);
  const json: ApiResponse = await res.json();
  return json.data
    .filter((f) => f.service === serviceCategory)
    .map((f) => ({ question: f.question, answer: f.answer }));
};

export const fetchHomeFaqs = () => fetchFaqs("Home Page");

export const getServiceCategory = (path: string): string | undefined =>
  SERVICE_MAP[path];
