"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  shape: "star" | "hexagon" | "triangle" | "diamond" | "cross" | "spiral" | "gear" | "flower" | "lightning"
  rotation: number
  rotationSpeed: number
  opacity: number
  baseOpacity: number
  pulseSpeed: number
  trail: { x: number; y: number; opacity: number }[]
  energy: number
  mass: number
  windResistance: number
  localDensity: number
  inVortex: boolean
  vortexInfluence: number
  colorCycle: number
  breathingPhase: number
}

interface WindForce {
  angle: number
  baseIntensity: number
  frequency: number
  phase: number
}

interface Vortex {
  x: number
  y: number
  radius: number
  strength: number
  rotation: number
  lifetime: number
  maxLifetime: number
  active: boolean
}

interface StrongGust {
  angle: number
  intensity: number
  lifetime: number
  maxLifetime: number
  active: boolean
  fadeIn: number
  fadeOut: number
}

interface ParticleBackgroundProps {
  darkMode: boolean
}

export default function ParticleBackground({ darkMode }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false, intensity: 0 })
  const animationRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const timeRef = useRef(0)
  const windForcesRef = useRef<WindForce[]>([])
  const vorticesRef = useRef<Vortex[]>([])
  const lastVortexTime = useRef(0)
  const strongGustsRef = useRef<StrongGust[]>([])
  const lastGustTime = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    const initializeWindForces = () => {
      windForcesRef.current = [
        {
          angle: 15 * (Math.PI / 180), // 15 graus - vento nordeste suave
          baseIntensity: 0.06,
          frequency: 0.002, // Muito mais lento
          phase: 0,
        },
        {
          angle: 75 * (Math.PI / 180), // 75 graus - vento leste suave
          baseIntensity: 0.08,
          frequency: 0.0015, // Muito mais lento
          phase: Math.PI / 6,
        },
        {
          angle: 135 * (Math.PI / 180), // 135 graus - vento sudeste suave
          baseIntensity: 0.07,
          frequency: 0.0025, // Muito mais lento
          phase: Math.PI / 4,
        },
        {
          angle: 195 * (Math.PI / 180), // 195 graus - vento sudoeste suave
          baseIntensity: 0.05,
          frequency: 0.0018, // Muito mais lento
          phase: Math.PI / 3,
        },
        {
          angle: 255 * (Math.PI / 180), // 255 graus - vento oeste suave
          baseIntensity: 0.09,
          frequency: 0.0022, // Muito mais lento
          phase: Math.PI / 2,
        },
        {
          angle: 315 * (Math.PI / 180), // 315 graus - vento noroeste suave
          baseIntensity: 0.06,
          frequency: 0.0012, // Muito mais lento
          phase: Math.PI * 0.75,
        },
        {
          angle: 45 * (Math.PI / 180), // 45 graus - vento diagonal suave
          baseIntensity: 0.04,
          frequency: 0.0008, // Extremamente lento
          phase: Math.PI * 0.25,
        },
        {
          angle: 225 * (Math.PI / 180), // 225 graus - vento diagonal oposto suave
          baseIntensity: 0.05,
          frequency: 0.001, // Extremamente lento
          phase: Math.PI * 1.25,
        },
      ]
    }

    const createStrongGust = (time: number) => {
      // Rajadas aleatórias a cada 8-15 segundos
      const timeSinceLastGust = time - lastGustTime.current
      const nextGustInterval = 8000 + Math.random() * 7000 // 8-15 segundos

      if (timeSinceLastGust > nextGustInterval) {
        const gust: StrongGust = {
          angle: Math.random() * Math.PI * 2, // Direção aleatória
          intensity: 0.3 + Math.random() * 0.4, // Intensidade entre 0.3 e 0.7
          lifetime: 0,
          maxLifetime: 2000 + Math.random() * 3000, // 2-5 segundos
          active: true,
          fadeIn: 500, // 0.5 segundo para aparecer
          fadeOut: 1000, // 1 segundo para desaparecer
        }
        strongGustsRef.current.push(gust)
        lastGustTime.current = time
      }
    }

    const updateStrongGusts = (deltaTime: number) => {
      strongGustsRef.current = strongGustsRef.current.filter((gust) => {
        if (!gust.active) return false

        gust.lifetime += deltaTime

        if (gust.lifetime >= gust.maxLifetime) {
          gust.active = false
          return false
        }

        return true
      })
    }

    const createVortex = (time: number) => {
      if (time - lastVortexTime.current > 5000) {
        // A cada 5 segundos
        const vortex: Vortex = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 80 + 60,
          strength: Math.random() * 0.8 + 0.4,
          rotation: 0,
          lifetime: 0,
          maxLifetime: Math.random() * 3000 + 2000, // 2-5 segundos
          active: true,
        }
        vorticesRef.current.push(vortex)
        lastVortexTime.current = time
      }
    }

    const updateVortices = (deltaTime: number) => {
      vorticesRef.current = vorticesRef.current.filter((vortex) => {
        if (!vortex.active) return false

        vortex.lifetime += deltaTime
        vortex.rotation += 0.05

        // Fade out no final da vida
        if (vortex.lifetime > vortex.maxLifetime * 0.8) {
          vortex.strength *= 0.98
        }

        if (vortex.lifetime >= vortex.maxLifetime) {
          vortex.active = false
          return false
        }

        return true
      })
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = 120

      // Cores com tons de roxo/azul/rosa com 30% de saturação
      const colors = darkMode
        ? [
            "rgba(147, 112, 219, 0.8)", // Roxo médio
            "rgba(123, 104, 238, 0.8)", // Azul-roxo
            "rgba(186, 85, 211, 0.8)", // Orquídea
            "rgba(138, 43, 226, 0.7)", // Azul-violeta
            "rgba(148, 0, 211, 0.7)", // Violeta escuro
            "rgba(75, 0, 130, 0.8)", // Índigo
            "rgba(106, 90, 205, 0.8)", // Slate azul
            "rgba(72, 61, 139, 0.7)", // Slate azul escuro
            "rgba(199, 21, 133, 0.7)", // Rosa médio
            "rgba(219, 112, 147, 0.6)", // Rosa pálido
          ]
        : [
            "rgba(147, 112, 219, 0.4)", // Roxo médio
            "rgba(123, 104, 238, 0.4)", // Azul-roxo
            "rgba(186, 85, 211, 0.4)", // Orquídea
            "rgba(138, 43, 226, 0.3)", // Azul-violeta
            "rgba(148, 0, 211, 0.3)", // Violeta escuro
            "rgba(75, 0, 130, 0.4)", // Índigo
            "rgba(106, 90, 205, 0.4)", // Slate azul
            "rgba(72, 61, 139, 0.3)", // Slate azul escuro
            "rgba(199, 21, 133, 0.3)", // Rosa médio
            "rgba(219, 112, 147, 0.3)", // Rosa pálido
          ]

      const shapes: (
        | "star"
        | "hexagon"
        | "triangle"
        | "diamond"
        | "cross"
        | "spiral"
        | "gear"
        | "flower"
        | "lightning"
      )[] = ["star", "hexagon", "triangle", "diamond", "cross", "spiral", "gear", "flower", "lightning"]

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 4 + 2 // 2px a 6px
        const baseOpacity = Math.random() * 0.5 + 0.3 // 0.3 a 0.8

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          opacity: baseOpacity,
          baseOpacity,
          pulseSpeed: Math.random() * 0.01 + 0.005,
          trail: [],
          energy: Math.random() * 50 + 25,
          mass: size / 6, // Massa baseada no tamanho
          windResistance: 1 / size, // Partículas menores respondem mais ao vento
          localDensity: 0,
          inVortex: false,
          vortexInfluence: 0,
          colorCycle: Math.random() * Math.PI * 2,
          breathingPhase: Math.random() * Math.PI * 2,
        })
      }

      particlesRef.current = particles
    }

    const calculateLocalDensity = (particle: Particle, particles: Particle[]) => {
      let density = 0
      const checkRadius = 50

      particles.forEach((other) => {
        if (other !== particle) {
          const dx = other.x - particle.x
          const dy = other.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < checkRadius) {
            density += (checkRadius - distance) / checkRadius
          }
        }
      })

      return Math.min(density / 5, 1) // Normalizar
    }

    const applyWindForces = (particle: Particle, time: number) => {
      let totalWindX = 0
      let totalWindY = 0
      let totalInfluence = 0

      // Ventos suaves normais
      windForcesRef.current.forEach((wind, index) => {
        // Ondas muito mais suaves e lentas
        const primaryWave = Math.sin(time * wind.frequency + wind.phase)
        const secondaryWave = Math.sin(time * wind.frequency * 0.7 + wind.phase * 1.1) * 0.2
        const tertiaryWave = Math.sin(time * wind.frequency * 0.3 + wind.phase * 0.8) * 0.15

        // Variação muito mais sutil
        const intensityVariation = 1 + (primaryWave + secondaryWave + tertiaryWave) * 0.15

        // Variação única muito sutil para cada vento
        const uniqueVariation = 1 + Math.sin(time * 0.0008 + index * Math.PI * 0.3) * 0.08

        // Intensidade final muito reduzida
        const currentIntensity =
          wind.baseIntensity * intensityVariation * uniqueVariation * particle.windResistance * 0.5

        // Calcular componentes do vento
        const windX = Math.cos(wind.angle) * currentIntensity
        const windY = Math.sin(wind.angle) * currentIntensity

        // Acumular forças de todos os ventos simultaneamente
        totalWindX += windX
        totalWindY += windY
        totalInfluence += currentIntensity
      })

      // Aplicar rajadas fortes
      strongGustsRef.current.forEach((gust) => {
        if (!gust.active) return

        // Calcular intensidade baseada no ciclo de vida da rajada
        let gustIntensity = gust.intensity

        // Fade in suave
        if (gust.lifetime < gust.fadeIn) {
          gustIntensity *= gust.lifetime / gust.fadeIn
        }
        // Fade out suave
        else if (gust.lifetime > gust.maxLifetime - gust.fadeOut) {
          const fadeProgress = (gust.maxLifetime - gust.lifetime) / gust.fadeOut
          gustIntensity *= fadeProgress
        }

        // Aplicar a rajada com variação temporal para torná-la mais orgânica
        const gustVariation = 1 + Math.sin(time * 0.01) * 0.3
        const finalGustIntensity = gustIntensity * gustVariation * particle.windResistance

        const gustX = Math.cos(gust.angle) * finalGustIntensity
        const gustY = Math.sin(gust.angle) * finalGustIntensity

        totalWindX += gustX
        totalWindY += gustY
      })

      // Aplicar força combinada de todos os ventos de forma muito suave
      const smoothingFactor = 0.3 // Muito mais suave
      particle.vx += totalWindX * smoothingFactor
      particle.vy += totalWindY * smoothingFactor

      // Micro-turbulências ainda mais sutis
      const microTurbulence = 0.0005 // Reduzido pela metade
      particle.vx += (Math.random() - 0.5) * microTurbulence
      particle.vy += (Math.random() - 0.5) * microTurbulence

      // Adicionar um efeito de "respiração" global muito sutil
      const globalBreathing = Math.sin(time * 0.0005) * 0.001
      particle.vx += globalBreathing * Math.cos(particle.colorCycle)
      particle.vy += globalBreathing * Math.sin(particle.colorCycle)
    }

    const applyVortexForces = (particle: Particle) => {
      particle.inVortex = false
      particle.vortexInfluence = 0

      vorticesRef.current.forEach((vortex) => {
        if (!vortex.active) return

        const dx = particle.x - vortex.x
        const dy = particle.y - vortex.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < vortex.radius) {
          particle.inVortex = true
          const influence = (vortex.radius - distance) / vortex.radius
          particle.vortexInfluence = Math.max(particle.vortexInfluence, influence)

          // Força tangencial (redemoinho)
          const angle = Math.atan2(dy, dx) + Math.PI / 2
          const force = vortex.strength * influence * 0.02

          particle.vx += Math.cos(angle) * force
          particle.vy += Math.sin(angle) * force

          // Força centrípeta suave
          const centripetal = vortex.strength * influence * 0.005
          particle.vx -= (dx / distance) * centripetal
          particle.vy -= (dy / distance) * centripetal

          // Aumentar rotação
          particle.rotationSpeed += vortex.strength * influence * 0.01
        }
      })
    }

    const handleParticleCollisions = (particles: Particle[]) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]

          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minDistance = (p1.size + p2.size) * 0.8

          if (distance < minDistance && distance > 0) {
            // Redistribuição dinâmica de velocidades
            const overlap = minDistance - distance
            const separationForce = overlap * 0.01

            const nx = dx / distance
            const ny = dy / distance

            // Separar partículas
            p1.x -= nx * separationForce * 0.5
            p1.y -= ny * separationForce * 0.5
            p2.x += nx * separationForce * 0.5
            p2.y += ny * separationForce * 0.5

            // Troca de momentum baseada na massa
            const totalMass = p1.mass + p2.mass
            const v1x = ((p1.mass - p2.mass) * p1.vx + 2 * p2.mass * p2.vx) / totalMass
            const v1y = ((p1.mass - p2.mass) * p1.vy + 2 * p2.mass * p2.vy) / totalMass
            const v2x = ((p2.mass - p1.mass) * p2.vx + 2 * p1.mass * p1.vx) / totalMass
            const v2y = ((p2.mass - p1.mass) * p2.vy + 2 * p1.mass * p1.vy) / totalMass

            p1.vx = v1x * 0.8 // Damping
            p1.vy = v1y * 0.8
            p2.vx = v2x * 0.8
            p2.vy = v2y * 0.8

            // Efeito visual na colisão
            p1.energy = Math.min(50, p1.energy + 5)
            p2.energy = Math.min(50, p2.energy + 5)
          }
        }
      }
    }

    const drawParticle = (particle: Particle, time: number) => {
      ctx.save()

      // Desenhar trilha
      if (particle.trail.length > 0) {
        particle.trail.forEach((point, index) => {
          const trailOpacity = point.opacity * (index / particle.trail.length) * 0.2
          ctx.globalAlpha = trailOpacity
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(point.x, point.y, particle.size * 0.1 * (index / particle.trail.length), 0, Math.PI * 2)
          ctx.fill()
        })
      }

      ctx.translate(particle.x, particle.y)
      ctx.rotate(particle.rotation)

      // Opacidade flutuante baseada na densidade local e vórtice
      let dynamicOpacity = particle.baseOpacity
      dynamicOpacity += particle.localDensity * 0.3 // Mais opaco em áreas densas
      dynamicOpacity += particle.vortexInfluence * 0.2 // Mais opaco em vórtices
      dynamicOpacity += Math.sin(particle.breathingPhase) * 0.1 // Respiração

      // Aumentar opacidade durante rajadas fortes
      const hasActiveGust = strongGustsRef.current.some((gust) => gust.active)
      if (hasActiveGust) {
        dynamicOpacity += 0.1
      }

      ctx.globalAlpha = Math.min(0.9, Math.max(0.2, dynamicOpacity))

      ctx.fillStyle = particle.color
      ctx.strokeStyle = particle.color
      ctx.lineWidth = darkMode ? 1.5 : 1

      // Tamanho com pulsação
      const energyPulse = 1 + Math.sin(time * 0.003 + particle.colorCycle) * 0.15
      const vortexScale = particle.inVortex ? 1 + particle.vortexInfluence * 0.3 : 1
      const currentSize = particle.size * energyPulse * vortexScale

      // Desenhar forma baseada no shape
      switch (particle.shape) {
        case "star":
          ctx.beginPath()
          for (let i = 0; i < 10; i++) {
            const radius = i % 2 === 0 ? currentSize : currentSize * 0.4
            const angle = (Math.PI / 5) * i
            const x = radius * Math.sin(angle)
            const y = -radius * Math.cos(angle)
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.fill()
          break

        case "hexagon":
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3
            const x = currentSize * Math.cos(angle)
            const y = currentSize * Math.sin(angle)
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.fill()
          break

        case "triangle":
          ctx.beginPath()
          ctx.moveTo(0, -currentSize)
          ctx.lineTo(-currentSize * 0.866, currentSize * 0.5)
          ctx.lineTo(currentSize * 0.866, currentSize * 0.5)
          ctx.closePath()
          ctx.fill()
          break

        case "diamond":
          ctx.beginPath()
          ctx.moveTo(0, -currentSize)
          ctx.lineTo(currentSize * 0.7, 0)
          ctx.lineTo(0, currentSize)
          ctx.lineTo(-currentSize * 0.7, 0)
          ctx.closePath()
          ctx.fill()
          break

        case "cross":
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(-currentSize, 0)
          ctx.lineTo(currentSize, 0)
          ctx.moveTo(0, -currentSize)
          ctx.lineTo(0, currentSize)
          ctx.stroke()
          break

        default:
          ctx.beginPath()
          ctx.arc(0, 0, currentSize, 0, Math.PI * 2)
          ctx.fill()
          break
      }

      // Brilho para partículas energéticas
      if (particle.energy > 35 || particle.inVortex || hasActiveGust) {
        ctx.globalAlpha = 0.1
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.beginPath()
        ctx.arc(0, 0, currentSize * 1.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      ctx.restore()
    }

    const updateParticles = (time: number, deltaTime: number) => {
      const particles = particlesRef.current

      // Criar rajadas fortes aleatórias
      createStrongGust(time)
      updateStrongGusts(deltaTime)

      // Criar vórtices periodicamente
      createVortex(time)
      updateVortices(deltaTime)

      particles.forEach((particle, index) => {
        // Calcular densidade local
        particle.localDensity = calculateLocalDensity(particle, particles)

        // Atualizar trilha
        particle.trail.push({
          x: particle.x,
          y: particle.y,
          opacity: particle.opacity,
        })
        if (particle.trail.length > 6) {
          particle.trail.shift()
        }

        // Aplicar forças do vento (incluindo rajadas)
        applyWindForces(particle, time)

        // Aplicar forças de vórtice
        applyVortexForces(particle)

        // Interação com mouse
        if (mouseRef.current.active) {
          const dx = particle.x - mouseRef.current.x
          const dy = particle.y - mouseRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const force = (100 - distance) / 100
            const intensity = mouseRef.current.intensity * force * 0.015

            particle.vx += (dx / distance) * intensity
            particle.vy += (dy / distance) * intensity
            particle.energy = Math.min(50, particle.energy + force * 8)
          }
        }

        // Atualizar posição
        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.rotationSpeed

        // Atualizar fases
        particle.breathingPhase += particle.pulseSpeed
        particle.colorCycle += 0.01

        // Diminuir energia gradualmente
        particle.energy = Math.max(25, particle.energy - 0.05)

        // Boundary check
        const margin = 50
        if (particle.x < -margin) particle.x = canvas.width + margin
        else if (particle.x > canvas.width + margin) particle.x = -margin
        if (particle.y < -margin) particle.y = canvas.height + margin
        else if (particle.y > canvas.height + margin) particle.y = -margin

        // Damping ainda mais suave (mas um pouco menos durante rajadas)
        const hasActiveGust = strongGustsRef.current.some((gust) => gust.active)
        const dampingFactor = hasActiveGust ? 0.996 : 0.998
        particle.vx *= dampingFactor
        particle.vy *= dampingFactor

        // Limitar velocidades com transição mais suave
        const maxSpeed = hasActiveGust ? 2.5 : 1.5 // Velocidade máxima maior durante rajadas
        if (Math.abs(particle.vx) > maxSpeed) particle.vx *= 0.95
        if (Math.abs(particle.vy) > maxSpeed) particle.vy *= 0.95
      })

      // Lidar com colisões
      handleParticleCollisions(particles)
    }

    let lastTime = 0
    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      updateParticles(time, deltaTime)
      particlesRef.current.forEach((particle) => drawParticle(particle, time))

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.x
      const prevY = mouseRef.current.y

      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true

      const dx = e.clientX - prevX
      const dy = e.clientY - prevY
      const speed = Math.sqrt(dx * dx + dy * dy)
      mouseRef.current.intensity = Math.min(3, speed * 0.1)

      setTimeout(() => {
        mouseRef.current.active = false
        mouseRef.current.intensity = 0
      }, 200)
    }

    resizeCanvas()
    initializeWindForces()
    createParticles()
    animate(0)

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [darkMode])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ background: "transparent" }} />
}
