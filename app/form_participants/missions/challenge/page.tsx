"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function SurveyPage() {
  const router = useRouter()
  const [showSurvey, setShowSurvey] = useState(false)
  const [formData, setFormData] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  })

  const handleStartSurvey = () => {
    setShowSurvey(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Store form data in localStorage to access it on the thank you page
    localStorage.setItem("surveyData", JSON.stringify(formData))

    // Navigate to thank you page
    router.push("/form_participants/missions/thank-you")
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {!showSurvey ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Tech Survey</CardTitle>
            <CardDescription>
              Help us understand your tech preferences and experiences by completing this short survey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This survey consists of four questions about your technology preferences and experiences. Your feedback
              will help us improve our products and services.
            </p>
            <p className="mb-4">
              The survey should take approximately 5 minutes to complete. All responses are anonymous and will be used
              for research purposes only.
            </p>
            <p className="mb-4">
              Upon completion, you will earn experience points and contribution points for your participation.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartSurvey} className="w-full">
              Start Survey
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Tech Survey Questions</CardTitle>
            <CardDescription>Please answer all four questions below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="question1">
                  1. What programming languages or frameworks are you currently using in your projects?
                </Label>
                <Textarea
                  id="question1"
                  name="question1"
                  placeholder="Your answer here..."
                  value={formData.question1}
                  onChange={handleInputChange}
                  required
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="question2">2. What challenges do you face when adopting new technologies?</Label>
                <Textarea
                  id="question2"
                  name="question2"
                  placeholder="Your answer here..."
                  value={formData.question2}
                  onChange={handleInputChange}
                  required
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="question3">
                  3. How do you stay updated with the latest tech trends and developments?
                </Label>
                <Textarea
                  id="question3"
                  name="question3"
                  placeholder="Your answer here..."
                  value={formData.question3}
                  onChange={handleInputChange}
                  required
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="question4">
                  4. What technologies are you most excited to learn about in the next year?
                </Label>
                <Textarea
                  id="question4"
                  name="question4"
                  placeholder="Your answer here..."
                  value={formData.question4}
                  onChange={handleInputChange}
                  required
                  className="min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full">
                Complete Survey
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
