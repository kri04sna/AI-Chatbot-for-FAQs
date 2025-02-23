"use client"

import { useState } from "react"
import { useCompletion } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"

export function HeadlineAnalyzer() {
  const [headline, setHeadline] = useState("")
  const { complete, completion, isLoading } = useCompletion({
    api: "/api/analyze",
  })

  const handleAnalyze = async () => {
    if (!headline.trim()) return
    await complete(headline)
  }

  const score = completion ? JSON.parse(completion).score : 0
  const sentiment = completion ? JSON.parse(completion).sentiment : null

  const getScoreColor = (score: number) => {
    if (score < 30) return "text-green-500"
    if (score < 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreIcon = (score: number) => {
    if (score < 30) return <CheckCircle2 className="h-5 w-5 text-green-500" />
    if (score < 70) return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    return <AlertCircle className="h-5 w-5 text-red-500" />
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter a news headline..."
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleAnalyze} disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>

      {completion && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Conspiracy Score:</span>
              <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}%</span>
              {getScoreIcon(score)}
            </div>
            <Progress value={score} className="h-2" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Classification:</p>
              <div className="flex gap-2 text-sm">
                {score < 30 && <span className="text-green-500">Reliable News</span>}
                {score >= 30 && score < 70 && <span className="text-yellow-500">Potentially Misleading</span>}
                {score >= 70 && <span className="text-red-500">Likely Conspiracy</span>}
              </div>
            </div>
            {sentiment && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Sentiment:</p>
                <span className="text-sm">{sentiment}</span>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

