"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  const [experiencePoints, setExperiencePoints] = useState(0)
  const [contributionPoints, setContributionPoints] = useState(0)

  useEffect(() => {
    // Calculate points based on survey completion
    // In a real app, this would likely come from an API
    const surveyData = localStorage.getItem("surveyData")

    if (surveyData) {
      const data = JSON.parse(surveyData)

      // Calculate points based on answer length and completeness
      let expPoints = 50 // Base points for completing the survey
      let contribPoints = 25 // Base contribution points

      // Add bonus points based on answer quality (length as a simple metric)
      const totalLength = Object.values(data).reduce(
        (sum: number, answer: any) => sum + (typeof answer === "string" ? answer.length : 0),
        0,
      )

      if (totalLength > 200) expPoints += 25
      if (totalLength > 400) expPoints += 25
      if (totalLength > 600) {
        expPoints += 50
        contribPoints += 25
      }

      setExperiencePoints(expPoints)
      setContributionPoints(contribPoints)
    }
  }, [])

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Thank You for Completing the Survey!</CardTitle>
          <CardDescription>Your feedback is valuable and will help us improve our services.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-2 p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-medium">You've earned:</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge variant="outline" className="text-lg py-2 px-4 border-2">
                <span className="font-bold text-primary">{experiencePoints}</span> Experience Points
              </Badge>
              <Badge variant="outline" className="text-lg py-2 px-4 border-2">
                <span className="font-bold text-primary">{contributionPoints}</span> Contribution Points
              </Badge>
            </div>
          </div>

          <div className="text-center">
            <p className="mb-2">Your level has increased!</p>
            <div className="w-full bg-muted rounded-full h-4 mb-4">
              <div
                className="bg-primary h-4 rounded-full"
                style={{ width: `${Math.min(100, experiencePoints / 2)}%` }}
              ></div>
            </div>
            <p>Keep participating to earn more points and unlock additional benefits.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/form_participants/dashboard" className="w-full">
            <Button className="w-full">Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
