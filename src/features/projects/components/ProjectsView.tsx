"use client";

import { useMemo } from "react";
import PageHeader from "@/components/ui/PageHeader";
import GenericFilterGrid, {
  type FilterGridItem,
} from "@/components/ui/GenericFilterGrid";
import ProjectGridCard from "@/features/projects/components/ProjectGridCard";
import type { getProjectsGridConfig } from "../configs/projects-config";
import type { StandardPageLabels } from "@/lib/utils";
import type { Project } from "@/features/projects/data";

interface ProjectsViewProps {
  projects: Project[];
  labels: StandardPageLabels;
  gridConfig: ReturnType<typeof getProjectsGridConfig>;
}

export default function ProjectsView({
  projects,
  labels,
  gridConfig,
}: ProjectsViewProps) {
  const mappedGridItems: FilterGridItem[] = useMemo(
    () =>
      projects.map((project, index) => ({
        id: project.slug,
        filterValue: project.platform,
        content: (
          <ProjectGridCard
            key={project.slug}
            project={project}
            labels={gridConfig.labels}
            priority={index < 2}
          />
        ),
      })),
    [projects, gridConfig.labels]
  );

  return (
    <>
      <PageHeader
        eyebrow={labels.title}
        title={labels.headerTitle}
        description={labels.headerDesc}
      />

      <section className="section-pad pt-0 [content-visibility:auto] [contain-intrinsic-size:1px_800px]">
        <div className="container-page">
          <GenericFilterGrid
            allLabel={gridConfig.allLabel}
            filters={gridConfig.filters}
            noItemsLabel={gridConfig.labels.noProjectsFound}
            resetFilterLabel={gridConfig.labels.backToAll}
            items={mappedGridItems}
          />
        </div>
      </section>
    </>
  );
}