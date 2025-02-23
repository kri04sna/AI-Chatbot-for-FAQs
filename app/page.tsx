import { Chat } from "@/components/chat"
import { FAQManager } from "@/components/faq-manager"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <Chat />
          <FAQManager />
        </div>
      </div>
    </div>
  )
}

