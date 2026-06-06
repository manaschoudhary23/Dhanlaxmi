import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal } from '../components/motion/TextReveal';

const WHATSAPP_NUMBER = '919999999999';

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', projectInterest: '', visitDate: '', message: '', siteVisit: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-20 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-16 h-16 rounded-full bg-sage-mist flex items-center justify-center mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4E6652" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p className="font-display text-2xl text-charcoal font-light mb-3">Message Received</p>
        <p className="font-body text-sm text-stone leading-relaxed max-w-sm">
          Thank you for reaching out. Our team will contact you within 24 hours to assist you.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="form-field">
          <label className="form-label">Full Name *</label>
          <input className="form-input" placeholder="Your full name" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
        </div>
        <div className="form-field">
          <label className="form-label">Phone *</label>
          <input className="form-input" type="tel" placeholder="+91 XXXXX XXXXX" required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">Email</label>
        <input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
      </div>
      <div className="form-field">
        <label className="form-label">Project Interest</label>
        <select className="form-input" value={form.projectInterest} onChange={e => setForm(f => ({...f, projectInterest: e.target.value}))}>
          <option value="">Select a project</option>
          <option>OM Building — Kothrud</option>
          <option>General Enquiry</option>
          <option>Investment Query</option>
        </select>
      </div>
      <div className="form-field">
        <label className="form-label">Message</label>
        <textarea className="form-input resize-none" rows={4} placeholder="Tell us about your requirements…" value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} />
      </div>

      {/* Site visit checkbox */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${form.siteVisit ? 'bg-sage border-sage' : 'border-mist group-hover:border-sage'}`}
          onClick={() => setForm(f => ({...f, siteVisit: !f.siteVisit}))}>
          {form.siteVisit && <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="white" strokeWidth="1.5"><polyline points="1 4 4 7 9 1"/></svg>}
        </div>
        <span className="font-body text-sm text-stone-dark">I'd like to schedule a site visit</span>
      </label>

      <button type="submit" className="btn-primary self-start" disabled={loading}>
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-ivory border-t-transparent animate-spin" />
            Sending…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Send Message
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </span>
        )}
      </button>
    </form>
  );
}

export function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact — Dhanlaxmi Associates</title>
        <meta name="description" content="Get in touch with Dhanlaxmi Associates. Visit our office in Kothrud Pune, call us, or fill the enquiry form to schedule a site visit." />
      </Helmet>

      {/* Page header */}
      <div className="pt-36 pb-16 bg-ivory border-b border-mist">
        <div className="container-luxury">
          <div className="section-label mb-6">Get in Touch</div>
          <TextReveal
            as="h1"
            className="font-display text-fluid-5xl text-charcoal font-light leading-tight"
            trigger="section"
          >
            Start a conversation
          </TextReveal>
          <p className="font-body text-stone-dark text-fluid-base leading-relaxed mt-6 max-w-xl">
            Whether you have questions about our projects, want to schedule a visit, or simply want to learn more — we're here to help.
          </p>
        </div>
      </div>

      {/* Main section */}
      <section className="section-padding bg-ivory">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Form */}
            <div className="lg:col-span-7">
              <h2 className="font-display text-fluid-2xl text-charcoal font-light mb-10">Send us a message</h2>
              <ContactForm />
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="flex flex-col gap-8">
                {/* Office */}
                <div>
                  <p className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-stone mb-4">Office</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-sage mt-0.5 flex-shrink-0">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="font-body text-sm text-stone-dark leading-relaxed">
                        CTS 214, Near Ideal Colony Metro,<br />Erandwane, Kothrud,<br />Pune — 411 038
                      </span>
                    </div>
                    <a href="tel:+919999999999" className="flex items-center gap-3 text-sm text-stone-dark hover:text-sage-deep transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-sage"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                      +91 99999 99999
                    </a>
                    <a href="mailto:info@dhanlaxmi.in" className="flex items-center gap-3 text-sm text-stone-dark hover:text-sage-deep transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-sage"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                      info@dhanlaxmi.in
                    </a>
                  </div>
                </div>

                <div className="w-full h-px bg-mist" />

                {/* Hours */}
                <div>
                  <p className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-stone mb-4">Office Hours</p>
                  <div className="flex flex-col gap-2 font-body text-sm text-stone-dark">
                    <div className="flex justify-between"><span>Mon – Sat</span><span>10:00 – 18:00</span></div>
                    <div className="flex justify-between"><span>Sunday</span><span>By Appointment</span></div>
                  </div>
                </div>

                <div className="w-full h-px bg-mist" />

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I would like to know more about your projects.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-5 bg-[#25D366]/10 border border-[#25D366]/20 rounded-sm hover:bg-[#25D366]/15 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#25D366' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-charcoal">Chat on WhatsApp</p>
                    <p className="font-body text-xs text-stone">Typically replies within minutes</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-ivory-dark">
        <div className="container-luxury pb-20">
          <div className="rounded-sm overflow-hidden border border-mist" style={{ height: '420px' }}>
            <iframe
              src="https://www.google.com/maps?q=Kothrud+Pune&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              title="Dhanlaxmi Associates location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
