import { useEffect, useState } from 'react'

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setHidden(true)
            onDone?.()
          }, 300)
          return 100
        }
        return p + Math.random() * 15
      })
    }, 80)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div className={`loader ${hidden ? 'hidden' : ''}`}>
      <div style={{ textAlign: 'center' }}>
        <div className="loader-text" style={{ color: 'var(--cream)', marginBottom: '24px' }}>
          DINESH KUMAR
          <span style={{ color: 'var(--orange)' }}>.</span>
        </div>
        <div
          style={{
            width: '200px',
            height: '1px',
            background: 'rgba(245,237,224,0.1)',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${Math.min(progress, 100)}%`,
              background: 'var(--orange)',
              transition: 'width 0.1s ease',
              boxShadow: '0 0 10px rgba(232,105,42,0.8)',
            }}
          />
        </div>
        <div
          className="font-mono"
          style={{
            fontSize: '10px',
            color: 'rgba(245,237,224,0.3)',
            letterSpacing: '0.3em',
            marginTop: '16px',
          }}
        >
          LOADING EXPERIENCE
        </div>
      </div>
    </div>
  )
}
