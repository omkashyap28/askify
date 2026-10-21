"use client"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { ArrowUp, Pause } from "lucide-react"
import { ChatAddon } from "./chat-addons"
import { SubmitEvent, useEffect, useRef } from "react"
import { isTypingTarget, readFromClipboard } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useChatStore } from "@/store"
import { AudioButton } from "./events-buttons/audio-button"

type Props = {
  onStop?: () => void
  status?: "submitted" | "streaming" | "ready" | "error"
}

export const ChatForm = ({ onStop, status = "ready" }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { push } = useRouter()

  const setPendingPrompt = useChatStore((state) => state.setPendingPrompt)
  const prompt = useChatStore((state) => state.prompt)
  const setPrompt = useChatStore((state) => state.setPrompt)

  useEffect(() => {
    if (typeof window === "undefined") return

    if (!textareaRef.current) return

    const keyDown = (e: KeyboardEvent) => {
      if (e.key.toLocaleLowerCase() === "escape") {
        textareaRef.current?.blur()
        return
      }

      if (isTypingTarget(e.target)) return

      if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return

      if (!/^[A-Za-z0-9]$/.test(e.key)) return

      textareaRef.current?.focus()
    }

    window.addEventListener("keydown", keyDown)

    return () => window.removeEventListener("keydown", keyDown)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    if (!textareaRef.current) return

    const keyDown = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLocaleLowerCase() === "v") {
        const clipboardText = await readFromClipboard()

        if (!clipboardText) return
        setPrompt(clipboardText)
        textareaRef.current?.focus()
      }
    }

    window.addEventListener("keydown", keyDown)

    return () => window.removeEventListener("keydown", keyDown)
  }, [setPrompt])

  const busy = status === "streaming" || status === "submitted"

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (prompt.trim().length === 0) return
    setPendingPrompt(prompt)

    push(`/chat/${crypto.randomUUID()}`)
    // setPrompt("")
  }

  return (
    <form onSubmit={handleSubmit} className="w-full px-4">
      <InputGroup className="w-full items-end rounded-3xl border px-1 pt-2 shadow-sm">
        <InputGroupTextarea
          placeholder="Ask anything..."
          className="max-h-43 min-h-5 resize-none scrollbar-thin border-0 py-0 shadow-none focus-visible:ring-0"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          ref={textareaRef}
        />

        <InputGroupAddon className="justify-between!" align="block-end">
          <ChatAddon />
          <div className="flex items-center gap-2">
            <AudioButton />

            {prompt.trim().length !== 0 && (
              <Button
                type="reset"
                aria-label="Stop streaming"
                variant="outline"
                className="rounded-full"
                onClick={() => setPrompt("")}
              >
                Reset
              </Button>
            )}

            {busy ? (
              <Button
                type="button"
                aria-label="Stop streaming"
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={onStop}
              >
                <Pause />
              </Button>
            ) : (
              <Button
                type="submit"
                aria-label="Submit"
                size="icon"
                className="rounded-full"
                disabled={prompt.trim().length === 0}
              >
                <ArrowUp />
              </Button>
            )}
          </div>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
