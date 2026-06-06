import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — Dhanlaxmi Associates</title>
      </Helmet>
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
          <span className="font-display text-[8rem] text-charcoal font-light leading-none tracking-tighter opacity-10">404</span>
          <div className="-mt-16">
            <p className="font-display text-fluid-3xl text-charcoal font-light mb-3">Page not found</p>
            <p className="font-body text-stone-dark text-fluid-base max-w-md leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/" className="btn-primary"><span>Back to Home</span></Link>
            <Link to="/projects" className="btn-outline"><span>View Projects</span></Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
