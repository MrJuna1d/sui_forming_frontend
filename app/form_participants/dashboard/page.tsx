import { Montserrat } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import { DailyChallenges } from "@/components/daily-challenges";
import { LevelPath } from "@/components/level-path";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Dashboard() {
  return (
    <main
      className={`min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 ${montserrat.className}`}
    >
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 px-4 py-3 backdrop-blur-md dark:bg-purple-950/80">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-purple-800 dark:text-purple-300">
            Participant Dashboard
          </h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 rounded-2xl bg-white p-8 shadow-xl dark:bg-purple-950">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Column - Level and Challenges */}
            <div className="flex flex-col gap-8">
              {/* Level Display */}
              <div>
                <h2 className="mb-4 text-lg font-medium text-purple-600 dark:text-purple-300">
                  Current Level
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-4xl font-bold text-white shadow-lg">
                    42
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Master Explorer
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-purple-200">
                      <span className="font-medium">Next level in:</span> 280 XP
                    </p>
                    <div className="mt-2 h-2 w-full rounded-full bg-purple-200 dark:bg-purple-800">
                      <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-purple-500 to-purple-700"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Challenges - Below Level */}
              <div className="border-t border-purple-100 pt-6 dark:border-purple-800">
                <DailyChallenges />
              </div>
            </div>

            {/* Right Column - Avatar */}
            <div className="flex items-center justify-center"></div>
          </div>
        </section>

        {/* Level Path - Creative Perks Visualization */}
        <section className="mb-12 rounded-2xl bg-white p-8 shadow-xl dark:bg-purple-950">
          <h2 className="mb-6 text-2xl font-bold text-purple-800 dark:text-purple-300">
            Your Level Journey
          </h2>
          <LevelPath currentLevel={42} />
        </section>

        {/* Recent Achievements */}
        <section className="mb-12 rounded-2xl bg-white p-8 shadow-xl dark:bg-purple-950">
          <h2 className="mb-6 text-2xl font-bold text-purple-800 dark:text-purple-300">
            Recent Achievements
          </h2>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-purple-600 px-3 py-1 text-sm font-medium hover:bg-purple-700">
              Completed 5 Challenges
            </Badge>
            <Badge className="bg-purple-600 px-3 py-1 text-sm font-medium hover:bg-purple-700">
              Perfect Score
            </Badge>
            <Badge className="bg-purple-600 px-3 py-1 text-sm font-medium hover:bg-purple-700">
              Early Bird
            </Badge>
            <Badge className="bg-purple-600 px-3 py-1 text-sm font-medium hover:bg-purple-700">
              Team Player
            </Badge>
            <Badge className="bg-purple-600 px-3 py-1 text-sm font-medium hover:bg-purple-700">
              Fast Learner
            </Badge>
          </div>
        </section>
      </div>
    </main>
  );
}
