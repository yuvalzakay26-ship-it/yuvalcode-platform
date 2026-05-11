// Native React 19-safe metadata utilities.
//
// We deliberately avoid any third-party head manager (react-helmet-async, etc.)
// because (1) react-helmet-async does not officially support React 19 and
// (2) a thin direct DOM layer is more predictable than a library wrapper.
//
// Conventions:
//   - Singleton meta/link tags (description, canonical, og:*, twitter:*,
//     robots, ...) reuse an existing element when present, otherwise create
//     one. Anything we touch gets the data-page-meta="" marker so future code
//     can find it.
//   - "Multi" tags that can appear N times per route — feed alternates
//     (<link rel="alternate">) and article:tag entries — get the marker
//     data-page-meta-multi="<group>" so we can clear-and-rewrite an entire
//     group on every effect run without disturbing other groups.
//   - JSON-LD blocks are tagged with data-page-meta-jsonld="" so we can clear
//     ours without disturbing the baseline JSON-LD scripts emitted in
//     index.html (Person / Organization / WebSite).
//   - Everything is framework-agnostic — these helpers know nothing about
//     React. They take strings and write to document.head. That keeps the
//     migration path to SSR (Next.js generateMetadata, React Router framework
//     mode) trivial: drop the runtime calls, keep the data shape.

const MANAGED_ATTR = "data-page-meta";
const MANAGED_MULTI_ATTR = "data-page-meta-multi";
const MANAGED_LD_ATTR = "data-page-meta-jsonld";

function head() {
    return typeof document !== "undefined" ? document.head : null;
}

// Find an existing element matching `selector`, or build one via `factory`
// and append it to <head>. Either way, mark it as managed so subsequent
// passes can identify it.
function ensureElement(selector, factory) {
    const h = head();
    if (!h) return null;
    let el = h.querySelector(selector);
    if (!el) {
        el = factory();
        h.appendChild(el);
    }
    el.setAttribute(MANAGED_ATTR, "");
    return el;
}

function escapeAttr(value) {
    return String(value).replace(/(["\\])/g, "\\$1");
}

export function setTitle(title) {
    if (typeof document === "undefined" || typeof title !== "string" || !title) return;
    if (document.title !== title) document.title = title;
}

export function setMetaTag(name, content) {
    if (content == null || content === "") return;
    const el = ensureElement(`meta[name="${escapeAttr(name)}"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute("name", name);
        return m;
    });
    if (el && el.getAttribute("content") !== content) {
        el.setAttribute("content", content);
    }
}

export function setPropertyTag(property, content) {
    if (content == null || content === "") return;
    const el = ensureElement(`meta[property="${escapeAttr(property)}"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute("property", property);
        return m;
    });
    if (el && el.getAttribute("content") !== content) {
        el.setAttribute("content", content);
    }
}

export function setCanonical(href) {
    if (!href) return;
    const el = ensureElement('link[rel="canonical"]', () => {
        const l = document.createElement("link");
        l.setAttribute("rel", "canonical");
        return l;
    });
    if (el && el.getAttribute("href") !== href) {
        el.setAttribute("href", href);
    }
}

export function removeMetaTag(name) {
    const h = head();
    if (!h) return;
    const el = h.querySelector(`meta[name="${escapeAttr(name)}"]`);
    if (el && el.hasAttribute(MANAGED_ATTR)) el.remove();
}

export function removePropertyTag(property) {
    const h = head();
    if (!h) return;
    const el = h.querySelector(`meta[property="${escapeAttr(property)}"]`);
    if (el && el.hasAttribute(MANAGED_ATTR)) el.remove();
}

export function setHtmlAttr(name, value) {
    if (typeof document === "undefined" || value == null) return;
    if (document.documentElement.getAttribute(name) !== String(value)) {
        document.documentElement.setAttribute(name, String(value));
    }
}

// ---------------------------------------------------------------------------
// Managed multi-tag groups — clear-and-rewrite atomic primitives.
// ---------------------------------------------------------------------------

function clearManagedGroup(group) {
    const h = head();
    if (!h) return;
    h.querySelectorAll(`[${MANAGED_MULTI_ATTR}="${escapeAttr(group)}"]`).forEach((n) =>
        n.remove(),
    );
}

export function setLinkAlternates(descriptors) {
    clearManagedGroup("link-alternate");
    const h = head();
    if (!h || !descriptors || descriptors.length === 0) return;
    for (const d of descriptors) {
        if (!d || !d.href) continue;
        const link = document.createElement("link");
        link.setAttribute("rel", d.rel || "alternate");
        if (d.type) link.setAttribute("type", d.type);
        link.setAttribute("href", d.href);
        if (d.title) link.setAttribute("title", d.title);
        link.setAttribute(MANAGED_MULTI_ATTR, "link-alternate");
        h.appendChild(link);
    }
}

export function setArticleTags(tags) {
    clearManagedGroup("article-tag");
    const h = head();
    if (!h || !tags || tags.length === 0) return;
    for (const tag of tags) {
        if (!tag) continue;
        const m = document.createElement("meta");
        m.setAttribute("property", "article:tag");
        m.setAttribute("content", String(tag));
        m.setAttribute(MANAGED_MULTI_ATTR, "article-tag");
        h.appendChild(m);
    }
}

// ---------------------------------------------------------------------------
// JSON-LD — atomic clear-then-write of all route-owned structured data.
// ---------------------------------------------------------------------------

export function setJsonLd(entries) {
    clearJsonLd();
    const h = head();
    if (!h || !entries || entries.length === 0) return;
    for (const entry of entries) {
        if (!entry) continue;
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute(MANAGED_LD_ATTR, "");
        script.textContent = JSON.stringify(entry);
        h.appendChild(script);
    }
}

export function clearJsonLd() {
    const h = head();
    if (!h) return;
    h.querySelectorAll(`script[${MANAGED_LD_ATTR}]`).forEach((node) => node.remove());
}

// Final teardown — used by PageMeta cleanup. We remove route-owned JSON-LD
// and every multi-tag group; singleton meta tags are left in place so the
// next route's effect overwrites them without a flash of missing metadata.
export function cleanupMeta() {
    clearJsonLd();
    const h = head();
    if (!h) return;
    h.querySelectorAll(`[${MANAGED_MULTI_ATTR}]`).forEach((n) => n.remove());
}
