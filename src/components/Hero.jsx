import { Suspense, useRef, useEffect, useState, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import ElasticCard from './ElasticCard'
import { portraitBase64 } from '../assets/portrait.js'

function Particles() {
  const particles = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: `${9 + Math.random() * 12}s`,
    delay: `${Math.random() * 12}s`,
    drift: `${(Math.random() - 0.5) * 120}px`,
  })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            '--duration': p.duration,
            '--delay': p.delay,
            '--drift': p.drift,
          }}
        />
      ))}
    </div>
  )
}

function CanvasScene() {
  return (
    // fov=20, camera pulled back to z=16 → card fully in view with breathing room
    <Canvas camera={{ position: [0, 0, 16], fov: 20 }}>
      <ambientLight intensity={Math.PI * 0.6} />
      <pointLight position={[4, 6, 6]} intensity={2.5} color="#e8692a" />
      <pointLight position={[-4, -4, 4]} intensity={1.2} color="#1e3a5f" />
      <directionalLight position={[0, 10, 5]} intensity={0.8} color="#fff" />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <ElasticCard />
      </Physics>
      <Environment background={false}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={4} color="#e8692a" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="#e8692a" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  )
}

export default function Hero() {
  const [canvasReady, setCanvasReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setCanvasReady(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '640px' }}
    >
      {/* ── Cinematic blurred portrait background ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${portraitBase64})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          filter: 'blur(16px) brightness(0.2) saturate(0.5)',
          transform: 'scale(1.12)',
          zIndex: 0,
        }}
      />

      {/* Color grading overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg,
            rgba(10,15,30,0.75) 0%,
            rgba(232,105,42,0.06) 45%,
            rgba(10,15,30,0.82) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Top letterbox */}
      <div className="absolute top-0 left-0 right-0" style={{ height: '70px', background: 'linear-gradient(to bottom,rgba(0,0,0,0.85),transparent)', zIndex: 2 }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '130px', background: 'linear-gradient(to top,rgba(10,15,30,1),transparent)', zIndex: 2 }} />

      {/* Vignette */}
      <div className="vignette" style={{ zIndex: 3 }} />

      {/* Orange light leak — right side where card is */}
      <div className="absolute" style={{
        right: '-5%', top: '5%', width: '55%', height: '65%',
        background: 'radial-gradient(ellipse, rgba(232,105,42,0.10) 0%, transparent 65%)',
        zIndex: 4, pointerEvents: 'none',
      }} />

      {/* Particles */}
      <Particles />

      {/* ── LEFT TEXT PANEL ── */}
      <div
        className="absolute top-0 left-0 h-full flex flex-col justify-center"
        style={{
          zIndex: 20,
          width: '48%',
          paddingLeft: 'clamp(24px, 6vw, 80px)',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <div className="mb-4">
          <span className="font-mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.35em' }}>
            ◆ PORTFOLIO 2026
          </span>
        </div>

        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(48px, 8vw, 112px)',
            lineHeight: 0.9,
            color: 'var(--cream)',
            textShadow: '0 0 80px rgba(232,105,42,0.25)',
          }}
        >
          DINESH<br />
          <span style={{
            WebkitTextStroke: '1.5px var(--orange)',
            WebkitTextFillColor: 'transparent',
          }}>
            KUMAR
          </span>
        </h1>

        <div className="h-line mt-5" />

        <p className="font-serif mt-4" style={{
          fontSize: 'clamp(15px, 1.8vw, 21px)',
          color: 'rgba(245,237,224,0.72)',
          fontStyle: 'italic',
        }}>
          Software Developer &amp; Creative Designer
        </p>

        <p className="font-mono mt-1" style={{
          fontSize: '11px',
          color: 'rgba(245,237,224,0.32)',
          letterSpacing: '0.18em',
        }}>
          Chennai, Tamil Nadu · India
        </p>

        {/* Stat row */}
        <div className="flex gap-8 mt-6">
          {[['2+', 'Years Exp'], ['10+', 'Projects'], ['3', 'Stacks']].map(([num, label]) => (
            <div key={label}>
              <div className="font-display" style={{ fontSize: '28px', color: 'var(--orange)' }}>{num}</div>
              <div className="font-mono" style={{ fontSize: '9px', color: 'rgba(245,237,224,0.35)', letterSpacing: '0.2em' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-4 mt-8 flex-wrap">
          <a
            href="#projects"
            className="font-mono"
            style={{
              fontSize: '11px', letterSpacing: '0.22em', textDecoration: 'none',
              background: 'var(--orange)', color: '#0a0f1e',
              padding: '13px 28px', fontWeight: '600',
              transition: 'background 0.25s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#c4521a'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--orange)'}
          >
            VIEW WORK
          </a>
          <a
            href="#contact"
            className="font-mono"
            style={{
              fontSize: '11px', letterSpacing: '0.22em', textDecoration: 'none',
              border: '1px solid rgba(232,105,42,0.5)', color: 'var(--orange)',
              padding: '13px 28px',
              transition: 'border-color 0.25s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--orange)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(232,105,42,0.5)'}
          >
            CONTACT
          </a>
        </div>

        {/* Bottom hints */}
        <div className="mt-auto font-mono" style={{ fontSize: '10px', color: 'rgba(245,237,224,0.25)', letterSpacing: '0.18em' }}>
          ↕ SCROLL &nbsp;&nbsp; ↔ DRAG CARD &nbsp;&nbsp; ◎ DOUBLE-CLICK TO FLIP
        </div>
      </div>

      {/* ── RIGHT 3D CANVAS — card lives here, fully visible ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '56%',
          height: '100%',
          zIndex: 15,
        }}
      >
        {canvasReady && (
          <Suspense fallback={null}>
            <CanvasScene />
          </Suspense>
        )}
      </div>

      {/* Vertical separator line */}
      <div style={{
        position: 'absolute',
        left: '46%',
        top: '15%',
        width: '1px',
        height: '70%',
        background: 'linear-gradient(to bottom, transparent, rgba(232,105,42,0.25), transparent)',
        zIndex: 18,
        pointerEvents: 'none',
      }} />
    </section>
  )
}
