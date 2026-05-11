import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import {
    EditorialHero,
    Prose,
    AuthorBlock,
    RelatedRail,
    EcosystemNav,
    EditorialNewsletter,
} from "../components/editorial";
import { getCollectionConfig } from "../lib/editorial/collections-config";
import { getEntryFor, getCollectionNeighbors } from "../lib/editorial/queries";
import { SITE } from "../lib/constants";
import { resolveArticleOgMeta } from "../lib/distribution/og";
import { resolveCoverImage } from "../lib/distribution/images";
import { useAudienceActions } from "../lib/audience";

/**
 * /content/:collection/:slug — single entry reading experience.
 *
 * Composition (top-down):
 *   PageMeta + JSON-LD (Article / TechArticle / HowTo per collection)
 *   EditorialHero  — eyebrow + title + dek + meta strip
 *   <Prose><Body /></Prose>  — long-form body, semantic HTML
 *   AuthorBlock     — creator context + journey link
 *   EditorialNewsletter — calm in-flow signup
 *   RelatedRail     — graph-derived recommendations
 *   EcosystemNav    — prev / next / back-to-collection
 */
export function ContentEntry() {
    const { collection, slug } = useParams();
    const config = getCollectionConfig(collection);
    const entry = config ? getEntryFor(collection, slug) : null;
    const { recordEntryRead } = useAudienceActions();

    useEffect(() => {
        if (!entry || !config) return;
        recordEntryRead({
            entryId: entry.id,
            slug: entry.slug,
            collection: config.slug,
            pillar: entry.pillar,
            title: entry.title,
        });
    }, [entry, config, recordEntryRead]);

    if (!config) return <Navigate to="/content" replace />;
    if (!entry) return <Navigate to={`/content/${config.slug}`} replace />;

    const Body = entry.Body;
    const { prev, next } = getCollectionNeighbors(entry);

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": config.schemaType || "Article",
        "headline": entry.title,
        "description": entry.summary,
        "inLanguage": "he-IL",
        "url": `${SITE.url}/content/${config.slug}/${entry.slug}`,
        "datePublished": entry.date || undefined,
        "dateModified": entry.updatedAt || entry.date || undefined,
        "author": {
            "@type": "Person",
            "name": SITE.name,
            "url": SITE.url,
        },
        "publisher": {
            "@type": "Organization",
            "name": SITE.name,
            "url": SITE.url,
            "logo": {
                "@type": "ImageObject",
                "url": `${SITE.url}/og-image.png`,
            },
        },
        "mainEntityOfPage": `${SITE.url}/content/${config.slug}/${entry.slug}`,
        "isPartOf": {
            "@type": "CollectionPage",
            "name": `${config.labelEn} · ${SITE.name}`,
            "url": `${SITE.url}/content/${config.slug}`,
        },
        "keywords": Array.isArray(entry.tags) ? entry.tags.join(", ") : undefined,
    };

    const articleMeta = resolveArticleOgMeta(entry);
    const coverImage = resolveCoverImage({ entry, collectionSlug: config.slug });
    const keywords = [
        ...(Array.isArray(entry.tags) ? entry.tags : []),
        entry.pillar,
        config.labelEn,
    ].filter(Boolean);

    return (
        <article className="flex flex-col text-white relative">
            <PageMeta
                title={entry.title}
                description={entry.summary}
                path={`/content/${config.slug}/${entry.slug}`}
                image={coverImage}
                breadcrumbs={[
                    { name: "בית", path: "/" },
                    { name: "Content", path: "/content" },
                    { name: config.labelEn, path: `/content/${config.slug}` },
                    { name: entry.title, path: `/content/${config.slug}/${entry.slug}` },
                ]}
                jsonLd={articleSchema}
                articleMeta={articleMeta}
                keywords={keywords}
            />

            <EditorialHero entry={entry} config={config} />

            {/* Body — only renders if a Body component is provided. Entries
                without a body still get the hero + author + nav scaffold so
                they remain useful as link entries. */}
            {Body && (
                <section
                    aria-label="גוף המאמר"
                    className="container mx-auto px-4 py-12 sm:py-16"
                >
                    <div className="max-w-2xl mx-auto">
                        <Prose>
                            <Body />
                        </Prose>
                    </div>
                </section>
            )}

            <AuthorBlock />
            <EditorialNewsletter
                surface={`entry-${config.slug}`}
            />
            <RelatedRail entryId={entry.id} limit={4} />
            <EcosystemNav entry={entry} prev={prev} next={next} />
        </article>
    );
}
