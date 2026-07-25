import SectionHeader from "@/components/ui/SectionHeader";
import ProjectGridCard from "@/features/projects/components/ProjectGridCard";
import { getProjectsGridConfig } from "@/features/projects/configs/projects-config";
import { MappedHomeData } from "./HomeView";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import type { TranslateFn } from "@/i18n/translation-core";
import type { Project } from "@/features/projects/data";

interface FeaturedProjectsProps {
    translate: TranslateFn;
    homeData: MappedHomeData;
}

export default function FeaturedProjects({
    translate,
    homeData,
}: FeaturedProjectsProps) {
    const { featuredProjects, projectsPath } = homeData;
    const gridConfig = getProjectsGridConfig(translate);

    return (
        <SectionWrapper className="section-pad" showBlobs={false}>
            <div className="container-page">
                <SectionHeader
                    eyebrow={translate("home.selectedWork")}
                    title={translate("home.recentProjects")}
                    actionText={translate("home.allProjectsLink")}
                    actionHref={projectsPath}
                />

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredProjects.map((project, index) => (
                        <AnimatedSection key={project.slug} delay={index * 0.08}>
                            <ProjectGridCard
                                project={project as unknown as Project}
                                labels={gridConfig.labels}
                            />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}