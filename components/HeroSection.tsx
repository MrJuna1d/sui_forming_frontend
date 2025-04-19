import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Users } from "lucide-react";
import Image from "next/image";


export default function HeroSection() {
  return (
    <div className="relative h-[calc(100vh-4.75rem)] overflow-hidden bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
      {/* Decorative Hexagon Top Right */}
      <div className="absolute -right-16 -top-16 z-10 hidden md:block">
        <div className="relative h-64 w-64">
          <div className="absolute inset-0 animate-spin-slow opacity-70">
            <svg viewBox="0 0 100 100" fill="none">
              <g stroke="rgba(216, 180, 254, 0.4)" strokeWidth="0.5">
                <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" />
                <path d="M50 20L79.4 35V65L50 80L20.6 65V35L50 20Z" />
                <path d="M50 40L65.5 48.5V65.5L50 74L34.5 65.5V48.5L50 40Z" />
              </g>
            </svg>
          </div>
          <div className="absolute right-12 top-12 h-16 w-16 animate-pulse rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-60 blur-xl"></div>
          <div className="absolute left-10 top-16 h-3 w-3 animate-float rounded-full bg-purple-300 opacity-80"></div>
          <div className="absolute left-24 top-24 h-2 w-2 animate-float-delayed rounded-full bg-pink-300 opacity-80"></div>
          <div className="absolute left-16 top-32 h-4 w-4 animate-float-slow rounded-full bg-indigo-300 opacity-60"></div>
        </div>
      </div>

      {/* Central Animated Background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="relative h-[500px] w-[500px] opacity-60">
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 opacity-30 blur-2xl"></div>
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 transform animate-spin-slow opacity-20">
            <svg viewBox="0 0 100 100" fill="none">
              <circle
                cx="50"
                cy="50"
                r="49"
                stroke="rgba(216, 180, 254, 0.6)"
                strokeWidth="0.5"
                strokeDasharray="1 3"
              />
            </svg>
          </div>
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 transform animate-spin-reverse opacity-30">
            <svg viewBox="0 0 100 100" fill="none">
              <circle
                cx="50"
                cy="50"
                r="49"
                stroke="rgba(192, 132, 252, 0.5)"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 transform opacity-40">
            <svg viewBox="0 0 100 100" fill="none">
              <g stroke="rgba(216, 180, 254, 0.7)" strokeWidth="0.5">
                <circle cx="50" cy="20" r="3" fill="rgba(216, 180, 254, 0.5)" />
                <circle cx="80" cy="50" r="3" fill="rgba(216, 180, 254, 0.5)" />
                <circle cx="50" cy="80" r="3" fill="rgba(216, 180, 254, 0.5)" />
                <circle cx="20" cy="50" r="3" fill="rgba(216, 180, 254, 0.5)" />
                <circle cx="35" cy="35" r="2" fill="rgba(216, 180, 254, 0.5)" />
                <circle cx="65" cy="35" r="2" fill="rgba(216, 180, 254, 0.5)" />
                <circle cx="65" cy="65" r="2" fill="rgba(216, 180, 254, 0.5)" />
                <circle cx="35" cy="65" r="2" fill="rgba(216, 180, 254, 0.5)" />
                <line x1="50" y1="20" x2="35" y2="35" />
                <line x1="50" y1="20" x2="65" y2="35" />
                <line x1="80" y1="50" x2="65" y2="35" />
                <line x1="80" y1="50" x2="65" y2="65" />
                <line x1="50" y1="80" x2="35" y2="65" />
                <line x1="50" y1="80" x2="65" y2="65" />
                <line x1="20" y1="50" x2="35" y2="35" />
                <line x1="20" y1="50" x2="35" y2="65" />
                <line x1="35" y1="35" x2="65" y2="35" />
                <line x1="65" y1="35" x2="65" y2="65" />
                <line x1="65" y1="65" x2="35" y2="65" />
                <line x1="35" y1="65" x2="35" y2="35" />
              </g>
            </svg>
          </div>
          <div className="absolute left-1/4 top-1/4 h-16 w-12 animate-float rounded-md border border-purple-300/30 bg-purple-500/5 backdrop-blur-sm"></div>
          <div className="absolute bottom-1/4 right-1/4 h-20 w-16 animate-float-delayed rounded-md border border-pink-300/30 bg-pink-500/5 backdrop-blur-sm"></div>
          <div className="absolute bottom-1/3 left-1/3 h-12 w-24 animate-float-slow rounded-md border border-indigo-300/30 bg-indigo-500/5 backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-20"></div>
        <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-black/30"></div>
      </div>

      {/* Main Content */}
      <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:flex lg:h-screen lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-3xl -mt-20 ml-10">
          <div className="rounded-lg bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-100 backdrop-blur-sm">
            Powered by Sui Blockchain
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">FormCraft</span>
            <span className="block bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
              Create & Play
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-xl text-purple-100 sm:text-2xl">
            The first blockchain game where you create forms, share them, and
            earn rewards on the Sui network.
          </p>

          <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              size="lg"
              className="group bg-white px-8 text-lg font-semibold text-purple-900 hover:bg-purple-50"
            >
              <FileText className="mr-2 h-5 w-5" />
              Create Form
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-300 bg-transparent px-8 text-lg font-semibold text-white hover:bg-purple-900/30"
            >
              <Users className="mr-2 h-5 w-5" />
              Join Game
            </Button>
          </div>
        </div>

        {/* Character Image Section */}
        <div className="relative mt-[110px] mr-[50px] hidden w-[500px] lg:block">
          <Image
            src={"/character.png"}
            alt="FormCraft Character"
            className="w-full object-contain"
          />
        </div>
      </div>

      {/* Additional Floating Elements */}
      <div className="absolute right-1/4 top-1/3 hidden h-2 w-2 animate-float-delayed rounded-full bg-purple-300 opacity-60 md:block"></div>
      <div className="absolute right-1/3 top-1/4 hidden h-3 w-3 animate-float rounded-full bg-pink-300 opacity-60 md:block"></div>

      {/* Bottom Right Glow */}
      <div className="absolute bottom-0 right-0 hidden translate-y-1/4 translate-x-1/4 transform lg:block">
        <div className="h-64 w-64 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-50 blur-3xl"></div>
      </div>
    </div>
  );
}
