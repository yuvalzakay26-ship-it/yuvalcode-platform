// Feed architecture.
//
// One feed model, three serializations: RSS 2.0, Atom 1.0, JSON Feed 1.1.
// The model is *editorial-shape* — it is built from the content collection
// schema, not from per-feed-format primitives — so a single source of truth
// keeps every feed in lockstep.
//
// Generators are pure. They take a feed model + a list of items and return a
// string. No filesystem, no I/O. The build script (scripts/distribution/build-distribution.mjs)
// composes them; tests can compare strings deterministically.

import { SITE } from "../constants";
import { EDITORIAL_COLLECTIONS } from "../editorial/collections-config";

// ---------------------------------------------------------------------------
// Feed model
// ---------------------------------------------------------------------------

/**
 * Build the canonical feed model for a given slug.
 *
 *   slug   — "all" (global) or one of the editorial collection slugs.
 *   entries — already-resolved, sorted, public entries to serialize.
 *
 * Returns a normalized FeedModel that the format-specific renderers consume.
 */
export function buildFeedModel({ slug, entries }) {
    const isGlobal = slug === "all";
    const collection = isGlobal
        ? null
        : EDITORIAL_COLLECTIONS.find((c) => c.slug === slug) || null;

    const title = isGlobal
        ? `${SITE.name} — Editorial`
        : `${SITE.name} — ${collection?.labelEn || slug}`;

    const description = isGlobal
        ? "כל הפרסומים של היוצר — מאמרים, ניסויי AI, workflows, case studies, changelog ו-research notes."
        : collection?.tagline || "";

    const feedUrl = `${SITE.url}/feeds/${slug}.xml`;
    const homepageUrl = isGlobal
        ? `${SITE.url}/content`
        : `${SITE.url}/content/${slug}`;

    const items = (entries || [])
        .map((e) => buildFeedItem(e, collection))
        .filter(Boolean);

    const lastUpdated = items[0]?.date || new Date().toISOString();

    return Object.freeze({
        slug,
        title,
        description,
        feedUrl,
        homepageUrl,
        siteUrl: SITE.url,
        language: "he-IL",
        author: {
            name: SITE.name,
            email: SITE.email,
            url: SITE.url,
        },
        copyright: `© ${new Date(lastUpdated).getFullYear()} ${SITE.name}`,
        lastUpdated,
        items,
    });
}

function buildFeedItem(entry, collectionConfig) {
    if (!entry || !entry.id || !entry.title) return null;
    const config = collectionConfig
        || EDITORIAL_COLLECTIONS.find((c) => c.type === entry.type)
        || null;
    const path = entry.href
        || (config ? `/content/${config.slug}/${entry.slug}` : `/content/${entry.slug}`);
    const url = `${SITE.url}${path}`;
    const date = (entry.date || entry.updatedAt || "").trim() || null;
    const dateIso = date ? toIsoDate(date) : new Date().toISOString();
    const tags = Array.isArray(entry.tags) ? entry.tags : [];

    return Object.freeze({
        id: entry.id,
        guid: url,
        url,
        title: entry.title,
        summary: entry.summary || "",
        eyebrow: entry.eyebrow || (config ? config.eyebrow : null),
        category: config ? config.labelEn : null,
        collectionSlug: config ? config.slug : null,
        date: dateIso,
        tags,
        pillar: entry.pillar || null,
    });
}

function toIsoDate(value) {
    if (!value) return new Date().toISOString();
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return new Date(`${value}T08:00:00Z`).toISOString();
    }
    const d = new Date(value);
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

// ---------------------------------------------------------------------------
// Serializers — pure string builders. No XML libraries.
// ---------------------------------------------------------------------------

const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>';

export function renderRss(feed) {
    const items = feed.items.map(renderRssItem).join("\n");
    return [
        XML_HEADER,
        `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">`,
        `  <channel>`,
        `    <title>${escXml(feed.title)}</title>`,
        `    <link>${escXml(feed.homepageUrl)}</link>`,
        `    <atom:link href="${escXml(feed.feedUrl)}" rel="self" type="application/rss+xml" />`,
        `    <description>${escXml(feed.description)}</description>`,
        `    <language>${feed.language}</language>`,
        `    <copyright>${escXml(feed.copyright)}</copyright>`,
        `    <lastBuildDate>${toRssDate(feed.lastUpdated)}</lastBuildDate>`,
        `    <generator>YuvalCode Distribution Pipeline</generator>`,
        `    <ttl>60</ttl>`,
        items,
        `  </channel>`,
        `</rss>`,
    ].join("\n");
}

function renderRssItem(item) {
    return [
        `    <item>`,
        `      <title>${escXml(item.title)}</title>`,
        `      <link>${escXml(item.url)}</link>`,
        `      <guid isPermaLink="true">${escXml(item.guid)}</guid>`,
        `      <pubDate>${toRssDate(item.date)}</pubDate>`,
        `      <description>${escXml(item.summary)}</description>`,
        item.category ? `      <category>${escXml(item.category)}</category>` : null,
        `      <dc:creator>${escXml(SITE.name)}</dc:creator>`,
        ...item.tags.map((t) => `      <category>${escXml(t)}</category>`),
        `    </item>`,
    ].filter(Boolean).join("\n");
}

export function renderAtom(feed) {
    const entries = feed.items.map(renderAtomEntry).join("\n");
    return [
        XML_HEADER,
        `<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${feed.language}">`,
        `  <id>${escXml(feed.feedUrl)}</id>`,
        `  <title>${escXml(feed.title)}</title>`,
        `  <subtitle>${escXml(feed.description)}</subtitle>`,
        `  <link href="${escXml(feed.feedUrl)}" rel="self" type="application/atom+xml" />`,
        `  <link href="${escXml(feed.homepageUrl)}" rel="alternate" type="text/html" />`,
        `  <updated>${feed.lastUpdated}</updated>`,
        `  <rights>${escXml(feed.copyright)}</rights>`,
        `  <generator>YuvalCode Distribution Pipeline</generator>`,
        `  <author>`,
        `    <name>${escXml(feed.author.name)}</name>`,
        `    <uri>${escXml(feed.author.url)}</uri>`,
        feed.author.email ? `    <email>${escXml(feed.author.email)}</email>` : null,
        `  </author>`,
        entries,
        `</feed>`,
    ].filter(Boolean).join("\n");
}

function renderAtomEntry(item) {
    const categories = item.tags.map((t) => `    <category term="${escAttr(t)}" />`).join("\n");
    return [
        `  <entry>`,
        `    <id>${escXml(item.guid)}</id>`,
        `    <title>${escXml(item.title)}</title>`,
        `    <link href="${escXml(item.url)}" rel="alternate" type="text/html" />`,
        `    <updated>${item.date}</updated>`,
        `    <published>${item.date}</published>`,
        `    <summary type="text">${escXml(item.summary)}</summary>`,
        item.category ? `    <category term="${escAttr(item.category)}" label="${escAttr(item.category)}" />` : null,
        categories || null,
        `  </entry>`,
    ].filter(Boolean).join("\n");
}

export function renderJsonFeed(feed) {
    const obj = {
        version: "https://jsonfeed.org/version/1.1",
        title: feed.title,
        home_page_url: feed.homepageUrl,
        feed_url: feed.feedUrl,
        description: feed.description,
        language: feed.language,
        authors: [
            {
                name: feed.author.name,
                url: feed.author.url,
            },
        ],
        items: feed.items.map((item) => ({
            id: item.guid,
            url: item.url,
            title: item.title,
            summary: item.summary,
            content_text: item.summary,
            date_published: item.date,
            tags: [item.category, ...item.tags].filter(Boolean),
            authors: [{ name: feed.author.name, url: feed.author.url }],
        })),
    };
    return JSON.stringify(obj, null, 2);
}

// ---------------------------------------------------------------------------
// Util
// ---------------------------------------------------------------------------

function escXml(value) {
    if (value === null || value === undefined) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function escAttr(value) {
    return escXml(value);
}

function toRssDate(iso) {
    const d = iso ? new Date(iso) : new Date();
    return isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString();
}
