import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './layout/Layout.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { OngoingProjectsPage } from './pages/OngoingProjectsPage.jsx'
import { CompletedProjectsPage } from './pages/CompletedProjectsPage.jsx'
import { ProjectDetailPage } from './pages/ProjectDetailPage.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { GalleryPage } from './pages/GalleryPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ongoing-projects" element={<OngoingProjectsPage />} />
          <Route path="/completed-projects" element={<CompletedProjectsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
