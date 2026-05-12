import { PageMeta } from "../components/PageMeta";
import { WorkWithMeHero } from "../components/work-with-me/WorkWithMeHero";
import { WhatIBuild } from "../components/work-with-me/WhatIBuild";
import { HowIWork } from "../components/work-with-me/HowIWork";
import { WhoThisFits } from "../components/work-with-me/WhoThisFits";
import { ContactExperience } from "../components/work-with-me/ContactExperience";
import { SITE } from "../lib/constants";

export function WorkWithMe() {
    return (
        <div className="flex flex-col text-white overflow-hidden relative">
            <PageMeta
                title="Work With Me · בניית מערכות, הוראה, וניסויי AI"
                description="מי אני, מה אני בונה, ואיך אפשר לעבוד יחד. מערכות למידה, AI-native workflows, ותשתיות תוכן. הזמנה כנה לאנשים שרוצים לבנות פרויקטים אמיתיים."
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
                        "Building Real Systems",
                        "AI-Native Workflows",
                        "Technical Education",
                        "System Architecture",
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
            <WhatIBuild />
            <HowIWork />
            <WhoThisFits />
            <ContactExperience />
        </div>
    );
}
