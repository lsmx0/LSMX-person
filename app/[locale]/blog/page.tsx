import { getTranslations } from "next-intl/server";
import { getAllContent } from "@/lib/mdx";
import { HandDrawnUnderline } from "@/components/hand-drawn";
import BlogCard from "@/components/blog-card";

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("blog");
  const posts = getAllContent("blog", locale);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <HandDrawnUnderline width={120} seed={15} className="mt-2" />
        <p className="text-[var(--muted)] mt-3">{t("description")}</p>
      </div>
      <div className="flex flex-col gap-6">
        {posts.map((post, i) => (
          <BlogCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </div>
  );
}
