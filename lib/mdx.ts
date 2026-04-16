import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  slug: string;
}

export function getContentBySlug(
  type: "blog" | "projects",
  locale: string,
  slug: string
): { meta: PostMeta; content: string } | null {
  const filePath = path.join(contentDir, type, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: { ...data, slug } as PostMeta,
    content,
  };
}

export function getAllContent(
  type: "blog" | "projects",
  locale: string
): PostMeta[] {
  const dir = path.join(contentDir, type, locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const items = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    return { ...data, slug } as PostMeta;
  });
  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
