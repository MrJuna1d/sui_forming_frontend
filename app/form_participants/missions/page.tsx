import FormIslands from "@/components/FormIslands"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-violet-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-20 bg-cover bg-center"></div>
      <div className="relative container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-200">
            Form Realm Journey
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Follow the magical path through enchanted islands to the final challenge
          </p>
        </div>

        <FormIslands />
      </div>
    </main>
  )
}
