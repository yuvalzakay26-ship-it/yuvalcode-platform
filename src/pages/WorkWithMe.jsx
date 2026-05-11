import { PageMeta } from "../components/PageMeta";
import { WorkWithMeHero } from "../components/work-with-me/WorkWithMeHero";
import { CollaborationPathways } from "../components/work-with-me/CollaborationPathways";
import { HowIWork } from "../components/work-with-me/HowIWork";
import { CurrentFocus } from "../components/work-with-me/CurrentFocus";
import { TrustAuthorityLayer } from "../components/work-with-me/TrustAuthorityLayer";
import { ConnectionEcosystem } from "../components/work-with-me/ConnectionEcosystem";
import { WhyIBuildPublicly } from "../components/work-with-me/WhyIBuildPublicly";
import { ContactExperience } from "../components/work-with-me/ContactExperience";
import { WorkWithMeFinalCTA } from "../components/work-with-me/WorkWithMeFinalCTA";
import { SITE } from "../lib/constants";

export function WorkWithMe() {
    return (
        <div className="flex flex-col text-white overflow-hidden relative">
            <PageMeta
                title="Work With Me · שיתופי פעולה, הוראה, וניסויי AI"
                description="מערכת שיתופי הפעולה של Yuval Zakay — Creator Collaborations, ניסויי AI ו-Workflows משותפים, Private Lessons, Educational Partnerships, ו-Sponsorships עתידיים. מרחב לעבוד יחד עם יוצרים, אנשי מקצוע, וצוותים שחוקרים פיתוח AI-native."
                path="/work-with-me"
                breadcrumbs={[
                    { name: "בית", path: "/" },
                    { name: "Work With Me", path: "/work-with-me" },
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService",
                    "name": "Yuval Zakay · Work With Me",
                    "url": `${SITE.url}/work-with-me`,
                    "inLanguage": "he-IL",
                    "areaServed": "IL",
                    "serviceType": [
                        "Creator Collaborations",
                        "AI & Workflow Experiments",
                        "Private Lessons & Mentorship",
                        "Educational Partnerships",
                        "Sponsorships",
                    ],
                    "provider": {
                        "@type": "Person",
                        "name": SITE.name,
                        "url": SITE.url,
                        "jobTitle": SITE.role,
                    },
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": SITE.name,
                        "url": SITE.url,
                    },
                }}
            />

            <WorkWithMeHero />
            <CollaborationPathways />
            <HowIWork />
            <CurrentFocus />
            <TrustAuthorityLayer />
            <ConnectionEcosystem />
            <WhyIBuildPublicly />
            <ContactExperience />
            <WorkWithMeFinalCTA />
        </div>
    );
}
