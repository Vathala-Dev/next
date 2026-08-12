import type { MetadataRoute } from "next";
import { getAllBlogSlugs, getBlogBySlug } from "@/lib/blogs";
import { allServicePaths } from "@/lib/service-content";
import { siteUrl } from "@/lib/site";
import { fetchBlogsClient } from "@/lib/blogs-client";

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home = {
    url: `${siteUrl}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  const services = allServicePaths.map((path) => ({
    url: `${siteUrl}${path}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const blogIndex = {
    url: `${siteUrl}/blog/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  };

  const contact = {
    url: `${siteUrl}/contact-us/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  };

  const legal = ["/privacy-policy", "/terms-conditions"].map((path) => ({
    url: `${siteUrl}${path}/`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));


  
 const { posts } = await fetchBlogsClient();

const blogPosts = posts.map((post) => ({
  url: `${siteUrl}/blog/${post.slug}`,
  lastModified: post.updatedAt
    ? new Date(post.updatedAt)
    : new Date(post.date),
    changeFrequency: "daily" as const,
  priority: 0.7,
}));
console.log("blogPosts sitemap slugs",blogPosts);

return [
  home,
  blogIndex,
  contact,
  ...legal,
  ...services,
  ...blogPosts,
];
  // const blogPosts = slugs.map((slug) => ({
  //   url: `${siteUrl}/blog/${slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: "daily" as const,
  //   priority: 0.7,
  // }));
  // const blogPosts = blogs.map((blog) => ({
  //   url: `${siteUrl}/blog/${blog.slug}`,
  //   // lastModified: new Date(blog.updatedAt ?? blog.date),
  //   lastModified: blog.updatedAt
  //     ? new Date(blog.updatedAt)
  //     : new Date(blog.date),
  //   changeFrequency: "daily" as const,
  //   priority: 0.7,
  // }));


  // return [home, blogIndex, contact, ...legal, ...services, ...blogPosts];
}
