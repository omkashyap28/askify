"use client"

import { useEffect, useRef } from "react"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"
import { MessageCircle } from "lucide-react"
import { ChatForm } from "../chat-form"

export const EmptyChat = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const viewport = window.visualViewport

    const updateViewport = () => {
      if (!container) return

      container.style.setProperty(
        "--chat-viewport-height",
        `${viewport?.height ?? window.innerHeight}px`
      )

      container.style.setProperty(
        "--chat-viewport-top",
        `${viewport?.offsetTop ?? 0}px`
      )
    }

    updateViewport()

    viewport?.addEventListener("resize", updateViewport)
    viewport?.addEventListener("scroll", updateViewport)
    window.addEventListener("resize", updateViewport)

    return () => {
      viewport?.removeEventListener("resize", updateViewport)
      viewport?.removeEventListener("scroll", updateViewport)
      window.removeEventListener("resize", updateViewport)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative inset-x-0 z-40 grid grid-rows-[minmax(0,1fr)_auto] overflow-hidden bg-background"
      style={{
        top: "var(--chat-viewport-top, 0px)",
        height: "var(--chat-viewport-height, 100dvh)",
        overscrollBehavior: "none",
      }}
    >
      <div className="flex min-h-0 min-w-0 items-center justify-center px-6 py-4">
        <Empty className="w-full max-w-md gap-4 border-0 p-0">
          <EmptyHeader className="max-w-full items-center text-center">
            <EmptyMedia className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <MessageCircle className="size-6" />
            </EmptyMedia>

            <EmptyTitle className="text-xl font-semibold">
              Start a new conversation
            </EmptyTitle>

            <EmptyDescription>
              Type a message below to begin chatting with your AI assistant.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>

      <div className="min-w-0 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto w-full max-w-4xl">
          <ChatForm />
        </div>
      </div>
    </div>
  )
}
