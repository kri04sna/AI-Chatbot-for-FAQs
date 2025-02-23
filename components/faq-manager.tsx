"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

type FAQ = {
  id: number
  question: string
  answer: string
}

const initialFaqs: FAQ[] = [
  {
    id: 1,
    question: "What are your business hours?",
    answer: "Our standard business hours are Monday to Friday, 9 AM to 5 PM EST.",
  },
  {
    id: 2,
    question: "How do I reset my password?",
    answer:
      "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your email.",
  },
]

export function FAQManager() {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")

  const handleSave = () => {
    if (editingFaq) {
      setFaqs(
        faqs.map((faq) => (faq.id === editingFaq.id ? { ...faq, question: newQuestion, answer: newAnswer } : faq)),
      )
    } else {
      setFaqs([
        ...faqs,
        {
          id: Math.max(0, ...faqs.map((f) => f.id)) + 1,
          question: newQuestion,
          answer: newAnswer,
        },
      ])
    }
    setEditingFaq(null)
    setNewQuestion("")
    setNewAnswer("")
  }

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq)
    setNewQuestion(faq.question)
    setNewAnswer(faq.answer)
  }

  const handleDelete = (id: number) => {
    setFaqs(faqs.filter((faq) => faq.id !== id))
  }

  return (
    <Card className="flex h-[600px] flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold">FAQ Manager</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              onClick={() => {
                setEditingFaq(null)
                setNewQuestion("")
                setNewAnswer("")
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFaq ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Question</label>
                <Input
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Enter the question..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Answer</label>
                <Textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Enter the answer..."
                  rows={4}
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium">{faq.question}</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(faq)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(faq.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}

