"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sword, Trophy, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import BattleAnimation from "@/components/BattleAnimation"
import CharacterCard from "@/components/CharacterCard"
import BattleResults from "@/components/BattleResult"

export default function BattlePage() {
  const router = useRouter()
  const [battleState, setBattleState] = useState<"ready" | "fighting" | "complete">("ready")
  const [winner, setWinner] = useState<"player" | "opponent" | null>(null)
  const [playerHealth, setPlayerHealth] = useState(100)
  const [opponentHealth, setOpponentHealth] = useState(100)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  // Player character stats
  const playerCharacter = {
    name: "Hero Knight",
    level: 5,
    rank: 3,
    contributionPoints: 120,
    attack: 25,
    defense: 15,
    speed: 20,
    image: "/pixel-knight.png",
  }

  // Opponent character stats (hardcoded auto-match)
  const opponentCharacter = {
    name: "Dark Warrior",
    level: 4,
    rank: 3,
    contributionPoints: 110,
    attack: 22,
    defense: 12,
    speed: 18,
    image: "/pixel-warrior.png",
  }

  // New stats after winning
  const newStats = {
    rank: playerCharacter.rank + 1,
    contributionPoints: playerCharacter.contributionPoints + 25,
  }

  // Start battle
  const startBattle = () => {
    setBattleState("fighting")
    setBattleLog(["Battle started!"])
    simulateBattle()
  }

  // Simulate battle turns
  const simulateBattle = () => {
    let currentPlayerHealth = playerHealth
    let currentOpponentHealth = opponentHealth
    const battleTurns: string[] = ["Battle started!"]

    // Determine who goes first based on speed
    const playerFirst = playerCharacter.speed >= opponentCharacter.speed

    // Simulate turns until someone wins
    let turn = 1
    const simulateTurn = () => {
      if (currentPlayerHealth <= 0 || currentOpponentHealth <= 0) {
        if (currentPlayerHealth > currentOpponentHealth) {
          setWinner("player")
          battleTurns.push("🏆 You won the battle!")
        } else {
          setWinner("opponent")
          battleTurns.push("❌ You lost the battle!")
        }

        setBattleLog(battleTurns)
        setBattleState("complete")

        // Show results after a delay
        setTimeout(() => {
          setShowResults(true)
        }, 1500)

        return
      }

      // Player attack
      if ((playerFirst && turn % 2 === 1) || (!playerFirst && turn % 2 === 0)) {
        const damage = Math.max(
          5,
          Math.floor(playerCharacter.attack * (Math.random() * 0.4 + 0.8) - opponentCharacter.defense * 0.5),
        )
        currentOpponentHealth = Math.max(0, currentOpponentHealth - damage)
        setOpponentHealth(currentOpponentHealth)
        battleTurns.push(`⚔️ ${playerCharacter.name} attacks for ${damage} damage!`)
      }
      // Opponent attack
      else {
        const damage = Math.max(
          5,
          Math.floor(opponentCharacter.attack * (Math.random() * 0.4 + 0.8) - playerCharacter.defense * 0.5),
        )
        currentPlayerHealth = Math.max(0, currentPlayerHealth - damage)
        setPlayerHealth(currentPlayerHealth)
        battleTurns.push(`🛡️ ${opponentCharacter.name} attacks for ${damage} damage!`)
      }

      setBattleLog(battleTurns)
      turn++

      // Continue battle with delay
      setTimeout(simulateTurn, 1000)
    }

    // Start the turn simulation
    setTimeout(simulateTurn, 1000)
  }

  // Return to home/character selection
  const returnToHome = () => {
    router.push("/")
  }

  // Find new battle
  const findNewBattle = () => {
    setPlayerHealth(100)
    setOpponentHealth(100)
    setBattleState("ready")
    setWinner(null)
    setShowResults(false)
    setBattleLog([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-purple-300 text-purple-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center text-purple-800">
            <Sword className="mr-2 h-8 w-8 text-purple-600" />
            Battle Arena
          </h1>
          <Badge variant="outline" className="text-lg px-4 py-2 bg-purple-100 border-purple-500 text-purple-800">
            Arena Level: {Math.floor((playerCharacter.rank + opponentCharacter.rank) / 2)}
          </Badge>
        </div>

        {!showResults ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Player Character */}
              <CharacterCard character={playerCharacter} health={playerHealth} isPlayer={true} />

              {/* VS Divider */}
              <div className="hidden md:flex flex-col items-center justify-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"></div>
                  <div className="z-10 text-2xl font-bold bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center">
                    VS
                  </div>
                </div>
              </div>

              {/* Opponent Character */}
              <CharacterCard character={opponentCharacter} health={opponentHealth} isPlayer={false} />
            </div>

            {/* Battle Animation */}
            {battleState === "fighting" && (
              <div className="mb-8">
                <BattleAnimation playerHealth={playerHealth} opponentHealth={opponentHealth} />
              </div>
            )}

            {/* Battle Log */}
            <Card className="mb-8 bg-purple-100 border-purple-300">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 flex items-center text-purple-800">
                  <Zap className="mr-2 h-5 w-5 text-purple-600" />
                  Battle Log
                </h3>
                <div className="h-40 overflow-y-auto bg-purple-50 rounded-md p-3 border border-purple-200">
                  {battleLog.length > 0 ? (
                    battleLog.map((log, index) => (
                      <p key={index} className="mb-1 animate-fadeIn text-purple-800">
                        {log}
                      </p>
                    ))
                  ) : (
                    <p className="text-purple-400">Battle will be logged here...</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Battle Controls */}
            <div className="flex justify-center gap-4">
              {battleState === "ready" && (
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
                  onClick={startBattle}
                >
                  <Sword className="mr-2 h-5 w-5" />
                  Start Battle
                </Button>
              )}

              {battleState === "complete" && (
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
                  onClick={() => setShowResults(true)}
                >
                  <Trophy className="mr-2 h-5 w-5" />
                  View Results
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                className="border-purple-400 text-purple-800 hover:bg-purple-200 px-8 py-6 text-lg"
                onClick={returnToHome}
              >
                Return to Home
              </Button>
            </div>
          </>
        ) : (
          <BattleResults
            winner={winner}
            playerCharacter={playerCharacter}
            newStats={newStats}
            onFindNewBattle={findNewBattle}
            onReturnHome={returnToHome}
          />
        )}
      </div>
    </div>
  )
}
