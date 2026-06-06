import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FloatingContact } from '../components/FloatingContact';
import { Cursor } from '../components/Cursor';
import { LoadingScreen } from '../components/LoadingScreen';
import { useLenis } from '../hooks/useLenis';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] } },
};


export function Layout() {
  const [loaded, setLoaded]   = useState(false);
  const location              = useLocation();
  useLenis();

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="min-h-screen"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingContact />
    </>
  );
}
