import { API_BASE_URL } from "@/config/api";
import type { BlogPost, BlogFaq, HowToStep } from "@/lib/blogs";

const BLOG_API_URL = `${API_BASE_URL}/users/getAllBlogs`;

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

export const fetchBlogsClient = async (): Promise<{
  posts: BlogPost[];
  categories: string[];
}> => {
  const res = await fetch(BLOG_API_URL);
  if (!res.ok) throw new Error(`Blog API responded with ${res.status}`);
  const json: ApiResponse = await res.json();
  const posts = json.data
    .filter((p) => p.isActive !== false)
    .map(mapApiPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const categories = [
    ...new Set(posts.map((p) => p.category).filter(Boolean)),
  ] as string[];
  console.log(`Fetched blog posts from API:`, posts);
  console.log(`Fetched blog categories from API:`, categories);
  return { posts, categories };
};
