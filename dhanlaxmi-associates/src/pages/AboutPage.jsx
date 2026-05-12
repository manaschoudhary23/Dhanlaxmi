import { Link, useOutletContext } from 'react-router-dom'
import { Reveal } from '../components/Reveal.jsx'
import { AnimatedCounter } from '../components/AnimatedCounter.jsx'

const timeline = [
  { year: '2005', title: 'Founded', desc: 'Dhanlaxmi Associates established in Pune with a vision for premium residential development.' },
  { year: '2010', title: 'First Major Project', desc: 'Delivered our first landmark residential complex in Kothrud — setting the benchmark.' },
  { year: '2016', title: 'Expansion', desc: 'Extended portfolio to Erandwane and Baner — Pune\'s most coveted residential corridors.' },
  { year: '2020', title: 'RERA Certified', desc: 'Full RERA compliance established. Transparency and trust cemented as core values.' },
  { year: '2024', title: 'Today', desc: 'Ongoing landmark projects, 500Cr+ delivered, and a reputation built on integrity.' },
]

const values = [
  { icon: '◈', title: 'Quality First', desc: 'Every material, every detail — curated for durability and elegance.' },
  { icon: '◉', title: 'Transparency', desc: 'RERA-registered, clear pricing, no hidden costs — ever.' },
  { icon: '◇', title: 'Client-Centric', desc: 'Your vision drives our design. Your timeline defines our delivery.' },
  { icon: '◆', title: 'Legacy Building', desc: 'We build homes for generations — not just structures.' },
]

export function AboutPage() {
  const modal = useOutletContext()

  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* ── Page Hero ── */}
      <section className="relative overflow-hidden" style={{ background: 'var(--charcoal)', minHeight: '52vh' }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 25% 60%, rgba(198,166,106,0.12), transparent 55%)' }} />
        <div className="gold-shimmer-line absolute bottom-0 left-0 right-0" />
        <div className="container-x relative flex min-h-[52vh] flex-col justify-end pb-16 pt-24">
          <Reveal direction="up">
            <div className="section-label">
              <span className="kicker" style={{ color: 'var(--gold)' }}>Our Story</span>
            </div>
            <h1 className="mb-4 max-w-2xl" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--ivory)',
              lineHeight: 1.05,
            }}>
              Building More Than Homes
            </h1>
            <p className="max-w-xl text-sm leading-relaxed" style={{ color: 'rgba(247,245,242,0.55)' }}>
              Two decades of crafting premium residential spaces in Pune — guided by trust, quality, and a relentless commitment to excellence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Company Story ── */}
      <section className="section-py" aria-label="Company story">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div>
              <div className="section-label"><span className="kicker">Who We Are</span></div>
              <h2 className="heading-xl mb-6">A Calm, Premium Process</h2>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--olive)' }}>
                Dhanlaxmi Associates was founded on the belief that luxury isn't only about finishes — it's about the entire experience. From the first site visit to key handover, we keep the journey refined, personal, and transparent.
              </p>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--olive)' }}>
                We operate in Pune's most premium micro-markets: Kothrud, Erandwane, Baner, and Aundh — areas with strong infrastructure, connectivity, and long-term appreciation.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--olive)' }}>
                Every project we undertake reflects our commitment to quality construction, elegant design, and client-first values that have earned us the trust of hundreds of premium buyers.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: '4/3' }}>
              <img
                src="/images/project_hero.png"
                alt="Dhanlaxmi Associates premium project"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(46,46,46,0.5), transparent)' }} />
              <div className="absolute bottom-6 left-6 glass-card px-5 py-4">
                <div className="kicker mb-1">RERA No.</div>
                <div className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>P52100099881</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: 'var(--beige)' }} className="py-14">
        <div className="container-x grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[
            { value: 15, suffix: '+', label: 'Years of Experience' },
            { value: 30, suffix: '+', label: 'Projects Delivered' },
            { value: 98, suffix: '%', label: 'Client Satisfaction' },
            { value: 500, suffix: 'Cr+', prefix: '₹', label: 'Delivered Value' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="luxury-card p-7 text-center">
                <div className="mb-1" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  fontWeight: 400,
                  color: 'var(--gold)',
                }}>
                  {s.prefix && <span>{s.prefix}</span>}
                  <AnimatedCounter value={s.value} suffix="" decimals={0} duration={2} />
                  <span>{s.suffix}</span>
                </div>
                <div className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--olive)' }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="section-py" aria-label="Vision and mission">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Reveal direction="left">
            <div className="luxury-card h-full p-8" style={{ border: '1px solid rgba(198,166,106,0.2)', background: 'var(--white)' }}>
              <div className="kicker mb-3">Vision</div>
              <h3 className="heading-md mb-4">To Lead Luxury Development in Pune</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--olive)' }}>
                We envision a Pune where every premium buyer has access to curated, high-quality residential projects — delivered with complete transparency and class-leading client service.
              </p>
              <div className="mt-6 h-[2px] w-12" style={{ background: 'var(--gold)' }} />
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <div className="luxury-card h-full p-8" style={{ border: '1px solid rgba(198,166,106,0.2)', background: 'var(--white)' }}>
              <div className="kicker mb-3">Mission</div>
              <h3 className="heading-md mb-4">Deliver Premium Living Experiences</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--olive)' }}>
                Our mission is to craft residences that combine thoughtful design, prime locations, and durable construction — making luxury accessible and the buying experience exceptional.
              </p>
              <div className="mt-6 h-[2px] w-12" style={{ background: 'var(--gold)' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ background: 'var(--charcoal)' }} className="section-py" aria-label="Company timeline">
        <div className="container-x">
          <Reveal>
            <div className="section-label"><span className="kicker" style={{ color: 'var(--gold)' }}>Our Journey</span></div>
            <h2 className="heading-xl mb-12" style={{ color: 'var(--ivory)' }}>Milestones & Legacy</h2>
          </Reveal>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[1.85rem] top-0 bottom-0 w-[1px] hidden sm:block"
              style={{ background: 'linear-gradient(to bottom, var(--gold), rgba(198,166,106,0.1))' }} />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.08}>
                  <div className="flex gap-6 items-start">
                    <div className="shrink-0 flex h-14 w-14 flex-col items-center justify-center rounded-full border text-xs font-semibold z-10"
                      style={{ background: 'var(--charcoal)', borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                      {item.year}
                    </div>
                    <div className="pt-3">
                      <div className="mb-1 text-sm font-semibold" style={{ color: 'var(--gold-light)' }}>{item.title}</div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(247,245,242,0.55)' }}>{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section-py" aria-label="Company values">
        <div className="container-x">
          <Reveal>
            <div className="section-label"><span className="kicker">Our Values</span></div>
            <h2 className="heading-xl mb-12">What We Stand For</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="luxury-card p-7 text-center group">
                  <div className="mb-4 text-3xl" style={{ color: 'var(--gold)' }}>{v.icon}</div>
                  <h3 className="heading-md mb-3">{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--olive)' }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--beige)' }} className="py-16" aria-label="Contact CTA">
        <div className="container-x text-center">
          <Reveal>
            <div className="kicker mb-3">Get In Touch</div>
            <h2 className="heading-xl mb-4">Start Your Luxury Journey</h2>
            <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed" style={{ color: 'var(--olive)' }}>
              Whether you're investing or moving in — let's find the right project for your lifestyle.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => modal.openForProject('')} className="btn-gold">Book a Site Visit</button>
              <Link to="/contact" className="btn-outline-gold">Contact Us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
