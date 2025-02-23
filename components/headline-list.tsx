"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"

type Headline = {
  id: number
  text: string
  score: number
  date: string
}

const mockHeadlines: Headline[] = [
  {
    id: 1,
    text: "Scientists Discover New Species in Amazon Rainforest",
    score: 20,
    date: "2024-02-23",
  },
  {
    id: 2,
    text: "Government Hiding Alien Technology in Secret Base",
    score: 85,
    date: "2024-02-23",
  },
  {
    id: 3,
    text: "Local Community Organizes Beach Cleanup Event",
    score: 15,
    date: "2024-02-23",
  },
]

export function HeadlineList() {
  const [headlines, setHeadlines] = useState<Headline[]>(mockHeadlines)

  const deleteHeadline = (id: number) => {
    setHeadlines(headlines.filter((h) => h.id !== id))
  }

  const getScoreColor = (score: number) => {
    if (score < 30) return "text-green-500"
    if (score < 70) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Headline</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {headlines.map((headline) => (
            <TableRow key={headline.id}>
              <TableCell className="font-medium">{headline.text}</TableCell>
              <TableCell>
                <span className={getScoreColor(headline.score)}>{headline.score}%</span>
              </TableCell>
              <TableCell>{headline.date}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteHeadline(headline.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

