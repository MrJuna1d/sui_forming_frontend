import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();

    // Check if API key exists
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Missing API key');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Configure Gemini client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Prompt engineering
    const prompt = `
I'm creating a form with the following details: 
- Purpose: ${formData.purpose} 
- Target audience: ${formData.audience} 
- Information types needed: ${formData.informationTypes} 
- Age group/demographic: ${formData.ageGroup} 

This is how you should refine your questions based on the information provided above:

1. Suggest **5 relevant questions** I should include in the form.
2. Present your answer in a **numbered list** with **only the questions** (no explanations).
3. Then, provide **5 practical tips** to increase **engagement rate** and **relevance** of the form.
4. Finally, suggest **2 more relevant questions** that can add further value.

Format your response clearly and concisely under the following headings:
- “Refined Questions”
- “Engagement Tips”
- “Additional Questions”
`;

    // Generate content with Gemini
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();

    // Just return the full text response in one paragraph
    return NextResponse.json({ response: text });

  } catch (error) {
    console.error('Error generating suggestions:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error && 'cause' in error ? error.cause : undefined;

    return NextResponse.json(
      {
        error: 'Failed to generate suggestions',
        details: errorMessage,
        cause: errorDetails
      },
      { status: 500 }
    );
  }
}
