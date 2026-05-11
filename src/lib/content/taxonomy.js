// Taxonomy registry.
//
// Pillars are coarse (eight, fixed). Tags are fine-grained and grow over time.
// This file is the typed registry for tags, audiences, levels, and surfaces —
// the dimensions search/filter/recommendations consume.
//
// Adding a tag is one line. Removing is also one line and surfaces are expected
// to fail soft (an entry referencing a deleted tag still renders; the chip is
// just hidden from the filter UI).

import { PILLARS } from "./pillars";

export const TAGS = Object.freeze({
    // Programming
    "csharp": { label: "C#", pillar: "programming" },
    "data-structures": { label: "מבני נתונים", pillar: "programming" },
    "algorithms": { label: "אלגוריתמים", pillar: "programming" },
    "mahat": { label: "מה״ט", pillar: "mahat" },
    "exam-prep": { label: "הכנה למבחן", pillar: "mahat" },

    // AI tools / agents / workflows
    "agents": { label: "Agents", pillar: "ai-tools" },
    "rag": { label: "RAG", pillar: "ai-tools" },
    "claude-code": { label: "Claude Code", pillar: "claude-code" },
    "anti-gravity": { label: "Anti Gravity", pillar: "anti-gravity" },
    "obsidian": { label: "Obsidian", pillar: "obsidian" },
    "prompts": { label: "Prompts", pillar: "ai-tools" },
    "evaluation": { label: "Evaluation", pillar: "ai-tools" },

    // Building / shipping
    "architecture": { label: "Architecture", pillar: "building-with-ai" },
    "shipping": { label: "Shipping", pillar: "building-with-ai" },
    "build-in-public": { label: "Build in Public", pillar: "creator-journey" },
    "creator-journey": { label: "Creator Journey", pillar: "creator-journey" },

    // Meta
    "behind-the-scenes": { label: "Behind the Scenes", pillar: "creator-journey" },
    "case-study": { label: "Case Study", pillar: "building-with-ai" },
    "workflow": { label: "Workflow", pillar: "claude-code" },
    "experiment": { label: "Experiment", pillar: "ai-tools" },

    // Editorial — Phase 3.1 publishing layer
    "editorial": { label: "Editorial", pillar: "creator-journey" },
    "publishing": { label: "Publishing", pillar: "creator-journey" },
    "research-note": { label: "Research Note", pillar: "ai-tools" },
    "deep-dive": { label: "Deep Dive", pillar: "building-with-ai" },
    "release-notes": { label: "Release Notes", pillar: "creator-journey" },
    "system-thinking": { label: "Systems Thinking", pillar: "building-with-ai" },
});

export const AUDIENCES = Object.freeze({
    BEGINNER: "beginner",
    INTERMEDIATE: "intermediate",
    ADVANCED: "advanced",
    BUILDER: "builder",
    EDUCATOR: "educator",
});

export const LEVELS = Object.freeze({
    INTRO: "intro",
    DEEP_DIVE: "deep-dive",
    REFERENCE: "reference",
});

export const SURFACES = Object.freeze({
    HOME: "/",
    CONTENT: "/content",
    AI: "/ai",
    PROJECTS: "/projects",
    STACK: "/stack",
    EXAMS: "/exams",
    ABOUT: "/about",
    WORK_WITH_ME: "/work-with-me",
});

const TAG_IDS = new Set(Object.keys(TAGS));

export function isValidTag(id) {
    return TAG_IDS.has(id);
}

export function getTag(id) {
    return TAGS[id] || null;
}

export function getTagsByPillar(pillarId) {
    return Object.entries(TAGS)
        .filter(([, meta]) => meta.pillar === pillarId)
        .map(([id, meta]) => ({ id, ...meta }));
}

export function getAllPillarsWithTagCount() {
    return PILLARS.map((p) => ({
        ...p,
        tagCount: getTagsByPillar(p.id).length,
    }));
}
