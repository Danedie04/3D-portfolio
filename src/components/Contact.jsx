import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const sectionRef = useRef()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100)
          })
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate sending
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    }, 1500)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)',
        borderTop: '1px solid rgba(232,105,42,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          right: '-200px',
          bottom: '-200px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,105,42,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(48px, 8vw, 100px)',
          alignItems: 'start',
        }}
      >
        {/* Left */}
        <div>
          <div className="reveal">
            <span className="font-mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.35em' }}>
              ◆ GET IN TOUCH
            </span>
            <h2
              className="font-display mt-2"
              style={{ fontSize: 'clamp(44px, 7vw, 90px)', color: 'var(--cream)', lineHeight: 0.95 }}
            >
              LET'S<br />
              <span style={{ color: 'var(--orange)', WebkitTextStroke: '1px var(--orange)', WebkitTextFillColor: 'transparent' }}>
                CONNECT
              </span>
            </h2>
            <div className="h-line mt-4 mb-6" />
          </div>

          <div className="reveal">
            <p
              className="font-serif"
              style={{ fontSize: '16px', color: 'rgba(245,237,224,0.6)', lineHeight: 1.8, fontStyle: 'italic', maxWidth: '360px' }}
            >
              Have a project in mind? Let's build something immersive together. I'm always open to new collaborations and opportunities.
            </p>
          </div>

          {/* Contact info */}
          <div className="reveal mt-10 flex flex-col gap-5">
            {[
              { icon: '📧', label: 'EMAIL', value: 'dineshkumar04workspace@gmail.com', href: 'mailto:dineshkumar04workspace@gmail.com' },
              { icon: '📱', label: 'PHONE', value: '+91 9600052851', href: 'tel:+919600052851' },
              { icon: '🔗', label: 'LINKEDIN', value: 'linkedin.com/in/dineshkumar-429968200', href: 'https://linkedin.com/in/dinesh-kumar-429968200' },
              { icon: '💻', label: 'GITHUB', value: 'github.com/Danedie04', href: 'https://github.com/Danedie04' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
                style={{ textDecoration: 'none' }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <div>
                  <span className="font-mono block" style={{ fontSize: '9px', color: 'var(--orange)', letterSpacing: '0.3em' }}>
                    {item.label}
                  </span>
                  <span
                    className="font-mono transition-colors duration-300"
                    style={{ fontSize: '11px', color: 'rgba(245,237,224,0.6)' }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--cream)')}
                    onMouseLeave={(e) => (e.target.style.color = 'rgba(245,237,224,0.6)')}
                  >
                    {item.value}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="reveal">
          <div
            className="glass"
            style={{ padding: 'clamp(28px, 4vw, 48px)', position: 'relative', overflow: 'hidden' }}
          >
            {/* Top orange line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--orange), transparent)' }} />

            <p className="font-mono mb-6" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.3em' }}>
              ◆ SEND MESSAGE
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="font-mono block mb-2" style={{ fontSize: '9px', color: 'rgba(245,237,224,0.4)', letterSpacing: '0.25em' }}>
                  YOUR NAME
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="font-mono block mb-2" style={{ fontSize: '9px', color: 'rgba(245,237,224,0.4)', letterSpacing: '0.25em' }}>
                  EMAIL ADDRESS
                </label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="font-mono block mb-2" style={{ fontSize: '9px', color: 'rgba(245,237,224,0.4)', letterSpacing: '0.25em' }}>
                  MESSAGE
                </label>
                <textarea
                  className="form-input"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                className="font-mono transition-all duration-300"
                style={{
                  background: status === 'sent' ? 'rgba(232,105,42,0.2)' : 'var(--orange)',
                  color: status === 'sent' ? 'var(--orange)' : '#0a0f1e',
                  padding: '14px 32px',
                  letterSpacing: '0.25em',
                  fontSize: '11px',
                  border: '1px solid var(--orange)',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  width: '100%',
                }}
              >
                {status === 'sending' ? 'SENDING...' : status === 'sent' ? '✓ MESSAGE SENT' : 'SEND MESSAGE →'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="reveal flex items-center justify-between flex-wrap gap-4 mt-20 pt-8"
        style={{ borderTop: '1px solid rgba(232,105,42,0.1)' }}
      >
        <span className="font-display" style={{ fontSize: '18px', color: 'var(--cream)' }}>
          DK<span style={{ color: 'var(--orange)' }}>.</span>
        </span>
        <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(245,237,224,0.25)', letterSpacing: '0.2em' }}>
          © 2026 DINESH KUMAR · DIGITAL EXPERIENCE CREATOR
        </span>
        <a
          href="https://my-3d-portfolio-sooty.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono"
          style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.2em', textDecoration: 'none' }}
        >
          LIVE PORTFOLIO ↗
        </a>
      </div>
    </section>
  )
}
