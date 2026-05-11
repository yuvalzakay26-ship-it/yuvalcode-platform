import { PageMeta } from "../components/PageMeta";
import { InstitutionalHero } from "../components/learning-hub/InstitutionalHero";
import { PrimaryLearningTracks } from "../components/learning-hub/PrimaryLearningTracks";
import { WhyLearnHere } from "../components/learning-hub/WhyLearnHere";
import { SITE } from "../lib/constants";
import { ExploreNext } from "../components/audience";

export function Content() {
    return (
        <div className="flex flex-col text-white overflow-hidden relative bg-black">
            <PageMeta
                title="Learning Hub · מוסד הלמידה"
                description="מרכז הלמידה של YuvalCode. מסלולי התמחות מובנים, סביבות פיתוח מבוססות בינה מלאכותית, וחשיבה הנדסית ברמת ייצור."
                path="/content"
                keywords={["learning hub", "engineering institution", "Claude 101", "Claude Code", "courses"]}
                breadcrumbs={[
                    { name: "בית", path: "/" },
                    { name: "מוסד הלמידה", path: "/content" },
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Learning Hub · YuvalCode",
                    "url": `${SITE.url}/content`,
                    "inLanguage": "he-IL",
                    "about": [
                        "Programming",
                        "Claude 101",
                        "Claude Code",
                        "MAT Systems",
                        "Engineering Architecture"
                    ],
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": SITE.name,
                        "url": SITE.url,
                    },
                }}
            />

            <InstitutionalHero />
            <PrimaryLearningTracks />
            <WhyLearnHere />
            
            <ExploreNext currentPath="/content" surfaceId="/content" />
        </div>
    );
}
