"use client";

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
}

export function DailyChallenges() {
  // Sample daily challenges data - only showing 3
  const dailyChallenges: Challenge[] = [
    {
      id: 1,
      title: "Complete 3 Lessons",
      description: "Finish 3 lessons in any course today",
      reward: {
        type: "xp",
        amount: 50,
        label: "XP",
      },
      completed: false,
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Get 100% on any quiz or assessment",
      reward: {
        type: "badge",
        amount: 1,
        label: "Badge",
      },
      completed: true,
    },
    {
      id: 3,
      title: "Help a Peer",
      description: "Answer a question in the community forum",
      reward: {
        type: "points",
        amount: 25,
        label: "Points",
      },
      completed: false,
    },
  ];

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

  const pendingChallenges = dailyChallenges.filter((c) => !c.completed).length;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-purple-600 dark:text-purple-300">
          Daily Challenges
        </h2>
        <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-800 dark:text-purple-100">
          {pendingChallenges} pending
        </span>
      </div>

      <div className="flex-1">
        {dailyChallenges.map((challenge) => (
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
        View All Challenges
        <ChevronRight className="h-4 w-4" />
      </Button>
</Link>
      
    </div>
  );
}
