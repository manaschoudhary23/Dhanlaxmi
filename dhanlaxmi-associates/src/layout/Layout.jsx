import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import { Navbar } from '../components/Navbar.jsx'
import { Sidebar } from '../components/Sidebar.jsx'
import { Footer } from '../components/Footer.jsx'
import { FloatingButton } from '../components/FloatingButton.jsx'
import { ModalForm } from '../components/ModalForm.jsx'
import { Cursor } from '../components/Cursor.jsx'
import { LoadingScreen } from '../components/LoadingScreen.jsx'

const LOADER_SHOWN_KEY = 'dha_loader_shown'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [enquiryProject, setEnquiryProject] = useState('')
  const [showLoader, setShowLoader] = useState(() => {
    // Show loader only once per session
    return !sessionStorage.getItem(LOADER_SHOWN_KEY)
  })
  const location = useLocation()

  // ── Lenis smooth scroll ──────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: false,
    })

    let raf = 0
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  // ── Route change: close sidebar, scroll to top ───────
  useEffect(() => {
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  // ── Lock body scroll when sidebar is open ────────────
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const modalState = useMemo(
    () => ({
      open: enquiryOpen,
      project: enquiryProject,
      openForProject: (projectName = '') => {
        setEnquiryProject(projectName)
        setEnquiryOpen(true)
      },
      close: () => setEnquiryOpen(false),
    }),
    [enquiryOpen, enquiryProject],
  )

  function handleLoaderComplete() {
    sessionStorage.setItem(LOADER_SHOWN_KEY, '1')
    setShowLoader(false)
  }

  return (
    <div className="min-h-svh" style={{ background: 'var(--ivory)' }}>
      {/* Cinematic Loading Screen */}
      <AnimatePresence>
        {showLoader && (
          <LoadingScreen key="loader" onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {!showLoader && (
        <>
          <Cursor />
          <Navbar
            onMenu={() => setSidebarOpen(true)}
            onEnquire={() => modalState.openForProject('')}
          />

          <AnimatePresence>
            {sidebarOpen && (
              <Sidebar
                key="sidebar"
                onClose={() => setSidebarOpen(false)}
                onEnquire={() => modalState.openForProject('')}
              />
            )}
          </AnimatePresence>

          <main className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Outlet context={modalState} />
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer onEnquire={() => modalState.openForProject('')} />

          <FloatingButton onClick={() => modalState.openForProject('')} />

          <AnimatePresence>
            {modalState.open && (
              <ModalForm
                key="enquiry-modal"
                projectInterestedIn={modalState.project}
                onClose={modalState.close}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
