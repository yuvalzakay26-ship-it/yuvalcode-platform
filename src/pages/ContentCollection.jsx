import { useParams, Navigate } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import {
    CollectionHero,
    CollectionGrid,
    EmptyCollection,
    EditorialNewsletter,
} from "../components/editorial";
import { getCollectionConfig } from "../lib/editorial/collections-config";
import { getEntriesForCollection } from "../lib/editorial/queries";
import { SITE } from "../lib/constants";

/**
 * /content/:collection — collection landing page.
 *
 * Renders a publication masthead, the collection grid, and an editorial
 * newsletter block. Empty collections gracefully render an EmptyCollection
 * tile rather than a blank page.
 *
 * Unknown :collection slugs route to /content (the editorial hub) instead
 * of triggering a NotFound — keeps stray external links discoverable.
 */
export function ContentCollection() {
    const { collection } = useParams();
    const config = getCollectionConfig(collection);
    if (!config) return <Navigate to="/content" replace />;

    const entries = getEntriesForCollection(config.slug);
    const hasEntries = entries.length > 0;

    return (
        <div className="flex flex-col text-white relative">
            <PageMeta
                title={`${config.labelEn} · Content`}
                description={`${config.labelHe} — ${config.tagline}`}
                path={`/content/${config.slug}`}
                keywords={[config.labelEn, config.labelHe, "editorial", "content", config.eyebrow]}
                breadcrumbs={[
                    { name: "בית", path: "/" },
                    { name: "Content", path: "/content" },
                    { name: config.labelEn, path: `/content/${config.slug}` },
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": `${config.labelEn} · ${SITE.name}`,
                    "url": `${SITE.url}/content/${config.slug}`,
                    "inLanguage": "he-IL",
                    "description": config.tagline,
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": SITE.name,
                        "url": SITE.url,
                    },
                    "hasPart": entries.map((e) => ({
                        "@type": config.schemaType || "Article",
                        "headline": e.title,
                        "description": e.summary,
                        "datePublished": e.date || undefined,
                        "url": `${SITE.url}/content/${config.slug}/${e.slug}`,
                    })),
                }}
            />

            <CollectionHero config={config} total={entries.length} />

            <section className="container mx-auto px-4 py-14 sm:py-18">
                <div className="max-w-5xl mx-auto">
                    {hasEntries ? (
                        <CollectionGrid entries={entries} columns={2} />
                    ) : (
                        <EmptyCollection config={config} />
                    )}
                </div>
            </section>

            {hasEntries && (
                <EditorialNewsletter
                    surface={`collection-${config.slug}`}
                    eyebrow={`${config.labelEn} Letter`}
                    title="המשך עוקב — בדואר האלקטרוני."
                    description="קולקציה שמתעדכנת. עדכון חודשי על הפרסומים החדשים, בלי תוכן ממוחזר."
                />
            )}
        </div>
    );
}
