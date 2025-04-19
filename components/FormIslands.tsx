"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormDetails from "./FormDetails";
import {
  FileText,
  Users,
  Star,
  Stethoscope,
  Cpu,
  Sparkles,
  Flag,
  ArrowRight,
} from "lucide-react";
import FloatingElements from "./FloatingElements";
import Link from "next/link";

// Form templates data - now in sequential order
const formTemplates = [
  {
    id: 1,
    title: "Recruitment Survey",
    description:
      "Help a researcher gather profiles of brave new participants for their study.",
    icon: <FileText className="h-8 w-8 text-purple-200" />,
    position: { x: 15, y: 30 },
    category: "personal",
    difficulty: "Novice",
    color: "from-indigo-500 to-blue-700",
    glow: "bg-indigo-500/30",
    step: 1,
  },
  {
    id: 2,
    title: "Demographic Builder",
    description:
      "Answer key questions to help scholars understand different walks of life.",
    icon: <Users className="h-8 w-8 text-purple-200" />,
    position: { x: 30, y: 20 },
    category: "personal",
    difficulty: "Adept",
    color: "from-purple-500 to-indigo-700",
    glow: "bg-purple-500/30",
    step: 2,
  },
  {
    id: 3,
    title: "Medical Insight Form",
    description:
      "Assist in a study uncovering healthcare trends with your answers.",
    icon: <Stethoscope className="h-8 w-8 text-purple-200" />,
    position: { x: 45, y: 35 },
    category: "medicine",
    difficulty: "Adept",
    color: "from-emerald-500 to-green-700",
    glow: "bg-emerald-500/30",
    step: 3,
  },
  {
    id: 4,
    title: "Tech Usage Survey",
    description:
      "Provide data for a wizard researching the spread of magical tech tools.",
    icon: <Cpu className="h-8 w-8 text-purple-200" />,
    position: { x: 60, y: 25 },
    category: "technology",
    difficulty: "Adept",
    color: "from-cyan-500 to-blue-700",
    glow: "bg-cyan-500/30",
    step: 4,
  },
  {
    id: 5,
    title: "User Feedback Scroll",
    description:
      "Rate your journey and share experiences to help future travelers.",
    icon: <Star className="h-8 w-8 text-purple-200" />,
    position: { x: 75, y: 40 },
    category: "business",
    difficulty: "Novice",
    color: "from-amber-500 to-orange-700",
    glow: "bg-amber-500/30",
    step: 5,
  },
];

// Final destination island
const finalDestination = {
  id: 6,
  title: "Master Challenge",
  description: "The ultimate form challenge that tests all your skills",
  icon: <Flag className="h-10 w-10 text-yellow-200" />,
  position: { x: 85, y: 65 },
  difficulty: "Master",
  color: "from-yellow-500 to-red-700",
  glow: "bg-yellow-500/40",
  step: 6,
};

export default function FormIslands() {
  const [selectedForm, setSelectedForm] = useState<number | null>(null);
  const [recentlyUsed, setRecentlyUsed] = useState<number[]>([]);
  const [hoveredIsland, setHoveredIsland] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Toggle form details
  const toggleFormDetails = (formId: number) => {
    setSelectedForm(selectedForm === formId ? null : formId);
  };

  // Handle using a form
  const handleUseForm = (formId: number) => {
    // In a real app, this would navigate to the form or start it
    alert(
      `Using magical template: ${
        formId === finalDestination.id
          ? finalDestination.title
          : formTemplates.find((f) => f.id === formId)?.title
      }`
    );

    // Add to recently used if not already there
    if (!recentlyUsed.includes(formId)) {
      setRecentlyUsed([formId, ...recentlyUsed].slice(0, 3)); // Keep only the 3 most recent
    }

    setSelectedForm(null);
  };

  // Generate SVG path points for the journey line
  const generatePathPoints = () => {
    // Start with the first island
    let pathPoints = `M ${formTemplates[0].position.x}% ${formTemplates[0].position.y}%`;

    // Add points for each island
    for (let i = 1; i < formTemplates.length; i++) {
      pathPoints += ` L ${formTemplates[i].position.x}% ${formTemplates[i].position.y}%`;
    }

    // Add final destination
    pathPoints += ` L ${finalDestination.position.x}% ${finalDestination.position.y}%`;

    return pathPoints;
  };

  return (
    <div className="space-y-8">
      {/* Recently used forms - now styled as magical scrolls */}
      {recentlyUsed.length > 0 && (
        <div className="relative bg-purple-900/40 backdrop-blur-sm p-6 rounded-xl border border-purple-500/50 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl"></div>
          <h3 className="text-xl font-bold mb-3 text-purple-200 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-purple-300" />
            Recent Spellbooks
          </h3>
          <div className="flex flex-wrap gap-3">
            {recentlyUsed.map((formId) => {
              const form =
                formId === finalDestination.id
                  ? finalDestination
                  : formTemplates.find((f) => f.id === formId);

              if (!form) return null;

              return (
                <Link href="/form_participants/missions/challenge">
                  <motion.button
                    key={form.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 rounded-lg bg-gradient-to-br ${form.color} text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2`}
                    onClick={() => toggleFormDetails(form.id)}
                  >
                    <div className="p-1 bg-white/20 rounded-full">
                      {form.icon}
                    </div>
                    {form.title}
                  </motion.button>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Form islands map - now with a clear path */}
      <div
        ref={mapRef}
        className="relative h-[650px] w-full overflow-hidden rounded-xl border-4 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.5)] bg-[url('/placeholder.svg?height=650&width=1000')] bg-cover"
      >
        {/* Magical atmosphere elements */}
        <FloatingElements />

        {/* Connection path between islands - now a clear journey path */}
        <svg className="absolute inset-0 w-full h-full z-0">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.8)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.8)" />
              <stop offset="100%" stopColor="rgba(234, 179, 8, 0.8)" />
            </linearGradient>

            {/* Arrow marker for the path */}
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="rgba(255, 255, 255, 0.8)"
              />
            </marker>
          </defs>

          {/* Main path with gradient */}
          <path
            d={generatePathPoints()}
            stroke="url(#pathGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Animated dashed overlay */}
          <path
            d={generatePathPoints()}
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10,15"
            markerMid="url(#arrowhead)"
            markerEnd="url(#arrowhead)"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="25"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        {/* Direction arrows along the path */}
        {formTemplates.map((form, index) => {
          if (index === formTemplates.length - 1) return null;

          const nextForm = formTemplates[index + 1];
          const midX = (form.position.x + nextForm.position.x) / 2;
          const midY = (form.position.y + nextForm.position.y) / 2;

          return (
            <motion.div
              key={`arrow-${form.id}`}
              className="absolute z-10"
              style={{
                left: `${midX}%`,
                top: `${midY}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-white/30">
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </motion.div>
          );
        })}

        {/* Regular islands */}
        {formTemplates.map((form) => (
          <motion.div
            key={form.id}
            className="absolute cursor-pointer z-10"
            style={{
              left: `${form.position.x}%`,
              top: `${form.position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: form.id * 0.5,
            }}
            onClick={() => toggleFormDetails(form.id)}
            onMouseEnter={() => setHoveredIsland(form.id)}
            onMouseLeave={() => setHoveredIsland(null)}
          >
            {/* Island glow effect */}
            <motion.div
              className={`absolute -inset-6 rounded-full ${form.glow} blur-xl z-0 opacity-70`}
              animate={{
                scale: hoveredIsland === form.id ? [1, 1.2, 1] : 1,
                opacity: hoveredIsland === form.id ? [0.7, 0.9, 0.7] : 0.7,
              }}
              transition={{
                duration: 2,
                repeat:
                  hoveredIsland === form.id ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse",
              }}
            ></motion.div>

            {/* Island */}
            <motion.div
              className={`relative flex flex-col items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br ${form.color} border-4 border-white/30 shadow-lg hover:shadow-xl transition-all duration-300`}
              whileHover={{ scale: 1.1 }}
              animate={{
                boxShadow:
                  hoveredIsland === form.id
                    ? [
                        "0 0 10px rgba(255,255,255,0.5)",
                        "0 0 20px rgba(255,255,255,0.7)",
                        "0 0 10px rgba(255,255,255,0.5)",
                      ]
                    : "0 0 10px rgba(255,255,255,0.5)",
              }}
              transition={{
                duration: 2,
                repeat:
                  hoveredIsland === form.id ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse",
              }}
            >
              <div className="absolute -top-2 -right-2 bg-white/20 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full border border-white/30 shadow-md">
                {form.difficulty}
              </div>

              {/* Step number badge */}
              <div className="absolute -top-2 -left-2 bg-purple-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white/50 shadow-md">
                {form.step}
              </div>

              <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm mb-2 border border-white/30 shadow-inner">
                {form.icon}
              </div>
              <h3 className="text-base font-bold text-center text-white px-2">
                {form.title}
              </h3>
            </motion.div>
          </motion.div>
        ))}

        {/* Final destination island - larger and more impressive */}
        <motion.div
          key={finalDestination.id}
          className="absolute cursor-pointer z-10"
          style={{
            left: `${finalDestination.position.x}%`,
            top: `${finalDestination.position.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          onClick={() => toggleFormDetails(finalDestination.id)}
          onMouseEnter={() => setHoveredIsland(finalDestination.id)}
          onMouseLeave={() => setHoveredIsland(null)}
        >
          {/* Island glow effect - stronger for final destination */}
          <motion.div
            className={`absolute -inset-10 rounded-full ${finalDestination.glow} blur-xl z-0 opacity-80`}
            animate={{
              scale:
                hoveredIsland === finalDestination.id
                  ? [1, 1.3, 1]
                  : [1, 1.1, 1],
              opacity:
                hoveredIsland === finalDestination.id
                  ? [0.8, 1, 0.8]
                  : [0.7, 0.9, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>

          {/* Final destination island - larger with flagpole */}
          <motion.div
            className={`relative flex flex-col items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br ${finalDestination.color} border-4 border-yellow-300/70 shadow-lg hover:shadow-xl transition-all duration-300`}
            whileHover={{ scale: 1.1 }}
            animate={{
              boxShadow: [
                "0 0 15px rgba(255,255,255,0.5)",
                "0 0 30px rgba(255,255,255,0.7)",
                "0 0 15px rgba(255,255,255,0.5)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <div className="absolute -top-2 -right-2 bg-yellow-500 text-xs font-bold px-3 py-1 rounded-full border border-yellow-300 shadow-md">
              {finalDestination.difficulty}
            </div>

            {/* Step number badge */}
            <div className="absolute -top-2 -left-2 bg-yellow-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-yellow-300 shadow-md">
              {finalDestination.step}
            </div>

            {/* Flagpole */}
            <div className="absolute h-32 w-2 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full top-[-80px]"></div>
            <motion.div
              className="absolute w-16 h-10 bg-gradient-to-r from-red-500 to-red-700 top-[-80px] left-[calc(50%+1px)]"
              animate={{
                skewY: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />

            <div className="p-5 rounded-full bg-white/20 backdrop-blur-sm mb-3 border border-white/30 shadow-inner">
              {finalDestination.icon}
            </div>
            <h3 className="text-xl font-bold text-center text-white px-2">
              {finalDestination.title}
            </h3>
            <p className="text-xs text-white/80 text-center mt-1 px-4">
              Complete all challenges to unlock
            </p>
          </motion.div>
        </motion.div>

        {/* Form details popup */}
        <AnimatePresence>
          {selectedForm && (
            <FormDetails
              form={
                selectedForm === finalDestination.id
                  ? finalDestination
                  : formTemplates.find((f) => f.id === selectedForm)!
              }
              onClose={() => setSelectedForm(null)}
              onUse={handleUseForm}
              isFinalDestination={selectedForm === finalDestination.id}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
