"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface BattleAnimationProps {
  playerHealth: number
  opponentHealth: number
}

export default function BattleAnimation({ playerHealth, opponentHealth }: BattleAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Load images
    const playerImg = new Image()
    playerImg.src = "/pixel-knight.png"
    playerImg.crossOrigin = "anonymous"

    const opponentImg = new Image()
    opponentImg.src = "/pixel-warrior.png"
    opponentImg.crossOrigin = "anonymous"

    // Animation variables
    let animationFrameId: number
    const particles: Particle[] = []

    // Particle class for effects
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor(x: number, y: number, size: number, speedX: number, speedY: number, color: string) {
        this.x = x
        this.y = y
        this.size = size
        this.speedX = speedX
        this.speedY = speedY
        this.color = color
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.size > 0.2) this.size -= 0.1
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles for attacks
    const createParticles = (x: number, y: number, color: string, count: number) => {
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 5 + 2
        const speedX = (Math.random() - 0.5) * 6
        const speedY = (Math.random() - 0.5) * 6
        particles.push(new Particle(x, y, size, speedX, speedY, color))
      }
    }

    // Animation variables
    let playerX = 100
    let opponentX = canvas.width - 150
    let playerAttacking = false
    let opponentAttacking = false
    let attackTimer = 0

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw battle arena
      ctx.fillStyle = "rgba(233, 213, 255, 0.5)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw characters
      if (playerImg.complete) {
        ctx.drawImage(playerImg, playerX, canvas.height / 2 - 50, 100, 100)
      }

      if (opponentImg.complete) {
        ctx.drawImage(opponentImg, opponentX, canvas.height / 2 - 50, 100, 100)
      }

      // Handle attack animations
      attackTimer++
      if (attackTimer % 60 === 0) {
        if (Math.random() > 0.5) {
          playerAttacking = true
          setTimeout(() => {
            playerAttacking = false
          }, 500)
          createParticles(opponentX + 50, canvas.height / 2, "rgba(147, 51, 234, 0.7)", 30)
        } else {
          opponentAttacking = true
          setTimeout(() => {
            opponentAttacking = false
          }, 500)
          createParticles(playerX + 50, canvas.height / 2, "rgba(192, 38, 211, 0.7)", 30)
        }
      }

      // Move characters during attack
      if (playerAttacking) {
        playerX = playerX + 5 > opponentX - 120 ? opponentX - 120 : playerX + 5
      } else if (playerX > 100) {
        playerX -= 3
      }

      if (opponentAttacking) {
        opponentX = opponentX - 5 < playerX + 120 ? playerX + 120 : opponentX - 5
      } else if (opponentX < canvas.width - 150) {
        opponentX += 3
      }

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update()
        particle.draw()
        if (particle.size <= 0.2) {
          particles.splice(index, 1)
        }
      })

      // Draw health bars
      // Player health
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
      ctx.fillRect(playerX, canvas.height / 2 - 70, 100, 10)
      ctx.fillStyle = playerHealth > 30 ? "rgba(0, 255, 0, 0.7)" : "rgba(255, 0, 0, 0.7)"
      ctx.fillRect(playerX, canvas.height / 2 - 70, playerHealth, 10)

      // Opponent health
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
      ctx.fillRect(opponentX, canvas.height / 2 - 70, 100, 10)
      ctx.fillStyle = opponentHealth > 30 ? "rgba(0, 255, 0, 0.7)" : "rgba(255, 0, 0, 0.7)"
      ctx.fillRect(opponentX, canvas.height / 2 - 70, opponentHealth, 10)

      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation when images are loaded
    Promise.all([
      new Promise((resolve) => {
        playerImg.onload = resolve
      }),
      new Promise((resolve) => {
        opponentImg.onload = resolve
      }),
    ]).then(() => {
      animate()
    })

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [playerHealth, opponentHealth])

  return (
    <Card className="w-full overflow-hidden border-purple-300 bg-purple-100">
      <canvas ref={canvasRef} className="w-full h-[200px]" />
    </Card>
  )
}
