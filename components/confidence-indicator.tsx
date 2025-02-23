import { Progress } from "@/components/ui/progress"

export function ConfidenceIndicator({ score }: { score: number }) {
  const getScoreColor = (score: number) => {
    if (score < 50) return "text-red-500"
    if (score < 80) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Confidence Score</span>
        <span className={getScoreColor(score)}>{score}%</span>
      </div>
      <Progress value={score} className="h-1" />
    </div>
  )
}

