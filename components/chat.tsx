"use client"

import { useChat } from "ai/react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { ConfidenceIndicator } from "./confidence-indicator"

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  return (
    <Card className="flex h-[600px] flex-col">
      <div className="border-b p-4">
        <h1 className="text-xl font-semibold">FAQ Assistant</h1>
        <p className="text-sm text-muted-foreground">Ask me anything about our products and services</p>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isUser = message.role === "user"
            try {
              const parsedContent = JSON.parse(message.content)
              return (
                <div
                  key={index}
                  className={cn(
                    "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-4 py-2",
                    isUser ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  <div className="flex items-center gap-2">
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    <span className="text-sm font-medium">{isUser ? "You" : "Assistant"}</span>
                  </div>
                  <div className="space-y-2">
                    <p>{parsedContent.message}</p>
                    {!isUser && parsedContent.confidence && <ConfidenceIndicator score={parsedContent.confidence} />}
                    {!isUser && parsedContent.biasWarning && (
                      <div className="text-sm text-yellow-500">⚠️ {parsedContent.biasWarning}</div>
                    )}
                  </div>
                </div>
              )
            } catch {
              // If the message is not JSON, display it as plain text
              return (
                <div
                  key={index}
                  className={cn(
                    "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-4 py-2",
                    isUser ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  <div className="flex items-center gap-2">
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    <span className="text-sm font-medium">{isUser ? "You" : "Assistant"}</span>
                  </div>
                  <p>{message.content}</p>
                </div>
              )
            }
          })}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Input placeholder="Ask a question..." value={input} onChange={handleInputChange} disabled={isLoading} />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </Card>
  )
}

