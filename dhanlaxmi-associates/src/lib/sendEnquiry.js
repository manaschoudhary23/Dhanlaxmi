import emailjs from '@emailjs/browser'

function getEmailJsConfig() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) return null
  return { serviceId, templateId, publicKey }
}

export async function sendEnquiry(payload) {
  const cfg = getEmailJsConfig()
  if (!cfg) {
    // Basic mode: keeps the UX smooth without requiring backend setup.
    console.log('[Enquiry]', payload)
    return { ok: true, mode: 'console' }
  }

  const templateParams = {
    fullName: payload.fullName,
    phone: payload.phone,
    email: payload.email,
    subject: payload.subject ?? '',
    project: payload.projectInterestedIn ?? '',
    message: payload.message ?? '',
    source: payload.source ?? '',
  }

  await emailjs.send(cfg.serviceId, cfg.templateId, templateParams, {
    publicKey: cfg.publicKey,
  })

  return { ok: true, mode: 'emailjs' }
}

