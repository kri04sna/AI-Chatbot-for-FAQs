import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are an AI FAQ assistant. Your responses should be:
        1. Accurate and fact-based
        2. Free from marketing bias
        3. Include a confidence score (0-100)
        4. Include a bias warning if detected

        Format your response as a JSON object with these fields:
        {
          "message": "Your response text",
          "confidence": number,
          "biasWarning": "Warning message if bias detected" (optional)
        }

        If confidence is below 50%, respond with uncertainty and suggest seeking more information.
        Detect and warn about marketing bias (e.g., "best", "greatest", "perfect").`,
      },
      ...messages,
    ],
    stream: true,
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}

