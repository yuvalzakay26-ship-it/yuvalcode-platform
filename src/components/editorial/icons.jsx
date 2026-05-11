// Icon registry for editorial collections.
//
// Exports a single <CollectionIcon name="..."> renderer rather than a
// function that returns a component reference. The renderer pattern
// satisfies the strict react-hooks rules ("don't create components
// during render") while keeping call sites concise.

import {
    BookOpen,
    FlaskConical,
    Workflow,
    Layers,
    GitCommit,
    Microscope,
    FileText,
} from "lucide-react";

const ICONS = Object.freeze({
    BookOpen,
    FlaskConical,
    Workflow,
    Layers,
    GitCommit,
    Microscope,
    FileText,
});

export function CollectionIcon({ name, className, strokeWidth = 2, style, "aria-hidden": ariaHidden = true }) {
    const Icon = ICONS[name] || FileText;
    return (
        <Icon
            className={className}
            strokeWidth={strokeWidth}
            style={style}
            aria-hidden={ariaHidden ? "true" : undefined}
        />
    );
}
