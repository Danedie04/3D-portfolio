import { useEffect, useRef } from 'react'

const projects = [
  {
    num: '01',
    title: 'Health Habit Tracker',
    desc: 'A full-stack wellness app for tracking daily habits, nutrition, and fitness goals with real-time analytics and AI-powered insights.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    gradient: 'linear-gradient(135deg, rgba(232,105,42,0.15) 0%, rgba(10,15,30,0) 60%)',
    href: '#',
  },
  {
    num: '02',
    title: 'ClipCalendar',
    desc: 'Smart content scheduling tool for creators with drag-and-drop interface, multi-platform publishing, and engagement analytics.',
    tags: ['React', 'Firebase', 'GSAP', 'Tailwind'],
    gradient: 'linear-gradient(135deg, rgba(30,58,95,0.3) 0%, rgba(10,15,30,0) 60%)',
    href: '#',
  },
  {
    num: '03',
    title: 'AI Photobooth',
    desc: 'Real-time AI-powered photo transformation experience with cinematic filters, style transfer, and instant social sharing.',
    tags: ['Python', 'React', 'TensorFlow', 'WebGL'],
    gradient: 'linear-gradient(135deg, rgba(232,105,42,0.1) 0%, rgba(30,58,95,0.2) 100%)',
    href: '#',
  },
  {
    num: '04',
    title: '3D Portfolio',
    desc: 'Immersive cinematic portfolio experience featuring Three.js, Rapier physics, and GSAP animations for a next-level digital identity.',
    tags: ['Three.js', 'R3F', 'Rapier', 'GSAP'],
    gradient: 'linear-gradient(135deg, rgba(232,105,42,0.2) 0%, rgba(10,15,30,0) 60%)',
    href: 'https://my-3d-portfolio-sooty.vercel.app/',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (cardRef.current) {
              cardRef.current.classList.add('visible')
            }
          }, index * 120)
        }
      },
      { threshold: 0.1 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className="project-card glass reveal"
      style={{ background: project.gradient, padding: '36px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Number watermark */}
      <div
        className="font-display absolute"
        style={{
          right: '20px',
          top: '10px',
          fontSize: '80px',
          color: 'rgba(232,105,42,0.06)',
          letterSpacing: '-0.05em',
          userSelect: 'none',
        }}
      >
        {project.num}
      </div>

      {/* Top row */}
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.3em' }}>
          {project.num}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(232,105,42,0.2)' }} />
      </div>

      <h3
        className="font-display mb-3"
        style={{ fontSize: '28px', color: 'var(--cream)', letterSpacing: '0.05em' }}
      >
        {project.title}
      </h3>

      <p
        className="font-serif mb-6"
        style={{ fontSize: '15px', color: 'rgba(245,237,224,0.55)', lineHeight: 1.7, fontStyle: 'italic' }}
      >
        {project.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono"
            style={{
              fontSize: '9px',
              letterSpacing: '0.15em',
              color: 'rgba(232,105,42,0.8)',
              border: '1px solid rgba(232,105,42,0.25)',
              padding: '4px 10px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono inline-flex items-center gap-2 transition-all duration-300"
        style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--orange)', textDecoration: 'none' }}
        onMouseEnter={(e) => (e.currentTarget.style.gap = '12px')}
        onMouseLeave={(e) => (e.currentTarget.style.gap = '8px')}
      >
        VIEW PROJECT →
      </a>

      {/* Hover glow bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--orange), transparent)',
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
        className="card-bottom-line"
      />
    </div>
  )
}

export default function Projects() {
  const titleRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) titleRef.current?.classList.add('visible')
      },
      { threshold: 0.3 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" style={{ padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)' }}>
      {/* Section header */}
      <div ref={titleRef} className="reveal mb-16">
        <span className="font-mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.35em' }}>
          ◆ SELECTED WORK
        </span>
        <h2
          className="font-display mt-2"
          style={{ fontSize: 'clamp(44px, 7vw, 90px)', color: 'var(--cream)', lineHeight: 0.95 }}
        >
          PROJECTS<br />
          <span style={{ color: 'var(--orange)', WebkitTextStroke: '1px var(--orange)', WebkitTextFillColor: 'transparent' }}>
            GALLERY
          </span>
        </h2>
        <div className="h-line mt-4" />
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))',
          gap: '24px',
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
