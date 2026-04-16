import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getContentBySlug, getAllContent } from "@/lib/mdx";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import MdxContent from "@/components/mdx-content";
import { HandDrawnUnderline } from "@/components/hand-drawn";
import BackButton from "@/components/back-button";

export async function generateStaticParams() {
  const zhPosts = getAllContent("blog", "zh");
  const enPosts = getAllContent("blog", "en");
  return [
    ...zhPosts.map((p) => ({ locale: "zh", slug: p.slug })),
    ...enPosts.map((p) => ({ locale: "en", slug: p.slug })),
  ];
}

export default async function BlogPostPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const result = getContentBySlug("blog", locale, slug);
  if (!result) notFound();

  const t = await getTranslations("common");
  const mdxSource = await serialize(result.content, {
    mdxOptions: {
      rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]],
    },
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <BackButton label={t("backToList")} href="/blog" />
      <h1 className="text-4xl font-bold mt-6">{result.meta.title}</h1>
      <HandDrawnUnderline width={200} seed={25} className="mt-2 mb-2" />
      <div className="flex items-center gap-3 text-sm text-[var(--muted)] mb-8">
        <time>{result.meta.date}</time>
        <div className="flex flex-wrap gap-2">
          {result.meta.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 border border-sketch-stroke/30 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <article className="prose-hand">
        <MdxContent source={mdxSource} />
      </article>
    </div>
  );
}
