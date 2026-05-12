import { useParams } from "react-router-dom";
import { LearningShell } from "../../components/learning/LearningShell";
import {
    COURSE,
    chapters,
    getLesson,
    getLessonNeighbors,
    getProgress,
    getChapterContext,
} from "../../data/learning/claudeCodeCurriculum";

const DEFAULT_LESSON_ID = "ch01-l01";

export function ClaudeCodeLearning() {
    const { lessonId } = useParams();
    const resolvedId = lessonId || DEFAULT_LESSON_ID;
    const lesson = getLesson(resolvedId) || getLesson(DEFAULT_LESSON_ID);
    const neighbors = getLessonNeighbors(lesson.id);
    const progress = getProgress();
    const chapterContext = getChapterContext(lesson.id);

    return (
        <LearningShell
            course={COURSE}
            chapters={chapters}
            lesson={lesson}
            neighbors={neighbors}
            progress={progress}
            chapterContext={chapterContext}
            paletteClass="claude-code"
        />
    );
}
