"use client";

import { useState } from "react";
import { Trophy, XIcon as XP, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Challenge {
  id: number;
  title: string;
  description: string;
  reward: {
    type: "xp" | "badge" | "points";
    amount: number;
    label: string;
  };
  completed: boolean;
  link: string;
  category: string;
}

export function DailyChallenges() {
  const [category, setCategory] = useState("general");

  const allChallenges: Challenge[] = [
    {
      id: 1,
      title: "What do you Think About AI?",
      description: "FYP Survey",
      reward: { type: "xp", amount: 50, label: "XP" },
      completed: false,
      link: "/surveys/quick",
      category: "technology",
    },
    {
      id: 2,
      title: "Flawless Response",
      description: "Submit a fully completed survey.",
      reward: { type: "badge", amount: 1, label: "Badge" },
      completed: true,
      link: "/surveys/featured",
      category: "general",
    },
    {
      id: 3,
      title: "Support a Classmate",
      description: "Take a peer survey.",
      reward: { type: "points", amount: 25, label: "Points" },
      completed: false,
      link: "/surveys/student",
      category: "general",
    },
    {
      id: 4,
      title: "Medical Ethics Dilemma",
      description: "Survey on patient rights.",
      reward: { type: "xp", amount: 40, label: "XP" },
      completed: false,
      link: "/surveys/medical-ethics",
      category: "medical",
    },
    {
      id: 5,
      title: "Tech Trends 2025",
      description: "Help predict tech waves.",
      reward: { type: "xp", amount: 30, label: "XP" },
      completed: false,
      link: "/surveys/tech-trends",
      category: "technology",
    },
  ];

  const filteredChallenges = allChallenges.filter(
    (c) => c.category === category || c.category === "general"
  );

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "xp":
        return <XP className="h-4 w-4 text-yellow-500" />;
      case "badge":
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case "points":
        return <Zap className="h-4 w-4 text-yellow-500" />;
      default:
        return <XP className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Dropdown for category selection */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-purple-600 dark:text-purple-300">
          Daily Challenges
        </h2>
        <select
          className="rounded border px-2 py-1 text-sm dark:bg-purple-950 dark:text-white text-purple-600"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="general">General</option>
          <option value="technology">Technology</option>
          <option value="medical">Medical</option>
        </select>
      </div>

      <div className="flex-1">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`mb-3 rounded-lg border border-purple-100 p-3 transition-colors dark:border-purple-800 ${
              challenge.completed
                ? "bg-purple-50/50 dark:bg-purple-950/50"
                : "bg-white hover:bg-purple-50 dark:bg-purple-900 dark:hover:bg-purple-800"
            }`}
          >
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4
                    className={`font-medium ${
                      challenge.completed
                        ? "text-purple-400 line-through dark:text-purple-500"
                        : "text-purple-800 dark:text-purple-200"
                    }`}
                  >
                    {challenge.title}
                  </h4>
                  {challenge.completed && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      Done
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                    {getRewardIcon(challenge.reward.type)}
                    <span className="ml-1">
                      {challenge.reward.amount} {challenge.reward.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link href={"/form_participants/missions"}>
        <Button
          className="mt-2 w-full justify-between bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
          size="sm"
        >
          View main Challenges
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
