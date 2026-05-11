import { PageMeta } from "../components/PageMeta";
import { AIHero } from "../components/ai/AIHero";
import { AITracks } from "../components/ai/AITracks";
import { CurrentlyBuilding } from "../components/ai/CurrentlyBuilding";
import { AIEcosystem } from "../components/ai/AIEcosystem";
import { WhyFollowJourney } from "../components/ai/WhyFollowJourney";
import { AIFinalCTA } from "../components/ai/AIFinalCTA";
import { SITE } from "../lib/constants";
import { ExploreNext, FollowTheJourney } from "../components/audience";

export function AI() {
    return (
        <div className="flex flex-col text-white overflow-hidden relative">
            <PageMeta
                title="AI · לומד ובונה עם AI בפומבי"
                description="מסלול AI של YuvalCode — ניסויים עם Claude Code וסוכנים, חקר מערכות ידע ב-Obsidian, ולמידה של בניית מוצרים בעידן ה-AI. תיעוד של מסע, לא הבטחות."
                path="/ai"
                breadcrumbs={[
                    { name: "בית", path: "/" },
                    { name: "AI", path: "/ai" },
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "AI Track · YuvalCode",
                    "url": `${SITE.url}/ai`,
                    "inLanguage": "he-IL",
                    "about": [
                        "Claude Code",
                        "AI Agents",
                        "Obsidian",
                        "Building with AI",
                    ],
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": SITE.name,
                        "url": SITE.url,
                    },
                }}
            />

            <AIHero />
            <AITracks />
            <CurrentlyBuilding />
            <AIEcosystem />
            <WhyFollowJourney />
            <FollowTheJourney surfaceId="/ai" />
            <ExploreNext currentPath="/ai" surfaceId="/ai" />
            <AIFinalCTA />
        </div>
    );
}
