import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-20"></div>
        <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-black/30"></div>
      </div>

      <div className="relative mx-auto px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-20 lg:pb-28 flex items-center min-h-[80vh]">
        <div className="max-w-3xl">
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

        {/* Decorative element */}
        <div className="absolute bottom-0 right-0 hidden translate-y-1/4 translate-x-1/4 transform lg:block">
          <div className="h-64 w-64 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-50 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
