import { useState } from "react"
import type { FormEvent } from "react"
import { Bot, CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"
import { siteConfig } from "../config"

interface Message {
  id: number
  content: string
  sender: "user" | "ai"
}

export function SiteChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: `Welcome to ${siteConfig.companyName}! How can we help you today?`,
      sender: "ai",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, content: input, sender: "user" },
    ])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content:
            "Thank you for your message. One of our agents will be with you shortly. In the meantime, feel free to explore our available properties.",
          sender: "ai",
        },
      ])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <ExpandableChat size="lg" position="bottom-right" icon={<Bot className="h-6 w-6" />}>
      <ExpandableChatHeader
        className="flex-col text-center justify-center"
        style={{ background: siteConfig.colors.primary, color: "#fff" }}
      >
        <h1
          className="text-lg font-semibold"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {siteConfig.companyName}
        </h1>
        <p className="text-sm opacity-70">
          Ask us about properties, services, or schedule a tour
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                fallback={message.sender === "user" ? "You" : "PR"}
              />
              <ChatBubbleMessage variant={message.sender === "user" ? "sent" : "received"}>
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar className="h-8 w-8 shrink-0" fallback="PR" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about properties..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0 justify-end">
            <Button
              type="submit"
              size="sm"
              className="gap-1.5"
              style={{ background: siteConfig.colors.accent, color: "#fff" }}
            >
              Send <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  )
}
