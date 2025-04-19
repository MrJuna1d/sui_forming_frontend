"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Award,
  Gift,
  HeartHandshake,
  CalendarClock,
  Crown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LevelPerk {
  level: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface LevelPathProps {
  currentLevel: number;
}

export function LevelPath({ currentLevel }: LevelPathProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const perks: LevelPerk[] = [
    {
      level: 5,
      title: "Early Access",
      description:
        "Get early access to new features and content before anyone else.",
      icon: <Star className="h-6 w-6 text-yellow-500" />,
    },
    {
      level: 10,
      title: "Custom Badge",
      description:
        "Unlock a special profile badge to show off your dedication.",
      icon: <Award className="h-6 w-6 text-yellow-500" />,
    },
    {
      level: 15,
      title: "Bonus Resources",
      description:
        "Receive additional resources and materials to enhance your experience.",
      icon: <Gift className="h-6 w-6 text-yellow-500" />,
    },
    {
      level: 25,
      title: "Priority Support",
      description: "Get priority customer support and faster response times.",
      icon: <HeartHandshake className="h-6 w-6 text-yellow-500" />,
    },
    {
      level: 35,
      title: "Exclusive Events",
      description: "Gain access to exclusive online events and workshops.",
      icon: <CalendarClock className="h-6 w-6 text-yellow-500" />,
    },
    {
      level: 50,
      title: "Premium Content",
      description:
        "Unlock premium content and special features not available to others.",
      icon: <Crown className="h-6 w-6 text-yellow-500" />,
    },
  ];

  // Filter perks into achieved and upcoming
  const achievedPerks = perks.filter((perk) => perk.level <= currentLevel);
  const upcomingPerks = perks.filter((perk) => perk.level > currentLevel);

  // Get the visible perks (3 achieved and 3 upcoming)
  const visiblePerks = [
    ...achievedPerks.slice(-3), // Last 3 achieved perks
    ...upcomingPerks.slice(0, 3), // Next 3 upcoming perks
  ].slice(activeIndex, activeIndex + 3);

  const nextSlide = () => {
    if (activeIndex < perks.length - 3) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prevSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className="relative">
      {/* Path Visualization */}
      <div className="mb-8 flex items-center justify-center">
        <div className="relative h-2 w-full max-w-3xl rounded-full bg-purple-200 dark:bg-purple-800">
          {/* Progress Bar */}
          <div
            className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700"
            style={{ width: `${Math.min(100, (currentLevel / 50) * 100)}%` }}
          />

          {/* Level Markers */}
          {perks.map((perk) => (
            <div
              key={perk.level}
              className={`absolute top-0 flex -translate-x-1/2 flex-col items-center`}
              style={{ left: `${(perk.level / 50) * 100}%` }}
            >
              <div
                className={`-mt-1 h-4 w-4 rounded-full ${
                  perk.level <= currentLevel
                    ? "bg-purple-600 ring-2 ring-purple-300 dark:ring-purple-700"
                    : "bg-purple-300 dark:bg-purple-700"
                }`}
              />
              <span className="mt-2 text-xs font-medium text-purple-800 dark:text-purple-300">
                {perk.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute -top-2 right-0 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-purple-200 bg-white text-purple-800 hover:bg-purple-50 hover:text-purple-900 dark:border-purple-800 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800"
          onClick={prevSlide}
          disabled={activeIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-purple-200 bg-white text-purple-800 hover:bg-purple-50 hover:text-purple-900 dark:border-purple-800 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800"
          onClick={nextSlide}
          disabled={activeIndex >= perks.length - 3}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Perks Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {visiblePerks.map((perk, index) => {
          const isAchieved = perk.level <= currentLevel;

          return (
            <motion.div
              key={perk.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl p-6 ${
                isAchieved
                  ? "bg-gradient-to-br from-purple-500/10 to-purple-600/20 dark:from-purple-800/30 dark:to-purple-900/40"
                  : "bg-white dark:bg-purple-950/60"
              }`}
            >
              {/* Level Badge */}
              <div className="absolute right-4 top-4 rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                Level {perk.level}
              </div>

              {/* Status Indicator */}
              {isAchieved ? (
                <div className="mb-4 inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/60 dark:text-green-300">
                  Achieved
                </div>
              ) : (
                <div className="mb-4 inline-flex rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-800/60 dark:text-purple-300">
                  Upcoming
                </div>
              )}

              {/* Icon and Title */}
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={`rounded-full p-2 ${
                    isAchieved
                      ? "bg-purple-100 dark:bg-purple-800/50"
                      : "bg-gray-100 dark:bg-purple-900/30"
                  }`}
                >
                  {perk.icon}
                </div>
                <h3
                  className={`text-xl font-bold ${
                    isAchieved
                      ? "text-purple-800 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {perk.title}
                </h3>
              </div>

              {/* Description */}
              <p
                className={`${
                  isAchieved
                    ? "text-gray-700 dark:text-gray-300"
                    : "text-gray-500 dark:text-gray-500"
                }`}
              >
                {perk.description}
              </p>

              {/* Visual Indicator for Achieved Perks */}
              {isAchieved && (
                <div className="absolute -right-6 -top-6 h-16 w-16 rotate-45 bg-green-500/10"></div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
