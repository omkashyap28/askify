"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { MessageList } from "./message-list"
import { ChatForm } from "./chat-form"
import { usePathname } from "next/navigation"
import { useChatStore } from "@/store"
import { useEffect, useRef } from "react"

export function ChatContainer() {
  const pathname = usePathname()
  const consumedRef = useRef<boolean>(false)

  const pendingPrompt = useChatStore((state) => state.pendingPrompt)

  const { messages, sendMessage, status, stop } = useChat({
    id: pathname.split("/").at(-1),
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    throttle: 50,
  })

  console.log(status)

  useEffect(() => {
    if (consumedRef.current) return

    const prompt = pendingPrompt
    if (!prompt) return
    if (prompt.trim().length === 0) return

    void sendMessage({ text: prompt })
    consumedRef.current = true
  }, [pendingPrompt, sendMessage])

  return (
    <div className="relative grid h-screen grid-rows-[1fr_auto] py-4">
      <MessageList messages={messages} status={status} />
      <div className="sticky inset-x-0 bottom-0 w-full">
        <ChatForm onStop={stop} status={status} />
      </div>
    </div>
  )
}
