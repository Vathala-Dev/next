import { stripEmDashes } from "@/lib/strip-em-dashes";

const BLOG_API_URL = "https://52.66.187.242:3001/users/getAllBlogs";

export type BlogFaq = {
  question: string;
  answer: string;
};

export type HowToStep = {
  stepTitle: string;
  stepDescription?: string;
};

export type RatingSchema = {
  ratingName?: string;
  ratingDescription?: string;
  ratingValue?: number;
  ratingCount?: number;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  faqList: BlogFaq[];
  category?: string;
  author?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogImageUrl?: string;
  howToSteps?: HowToStep[];
  ratingSchema?: RatingSchema;
};

type ApiBlogPost = {
  _id: string;
  slug: string;
  title: string;
  date: string;
  imageUrl: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  faqList: BlogFaq[];
  category?: string;
  isActive?: boolean;
  howToSteps?: HowToStep[];
  ratingSchema?: {
    name: string;
    description: string;
    ratingCount: number;
  };
};

type ApiResponse = {
  message: string;
  data: ApiBlogPost[];
};

const stripHtmlTags = (html: string): string =>
  html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

const generateExcerpt = (htmlContent: string, maxLength = 160): string => {
  const text = stripHtmlTags(htmlContent);
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s\S*$/, "") + "…";
};

const mapApiPost = (api: ApiBlogPost): BlogPost => ({
  id: api._id,
  slug: api.slug,
  title: api.title,
  date: api.date,
  imageUrl: api.imageUrl,
  excerpt: generateExcerpt(api.content),
  content: api.content,
  metaTitle: api.metaTitle,
  metaDescription: api.metaDescription,
  metaKeywords: api.metaKeywords,
  faqList: api.faqList ?? [],
  category: api.category,
  howToSteps: api.howToSteps,
  ratingSchema:
    api.ratingSchema?.name
      ? {
          ratingName: api.ratingSchema.name,
          ratingDescription: api.ratingSchema.description,
          ratingCount: api.ratingSchema.ratingCount,
        }
      : undefined,
});

const safe = (val: string | undefined | null): string =>
  val ? stripEmDashes(val) : "";

const normalizeBlogPost = (post: BlogPost): BlogPost => ({
  ...post,
  title: safe(post.title),
  excerpt: safe(post.excerpt),
  content: safe(post.content),
  metaTitle: safe(post.metaTitle),
  metaDescription: safe(post.metaDescription),
  metaKeywords: safe(post.metaKeywords),
  faqList: (post.faqList ?? []).map((faq) => ({
    question: safe(faq.question),
    answer: safe(faq.answer),
  })),
  howToSteps: post.howToSteps?.map((step) => ({
    ...step,
    stepTitle: safe(step.stepTitle),
    stepDescription: step.stepDescription
      ? stripEmDashes(step.stepDescription)
      : step.stepDescription,
  })),
});

let cachedPosts: BlogPost[] | null = null;

const fetchFromApi = async (): Promise<BlogPost[]> => {
  if (cachedPosts) return cachedPosts;
  const res = await fetch(BLOG_API_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Blog API responded with ${res.status}`);
  const json: ApiResponse = await res.json();
  const posts = json.data
    .filter((p) => p.isActive !== false)
    .map((p) => normalizeBlogPost(mapApiPost(p)))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  cachedPosts = posts;
  return posts;
};

export const getAllBlogSlugs = async (): Promise<string[]> => {
  const posts = await fetchFromApi();
  return posts.map((p) => p.slug);
};

export const formatBlogDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
