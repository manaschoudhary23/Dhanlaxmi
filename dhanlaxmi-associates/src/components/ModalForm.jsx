import { motion } from 'framer-motion'
import { EnquiryForm } from './EnquiryForm.jsx'

export function ModalForm({ onClose, projectInterestedIn = '' }) {
  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0"
        style={{ background: 'rgba(20,16,8,0.8)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
        aria-label="Close enquiry modal"
      />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-xl overflow-hidden rounded-3xl"
        style={{
          background: 'var(--white)',
          border: '1px solid rgba(198,166,106,0.2)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.4)',
        }}
        initial={{ y: 24, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 24, scale: 0.97, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      >
        {/* Header */}
        <div className="relative overflow-hidden px-8 py-7"
          style={{ background: 'var(--charcoal)' }}>
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(198,166,106,0.18), transparent 60%)' }} />
          <div className="gold-shimmer-line absolute bottom-0 left-0 right-0" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="kicker mb-1.5" style={{ color: 'var(--gold)' }}>Quick Enquiry</div>
              <div className="heading-md" style={{ color: 'var(--ivory)', fontFamily: 'var(--font-heading)' }}>
                Book a Site Visit
              </div>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: 'rgba(247,245,242,0.5)' }}>
                Share your preferences — our team responds within 24 hours.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition"
              style={{ background: 'rgba(247,245,242,0.06)', border: '1px solid rgba(247,245,242,0.1)', color: 'var(--ivory)' }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="px-8 pb-8 pt-6">
          <EnquiryForm
            variant="project"
            projectInterestedIn={projectInterestedIn}
            source="modal"
            onSuccess={onClose}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
