import { HeroSection } from "../components/home/HeroSection";
import { EcosystemGateway } from "../components/home/EcosystemGateway";
import { MyCreatorStack } from "../components/home/MyCreatorStack";
import { WhyFollowMe } from "../components/home/WhyFollowMe";
import { CTASection } from "../components/home/CTASection";
import { PageMeta } from "../components/PageMeta";

export function Home() {
    return (
        <div className="flex flex-col text-white overflow-hidden relative">
            <PageMeta
                title="YuvalCode · יובל זכאי — תכנות, AI, ויצירה ב-2026"
                description="המרכז הרשמי של ערוץ YuvalCode — תוכן שבועי על תכנות, מערכות AI, כלים מודרניים ליוצרים, ופתרונות וידאו לכל מבחני מה״ט."
                path="/"
                jsonLd={[
                    {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "YuvalCode",
                        "alternateName": "Yuval Zakay",
                        "url": "https://yuvalcode.co.il",
                        "inLanguage": "he-IL",
                        "publisher": { "@type": "Person", "name": "Yuval Zakay" }
                    }
                ]}
            />

            <HeroSection />
            <EcosystemGateway />
            <MyCreatorStack />
            <WhyFollowMe />
            <CTASection />
        </div>
    );
}
