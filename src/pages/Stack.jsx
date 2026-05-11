import { PageMeta } from "../components/PageMeta";
import { StackHero } from "../components/stack/StackHero";
import { CoreWorkflowSystems } from "../components/stack/CoreWorkflowSystems";
import { ToolEcosystem } from "../components/stack/ToolEcosystem";
import { DailyWorkflowTimeline } from "../components/stack/DailyWorkflowTimeline";
import { KnowledgeLearningSystem } from "../components/stack/KnowledgeLearningSystem";
import { AutomationAIWorkflows } from "../components/stack/AutomationAIWorkflows";
import { WhyThisStack } from "../components/stack/WhyThisStack";
import { StackFinalCTA } from "../components/stack/StackFinalCTA";
import { SITE } from "../lib/constants";
import { ExploreNext } from "../components/audience";

export function Stack() {
    return (
        <div className="flex flex-col text-white overflow-hidden relative">
            <PageMeta
                title="Stack · מערכת ההפעלה של היוצר"
                description="ה-Creator Stack של YuvalCode — Workflows, Tools, ו-Operating Systems שמאחורי הבנייה. Claude Code, Obsidian, VS Code, Anti Gravity, GitHub. סביבת עבודה של יוצר AI-native."
                path="/stack"
                breadcrumbs={[
                    { name: "בית", path: "/" },
                    { name: "Stack", path: "/stack" },
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Creator Stack · YuvalCode",
                    "url": `${SITE.url}/stack`,
                    "inLanguage": "he-IL",
                    "about": [
                        "AI Workflow",
                        "Development Workflow",
                        "Knowledge System",
                        "Creator Publishing",
                        "Claude Code",
                        "Obsidian",
                        "VS Code",
                        "Anti Gravity",
                    ],
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": SITE.name,
                        "url": SITE.url,
                    },
                }}
            />

            <StackHero />
            <CoreWorkflowSystems />
            <ToolEcosystem />
            <DailyWorkflowTimeline />
            <KnowledgeLearningSystem />
            <AutomationAIWorkflows />
            <WhyThisStack />
            <ExploreNext currentPath="/stack" surfaceId="/stack" />
            <StackFinalCTA />
        </div>
    );
}
