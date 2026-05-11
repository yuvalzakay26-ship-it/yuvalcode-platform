import { lazy, Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RouteFallback } from "./components/RouteFallback";
import { SkipToContent } from "./components/SkipToContent";

import { ToastProvider } from "./components/ui/Toast";
import { ConfigValidator } from "./components/ConfigValidator";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { SearchProvider, useSearchOptional } from "./lib/search/SearchContext";
import { AudienceProvider } from "./lib/audience";

// Frequently-visited routes that share most of the home payload stay eager.
// Cold / rarely-visited routes are split into their own chunks.
const Videos = lazy(() => import("./pages/Videos").then(m => ({ default: m.Videos })));
const Exams = lazy(() => import("./pages/Exams").then(m => ({ default: m.Exams })));
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const Contact = lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
const AI = lazy(() => import("./pages/AI").then(m => ({ default: m.AI })));
const Projects = lazy(() => import("./pages/Projects").then(m => ({ default: m.Projects })));
const Content = lazy(() => import("./pages/Content").then(m => ({ default: m.Content })));
const ContentCollection = lazy(() => import("./pages/ContentCollection").then(m => ({ default: m.ContentCollection })));
const ContentEntry = lazy(() => import("./pages/ContentEntry").then(m => ({ default: m.ContentEntry })));
const Stack = lazy(() => import("./pages/Stack").then(m => ({ default: m.Stack })));
const WorkWithMe = lazy(() => import("./pages/WorkWithMe").then(m => ({ default: m.WorkWithMe })));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })));

// Course Worlds
const CourseClaudeCode = lazy(() => import("./pages/courses/ClaudeCode").then(m => ({ default: m.ClaudeCode })));
const CourseClaude101 = lazy(() => import("./pages/courses/Claude101").then(m => ({ default: m.Claude101 })));
const CourseClaude101AccessHub = lazy(() => import("./pages/courses/Claude101AccessHub").then(m => ({ default: m.Claude101AccessHub })));

// Search modal is mounted globally but only loaded the first time it opens.
const SearchModal = lazy(() => import("./components/search/SearchModal"));

function GlobalSearchModal() {
    const ctx = useSearchOptional();
    if (!ctx?.isOpen) return null;
    return (
        <Suspense fallback={null}>
            <SearchModal />
        </Suspense>
    );
}

function Layout() {
    return (
        <AudienceProvider>
            <SearchProvider>
                <ToastProvider>
                    <ConfigValidator />
                    <div className="min-h-screen flex flex-col font-sans text-white bg-background selection:bg-primary/30">
                        <SkipToContent />
                        <ScrollProgress />
                        <Navbar />
                        <main id="main-content" tabIndex="-1" className="flex-grow pt-20 w-full focus:outline-none">
                            <ErrorBoundary>
                                <Suspense fallback={<RouteFallback />}>
                                    <Outlet />
                                </Suspense>
                            </ErrorBoundary>
                        </main>
                        <Footer />
                    </div>
                    <GlobalSearchModal />
                </ToastProvider>
            </SearchProvider>
        </AudienceProvider>
    );
}

import { ScrollToTop } from "./components/ScrollToTop";
import { BackToTopButton } from "./components/BackToTopButton";

function App() {
    return (
        <>
            <ScrollToTop />
            <BackToTopButton />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="exams" element={<Exams />} />
                    <Route path="videos" element={<Videos />} />
                    <Route path="ai" element={<AI />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="content" element={<Content />} />
                    <Route path="content/:collection" element={<ContentCollection />} />
                    <Route path="content/:collection/:slug" element={<ContentEntry />} />
                    <Route path="stack" element={<Stack />} />
                    <Route path="work-with-me" element={<WorkWithMe />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="privacy" element={<Privacy />} />
                    <Route path="terms" element={<Terms />} />
                    
                    {/* Course Worlds */}
                    <Route path="courses/claude-code" element={<CourseClaudeCode />} />
                    <Route path="courses/claude-101" element={<CourseClaude101 />} />
                    <Route path="courses/claude-101/access" element={<CourseClaude101AccessHub />} />
                    
                    {/* Legacy routes — redirect rather than 404 to preserve any external links */}
                    <Route path="coming-soon" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
