import { useEffect, useRef } from 'react'
import { portraitBase64 } from '../assets/portrait.js'

const skills = [
  { label: 'React / Three.js / R3F', pct: 90 },
  { label: 'JavaScript / TypeScript', pct: 88 },
  { label: 'Node.js / Python', pct: 82 },
  { label: 'SQL / PostgreSQL', pct: 78 },
  { label: 'Cloud (GCP / AWS)', pct: 70 },
  { label: 'Machine Learning', pct: 65 },
]

const timeline = [
  { year: '2026 →', role: 'Data Scientist', co: 'Gradtwin', loc: 'Chennai' },
  { year: '2024–25', role: 'Network Engineer', co: 'Techglora', loc: 'Bangalore' },
  { year: '2023–24', role: 'QA Engineer', co: 'ADP', loc: 'Chennai' },
  { year: '2024 →', role: 'Freelance Web Dev', co: 'Self', loc: 'Chennai' },
]

export default function About() {
  const sectionRef = useRef()
  const skillBarsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reveal skill bars
          skillBarsRef.current.forEach((bar, i) => {
            setTimeout(() => {
              bar?.classList.add('animate')
            }, 200 + i * 100)
          })
          // Reveal all reveals inside
          sectionRef.current?.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80)
          })
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)',
        borderTop: '1px solid rgba(232,105,42,0.1)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: 'clamp(48px, 8vw, 100px)',
          alignItems: 'start',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Left — Bio */}
        <div>
          <div className="reveal">
            <span className="font-mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.35em' }}>
              ◆ ABOUT ME
            </span>
            <h2
              className="font-display mt-2"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: 'var(--cream)', lineHeight: 0.95 }}
            >
              THE<br />
              <span style={{ color: 'var(--orange)', WebkitTextStroke: '1px var(--orange)', WebkitTextFillColor: 'transparent' }}>
                CREATOR
              </span>
            </h2>
            <div className="h-line mt-4 mb-6" />
          </div>

          {/* Portrait */}
          <div className="reveal" style={{ marginBottom: '32px' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '380px',
                aspectRatio: '4/5',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src={portraitBase64}
                alt="Dinesh Kumar"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 12%',
                  filter: 'contrast(1.1) saturate(0.9)',
                }}
              />
              {/* Color overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(10,15,30,0.9) 100%)',
                }}
              />
              {/* Orange accent line */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '3px',
                  height: '100%',
                  background: 'var(--orange)',
                }}
              />
            </div>
          </div>

          <div className="reveal">
            <p
              className="font-serif"
              style={{ fontSize: '18px', color: 'rgba(245,237,224,0.8)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '16px' }}
            >
              "I don't just write code — I craft digital realities that leave people breathless."
            </p>
            <p
              className="font-mono"
              style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)', lineHeight: 1.9 }}
            >
              Passionate software developer based in Chennai with expertise spanning Full-Stack Development,
              Data Science, Network Engineering, and QA. Currently working as a Data Scientist at Gradtwin,
              exploring the intersection of AI and immersive web experiences.
            </p>
          </div>

          {/* Timeline */}
          <div className="reveal mt-10">
            <p className="font-mono mb-6" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.3em' }}>
              EXPERIENCE TIMELINE
            </p>
            {timeline.map((t, i) => (
              <div
                key={i}
                className="relative"
                style={{
                  borderLeft: i < timeline.length - 1 ? '2px solid rgba(232,105,42,0.2)' : '2px solid transparent',
                  paddingLeft: '28px',
                  paddingBottom: '32px',
                }}
              >
                {/* Dot */}
                <div style={{
                  position: 'absolute',
                  left: '-7px',
                  top: '6px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'var(--orange)',
                  boxShadow: '0 0 14px rgba(232,105,42,0.6)',
                  border: '2px solid #0a0f1e',
                }} />
                {/* Card */}
                <div className="glass" style={{ padding: '16px 20px' }}>
                  <span className="font-mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.25em' }}>
                    {t.year}
                  </span>
                  <p className="font-display mt-1" style={{ fontSize: '20px', color: 'var(--cream)', letterSpacing: '0.05em' }}>{t.role}</p>
                  <p className="font-mono mt-1" style={{ fontSize: '11px', color: 'rgba(245,237,224,0.45)' }}>
                    {t.co} &nbsp;·&nbsp; {t.loc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Skills */}
        <div>
          <div className="reveal">
            <span className="font-mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.35em' }}>
              ◆ TECHNICAL SKILLS
            </span>
            <h3
              className="font-display mt-2 mb-8"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)', color: 'var(--cream)', lineHeight: 0.95 }}
            >
              STACK &<br />EXPERTISE
            </h3>
          </div>

          {/* Skill bars */}
          {skills.map((s, i) => (
            <div key={s.label} className="reveal mb-8">
              <div className="flex justify-between mb-2">
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--cream)', letterSpacing: '0.1em' }}>
                  {s.label}
                </span>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--orange)' }}>
                  {s.pct}%
                </span>
              </div>
              <div style={{ height: '2px', background: 'rgba(245,237,224,0.08)' }}>
                <div
                  ref={(el) => (skillBarsRef.current[i] = el)}
                  className="skill-bar-fill"
                  style={{ '--pct': `${s.pct}%` }}
                />
              </div>
            </div>
          ))}

          {/* Education */}
          <div className="reveal glass mt-10 p-6">
            <p className="font-mono mb-3" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.3em' }}>
              ◆ EDUCATION
            </p>
            <p className="font-display" style={{ fontSize: '22px', color: 'var(--cream)' }}>
              B.E. COMPUTER SCIENCE
            </p>
            <p className="font-mono mt-1" style={{ fontSize: '11px', color: 'rgba(245,237,224,0.5)' }}>
              Kings Engineering College · Anna University
            </p>
            <p className="font-mono" style={{ fontSize: '11px', color: 'rgba(245,237,224,0.4)' }}>
              2019 – 2023 · GPA 7.6/10
            </p>
          </div>

          {/* Certifications */}
          <div className="reveal mt-6">
            <p className="font-mono mb-3" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.3em' }}>
              ◆ CERTIFICATIONS
            </p>
            {[
              'AI Foundations & Prompt Engineering — Naan Mudhalvan',
              'Database Front End Developer & Tester — Asgardia',
              'VirtualEye Life Guard — Swimming Pool Detection',
            ].map((cert, i) => (
              <div
                key={i}
                className="font-mono flex gap-2 mb-2"
                style={{ fontSize: '11px', color: 'rgba(245,237,224,0.5)' }}
              >
                <span style={{ color: 'var(--orange)' }}>▸</span>
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
