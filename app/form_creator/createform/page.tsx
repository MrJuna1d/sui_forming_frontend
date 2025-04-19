"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, ChevronLeft, Check, Sparkles, Loader2 } from "lucide-react"
import { generateText } from "ai"
import { createOpenAI, openai } from "@ai-sdk/openai"
import { OpenAI } from 'openai';


const CreateForm = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    purpose: "",
    audience: "",
    informationTypes: "",
    ageGroup: "",
  })

  const [showFormBuilder, setShowFormBuilder] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Redirect to form builder
      setShowFormBuilder(true)
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const questions = [
    {
      title: "What is the purpose of this form?",
      description: "e.g., survey, registration, feedback, job application",
      field: "purpose",
      component: (
        <Textarea
          placeholder="Describe the purpose of your form..."
          value={formData.purpose}
          onChange={(e:any) => handleInputChange("purpose", e.target.value)}
        />
      ),
    },
    {
      title: "Who is the target audience?",
      description: "e.g., students, employees, customers",
      field: "audience",
      component: (
        <Textarea
          placeholder="Describe your target audience..."
          value={formData.audience}
          onChange={(e:any) => handleInputChange("audience", e.target.value)}
        />
      ),
    },
    {
      title: "What types of information do you need to collect?",
      description: "e.g., text, numbers, dates, choices, files",
      field: "informationTypes",
      component: (
        <Textarea
          placeholder="List the types of information you need to collect..."
          value={formData.informationTypes}
          onChange={(e:any) => handleInputChange("informationTypes", e.target.value)}
        />
      ),
    },
    {
      title: "What is the age group or demographic of your audience?",
      description: "e.g., teenagers, adults, seniors — helps with tone and complexity",
      field: "ageGroup",
      component: (
        <Textarea
          placeholder="Describe the age group or demographic..."
          value={formData.ageGroup}
          onChange={(e:any) => handleInputChange("ageGroup", e.target.value)}
        />
      ),
    },
  ]

  if (showFormBuilder) {
    return <FormBuilder formData={formData} />
  }

  const currentQuestion = questions[step]

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>{currentQuestion.title}</CardTitle>
          <CardDescription>{currentQuestion.description}</CardDescription>
        </CardHeader>
        <CardContent>{currentQuestion.component}</CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={step === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="flex items-center space-x-2">
            {questions.map((_, index) => (
              <div key={index} className={`w-2 h-2 rounded-full ${index === step ? "bg-primary" : "bg-gray-300"}`} />
            ))}
          </div>
          <Button onClick={nextStep}>
            {step === questions.length - 1 ? "Create Form" : "Next"}
            {step === questions.length - 1 ? (
              <Check className="ml-2 h-4 w-4" />
            ) : (
              <ChevronRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

const FormBuilder = ({ formData }: { formData: any }) => { 
 
  
    const [questions, setQuestions] = useState<
      Array<{ 
        id: string 
        type: string 
        question: string 
        options?: string[] 
      }> 
    >([]); 
    const [newQuestion, setNewQuestion] = useState(""); 
    const [questionType, setQuestionType] = useState("text"); 
    const [options, setOptions] = useState(""); 
    const [aiSuggestions, setAiSuggestions] = useState({
        response: "", // Store the entire response as a single string
      });
    const [isGenerating, setIsGenerating] = useState(false); 
   
    const addQuestion = () => { 
      if (newQuestion.trim() === "") return; 
   
      const parsedOptions = 
        questionType === "multiple-choice" 
          ? options 
              .split(",") 
              .map((opt) => opt.trim()) 
              .filter((opt) => opt !== "") 
          : undefined; 
   
      setQuestions([ 
        ...questions, 
        { 
          id: Date.now().toString(), 
          type: questionType, 
          question: newQuestion, 
          options: parsedOptions, 
        }, 
      ]); 
   
      // Reset form 
      setNewQuestion(""); 
      setOptions(""); 
    }; 
   
    const generateSuggestions = async () => { 
        setIsGenerating(true); 
        try { 
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData }), // Ensure formData is being passed correctly
            });
            
            if (!response.ok) {
                throw new Error('Failed to generate suggestions');
            }
    
            const data = await response.json();
            console.log('Generated data:', data); // Log the data received from the API
            
            // Check if the response contains the expected structure
            if (data.response) {
                setAiSuggestions({ response: data.response }); // Store the full response
            } else {
                console.error('Unexpected response structure:', data); // Log any unexpected response structure
            }
        } catch (error) { 
            console.error("Error generating suggestions:", error); 
        } finally { 
            setIsGenerating(false); 
        } 
    };
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Form Builder</CardTitle>
          <CardDescription>Based on your inputs, create your custom form by adding questions below.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            <h3 className="text-sm font-medium">Your Form Requirements:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">Purpose:</p>
                <p>{formData.purpose}</p>
              </div>
              <div>
                <p className="font-semibold">Target Audience:</p>
                <p>{formData.audience}</p>
              </div>
              <div>
                <p className="font-semibold">Information Types:</p>
                <p>{formData.informationTypes}</p>
              </div>
              <div>
                <p className="font-semibold">Age Group:</p>
                <p>{formData.ageGroup}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
              AI Form Assistant
            </CardTitle>
            <CardDescription>Get AI-powered suggestions for your form questions</CardDescription>
          </div>
          <Button onClick={generateSuggestions} variant="outline" disabled={isGenerating} className="flex items-center">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Suggestions
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
  {aiSuggestions.response ? (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">AI Response:</h3>
      <p className="text-sm text-gray-700">{aiSuggestions.response}</p>
    </div>
  ) : (
    <div className="text-center py-6 text-gray-500">
      {isGenerating ? (
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin mb-2" />
          <p>Generating smart suggestions based on your form requirements...</p>
        </div>
      ) : (
        <p>Click "Generate Suggestions" to get AI-powered question ideas for your form.</p>
      )}
    </div>
  )}
</CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Question</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                placeholder="Enter your question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="questionType">Question Type</Label>
              <RadioGroup value={questionType} onValueChange={setQuestionType} className="flex flex-col space-y-1 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="text" />
                  <Label htmlFor="text">Text</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="number" id="number" />
                  <Label htmlFor="number">Number</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="date" id="date" />
                  <Label htmlFor="date">Date</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multiple-choice" id="multiple-choice" />
                  <Label htmlFor="multiple-choice">Multiple Choice</Label>
                </div>
              </RadioGroup>
            </div>

            {questionType === "multiple-choice" && (
              <div>
                <Label htmlFor="options">Options (comma separated)</Label>
                <Input
                  id="options"
                  placeholder="Option 1, Option 2, Option 3"
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                />
              </div>
            )}

            <Button onClick={addQuestion}>Add Question</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Form Preview</CardTitle>
          <CardDescription>This is how your form will look to respondents.</CardDescription>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No questions added yet. Add some questions to see your form preview.
            </div>
          ) : (
            <div className="space-y-6">
              {questions.map((q, index) => (
                <div key={q.id} className="border p-4 rounded-md">
                  <div className="font-medium mb-2">
                    {index + 1}. {q.question}
                  </div>

                  {q.type === "text" && <Input placeholder="Text answer" disabled />}

                  {q.type === "number" && <Input type="number" placeholder="0" disabled />}

                  {q.type === "date" && <Input type="date" disabled />}

                  {q.type === "multiple-choice" && q.options && (
                    <RadioGroup disabled>
                      {q.options.map((option, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`option-${q.id}-${i}`} />
                          <Label htmlFor={`option-${q.id}-${i}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={questions.length === 0}>
            Save Form
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CreateForm
