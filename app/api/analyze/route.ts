import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a news headline analyzer. Analyze the given headline and return a JSON object with:
        1. score (0-100): representing how likely the headline is to be conspiratorial or misleading
        2. sentiment: a brief analysis of the emotional tone
        
        Use these criteria:
        - Sensationalist language
        - Lack of credible sources
        - Emotional manipulation
        - Conspiracy theory keywords
        - Extreme claims
        
        Return only the JSON object, no other text.`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: true,
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}

