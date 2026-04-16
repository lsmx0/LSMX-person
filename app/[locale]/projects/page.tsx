import { getTranslations } from "next-intl/server";
import { getAllContent } from "@/lib/mdx";
import { HandDrawnUnderline } from "@/components/hand-drawn";
import ProjectCard from "@/components/project-card";

export default async function ProjectsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("projects");
  const projects = getAllContent("projects", locale);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <HandDrawnUnderline width={160} seed={10} className="mt-2" />
        <p className="text-[var(--muted)] mt-3">{t("description")}</p>
      </div>
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
