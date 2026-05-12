import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { sendEnquiry } from '../lib/sendEnquiry.js'

function normalizePhone(value) {
  return value.replace(/[^\d+]/g, '')
}

function validate(values, { requireSubject = false } = {}) {
  const errors = {}
  if (!values.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!values.phone.trim()) errors.phone = 'Phone number is required.'
  if (values.phone.trim() && values.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Enter a valid phone number.'
  }
  if (!values.email.trim()) errors.email = 'Email is required.'
  if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email.'
  }
  if (requireSubject && !values.subject.trim()) errors.subject = 'Subject is required.'
  if (!values.message.trim()) errors.message = 'Message is required.'
  return errors
}

export function EnquiryForm({
  variant = 'project', // 'project' | 'contact'
  projectInterestedIn = '',
  compact = false,
  onSuccess,
  source = '',
  submitLabel = 'Submit Enquiry',
}) {
  const requireSubject = variant === 'contact'
  const initial = useMemo(
    () => ({
      fullName: '',
      phone: '',
      email: '',
      subject: '',
      projectInterestedIn: projectInterestedIn || '',
      message: '',
    }),
    [projectInterestedIn],
  )

  const [values, setValues] = useState(initial)
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const errors = useMemo(() => validate(values, { requireSubject }), [values, requireSubject])

  function setField(name, value) {
    setValues((v) => ({ ...v, [name]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      subject: true,
      projectInterestedIn: true,
      message: true,
    })

    if (Object.keys(errors).length) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' })
      return
    }

    try {
      setStatus({ type: 'loading', message: 'Sending enquiry…' })
      await sendEnquiry({ ...values, source })
      setStatus({ type: 'success', message: 'Enquiry sent. We’ll reach out shortly.' })
      setValues(initial)
      setTouched({})
      onSuccess?.()
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  const showError = (name) => Boolean(touched[name] && errors[name])

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs tracking-wide text-text/70">Full Name</label>
          <input
            className={['lux-input', showError('fullName') ? 'border-red-500/60' : ''].join(' ')}
            value={values.fullName}
            onChange={(e) => setField('fullName', e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
            inputMode="text"
            autoComplete="name"
            placeholder="Your name"
          />
          {showError('fullName') ? (
            <p className="mt-1 text-xs text-red-300">{errors.fullName}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-xs tracking-wide text-text/70">Phone Number</label>
          <input
            className={['lux-input', showError('phone') ? 'border-red-500/60' : ''].join(' ')}
            value={values.phone}
            onChange={(e) => setField('phone', normalizePhone(e.target.value))}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 9XXXXXXXXX"
          />
          {showError('phone') ? <p className="mt-1 text-xs text-red-300">{errors.phone}</p> : null}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs tracking-wide text-text/70">Email</label>
          <input
            className={['lux-input', showError('email') ? 'border-red-500/60' : ''].join(' ')}
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
          {showError('email') ? <p className="mt-1 text-xs text-red-300">{errors.email}</p> : null}
        </div>

        {requireSubject ? (
          <div>
            <label className="mb-2 block text-xs tracking-wide text-text/70">Subject</label>
            <input
              className={['lux-input', showError('subject') ? 'border-red-500/60' : ''].join(' ')}
              value={values.subject}
              onChange={(e) => setField('subject', e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
              inputMode="text"
              placeholder="How can we help?"
            />
            {showError('subject') ? (
              <p className="mt-1 text-xs text-red-300">{errors.subject}</p>
            ) : null}
          </div>
        ) : (
          <div>
            <label className="mb-2 block text-xs tracking-wide text-text/70">
              Project Interested In
            </label>
            <input
              className="lux-input"
              value={values.projectInterestedIn}
              onChange={(e) => setField('projectInterestedIn', e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, projectInterestedIn: true }))}
              inputMode="text"
              placeholder="Project name"
            />
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block text-xs tracking-wide text-text/70">Message</label>
        <textarea
          className={['lux-textarea', showError('message') ? 'border-red-500/60' : ''].join(' ')}
          value={values.message}
          onChange={(e) => setField('message', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, message: true }))}
          placeholder={
            variant === 'contact'
              ? 'Write your message…'
              : 'Preferred budget, configuration, and best time to call…'
          }
        />
        {showError('message') ? (
          <p className="mt-1 text-xs text-red-300">{errors.message}</p>
        ) : null}
      </div>

      <div className={compact ? 'pt-1' : 'pt-2'}>
        <motion.button
          type="submit"
          className="w-full lux-btn-primary"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.99 }}
          disabled={status.type === 'loading'}
        >
          {status.type === 'loading' ? 'Submitting…' : submitLabel}
        </motion.button>

        <AnimateStatus status={status} />
      </div>
    </form>
  )
}

function AnimateStatus({ status }) {
  if (status.type === 'idle') return null
  const tone =
    status.type === 'success'
      ? 'text-emerald-300'
      : status.type === 'error'
        ? 'text-red-300'
        : 'text-text/70'

  return (
    <motion.p
      className={['mt-3 text-xs', tone].join(' ')}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {status.message}
    </motion.p>
  )
}

