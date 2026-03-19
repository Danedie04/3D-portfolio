import { useEffect, useState } from 'react'

const links = ['Home', 'Projects', 'About', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      // Update active section
      const sections = ['home', 'projects', 'about', 'contact']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div
        className="flex items-center justify-between"
        style={{ padding: '20px clamp(24px, 6vw, 80px)' }}
      >
        {/* Logo */}
        <a
          href="#home"
          className="font-display"
          style={{ fontSize: '22px', color: 'var(--cream)', letterSpacing: '0.1em', textDecoration: 'none' }}
        >
          DK<span style={{ color: 'var(--orange)' }}>.</span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-8">
          {links.map((link) => {
            const id = link.toLowerCase()
            const isActive = active === id
            return (
              <a
                key={link}
                href={`#${id}`}
                className="font-mono transition-all duration-300"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  textDecoration: 'none',
                  color: isActive ? 'var(--orange)' : 'rgba(245,237,224,0.5)',
                  borderBottom: isActive ? '1px solid var(--orange)' : '1px solid transparent',
                  paddingBottom: '2px',
                }}
              >
                {link.toUpperCase()}
              </a>
            )
          })}

          {/* GitHub link */}
          <a
            href="https://github.com/Danedie04"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono transition-all duration-300"
            style={{
              fontSize: '10px',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              color: 'rgba(245,237,224,0.35)',
              border: '1px solid rgba(232,105,42,0.2)',
              padding: '6px 14px',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--orange)'
              e.target.style.borderColor = 'var(--orange)'
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(245,237,224,0.35)'
              e.target.style.borderColor = 'rgba(232,105,42,0.2)'
            }}
          >
            GITHUB
          </a>
        </div>
      </div>
    </nav>
  )
}
