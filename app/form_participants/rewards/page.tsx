"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Star,
  Trophy,
  Gift,
  ChevronUp,
  Sword,
  Shield,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import avatar from "@/public/avatar.png";

// Mock data for rewards with Unsplash pixel art images
const possibleRewards = [
  // Weapons
  {
    id: 1,
    name: "Legendary Sword",
    type: "Weapon",
    rarity: "Legendary",
    image:
      "https://images.unsplash.com/photo-1638613067237-b1127ef06c00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBpeGVsJTIwYXJ0JTIwc3dvcmR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    name: "Fire Blade",
    type: "Weapon",
    rarity: "Epic",
    image:
      "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBpeGVsJTIwYXJ0JTIwZmlyZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "Ice Dagger",
    type: "Weapon",
    rarity: "Rare",
    image:
      "https://images.unsplash.com/photo-1633957897986-70e83293f3ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl4ZWwlMjBhcnQlMjBpY2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Wooden Staff",
    type: "Weapon",
    rarity: "Common",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBpeGVsJTIwYXJ0JTIwd29vZHxlbnwwfHwwfHx8MA%3D%3D",
  },

  // Armor
  {
    id: 5,
    name: "Dragon Scale Armor",
    type: "Armor",
    rarity: "Mythic",
    image:
      "https://images.unsplash.com/photo-1599623560574-39d485900c95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBpeGVsJTIwYXJ0JTIwZHJhZ29ufGVufDB8fDB8fHww",
  },
  {
    id: 6,
    name: "Epic Shield",
    type: "Armor",
    rarity: "Epic",
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBpeGVsJTIwYXJ0JTIwc2hpZWxkfGVufDB8fDB8fHww",
  },
  {
    id: 7,
    name: "Rare Helmet",
    type: "Armor",
    rarity: "Rare",
    image:
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBpeGVsJTIwYXJ0JTIwaGVsbWV0fGVufDB8fDB8fHww",
  },
  {
    id: 8,
    name: "Uncommon Boots",
    type: "Armor",
    rarity: "Uncommon",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBpeGVsJTIwYXJ0JTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 9,
    name: "Common Gloves",
    type: "Armor",
    rarity: "Common",
    image:
      "https://images.unsplash.com/photo-1577460551100-d3f84b6e4bf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBpeGVsJTIwYXJ0JTIwZ2xvdmVzfGVufDB8fDB8fHww",
  },

  // Accessories
  {
    id: 10,
    name: "Mythic Cape",
    type: "Accessory",
    rarity: "Mythic",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBpeGVsJTIwYXJ0JTIwY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 11,
    name: "Golden Amulet",
    type: "Accessory",
    rarity: "Legendary",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBpeGVsJTIwYXJ0JTIwZ29sZHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 12,
    name: "Silver Ring",
    type: "Accessory",
    rarity: "Epic",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBpeGVsJTIwYXJ0JTIwc2lsdmVyfGVufDB8fDB8fHww",
  },
  {
    id: 13,
    name: "Magic Pendant",
    type: "Accessory",
    rarity: "Rare",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl4ZWwlMjBhcnQlMjBtYWdpY3xlbnwwfHwwfHx8MA%3D%3D",
  },

  // Skins
  {
    id: 14,
    name: "Celestial Hero Skin",
    type: "Skin",
    rarity: "Mythic",
    image:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBpeGVsJTIwYXJ0JTIwZ2FsYXh5fGVufDB8fDB8fHww",
  },
  {
    id: 15,
    name: "Dragon Slayer Skin",
    type: "Skin",
    rarity: "Legendary",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBpeGVsJTIwYXJ0JTIwZHJhZ29ufGVufDB8fDB8fHww",
  },
  {
    id: 16,
    name: "Shadow Assassin Skin",
    type: "Skin",
    rarity: "Epic",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBpeGVsJTIwYXJ0JTIwZGFya3xlbnwwfHwwfHx8MA%3D%3D",
  },

  // Special Items
  {
    id: 17,
    name: "Ancient Scroll",
    type: "Special",
    rarity: "Legendary",
    image:
      "https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBpeGVsJTIwYXJ0JTIwc2Nyb2xsfGVufDB8fDB8fHww",
  },
  {
    id: 18,
    name: "Mysterious Potion",
    type: "Special",
    rarity: "Epic",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBpeGVsJTIwYXJ0JTIwcG90aW9ufGVufDB8fDB8fHww",
  },
  {
    id: 19,
    name: "Lucky Coin",
    type: "Special",
    rarity: "Rare",
    image:
      "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBpeGVsJTIwYXJ0JTIwY29pbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 20,
    name: "Treasure Map",
    type: "Special",
    rarity: "Uncommon",
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBpeGVsJTIwYXJ0JTIwbWFwfGVufDB8fDB8fHww",
  },
];

const rarityColors = {
  Common: "bg-gray-200 text-gray-800",
  Uncommon: "bg-green-200 text-green-800",
  Rare: "bg-blue-200 text-blue-800",
  Epic: "bg-purple-200 text-purple-800",
  Legendary: "bg-orange-200 text-orange-800",
  Mythic: "bg-pink-200 text-pink-800",
};

const typeIcons = {
  Weapon: <Sword className="h-4 w-4" />,
  Armor: <Shield className="h-4 w-4" />,
  Accessory: <Crown className="h-4 w-4" />,
  Skin: <Star className="h-4 w-4" />,
  Special: <Gift className="h-4 w-4" />,
};

export default function RewardPage() {
  const [contributionPoints, setContributionPoints] = useState(1000);
  const [luckLevel, setLuckLevel] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showChest, setShowChest] = useState(false);
  const [openChest, setOpenChest] = useState(false);
  const [reward, setReward] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [spinCost] = useState(100);
  const [recentRewards, setRecentRewards] = useState([]);

  const luckPercentage = 5 + (luckLevel - 1) * 2; // Base 5% + 2% per level

  const upgradeLuckCost = luckLevel * 500;

  const upgradeLuck = () => {
    if (contributionPoints >= upgradeLuckCost) {
      setContributionPoints((prev) => prev - upgradeLuckCost);
      setLuckLevel((prev) => prev + 1);
    }
  };

  const spinGacha = () => {
    if (contributionPoints >= spinCost && !isSpinning) {
      // Deduct points
      setContributionPoints((prev) => prev - spinCost);

      // Start spinning animation
      setIsSpinning(true);
      setShowChest(false);
      setOpenChest(false);
      setReward(null);

      // Simulate spinning delay
      setTimeout(() => {
        setIsSpinning(false);
        setShowChest(true);

        // Determine reward with luck factor
        const rarityChances = {
          Common: 50 - luckPercentage,
          Uncommon: 25,
          Rare: 15,
          Epic: 7 + Math.floor(luckPercentage / 3),
          Legendary: 2 + Math.floor(luckPercentage / 5),
          Mythic: 1 + Math.floor(luckPercentage / 10),
        };

        // Calculate total chance
        const totalChance = Object.values(rarityChances).reduce(
          (a, b) => a + b,
          0
        );

        // Roll for rarity
        let roll = Math.random() * totalChance;
        let selectedRarity = "Common";

        for (const [rarity, chance] of Object.entries(rarityChances)) {
          if (roll < chance) {
            selectedRarity = rarity;
            break;
          }
          roll -= chance;
        }

        // Filter rewards by rarity and pick one randomly
        const possibleRewardsOfRarity = possibleRewards.filter(
          (r) => r.rarity === selectedRarity
        );
        const selectedReward =
          possibleRewardsOfRarity[
            Math.floor(Math.random() * possibleRewardsOfRarity.length)
          ];

        // Set as current reward
        setTimeout(() => {
          setOpenChest(true);
          setTimeout(() => {
            setReward(selectedReward);
            setInventory((prev) => [...prev, selectedReward]);
            setRecentRewards((prev) => [selectedReward, ...prev].slice(0, 5));
          }, 1000);
        }, 1500);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 text-white p-4 md:p-8">
      {/* Luck Level Banner */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg p-4 mb-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-100" />
            <h2 className="text-xl font-bold text-white">
              Luck Level: {luckLevel}
            </h2>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800 px-3 py-1 text-sm font-medium">
            +{luckPercentage}% Luck
          </Badge>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-xs text-yellow-100 mb-1">
            <span>Current</span>
            <span>Next Level</span>
          </div>
          <Progress value={0} className="h-2 bg-yellow-300/30" />
        </div>
      </div>

      {/* Points Display */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <h2 className="text-xl font-bold">Contribution Points:</h2>
        </div>
        <div className="text-2xl font-bold text-yellow-400">
          {contributionPoints}
        </div>
      </div>

      {/* Gacha System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col items-center justify-center bg-indigo-900/50 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Treasure Gacha</h3>

          <div className="relative w-64 h-64 mb-6 flex items-center justify-center">
            {isSpinning ? (
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: 2, ease: "linear" }}
                  className="w-48 h-48 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center"
                >
                  <div className="w-44 h-44 rounded-full bg-indigo-900 flex items-center justify-center">
                    <Trophy className="h-16 w-16 text-yellow-400" />
                  </div>
                </motion.div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                    transition={{
                      duration: 0.5,
                      repeat: 4,
                      repeatType: "loop",
                    }}
                  >
                    <Sparkles className="h-12 w-12 text-yellow-400" />
                  </motion.div>
                </div>
              </div>
            ) : showChest ? (
              <AnimatePresence>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative"
                >
                  <div className="relative">
                    <motion.div
                      animate={
                        openChest
                          ? { rotateX: 45, y: -20 }
                          : { rotateX: 0, y: 0 }
                      }
                      transition={{ duration: 0.5 }}
                      className="w-32 h-16 bg-yellow-800 rounded-t-lg absolute top-0 left-1/2 transform -translate-x-1/2 origin-bottom z-10"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="absolute inset-0 bg-yellow-700 rounded-t-lg border-2 border-yellow-600"></div>
                      <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 w-8 h-4 bg-yellow-600 rounded"></div>
                    </motion.div>
                    <div className="w-40 h-24 bg-yellow-900 rounded-lg mt-16 border-2 border-yellow-800 flex items-center justify-center">
                      {openChest && reward && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: -30 }}
                          transition={{ delay: 0.3 }}
                          className="absolute"
                        >
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                          >
                            <div className="relative">
                              <img
                                src={reward.image || "/placeholder.svg"}
                                alt={reward.name}
                                className="w-16 h-16 object-contain rounded-md"
                              />
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                  delay: 0.5,
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <Sparkles className="w-20 h-20 text-yellow-400" />
                              </motion.div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1586521995568-39abaa0c2311?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBpeGVsJTIwYXJ0JTIwdHJlYXN1cmV8ZW58MHx8MHx8fDA%3D"
                  alt="Treasure Chest"
                  className="h-24 w-24 object-cover rounded-lg mb-4"
                />
                <p className="text-center text-purple-200">
                  Spin to win amazing rewards!
                </p>
              </div>
            )}
          </div>

          {reward && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-4"
            >
              <h4 className="text-lg font-bold">{reward.name}</h4>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Badge className={`${rarityColors[reward.rarity]}`}>
                  {reward.rarity}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  {typeIcons[reward.type]}
                  {reward.type}
                </Badge>
              </div>
            </motion.div>
          )}

          <Button
            onClick={spinGacha}
            disabled={contributionPoints < spinCost || isSpinning}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            {isSpinning ? "Spinning..." : `Spin (${spinCost} Points)`}
          </Button>

          {/* Recent Rewards */}
          {recentRewards.length > 0 && (
            <div className="mt-6 w-full">
              <h4 className="text-sm font-medium text-purple-200 mb-2">
                Recent Rewards:
              </h4>
              <div className="flex overflow-x-auto gap-2 pb-2">
                {recentRewards.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-12 h-12 relative group"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className={`w-full h-full object-cover rounded border-2 ${
                        item.rarity === "Legendary" || item.rarity === "Mythic"
                          ? "border-yellow-400 animate-pulse"
                          : "border-indigo-700"
                      }`}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded">
                      <Badge
                        className={`${rarityColors[item.rarity]} scale-75`}
                      >
                        {item.rarity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hero Assets Display */}
        <div className="bg-indigo-900/50 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Hero Assets</h3>

          {inventory.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {inventory.map((item, index) => (
                <Card
                  key={`${item.id}-${index}`}
                  className={`bg-indigo-800/50 border-indigo-700 overflow-hidden ${
                    item.rarity === "Legendary" || item.rarity === "Mythic"
                      ? "ring-2 ring-yellow-400 ring-opacity-50"
                      : ""
                  }`}
                >
                  <div className="p-3">
                    <div className="bg-indigo-700/30 rounded-lg p-2 flex items-center justify-center mb-2 h-20">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain rounded"
                      />
                    </div>
                    <h4 className="font-medium text-sm truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <Badge className={`text-xs ${rarityColors[item.rarity]}`}>
                        {item.rarity}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 text-xs"
                      >
                        {typeIcons[item.type]}
                        <span className="sr-only md:not-sr-only">
                          {item.type}
                        </span>
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-indigo-300">
              <Trophy className="h-12 w-12 mb-4 opacity-50" />
              <p>No assets yet. Spin to win rewards!</p>
            </div>
          )}
        </div>
      </div>

      {/* Male Hero Character Preview */}
      <div className="bg-indigo-900/50 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">Male Hero Preview</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex justify-center">
            <div className="relative w-48 h-64 bg-indigo-800/50 rounded-lg flex items-center justify-center">
              <Image src={avatar} alt="Avatar Image" />
              {/* Equipped items indicators */}
              {inventory.filter((item) =>
                ["Helmet", "Cape"].some((type) => item.name.includes(type))
              ).length > 0 && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-500 text-white">Equipped</Badge>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-bold mb-2">Equipped Items</h4>
            <div className="grid grid-cols-2 gap-2">
              {["Weapon", "Shield", "Helmet", "Boots", "Gloves", "Cape"].map(
                (slot) => {
                  const equippedItem = inventory.find((item) =>
                    item.name.includes(slot)
                  );
                  return (
                    <div
                      key={slot}
                      className="bg-indigo-800/30 rounded p-2 flex items-center gap-2"
                    >
                      <div className="w-8 h-8 bg-indigo-700/30 rounded flex items-center justify-center">
                        {equippedItem ? (
                          <div className="relative w-full h-full">
                            <img
                              src={equippedItem.image || "/placeholder.svg"}
                              alt={equippedItem.name}
                              className="w-full h-full object-contain rounded"
                            />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-dashed border-indigo-600"></div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-medium">{slot}</p>
                        {equippedItem && (
                          <p className="text-xs text-indigo-300 truncate max-w-[100px]">
                            {equippedItem.name}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            <div className="mt-4">
              <h4 className="font-bold mb-2">Stats Boost</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-indigo-800/30 rounded p-2">
                  <p className="text-xs text-indigo-300">Attack</p>
                  <p className="font-medium">+{inventory.length * 5}</p>
                </div>
                <div className="bg-indigo-800/30 rounded p-2">
                  <p className="text-xs text-indigo-300">Defense</p>
                  <p className="font-medium">+{inventory.length * 3}</p>
                </div>
                <div className="bg-indigo-800/30 rounded p-2">
                  <p className="text-xs text-indigo-300">Health</p>
                  <p className="font-medium">+{inventory.length * 10}</p>
                </div>
                <div className="bg-indigo-800/30 rounded p-2">
                  <p className="text-xs text-indigo-300">Speed</p>
                  <p className="font-medium">+{inventory.length * 2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Treasure Collection */}
      <div className="bg-indigo-900/50 rounded-xl p-6 shadow-lg mt-8">
        <h3 className="text-xl font-bold mb-4">Treasure Collection</h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {["Legendary", "Mythic", "Epic", "Rare", "Uncommon"].map((rarity) => {
            const count = inventory.filter(
              (item) => item.rarity === rarity
            ).length;
            const total = possibleRewards.filter(
              (item) => item.rarity === rarity
            ).length;

            return (
              <div
                key={rarity}
                className={`rounded-lg p-3 ${
                  rarity === "Legendary"
                    ? "bg-gradient-to-br from-orange-500/30 to-yellow-500/30 border border-orange-400/50"
                    : rarity === "Mythic"
                    ? "bg-gradient-to-br from-pink-500/30 to-purple-500/30 border border-pink-400/50"
                    : rarity === "Epic"
                    ? "bg-gradient-to-br from-purple-500/30 to-indigo-500/30 border border-purple-400/50"
                    : rarity === "Rare"
                    ? "bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-400/50"
                    : "bg-gradient-to-br from-green-500/30 to-emerald-500/30 border border-green-400/50"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <Badge className={rarityColors[rarity]}>{rarity}</Badge>
                  <span className="text-xs">
                    {count}/{total}
                  </span>
                </div>
                <Progress value={(count / total) * 100} className="h-1.5" />
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-800/30 rounded-lg p-4">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-400" />
              Collection Bonus
            </h4>
            <p className="text-xs text-indigo-200 mb-3">
              Complete collections to unlock special bonuses!
            </p>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Weapon Collection</span>
                <Badge variant="outline">
                  {inventory.filter((item) => item.type === "Weapon").length}/
                  {
                    possibleRewards.filter((item) => item.type === "Weapon")
                      .length
                  }
                </Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Armor Collection</span>
                <Badge variant="outline">
                  {inventory.filter((item) => item.type === "Armor").length}/
                  {
                    possibleRewards.filter((item) => item.type === "Armor")
                      .length
                  }
                </Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Accessory Collection</span>
                <Badge variant="outline">
                  {inventory.filter((item) => item.type === "Accessory").length}
                  /
                  {
                    possibleRewards.filter((item) => item.type === "Accessory")
                      .length
                  }
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-indigo-800/30 rounded-lg p-4">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              Rarity Bonus
            </h4>
            <p className="text-xs text-indigo-200 mb-3">
              Collect rare items to increase your power!
            </p>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Legendary Items</span>
                <span className="text-yellow-400 font-medium">
                  +
                  {inventory.filter((item) => item.rarity === "Legendary")
                    .length * 10}
                  % Damage
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Mythic Items</span>
                <span className="text-pink-400 font-medium">
                  +
                  {inventory.filter((item) => item.rarity === "Mythic").length *
                    15}
                  % Critical
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Epic Items</span>
                <span className="text-purple-400 font-medium">
                  +
                  {inventory.filter((item) => item.rarity === "Epic").length *
                    5}
                  % Defense
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
