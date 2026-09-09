import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, CircleArrowUp, Clock3, Mail, MapPin, Menu, MoveUpRight, Phone, Sparkles, Ticket, X, Zap } from 'lucide-react'
import * as THREE from 'three'
import { coordinators, events, faqs, type EventItem } from './data'
import { siteConfig } from './config'

function Scene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!mountRef.current) return
    const mount = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0.1, 8.2)
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      mount.innerHTML = '<div class="scene-fallback"><img src="/college-emblem.svg" alt="Dhanalakshmi Srinivasan Engineering College emblem" /><small>WEBGL SIGNAL UNAVAILABLE</small></div>'
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    let logoTexture: THREE.Texture = new THREE.TextureLoader().load('/college-emblem.svg')
    logoTexture.colorSpace = THREE.SRGBColorSpace
    const gold = new THREE.MeshStandardMaterial({ color: 0xdca126, roughness: 0.2, metalness: 0.88 })
    const navy = new THREE.MeshStandardMaterial({ color: 0x08265e, roughness: 0.22, metalness: 0.76 })
    const mainLogo = new THREE.Group()
    scene.add(mainLogo)
    const emblemBody = new THREE.Mesh(new THREE.CylinderGeometry(1.72, 1.72, 0.25, 96), navy)
    emblemBody.rotation.x = Math.PI / 2
    emblemBody.castShadow = true
    mainLogo.add(emblemBody)
    const emblemBevel = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.105, 16, 96), gold)
    emblemBevel.position.z = 0.17
    mainLogo.add(emblemBevel)
    const emblemFaceMaterial = new THREE.MeshBasicMaterial({ map: logoTexture, side: THREE.DoubleSide })
    const emblemFace = new THREE.Mesh(new THREE.CircleGeometry(1.62, 96), emblemFaceMaterial)
    emblemFace.position.z = 0.19
    mainLogo.add(emblemFace)
    new THREE.TextureLoader().load('/images/college-logo.png', (sourceTexture) => {
      const sourceImage = sourceTexture.image as HTMLImageElement
      const cropCanvas = document.createElement('canvas')
      cropCanvas.width = 700
      cropCanvas.height = 700
      cropCanvas.getContext('2d')!.drawImage(sourceImage, 418, 30, 700, 700, 0, 0, 700, 700)
      const croppedLogoTexture = new THREE.CanvasTexture(cropCanvas)
      croppedLogoTexture.colorSpace = THREE.SRGBColorSpace
      emblemFaceMaterial.map = croppedLogoTexture
      emblemFaceMaterial.needsUpdate = true
      logoTexture.dispose()
      sourceTexture.dispose()
      logoTexture = croppedLogoTexture
    })

    const ribbonCanvas = document.createElement('canvas')
    ribbonCanvas.width = 900
    ribbonCanvas.height = 220
    const ribbonContext = ribbonCanvas.getContext('2d')!
    const ribbonGradient = ribbonContext.createLinearGradient(0, 0, 0, 220)
    ribbonGradient.addColorStop(0, '#2b75e8')
    ribbonGradient.addColorStop(0.5, '#0b3f9f')
    ribbonGradient.addColorStop(1, '#041c5d')
    ribbonContext.fillStyle = ribbonGradient
    ribbonContext.fillRect(35, 25, 830, 170)
    ribbonContext.fillStyle = '#f5c340'
    ribbonContext.fillRect(35, 25, 830, 10)
    ribbonContext.fillRect(35, 185, 830, 10)
    ribbonContext.font = '700 58px Georgia'
    ribbonContext.textAlign = 'center'
    ribbonContext.fillStyle = '#ffd75c'
    ribbonContext.fillText('Towards Excellence', 450, 132)
    const ribbonTexture = new THREE.CanvasTexture(ribbonCanvas)
    ribbonTexture.colorSpace = THREE.SRGBColorSpace
    const ribbon = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.62, 0.16), new THREE.MeshStandardMaterial({ map: ribbonTexture, roughness: 0.2, metalness: 0.72 }))
    ribbon.position.set(0, -1.25, 0.38)
    ribbon.castShadow = true
    mainLogo.add(ribbon)
    const ribbonEdge = new THREE.Mesh(new THREE.BoxGeometry(3.02, 0.72, 0.09), gold)
    ribbonEdge.position.set(0, -1.25, 0.29)
    mainLogo.add(ribbonEdge)
    const ribbonFront = new THREE.Group()
    ribbonFront.position.z = 0.08
    mainLogo.add(ribbonFront)
    ribbonFront.add(ribbon)

    const pedestal = new THREE.Group()
    pedestal.position.y = -2.16
    scene.add(pedestal)
    const pedestalBase = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.05, 0.22, 96), navy)
    pedestalBase.castShadow = true
    pedestal.add(pedestalBase)
    const pedestalTop = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.7, 0.12, 96), new THREE.MeshStandardMaterial({ color: 0xf0b42d, roughness: 0.19, metalness: 0.9 }))
    pedestalTop.position.y = 0.16
    pedestal.add(pedestalTop)
    const glowRing = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.025, 8, 96), new THREE.MeshBasicMaterial({ color: 0x54a9ff, transparent: true, opacity: 0.9 }))
    glowRing.rotation.x = Math.PI / 2
    glowRing.position.y = 0.3
    pedestal.add(glowRing)

    const rings = [[2.15, 0.22, 0.4], [2.42, -0.16, 1.1], [1.95, 0.55, 2.0]].map(([radius, tilt, speed], index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.018, 8, 96), new THREE.MeshBasicMaterial({ color: index === 1 ? 0xe8ae31 : 0x2e83dc, transparent: true, opacity: 0.62 }))
      ring.rotation.set(tilt, index * 0.8, index * 0.45)
      ring.userData = { speed }
      scene.add(ring)
      return ring
    })
    const orbitSpheres = [
      { color: 0xe8ae31, radius: 2.42, angle: 0.45, speed: 0.16, y: 0.15, ring: 1 },
      { color: 0x2e83dc, radius: 2.15, angle: 2.8, speed: -0.13, y: -0.08, ring: 0 },
      { color: 0xe8ae31, radius: 1.95, angle: 4.9, speed: 0.11, y: 0.3, ring: 2 },
    ].map(({ color, radius, angle, speed, y, ring }) => {
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), new THREE.MeshStandardMaterial({ color, roughness: 0.16, metalness: 0.86 }))
      sphere.userData = { radius, angle, speed, y, ring }
      scene.add(sphere)
      return sphere
    })
    const particlePositions = new Float32Array(260 * 3)
    for (let i = 0; i < particlePositions.length; i += 3) {
      const radius = 2.8 + Math.random() * 2.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta)
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      particlePositions[i + 2] = radius * Math.cos(phi)
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0x8fc8ff, size: 0.018, transparent: true, opacity: 0.52 }))
    scene.add(particles)
    scene.add(new THREE.HemisphereLight(0xeaf6ff, 0x09265f, 2.4))
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2)
    keyLight.position.set(-3, 4, 5)
    scene.add(keyLight)
    const blueLight = new THREE.PointLight(0x3c9dff, 12, 10)
    blueLight.position.set(2.5, 0.5, 3.2)
    scene.add(blueLight)
    const goldLight = new THREE.PointLight(0xffc44d, 9, 8)
    goldLight.position.set(-2.5, 1.2, 2.5)
    scene.add(goldLight)

    const pointer = { x: 0, y: 0 }
    const onPointerMove = (event: PointerEvent) => { pointer.x = (event.clientX / window.innerWidth - 0.5) * 2; pointer.y = (event.clientY / window.innerHeight - 0.5) * 2 }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    const timer = new THREE.Timer()
    let frame = 0
    const render = () => {
      timer.update()
      const elapsed = timer.getElapsed()
      if (!reduceMotion) {
        const tilt = window.matchMedia('(max-width: 580px)').matches ? 0.05 : 0.14
        mainLogo.rotation.y += (pointer.x * tilt - mainLogo.rotation.y) * 0.05
        mainLogo.rotation.x += (-pointer.y * tilt * 0.8 - mainLogo.rotation.x) * 0.05
        mainLogo.position.x += (pointer.x * 0.1 - mainLogo.position.x) * 0.025
        mainLogo.position.y += (Math.sin(elapsed * 1.05) * 0.075 - pointer.y * 0.05 - mainLogo.position.y) * 0.025
        mainLogo.position.z += (Math.sin(elapsed * 0.8) * 0.07 - mainLogo.position.z) * 0.025
        ribbonFront.position.x += (pointer.x * 0.018 - ribbonFront.position.x) * 0.04
        ribbonFront.position.y += (-pointer.y * 0.012 - ribbonFront.position.y) * 0.04
        rings.forEach((ring) => { ring.rotation.z += (ring.userData.speed as number) * 0.0014; ring.rotation.x += 0.0007 })
        orbitSpheres.forEach((sphere) => {
          const data = sphere.userData as { radius: number; angle: number; speed: number; y: number; ring: number }
          data.angle += data.speed * 0.016
          sphere.position.set(Math.cos(data.angle) * data.radius, Math.sin(data.angle) * data.radius * 0.34 + data.y, Math.sin(data.angle) * 0.85 + 0.1)
        })
        particles.rotation.y = elapsed * 0.015
      }
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }
    render()
    const resize = () => { if (!mount.clientWidth) return; camera.aspect = mount.clientWidth / mount.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight) }
    const observer = new ResizeObserver(resize)
    observer.observe(mount)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('pointermove', onPointerMove); particleGeometry.dispose(); logoTexture.dispose(); ribbonTexture.dispose(); renderer.dispose(); renderer.domElement.remove() }
  }, [reduceMotion])

  return <div ref={mountRef} className="scene" aria-label="Interactive 3D Dhanalakshmi Srinivasan Engineering College emblem" role="img" />
}

function PriceDisplay({ suffix = 'per person', className = '' }: { suffix?: string; className?: string }) {
  return <span className={`price-display ${className}`}><strong>{siteConfig.fee.replace(' per person', '')}</strong><small>{suffix}</small></span>
}

function GlassCoordinatorVisual({ index }: { index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shapeRef = useRef<HTMLDivElement>(null)
  const isMobile = window.matchMedia('(max-width: 768px)').matches

  useEffect(() => {
    if (isMobile || !containerRef.current || !shapeRef.current) return
    const container = containerRef.current
    const shape = shapeRef.current
    let frame = 0
    let lastTime = performance.now()
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      targetX = Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / (rect.width / 2)))
      targetY = Math.max(-1, Math.min(1, (event.clientY - rect.top - rect.height / 2) / (rect.height / 2)))
    }

    const handlePointerLeave = () => { targetX = 0; targetY = 0 }
    const animate = (time: number) => {
      const elapsed = time - lastTime
      lastTime = time
      currentX += (targetX - currentX) * Math.min(1, elapsed * 0.012)
      currentY += (targetY - currentY) * Math.min(1, elapsed * 0.012)
      const phase = time * 0.001
      const floatX = Math.sin(phase * 0.7 + index) * 5
      const floatY = Math.cos(phase * 0.55 + index) * 6
      const rotation = phase * (index % 2 ? 7 : -6)
      shape.style.transform = `translate3d(${floatX + currentX * 5}px, ${floatY + currentY * 5}px, 18px) rotateX(${currentY * 5}deg) rotateY(${rotation + currentX * 7}deg) rotateZ(${rotation * 0.45}deg)`
      frame = requestAnimationFrame(animate)
    }

    container.addEventListener('pointermove', handlePointerMove, { passive: true })
    container.addEventListener('pointerleave', handlePointerLeave)
    frame = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frame)
      container.removeEventListener('pointermove', handlePointerMove)
      container.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [isMobile])

  const shapeClasses = ['glass-shape-sphere', 'glass-shape-cube', 'glass-shape-orb', 'glass-shape-crystal', 'glass-shape-wave', 'glass-shape-globe']

  return (
    <div ref={containerRef} className="glass-coordinator-visual" style={{ perspective: '1200px' }}>
      <div className="glass-background" />
      <div className="glass-container" style={{ transformStyle: 'preserve-3d', height: '100%' }}>
        <div
          ref={shapeRef}
          className={`glass-shape ${shapeClasses[index] || shapeClasses[0]}`}
          style={{ willChange: 'transform', animation: 'none' }}
        >
          <div className="glass-shape-inner" />
        </div>
        {index === 0 && <div className="glass-orbit-ring" />}
        {index === 4 && <div className="glass-wave-line glass-wave-line-secondary" />}
        {index === 5 && <div className="glass-globe-latitude glass-globe-latitude-secondary" />}
      </div>
      <div className="glass-glow glass-glow-1" />
      <div className="glass-glow glass-glow-2" />
    </div>
  )
}

function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let x = 0; let y = 0; let ringX = 0; let ringY = 0; let frame = 0
    const move = (event: PointerEvent) => { x = event.clientX; y = event.clientY; if (dotRef.current) { dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)` } }
    const tick = () => { ringX += (x - ringX) * 0.16; ringY += (y - ringY) * 0.16; if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`; frame = requestAnimationFrame(tick) }
    const enter = () => ringRef.current?.classList.add('cursor-hover')
    const leave = () => ringRef.current?.classList.remove('cursor-hover')
    window.addEventListener('pointermove', move)
    document.querySelectorAll('a, button, [data-cursor]').forEach((element) => { element.addEventListener('pointerenter', enter); element.addEventListener('pointerleave', leave) })
    tick()
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); document.querySelectorAll('a, button, [data-cursor]').forEach((element) => { element.removeEventListener('pointerenter', enter); element.removeEventListener('pointerleave', leave) }) }
  }, [])

  return <><div ref={dotRef} className="cursor-dot" /><div ref={ringRef} className="cursor-ring" /></>
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [eventFilter, setEventFilter] = useState<'ALL' | 'TECHNICAL' | 'NON-TECHNICAL'>('ALL')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [timeLeft, setTimeLeft] = useState({ days: 'TBA', hours: 'TBA', mins: 'TBA', secs: 'TBA' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!siteConfig.date) return
      const difference = Math.max(0, new Date(siteConfig.date).getTime() - Date.now())
      const totalSeconds = Math.floor(difference / 1000)
      setTimeLeft({ days: String(Math.floor(totalSeconds / 86400)).padStart(2, '0'), hours: String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0'), mins: String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0'), secs: String(totalSeconds % 60).padStart(2, '0') })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!selectedEvent) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelectedEvent(null) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedEvent])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const reveal = { initial: { opacity: 0, y: reduceMotion ? 0 : 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: reduceMotion ? 0 : 0.65 } }
  const navItems = ['Events', 'Schedule', 'Coordinators', 'About', 'FAQ', 'Contact']
  const filteredEvents = eventFilter === 'ALL' ? events : events.filter((event) => event.category === eventFilter)
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); setMobileOpen(false) }

  return <div className="app-shell">
    <Cursor />
    <div className="noise" />
    <header className={`nav-wrap ${scrolled ? 'is-compact' : ''}`}>
      <nav className="nav container" aria-label="Primary navigation">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Back to top"><span className="brand-mark">U</span><span>UNIQUE <em>2K26</em></span></button>
        <div className={`nav-links ${mobileOpen ? 'is-open' : ''}`}>
          <button onClick={() => scrollTo('home')}>Home</button>
          {navItems.map((item) => <button key={item} onClick={() => scrollTo(item.toLowerCase())}>{item}</button>)}
          <a className="nav-register" href={siteConfig.registrationUrl}><Ticket size={15} /> Register now</a>
        </div>
        <button className="menu-toggle" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>{mobileOpen ? <X /> : <Menu />}</button>
      </nav>
    </header>

    <main>
      <section id="home" className="hero container">
        <div className="hero-copy">
          <motion.div {...reveal} className="eyebrow"><span className="pulse-dot" /> COLLEGE SYMPOSIUM · 2K26</motion.div>
          <motion.h1 {...reveal}>UNIQUE<span>2K26</span></motion.h1>
          <motion.p {...reveal} className="hero-category">College Symposium</motion.p>
          <motion.h2 {...reveal} className="hero-statement">ONE CAMPUS.<br />TEN CHALLENGES.<br /><i>ONE UNIQUE EXPERIENCE.</i></motion.h2>
          <motion.p {...reveal} className="hero-tagline">{siteConfig.tagline}</motion.p>
          <motion.p {...reveal} className="hero-intro">Technology, creativity, innovation, and entertainment in one shared campus experience.</motion.p>
          <motion.div {...reveal} className="hero-details"><div><span>ENTRY</span><PriceDisplay suffix=" / PERSON" /></div><div><span>TEAM SIZE</span><strong>{siteConfig.teamSize}</strong></div><p><b>{siteConfig.participationRule}</b></p></motion.div>
          <motion.div {...reveal} className="hero-actions"><a href={siteConfig.registrationUrl} className="button button-primary" data-cursor>Register now <ArrowUpRight size={18} /></a><button className="button button-quiet" onClick={() => scrollTo('events')} data-cursor>Explore events <ArrowDownRight size={18} /></button></motion.div>
          <motion.div {...reveal} className="hero-meta"><span><CalendarDays size={14} /> {siteConfig.dateLabel}</span><span><MapPin size={14} /> {siteConfig.venue}</span></motion.div>
        </div>
        <div className="hero-visual"><div className="orbit-label orbit-top">01 / INNOVATION <span>◌</span></div><div className="orbit-label orbit-left">02 / CREATIVITY</div><div className="orbit-label orbit-right">03 / COLLABORATION</div><Scene /><div className="visual-caption"><span>THE CORE IS LISTENING</span><span>LAT 12.97 · LONG 77.59</span></div></div>
        <div className="countdown"><div className="countdown-label"><span>UNTIL UNIQUE 2K26</span><Zap size={15} /></div><div className="countdown-units">{Object.entries(timeLeft).map(([key, value]) => <div key={key}><strong>{value}</strong><small>{key === 'mins' ? 'MIN' : key.toUpperCase()}</small></div>)}</div></div>
        <div className="hero-scroll"><span>SCROLL DOWN</span><i /></div><div className="hero-rail" aria-hidden="true"><span className="active">01</span><i /><span>02</span><i /><span>03</span><i /><span>04</span></div>
      </section>

      <section id="events" className="section container"><motion.div {...reveal} className="section-heading"><div><span className="section-kicker">01 / THE EVENT DIRECTORY</span><h2>Choose your <i>challenge.</i></h2></div><p>Ten ways to make the weekend yours. Select one Technical and one Non-Technical event per team.</p></motion.div><div className="participation-rule"><strong>{siteConfig.participationRule}</strong><span>Registration fee: <PriceDisplay /> · Team size: {siteConfig.teamSize}</span><small>ONE TEAM CAN SELECT ONE TECHNICAL + ONE NON-TECHNICAL EVENT.</small></div><div className="filter-row" role="group" aria-label="Filter events">{(['ALL', 'TECHNICAL', 'NON-TECHNICAL'] as const).map((filter) => <button key={filter} className={eventFilter === filter ? 'active' : ''} onClick={() => setEventFilter(filter)} aria-pressed={eventFilter === filter}>{filter}</button>)}</div><div className="event-grid">{filteredEvents.map((event, index) => <motion.button initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .4, delay: index * .04 }} className="event-card" key={`${eventFilter}-${event.id}`} onClick={() => setSelectedEvent(event)} data-cursor><div className="card-top"><span>{event.id} / {event.category}</span><span className="event-icon">{event.id}</span></div><div className="event-art"><span>{event.title.slice(0, 1)}</span><div className="art-grid" /></div><h3>{event.title}</h3><p><b>{event.type}</b><br />{event.description}</p><div className="card-bottom"><span className="card-meta-combined">{siteConfig.teamSize} · <PriceDisplay /></span><span className="card-meta-team">{siteConfig.teamSize}</span><span className="card-meta-fee"><PriceDisplay /></span><span>View event <ArrowUpRight size={15} /></span></div></motion.button>)}</div></section>

      <section id="schedule" className="section schedule-section"><div className="container"><motion.div {...reveal} className="section-heading"><div><span className="section-kicker">03 / THE TIMELINE</span><h2>Your day. Your <i>moment.</i></h2></div><p>The complete schedule and event timings will be announced soon.</p></motion.div><motion.div {...reveal} className="schedule-coming"><div className="schedule-status"><span className="status-dot" /> SCHEDULE <b>COMING SOON</b></div><div className="schedule-facts"><div><span>EVENT DAY</span><strong>08 OCTOBER 2026</strong></div><div><span>TIMINGS</span><strong>9:00 AM ONWARDS</strong></div><div><span>VENUE</span><strong>MINI AUDITORIUM</strong></div></div><div className="schedule-roadmap" aria-label="Planned event flow, details to be announced"><div><b>01</b><span>EVENTS</span></div><i /><div><b>02</b><span>COMPETITIONS</span></div><i /><div><b>03</b><span>FINALS</span></div><i /><div><b>04</b><span>PRIZE CEREMONY</span></div></div><small className="schedule-note">A single-day symposium flow. Official sequence and timings will be shared after confirmation.</small></motion.div></div></section>

      <section id="coordinators" className="section coordinator-section"><div className="container coordinator-wrapper"><motion.div {...reveal} className="coordinator-editorial"><span className="section-kicker">04 / COORDINATORS</span><h2>The people behind<br /><i>UNIQUE 2K26.</i></h2><p>Meet the faculty and student coordinators making UNIQUE 2K26 possible.</p></motion.div><div className="coordinator-grid">{coordinators.map((coordinator, index) => <motion.article {...reveal} transition={{ ...reveal.transition, delay: index * 0.06 }} className={`coordinator-card coordinator-${index === 0 ? 'hod' : index < 3 ? 'faculty' : 'student'}`} key={`${coordinator.name}-${index}`}><GlassCoordinatorVisual index={index} /><div className="coordinator-overlay"><span className="coordinator-label">{coordinator.label}</span><h3>{coordinator.name}</h3><p>{coordinator.designation} · {coordinator.department}{coordinator.year ? ` · ${coordinator.year}` : ''}</p><small>{coordinator.bio}</small></div><MoveUpRight size={16} className="coordinator-arrow" /></motion.article>)}</div></div></section>

      <section id="about" className="section about-section"><div className="container about-grid"><motion.div {...reveal}><span className="section-kicker">05 / THE IDEA</span><h2>10 EVENTS.<br /><i>LIMITLESS CREATIVITY.</i></h2></motion.div><motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="about-copy"><p>UNIQUE 2K26 is a college symposium bringing students together through technology, creativity, innovation, and entertainment.</p><p>Ten challenges, two categories, and one campus full of people ready to think differently. Bring your team, choose your one event, and make the experience your own.</p><a href="https://dsengg.ac.in/" target="_blank" rel="noreferrer" className="text-link">Meet us on campus <ArrowRight size={16} /></a></motion.div></div><div className="container stats-grid">{[['10', 'events'], ['2', 'categories'], ['1–4', 'members']].map(([number, label]) => <div className="stat" key={label}><strong>{number}</strong><span>{label}</span></div>)}<div className="stat stat-price"><PriceDisplay /></div></div></section>

      <section className="sponsors container"><motion.div {...reveal} className="sponsor-label"><span className="section-kicker">05 / IN GOOD COMPANY</span><p>Partner wall · names to be announced.</p></motion.div><div className="marquee" aria-label="Partners"><div className="marquee-track">{['CAMPUS PARTNER', 'KNOWLEDGE PARTNER', 'COMMUNITY PARTNER', 'CAMPUS PARTNER', 'KNOWLEDGE PARTNER', 'COMMUNITY PARTNER'].map((sponsor, index) => <span key={`${sponsor}-${index}`}><Sparkles size={13} /> {sponsor}</span>)}</div></div></section>

      <section id="register" className="register-section"><div className="container register-inner"><motion.div {...reveal}><span className="section-kicker">THE NEXT MOVE IS YOURS</span><h2>READY TO MAKE<br /><i>IT UNIQUE?</i></h2><p><PriceDisplay /> · Team size {siteConfig.teamSize}</p></motion.div><motion.a {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="giant-button" href={siteConfig.registrationUrl} data-cursor><span>Register now</span><ArrowUpRight /></motion.a></div></section>

      <section id="faq" className="section container faq-section"><motion.div {...reveal} className="section-heading"><div><span className="section-kicker">06 / THE FINE PRINT</span><h2>Questions, <i>answered.</i></h2></div></motion.div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>0{index + 1}</span><strong>{question}</strong><ChevronDown size={19} /></button><AnimatePresence initial={false}>{openFaq === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="faq-answer"><p>{answer}</p></motion.div>}</AnimatePresence></div>)}</div></section>

      <section id="contact" className="contact-section"><div className="container contact-grid"><div><span className="section-kicker">06 / CONTACT</span><h2>LET’S BUILD<br /><i>SOMETHING UNIQUE.</i></h2></div><div className="contact-details"><a href={`mailto:${siteConfig.email}`}><Mail size={17} /> {siteConfig.email}</a><a href={`tel:${siteConfig.phone}`}><Phone size={17} /> {siteConfig.phone}</a><a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={17} /> {siteConfig.venue} <MoveUpRight size={15} /></a><div className="socials"><a href={siteConfig.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><span>IG</span></a></div></div></div></section>
    </main>

    <footer className="footer container"><div className="footer-brand"><span className="brand-mark">U</span><span>UNIQUE <em>2K26</em></span></div><span>Where Ideas Become Unique.</span><span>© 2026 UNIQUE 2K26</span><div className="footer-links"><button onClick={() => scrollTo('events')}>Events</button><button onClick={() => scrollTo('schedule')}>Schedule</button><button onClick={() => scrollTo('coordinators')}>Coordinators</button><button onClick={() => scrollTo('about')}>About</button><button onClick={() => scrollTo('faq')}>FAQ</button><button onClick={() => scrollTo('contact')}>Contact</button></div><button onClick={() => scrollTo('home')} aria-label="Back to top"><CircleArrowUp size={18} /></button></footer>

    <AnimatePresence>{selectedEvent && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedEvent(null)}><motion.div className="event-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 25 }} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedEvent(null)} aria-label="Close event details"><X /></button><span className="section-kicker">{selectedEvent.category} / {selectedEvent.id}</span><h2 id="modal-title">{selectedEvent.title}</h2><p>{selectedEvent.description}</p><div className="modal-facts"><span><Sparkles size={15} /> {selectedEvent.type}</span><span><Check size={15} /> {siteConfig.teamSize}</span><span><Ticket size={15} /> <PriceDisplay /></span><span><MapPin size={15} /> {siteConfig.venue}</span></div><div className="modal-sections"><div><h3>Objective</h3><p>{selectedEvent.objective}</p></div><div><h3>Eligibility</h3><p>{selectedEvent.eligibility}</p></div><div><h3>What participants need</h3><p>{selectedEvent.needs}</p></div><div><h3>Judging / selection</h3><p>{selectedEvent.judging}</p></div><div><h3>Prizes</h3><p>Prize details to be announced.</p></div><div><h3>Event information</h3><p>{selectedEvent.information}</p></div></div><h3>Rules</h3><ul>{selectedEvent.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul></motion.div></motion.div>}</AnimatePresence>
  </div>
}

export default App
