import { PageMeta } from "../components/PageMeta";
import { ProjectsHero } from "../components/projects/ProjectsHero";
import { FeaturedProjects } from "../components/projects/FeaturedProjects";
import { CaseStudyPreviews } from "../components/projects/CaseStudyPreviews";
import { BuildingInPublicTimeline } from "../components/projects/BuildingInPublicTimeline";
import { ProjectsTechStack } from "../components/projects/ProjectsTechStack";
import { ProjectsWhyIBuild } from "../components/projects/ProjectsWhyIBuild";
import { ProjectsFinalCTA } from "../components/projects/ProjectsFinalCTA";
import { SITE } from "../lib/constants";
import { ExploreNext } from "../components/audience";

export function Projects() {
    return (
        <div className="flex flex-col text-white overflow-hidden relative">
            <PageMeta
                title="Projects · מערכות אמיתיות בבנייה"
                description="פרויקטים של YuvalCode — פלטפורמת היוצר, ספריית מה״ט, ומערכות AI. ארכיטקטורה אמיתית, שיקולי scale, וחשיבת מוצר. הוכחה של ביצוע, לא תיק עבודות."
                path="/projects"
                breadcrumbs={[
                    { name: "בית", path: "/" },
                    { name: "Projects", path: "/projects" },
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Projects · YuvalCode",
                    "url": `${SITE.url}/projects`,
                    "inLanguage": "he-IL",
                    "about": [
                        "YuvalCode Platform",
                        "Mahat Learning Library",
                        "AI Workflow Systems",
                    ],
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": SITE.name,
                        "url": SITE.url,
                    },
                }}
            />

            <ProjectsHero />
            <FeaturedProjects />
            <CaseStudyPreviews />
            <BuildingInPublicTimeline />
            <ProjectsTechStack />
            <ProjectsWhyIBuild />
            <ExploreNext currentPath="/projects" surfaceId="/projects" />
            <ProjectsFinalCTA />
        </div>
    );
}
