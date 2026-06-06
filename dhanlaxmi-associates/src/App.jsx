import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';

const HomePage            = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ProjectsPage        = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ProjectDetailPage   = lazy(() => import('./pages/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));
const AboutPage           = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const GalleryPage         = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const ContactPage         = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage        = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-ivory">
    <div className="w-6 h-6 border border-sage border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Suspense fallback={<PageFallback />}><HomePage /></Suspense>} />
          <Route path="/projects" element={<Suspense fallback={<PageFallback />}><ProjectsPage /></Suspense>} />
          {/* Legacy route redirects */}
          <Route path="/ongoing-projects"   element={<Suspense fallback={<PageFallback />}><ProjectsPage /></Suspense>} />
          <Route path="/completed-projects" element={<Suspense fallback={<PageFallback />}><ProjectsPage /></Suspense>} />
          <Route path="/projects/:slug"     element={<Suspense fallback={<PageFallback />}><ProjectDetailPage /></Suspense>} />
          <Route path="/gallery"            element={<Suspense fallback={<PageFallback />}><GalleryPage /></Suspense>} />
          <Route path="/about"              element={<Suspense fallback={<PageFallback />}><AboutPage /></Suspense>} />
          <Route path="/contact"            element={<Suspense fallback={<PageFallback />}><ContactPage /></Suspense>} />
          <Route path="*"                   element={<Suspense fallback={<PageFallback />}><NotFoundPage /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
