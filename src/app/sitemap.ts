import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blogs";
import { allServicePaths } from "@/lib/service-content";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home = {
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  const services = allServicePaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const blogIndex = {
    url: `${siteUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  };

  const contact = {
    url: `${siteUrl}/contact-us`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  };

  const legal = ["/privacy-policy", "/terms-conditions"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  const slugs = await getAllBlogSlugs();
  const blogPosts = slugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [home, blogIndex, contact, ...legal, ...services, ...blogPosts];
}
