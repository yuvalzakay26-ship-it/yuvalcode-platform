import { Callout } from "../../components/editorial/Callout";
import { CONTENT_TYPES } from "../../lib/content/schema";

export const entry = {
    id: "rag-rerank-observations",
    slug: "rag-rerank-observations",
    type: CONTENT_TYPES.RESEARCH_NOTE,
    pillar: "ai-tools",
    title: "RAG Re-rank — תצפיות פתוחות.",
    summary: "תצפיות עבודה עם re-rank שלבים אחרי vector search. למה ה-recall קופץ, מה לא ברור, ובאילו מקרים זה לא עוזר.",
    eyebrow: "Reading Notes · Open",
    tags: ["rag", "agents", "research-note", "experiment"],
    status: "live",
    visibility: "public",
    date: "2026-04-18",
    href: "/content/research-notes/rag-rerank-observations",
    related: [
        "agent-eval-harness-v1",
        "claude-code-subagents-in-production",
    ],
    readingMinutes: 3,
    Body,
};

function Body() {
    return (
        <>
            <Callout variant="note" title="הערה אדיטוריאלית — Research Note אינו מאמר.">
                Research Notes הן <strong>תצפיות פתוחות</strong>. אין מסקנה, אין benchmarking מלא. זה תיעוד של מה שאני בודק כרגע — לא של מה שכבר ידוע.
            </Callout>

            <p>
                Re-rank אחרי vector search נשמע כמו פלסטר. הוא לא. בשלושה ניסויים האחרונים, הוספת re-rank הקפיצה את ה-relevance ב-15–22 נקודות אחוז. ה-question הפתוחה היא: <em>למה?</em>
            </p>

            <h2>שלוש תצפיות פתוחות</h2>
            <ol>
                <li>
                    <strong>Vector retrieval מחזיר match סמנטי, לא relevance.</strong> &quot;Claude Code sub-agents&quot; ו-&quot;Anthropic API agents&quot; הם semantically קרובים, אבל למשתמש שמחפש את הראשון, השני הוא thumbnail relevance — לא תוכן.
                </li>
                <li>
                    <strong>Re-rank שלא הוכן יחד עם השאילתה — לא משפר.</strong> אם אני שולח top-50 מ-vector ל-cross-encoder ללא הקשר של השאילתה — אין שיפור. ה-re-rank הוא <em>שאילתה-ספציפי</em>.
                </li>
                <li>
                    <strong>Re-rank מעל לסף מסוים — לא משלם את עצמו.</strong> ב-top-50, עלות ה-re-rank שווה לעלות של chat-completion רגיל. ב-top-200 — ההחזר על השקעה הופך שלילי.
                </li>
            </ol>

            <h2>מה אני בודק עכשיו</h2>
            <ul>
                <li>
                    Re-rank עם <strong>cross-encoder קל</strong> במקום LLM full — כמה ה-quality drop, כמה ה-latency drop?
                </li>
                <li>
                    האם re-rank עוזר בשאילתות עבריות? (vector retrieval בעברית כבר חלש ב-baseline.)
                </li>
                <li>
                    איך ה-re-rank משחק עם <em>related[]</em> editorial signal — האם editorial יכול להחליף re-rank במערכת קטנה?
                </li>
            </ul>

            <p>
                ה-note הזה יתעדכן כשיהיו תוצאות.
            </p>
        </>
    );
}
