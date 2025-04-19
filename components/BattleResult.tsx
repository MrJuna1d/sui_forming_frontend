"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Star, ArrowUp, Zap, RotateCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import confetti from "canvas-confetti";
import Link from "next/link"

interface Character {
  name: string
  level: number
  rank: number
  contributionPoints: number
  attack: number
  defense: number
  speed: number
  image: string
}

interface NewStats {
  rank: number
  contributionPoints: number
}

interface BattleResultsProps {
  winner: "player" | "opponent" | null
  playerCharacter: Character
  newStats: NewStats
  onFindNewBattle: () => void
  onReturnHome: () => void
}

export default function BattleResults({
  winner,
  playerCharacter,
  newStats,
  onFindNewBattle,
  onReturnHome,
}: BattleResultsProps) {
  const [showRankUp, setShowRankUp] = useState(false)
  const [showPoints, setShowPoints] = useState(false)

  useEffect(() => {
    // Trigger animations sequentially
    if (winner === "player") {
      // Trigger confetti
      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
      }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // Since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0, 0.2) },
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0, 0.2) },
        })
      }, 250)

      // Show rank up after a delay
      setTimeout(() => {
        setShowRankUp(true)
      }, 1000)

      // Show points after another delay
      setTimeout(() => {
        setShowPoints(true)
      }, 2000)
    }
  }, [winner])

  if (winner === "player") {
    return (
      <Card className="p-8 max-w-2xl mx-auto bg-gradient-to-b from-purple-100 to-purple-200 border-purple-500 border-2">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-purple-700">Victory!</h2>
          <p className="text-purple-800">You defeated your opponent and gained rewards!</p>
        </div>

        <div className="space-y-6">
          {/* Rank Up Animation */}
          <div
            className={`transition-all duration-700 ${showRankUp ? "opacity-100 transform-none" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-between bg-purple-50 p-4 rounded-lg border border-purple-300">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-purple-600 text-sm">Rank</p>
                  <div className="flex items-center">
                    <span className="text-xl font-bold">{playerCharacter.rank}</span>
                    <ArrowUp className="h-5 w-5 text-green-500 mx-2" />
                    <span className="text-2xl font-bold text-green-400">{newStats.rank}</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-purple-600 text-white px-3 py-1">RANK UP!</Badge>
            </div>
          </div>

          {/* Contribution Points Animation */}
          <div
            className={`transition-all duration-700 ${showPoints ? "opacity-100 transform-none" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-between bg-purple-50 p-4 rounded-lg border border-purple-300">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-purple-600 text-sm">Contribution Points</p>
                  <div className="flex items-center">
                    <span className="text-xl font-bold">{playerCharacter.contributionPoints}</span>
                    <ArrowUp className="h-5 w-5 text-green-500 mx-2" />
                    <span className="text-2xl font-bold text-green-400">{newStats.contributionPoints}</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-purple-600 text-white px-3 py-1">+25 CP</Badge>
            </div>
          </div>

          {/* Additional Rewards (could be expanded) */}
          <div
            className={`transition-all duration-700 ${showPoints ? "opacity-100 transform-none" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-300">
              <h3 className="font-bold mb-2 text-purple-800">Additional Rewards:</h3>
              <ul className="list-disc list-inside text-purple-800">
                <li>Unlocked new arena tier</li>
                <li>+5% XP boost for next battle</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={onFindNewBattle}>
            <RotateCw className="mr-2 h-5 w-5" />
            Find New Battle
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-purple-400 text-purple-800 hover:bg-purple-200"
            onClick={onReturnHome}
          >
            Return to Home
          </Button>
        </div>
      </Card>
    )
  } else if (winner === "opponent") {
    return (
      <Card className="p-8 max-w-2xl mx-auto bg-gradient-to-b from-purple-100 to-purple-200 border-purple-300 border-2">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-purple-700">Defeat!</h2>
          <p className="text-purple-800">You were defeated in battle. Try again with a different strategy!</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={onFindNewBattle}>
            <RotateCw className="mr-2 h-5 w-5" />
            Try Again
          </Button>

        <Link href={"/form_participants/dashboard"}>
          <Button
            variant="outline"
            size="lg"
            className="border-purple-400 text-purple-800 hover:bg-purple-200"
            onClick={onReturnHome}
          >
            Return to Home
          </Button>
          </Link>
        </div>
      </Card>
    )
  }

  return null
}
