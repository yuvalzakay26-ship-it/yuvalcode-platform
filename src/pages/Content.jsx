import { PageMeta } from "../components/PageMeta";
import { ContentHero } from "../components/content/ContentHero";
import { FeaturedContentHub } from "../components/content/FeaturedContentHub";
import { EditorialCollectionsRail } from "../components/content/EditorialCollectionsRail";
import { PillarExplorer } from "../components/content/PillarExplorer";
import { ContentLearningPathways } from "../components/content/ContentLearningPathways";
import { ContentTimeline } from "../components/content/ContentTimeline";
import { ContentEcosystemRail } from "../components/content/ContentEcosystemRail";
import { WhyPlatformExists } from "../components/content/WhyPlatformExists";
import { ContentFinalCTA } from "../components/content/ContentFinalCTA";
import { SITE } from "../lib/constants";
import { EcosystemSinceLastVisit, ExploreNext, FollowTheJourney } from "../components/audience";

export function Content() {
    return (
        <div className="flex flex-col text-white overflow-hidden relative">
            <PageMeta
                title="Content · האקוסיסטם של היוצר"
                description="מרכז התוכן של YuvalCode — שמונה pillars (תכנות, AI, Claude Code, Anti Gravity, Obsidian, Building with AI, ועוד), מסלולי למידה, ציר זמן חי, ומערכת תוכן שמתעדת בנייה אמיתית בעידן AI."
                path="/content"
                keywords={["content ecosystem", "Hebrew tech publication", "Claude Code", "AI publishing", "creator OS"]}
                breadcrumbs={[
                    { name: "בית", path: "/" },
                    { name: "Content", path: "/content" },
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Content · YuvalCode",
                    "url": `${SITE.url}/content`,
                    "inLanguage": "he-IL",
                    "about": [
                        "Programming",
                        "C#",
                        "Mahat Solutions",
                        "AI Tools",
                        "Claude Code",
                        "Anti Gravity Systems",
                        "Obsidian Knowledge Systems",
                        "Building with AI",
                        "The Creator Journey",
                    ],
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": SITE.name,
                        "url": SITE.url,
                    },
                }}
            />

            <ContentHero />
            <FeaturedContentHub />
            <EditorialCollectionsRail />
            <EcosystemSinceLastVisit surfaceId="/content" />
            <PillarExplorer />
            <ContentLearningPathways />
            <ContentTimeline />
            <ContentEcosystemRail />
            <WhyPlatformExists />
            <FollowTheJourney surfaceId="/content" />
            <ExploreNext currentPath="/content" surfaceId="/content" />
            <ContentFinalCTA />
        </div>
    );
}
