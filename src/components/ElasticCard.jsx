import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { BallCollider, CuboidCollider, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { extend } from '@react-three/fiber'
import { portraitBase64 } from '../assets/portrait.js'
import { linkedinQR } from '../assets/linkedinQR.js'

extend({ MeshLineGeometry, MeshLineMaterial })

// Load portrait, crop to a face-centered square, return as CanvasTexture
let portraitTexture = null
function getPortraitTexture() {
  if (portraitTexture) return portraitTexture

  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // Fill dark fallback while loading
  ctx.fillStyle = '#1e3a5f'
  ctx.fillRect(0, 0, size, size)

  const img = new window.Image()
  img.onload = () => {
    const srcW = img.naturalWidth
    const srcH = img.naturalHeight
    // Square crop = full width. Face sits in top ~60% — shift down ~6% to center it nicely
    const cropSize = srcW
    const offsetY = srcH * 0.06
    ctx.clearRect(0, 0, size, size)
    ctx.drawImage(img, 0, offsetY, cropSize, cropSize, 0, 0, size, size)
    if (portraitTexture) portraitTexture.needsUpdate = true
  }
  img.src = portraitBase64

  portraitTexture = new THREE.CanvasTexture(canvas)
  return portraitTexture
}

// Load QR texture once
let qrTexture = null
function getQRTexture() {
  if (!qrTexture) {
    qrTexture = new THREE.TextureLoader().load(linkedinQR)
  }
  return qrTexture
}

// Card face rendered as a canvas texture — FRONT only
function createFrontTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 720
  const ctx = canvas.getContext('2d')

  // Background
  const bg = ctx.createLinearGradient(0, 0, 512, 720)
  bg.addColorStop(0, '#0c1220')
  bg.addColorStop(1, '#111827')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, 512, 720)

  // Top orange accent bar
  const accentGrad = ctx.createLinearGradient(0, 0, 512, 0)
  accentGrad.addColorStop(0, '#e8692a')
  accentGrad.addColorStop(0.6, 'rgba(232,105,42,0.4)')
  accentGrad.addColorStop(1, 'rgba(232,105,42,0)')
  ctx.fillStyle = accentGrad
  ctx.fillRect(0, 0, 512, 5)

  // Left accent strip
  const leftStrip = ctx.createLinearGradient(0, 0, 0, 720)
  leftStrip.addColorStop(0, '#e8692a')
  leftStrip.addColorStop(1, 'rgba(232,105,42,0)')
  ctx.fillStyle = leftStrip
  ctx.fillRect(0, 0, 3, 720)

  // Glass overlay
  ctx.fillStyle = 'rgba(255,255,255,0.015)'
  ctx.beginPath()
  ctx.roundRect(14, 14, 484, 692, 12)
  ctx.fill()

  // Border
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.roundRect(14, 14, 484, 692, 12)
  ctx.stroke()

  // Header bar
  ctx.fillStyle = 'rgba(232,105,42,0.08)'
  ctx.fillRect(14, 14, 484, 52)

  // Logo mark
  ctx.fillStyle = '#e8692a'
  ctx.font = 'bold 14px monospace'
  ctx.fillText('◆ DK', 32, 47)

  // ID label
  ctx.fillStyle = 'rgba(245,237,224,0.3)'
  ctx.font = '9px monospace'
  ctx.textAlign = 'right'
  ctx.fillText('DIGITAL ID', 480, 47)
  ctx.textAlign = 'left'

  // ── Photo area: placeholder circle (actual portrait rendered on mesh) ──
  const photoX = 256
  const photoY = 210
  const photoR = 95

  // Outer glow ring
  const glowGrad = ctx.createRadialGradient(photoX, photoY, photoR, photoX, photoY, photoR + 30)
  glowGrad.addColorStop(0, 'rgba(232,105,42,0.35)')
  glowGrad.addColorStop(1, 'rgba(232,105,42,0)')
  ctx.fillStyle = glowGrad
  ctx.beginPath()
  ctx.arc(photoX, photoY, photoR + 30, 0, Math.PI * 2)
  ctx.fill()

  // Orange ring border
  ctx.strokeStyle = '#e8692a'
  ctx.lineWidth = 2.5
  ctx.beginPath()
  ctx.arc(photoX, photoY, photoR + 4, 0, Math.PI * 2)
  ctx.stroke()

  // Inner dark circle (photo will sit on top via mesh)
  ctx.fillStyle = 'rgba(20,30,50,0.9)'
  ctx.beginPath()
  ctx.arc(photoX, photoY, photoR, 0, Math.PI * 2)
  ctx.fill()

  // ── Name ──
  ctx.fillStyle = '#f5ede0'
  ctx.font = "600 36px Georgia, serif"
  ctx.textAlign = 'center'
  ctx.fillText('DINESH KUMAR', 256, 345)

  // Divider
  ctx.strokeStyle = 'rgba(232,105,42,0.6)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(140, 360)
  ctx.lineTo(372, 360)
  ctx.stroke()

  // Role
  ctx.fillStyle = '#e8692a'
  ctx.font = '11px monospace'
  ctx.textAlign = 'center'
  ctx.fillText('WEB DEVELOPER  ·  DESIGNER', 256, 385)

  // Tagline
  ctx.fillStyle = 'rgba(245,237,224,0.5)'
  ctx.font = 'italic 13px Georgia, serif'
  ctx.fillText('"Building immersive digital experiences"', 256, 413)

  // Separator line
  ctx.fillStyle = 'rgba(245,237,224,0.08)'
  ctx.fillRect(32, 430, 448, 1)

  // Info rows
  const infos = [
    ['📍', 'Chennai, Tamil Nadu, India'],
    ['🌐', 'my-3d-portfolio-sooty.vercel.app'],
    ['📧', 'dineshkumar04workspace@gmail.com'],
  ]

  ctx.textAlign = 'left'
  infos.forEach(([icon, text], i) => {
    const y = 460 + i * 36
    ctx.fillStyle = 'rgba(232,105,42,0.8)'
    ctx.font = '14px monospace'
    ctx.fillText(icon, 36, y)
    ctx.fillStyle = 'rgba(245,237,224,0.65)'
    ctx.font = '10.5px monospace'
    ctx.fillText(text, 62, y)
  })

  // Bottom separator
  ctx.fillStyle = 'rgba(245,237,224,0.06)'
  ctx.fillRect(32, 575, 448, 1)

  // Bottom hint
  ctx.fillStyle = 'rgba(245,237,224,0.18)'
  ctx.font = '9px monospace'
  ctx.textAlign = 'center'
  ctx.fillText('◀  DOUBLE-CLICK TO FLIP  ▶', 256, 600)

  // Barcode-style decoration bottom
  for (let x = 60; x < 452; x += 4) {
    const h = Math.random() > 0.6 ? 18 : 10
    ctx.fillStyle = `rgba(232,105,42,${0.05 + Math.random() * 0.08})`
    ctx.fillRect(x, 625, 2, h)
  }

  // Holographic shimmer
  const holo = ctx.createLinearGradient(0, 650, 512, 670)
  holo.addColorStop(0, 'rgba(232,105,42,0)')
  holo.addColorStop(0.4, 'rgba(232,105,42,0.07)')
  holo.addColorStop(0.6, 'rgba(100,180,255,0.05)')
  holo.addColorStop(1, 'rgba(232,105,42,0)')
  ctx.fillStyle = holo
  ctx.fillRect(0, 650, 512, 20)

  return new THREE.CanvasTexture(canvas)
}

// Back face — clean minimal: large QR dominant, only essential text
function createBackTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 720
  const ctx = canvas.getContext('2d')

  // Pure dark background
  ctx.fillStyle = '#080d18'
  ctx.fillRect(0, 0, 512, 720)

  // Subtle radial glow behind QR area (centre of card)
  const glow = ctx.createRadialGradient(256, 360, 0, 256, 360, 260)
  glow.addColorStop(0, 'rgba(232,105,42,0.07)')
  glow.addColorStop(1, 'rgba(232,105,42,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, 512, 720)

  // Top orange bar
  ctx.fillStyle = '#e8692a'
  ctx.fillRect(0, 0, 512, 4)

  // Bottom orange bar
  ctx.fillStyle = '#e8692a'
  ctx.fillRect(0, 716, 512, 4)

  // ── TOP TEXT: "SCAN TO HIRE ME" ──
  ctx.fillStyle = '#e8692a'
  ctx.font = 'bold 15px monospace'
  ctx.textAlign = 'center'
  ctx.letterSpacing = '0.3em'
  ctx.fillText('SCAN TO HIRE ME', 256, 60)

  // Small line under heading
  ctx.strokeStyle = 'rgba(232,105,42,0.4)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(176, 74)
  ctx.lineTo(336, 74)
  ctx.stroke()

  // ── QR PLACEHOLDER BOX (QR image rendered as separate mesh on top) ──
  // Large white-ish bg so QR is scannable when mesh is placed over it
  const qrPad = 12
  const qrLeft = 76
  const qrTop = 100
  const qrBoxSize = 360
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.roundRect(qrLeft - qrPad, qrTop - qrPad, qrBoxSize + qrPad * 2, qrBoxSize + qrPad * 2, 12)
  ctx.fill()

  // Orange border around QR box
  ctx.strokeStyle = '#e8692a'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.roundRect(qrLeft - qrPad, qrTop - qrPad, qrBoxSize + qrPad * 2, qrBoxSize + qrPad * 2, 12)
  ctx.stroke()

  // ── BOTTOM TEXT ──
  // Name
  ctx.fillStyle = 'rgba(245,237,224,0.9)'
  ctx.font = "600 20px Georgia, serif"
  ctx.textAlign = 'center'
  ctx.fillText('Dinesh Kumar', 256, 510)

  // Role
  ctx.fillStyle = '#e8692a'
  ctx.font = '11px monospace'
  ctx.fillText('WEB DEVELOPER & DESIGNER', 256, 534)

  // LinkedIn URL
  ctx.fillStyle = 'rgba(245,237,224,0.38)'
  ctx.font = '9px monospace'
  ctx.fillText('linkedin.com/in/dinesh-kumar-429968200', 256, 558)

  // Thin separator
  ctx.strokeStyle = 'rgba(232,105,42,0.15)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(80, 575)
  ctx.lineTo(432, 575)
  ctx.stroke()

  // Flip hint
  ctx.fillStyle = 'rgba(245,237,224,0.2)'
  ctx.font = '9px monospace'
  ctx.fillText('◀  DOUBLE-CLICK TO FLIP BACK  ▶', 256, 600)

  return new THREE.CanvasTexture(canvas)
}

function IDCard({ flipped }) {
  const meshRef = useRef()
  const [frontTex] = useState(() => createFrontTexture())
  const [backTex] = useState(() => createBackTexture())
  const portraitTex = getPortraitTexture()
  const qrTex = getQRTexture()

  useFrame(() => {
    if (meshRef.current) {
      const targetRot = flipped ? Math.PI : 0
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRot, 0.07)
    }
  })

  // Card dimensions
  const cardW = 1.6
  const cardH = 2.25

  // Photo: center at canvas y=210, radius=95 → card coords
  const photoY = cardH * (0.5 - 210 / 720)
  const photoR = 95 / 720 * cardH

  // QR: box starts at canvas y=100, size=360, center y=280 → card coords
  // canvas center y = 100 + 360/2 = 280
  // card coord y = (0.5 - 280/720) * 2.25 = 0.25*(720-560)/720*2.25
  const qrCenterCanvasY = 100 + 360 / 2   // 280
  const qrY = cardH * (0.5 - qrCenterCanvasY / 720)  // ~+0.250
  // QR size in card units: 360/720 * 2.25 = 1.125, but keep slight inset from border
  const qrSize = (360 / 720) * cardH * 0.92  // ~1.035

  return (
    <group ref={meshRef} scale={2.25} position={[0, -1.2, -0.05]}>
      {/* Front face */}
      <mesh>
        <boxGeometry args={[cardW, cardH, 0.018]} />
        <meshPhysicalMaterial
          map={frontTex}
          clearcoat={1}
          clearcoatRoughness={0.08}
          roughness={0.15}
          metalness={0.25}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Back face (mirrored) */}
      <mesh>
        <boxGeometry args={[cardW, cardH, 0.001]} />
        <meshPhysicalMaterial
          map={backTex}
          clearcoat={1}
          clearcoatRoughness={0.08}
          roughness={0.15}
          metalness={0.25}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Portrait photo — circular clip via circular plane on front */}
      <mesh position={[0, photoY, 0.011]}>
        <circleGeometry args={[photoR, 64]} />
        <meshBasicMaterial map={portraitTex} />
      </mesh>

      {/* QR code — square plane on back face */}
      <mesh position={[0, qrY, -0.011]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[qrSize, qrSize]} />
        <meshBasicMaterial map={qrTex} transparent={false} />
      </mesh>
    </group>
  )
}

export default function ElasticCard({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef()
  const fixed = useRef()
  const j1 = useRef()
  const j2 = useRef()
  const j3 = useRef()
  const card = useRef()
  const [flipped, setFlipped] = useState(false)

  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  }

  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  )
  const [dragged, drag] = useState(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'none')
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      })
    }
    if (fixed.current) {
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        )
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        )
      })
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(32))
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  curve.curveType = 'chordal'

  // Band texture
  const [bandTex] = useState(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    const grad = ctx.createLinearGradient(0, 0, 0, 32)
    grad.addColorStop(0, '#1a0a05')
    grad.addColorStop(0.5, '#e8692a')
    grad.addColorStop(1, '#1a0a05')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 256, 32)
    // subtle pattern
    ctx.fillStyle = 'rgba(0,0,0,0.15)'
    for (let x = 0; x < 256; x += 8) {
      ctx.fillRect(x, 0, 1, 32)
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    return tex
  })

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId)
              drag(false)
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId)
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              )
            }}
            onDoubleClick={() => setFlipped((f) => !f)}
          >
            <IDCard flipped={flipped} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#e8692a"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={bandTex}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}
