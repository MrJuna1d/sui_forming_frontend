import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Shield, Sword, Zap } from "lucide-react"
import Image from "next/image"

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

interface CharacterCardProps {
  character: Character
  health: number
  isPlayer: boolean
}

export default function CharacterCard({ character, health, isPlayer }: CharacterCardProps) {
  return (
    <Card
      className={`p-4 border-2 ${isPlayer ? "border-purple-500 bg-purple-100" : "border-violet-500 bg-violet-100"}`}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2 text-purple-800">{character.name}</h2>
        <Badge className={`mb-3 ${isPlayer ? "bg-purple-600" : "bg-violet-600"}`}>Level {character.level}</Badge>

        <div className="relative mb-4">
          <div className={`absolute inset-0 rounded-full ${health < 30 ? "animate-pulse bg-red-500/20" : ""}`}></div>
          <Image
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            width={200}
            height={200}
            className={`rounded-lg ${health <= 0 ? "opacity-50 grayscale" : ""}`}
          />
          {health <= 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-700 bg-white/70 px-2 py-1 rounded">DEFEATED</span>
            </div>
          )}
        </div>

        <div className="w-full mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-purple-800">HP</span>
            <span className="text-sm font-medium text-purple-800">{health}/100</span>
          </div>
          <Progress value={health} className={`h-3 ${health < 30 ? "bg-red-300" : "bg-purple-200"}`} />
        </div>

        <div className="grid grid-cols-3 gap-2 w-full mt-2">
          <div className="flex flex-col items-center bg-purple-200 rounded-md p-2">
            <Sword className="h-4 w-4 text-purple-600 mb-1" />
            <span className="text-xs text-purple-800">Attack</span>
            <span className="font-bold text-purple-900">{character.attack}</span>
          </div>
          <div className="flex flex-col items-center bg-purple-200 rounded-md p-2">
            <Shield className="h-4 w-4 text-purple-600 mb-1" />
            <span className="text-xs text-purple-800">Defense</span>
            <span className="font-bold text-purple-900">{character.defense}</span>
          </div>
          <div className="flex flex-col items-center bg-purple-200 rounded-md p-2">
            <Zap className="h-4 w-4 text-purple-600 mb-1" />
            <span className="text-xs text-purple-800">Speed</span>
            <span className="font-bold text-purple-900">{character.speed}</span>
          </div>
        </div>

        <div className="mt-3 text-sm text-purple-800">
          <div className="flex justify-between">
            <span>Rank:</span>
            <span className="font-bold">{character.rank}</span>
          </div>
          <div className="flex justify-between">
            <span>CP:</span>
            <span className="font-bold">{character.contributionPoints}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
