"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type FloatingElement = {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: "star" | "circle" | "square" | "triangle"
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Generate random floating elements
    const newElements: FloatingElement[] = []

    // Generate stars
    for (let i = 0; i < 30; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        type: "star",
      })
    }

    // Generate circles
    for (let i = 0; i < 15; i++) {
      newElements.push({
        id: i + 100,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        duration: Math.random() * 30 + 20,
        delay: Math.random() * 5,
        type: "circle",
      })
    }

    // Generate squares
    for (let i = 0; i < 10; i++) {
      newElements.push({
        id: i + 200,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 5,
        type: "square",
      })
    }

    // Generate triangles
    for (let i = 0; i < 8; i++) {
      newElements.push({
        id: i + 300,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        duration: Math.random() * 35 + 25,
        delay: Math.random() * 5,
        type: "triangle",
      })
    }

    setElements(newElements)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: element.delay,
          }}
        >
          {element.type === "star" && <div className="w-full h-full bg-white rounded-full opacity-70"></div>}
          {element.type === "circle" && (
            <div className="w-full h-full rounded-full border border-purple-300/50 opacity-30"></div>
          )}
          {element.type === "square" && (
            <div className="w-full h-full border border-blue-300/50 opacity-20 rotate-45"></div>
          )}
          {element.type === "triangle" && (
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-b-[15px] border-b-pink-300/30 border-r-[10px] border-r-transparent"></div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
