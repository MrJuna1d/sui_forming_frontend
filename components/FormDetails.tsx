"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Sparkles, Clock, Scroll, Flag, Trophy } from "lucide-react"
import Link from "next/link"

type Form = {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  position: { x: number; y: number }
  difficulty: string
  color: string
  glow: string
  step?: number
  category?: string
}

type FormDetailsProps = {
  form: Form
  onClose: () => void
  onUse: (formId: number) => void
  isFinalDestination?: boolean
}

export default function FormDetails({ form, onClose, onUse, isFinalDestination = false }: FormDetailsProps) {
  const handleUseForm = () => {
    onUse(form.id)
  }

  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        className={`relative w-full max-w-md bg-gradient-to-br ${form.color} p-6 rounded-xl border-2 ${
          isFinalDestination ? "border-yellow-300/70" : "border-white/30"
        } shadow-[0_0_30px_rgba(255,255,255,0.3)]`}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/80 hover:text-white bg-white/10 rounded-full p-1 backdrop-blur-sm"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center mb-6">
          <div
            className={`p-4 mr-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-inner ${
              isFinalDestination ? "text-yellow-200" : ""
            }`}
          >
            {form.icon}
          </div>
          <div>
            <div className="flex items-center">
              {form.step && (
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs font-bold ${
                    isFinalDestination ? "bg-yellow-600 text-white" : "bg-purple-600 text-white"
                  }`}
                >
                  {form.step}
                </span>
              )}
              <h3 className="text-2xl font-bold text-white">{form.title}</h3>
            </div>
            <div className="flex items-center mt-1">
              {isFinalDestination ? (
                <Trophy className="h-4 w-4 text-yellow-300 mr-2" />
              ) : (
                <Sparkles className="h-4 w-4 text-white/70 mr-2" />
              )}
              <p className="text-sm text-white/70">{form.difficulty} Level</p>
            </div>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <p className="text-white/90 text-lg">{form.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center border border-white/20">
              {isFinalDestination ? (
                <Flag className="h-5 w-5 text-white/80 mr-3" />
              ) : (
                <Scroll className="h-5 w-5 text-white/80 mr-3" />
              )}
              <div>
                <p className="text-xs text-white/60">{isFinalDestination ? "Challenge Type" : "Scroll Type"}</p>
                <p className="font-bold text-white">{isFinalDestination ? "Ultimate" : "Enchanted"}</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center border border-white/20">
              <Clock className="h-5 w-5 text-white/80 mr-3" />
              <div>
                <p className="text-xs text-white/60">{isFinalDestination ? "Time Trial" : "Casting Time"}</p>
                <p className="font-bold text-white">
                  {isFinalDestination
                    ? "15 min"
                    : form.difficulty === "Novice"
                      ? "3 min"
                      : form.difficulty === "Adept"
                        ? "7 min"
                        : "12 min"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
            <h4 className="font-bold text-white mb-2 flex items-center">
              {isFinalDestination ? (
                <Trophy className="h-4 w-4 mr-2 text-yellow-300" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              {isFinalDestination ? "Challenge Requirements:" : "Magical Properties:"}
            </h4>
            <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
              {isFinalDestination ? (
                <>
                  <li>Complete all previous form challenges</li>
                  <li>Master form validation techniques</li>
                  <li>Create a complex multi-step form</li>
                  <li>Implement advanced accessibility features</li>
                </>
              ) : (
                <>
                  <li>Self-validating enchantment</li>
                  <li>Adapts to any viewing crystal size</li>
                  <li>Error-repelling charm</li>
                  <li>Accessible to all realm dwellers</li>
                </>
              )}
            </ul>
          </div>
        </div>

    <Link href={"/form_participants/missions/challenge"}>
   
        <Button
          className={`w-full backdrop-blur-sm border text-white font-bold text-lg py-6 ${
            isFinalDestination
              ? "bg-yellow-600/70 hover:bg-yellow-600/90 border-yellow-300/50"
              : "bg-white/20 hover:bg-white/30 border-white/30"
          }`}
          onClick={handleUseForm}
        >
          {isFinalDestination ? (
            <>
              <Flag className="h-5 w-5 mr-2" />
              Begin Final Challenge
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Summon This Scroll
            </>
          )}
        </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

