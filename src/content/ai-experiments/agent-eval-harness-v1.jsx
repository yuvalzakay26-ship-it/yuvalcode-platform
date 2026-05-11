import { Callout } from "../../components/editorial/Callout";
import { CodeBlock } from "../../components/editorial/CodeBlock";
import { CONTENT_TYPES } from "../../lib/content/schema";

export const entry = {
    id: "agent-eval-harness-v1",
    slug: "agent-eval-harness-v1",
    type: CONTENT_TYPES.AI_EXPERIMENT,
    pillar: "ai-tools",
    title: "Agent Eval Harness v1 — איך עוקבים אחר איכות סוכן בייצור.",
    summary: "המסגרת הראשונה שלי ל-evaluation של סוכני LLM בייצור. מה עובד, מה לא, ולמה זה חשוב יותר מ-prompt engineering.",
    eyebrow: "Lab · Active",
    tags: ["agents", "evaluation", "experiment", "claude-code"],
    status: "live",
    visibility: "public",
    date: "2026-04-22",
    href: "/content/ai-experiments/agent-eval-harness-v1",
    related: [
        "claude-code-subagents-in-production",
        "rag-rerank-observations",
        "obsidian-claude-publishing-flow",
    ],
    readingMinutes: 6,
    Body,
};

function Body() {
    return (
        <>
            <p>
                <strong>בלי eval, אין סוכן בייצור.</strong> זה הלקח מ-12 חודשי בנייה עם Claude Code, סוכנים מותאמים, ו-RAG patterns. ה-prompt engineering הוא 20% מהעבודה. ה-80% הנותרים זה <em>לדעת אם הסוכן עובד</em>.
            </p>

            <Callout variant="experiment" title="גרסה ראשונה — בייצור.">
                ה-harness הזה רץ בייצור החל מ-<span dir="ltr" className="font-mono text-ink">2026-04-22</span>. הוא לא מושלם. הוא מספיק טוב כדי לתפוס regressions לפני שהן מגיעות לקורא.
            </Callout>

            <h2>למה harness ולא &quot;eval set&quot;?</h2>
            <p>
                Eval set הוא <em>נתונים</em>. Harness הוא <strong>מערכת</strong>: נתונים + רץ + ציון + dashboard + alerting. בלי harness, ה-eval set נמצא ב-spreadsheet שאף אחד לא בודק.
            </p>

            <h2>הארכיטקטורה — קצרה</h2>
            <CodeBlock
                lang="ts"
                filename="harness/runner.ts"
                code={`type EvalCase = {
  id: string;
  prompt: string;
  expectedSignals: string[];
  forbiddenSignals: string[];
  pillar: string;
};

type EvalResult = {
  caseId: string;
  pass: boolean;
  score: number;        // 0..1
  signals: string[];
  durationMs: number;
};

async function runHarness(cases: EvalCase[], agent: Agent) {
  const results: EvalResult[] = [];
  for (const c of cases) {
    const start = Date.now();
    const out = await agent.run(c.prompt);
    const signals = extractSignals(out);
    const score = scoreCase(c, signals);
    results.push({
      caseId: c.id,
      pass: score >= 0.85,
      score,
      signals,
      durationMs: Date.now() - start,
    });
  }
  return results;
}`}
            />

            <h2>שלוש מטריקות בלבד — בכוונה</h2>
            <ol>
                <li>
                    <strong>Signal hit rate</strong> — האם הסוכן הזכיר את הנקודות הקריטיות? (RAG retrieval מציין את הספקים הנכונים? Claude Code מציין שהוא עורך קובץ נכון לפני שהוא משנה?)
                </li>
                <li>
                    <strong>Forbidden signal rate</strong> — האם הסוכן <em>לא</em> אמר משהו אסור? (לא הימר על מספרים, לא בדה הקשרים, לא דיבר על מודלים שלא יודע עליהם.)
                </li>
                <li>
                    <strong>Latency p95</strong> — חוויית משתמש. סוכן שעונה ב-30 שניות הוא לא סוכן ל-CLI.
                </li>
            </ol>

            <Callout variant="warning" title="לא להוסיף עוד מטריקות.">
                ה-temptation להוסיף עוד 5 מטריקות &quot;לדיוק טוב יותר&quot; הוא הסיבה שרוב ה-eval frameworks לא משוחררים מהבטא. שלוש מטריקות שמופעלות בכל commit שוות יותר מ-15 מטריקות שנמדדות פעם בחודש.
            </Callout>

            <h2>מה למדתי בחודש הראשון</h2>
            <ul>
                <li>
                    <strong>Regressions קוראות מהיר.</strong> שינוי באחד ה-prompts הוריד את ה-Signal hit rate מ-93% ל-71% תוך שעות. בלי ה-harness, הייתי מגלה את זה כשמישהו מתלונן.
                </li>
                <li>
                    <strong>Eval cases חייבים להיות ייחודיים מסוכן לסוכן.</strong> Harness אחד גלובלי לא ישרת agent עריכת קבצים <em>וגם</em> RAG QA agent. כל סוכן — eval משלו.
                </li>
                <li>
                    <strong>הכי חשוב — לכתוב את ה-cases לפני ה-prompts.</strong> אם אתה כותב את ה-eval אחרי, אתה כותב eval שמתאים לסוכן שלך. אם לפני — אתה כותב eval שמודד אם הסוכן עומד בציפייה.
                </li>
            </ul>

            <h2>מה הלאה — v2</h2>
            <p>
                הגרסה הבאה תתמוך בסוכנים שמבצעים מספר טריגרים (multi-step), תוסיף regression alerting דרך Slack, ותתחיל לרוץ אוטומטית על כל commit. הקוד יהיה פתוח כשהוא יציב.
            </p>
        </>
    );
}
