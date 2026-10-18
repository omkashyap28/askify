"use client"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { ArrowUp, Mic } from "lucide-react"
import { ChatAddon } from "./chat-addon"
import { Context } from "@/context/ai-context"
import { SubmitEvent, useContext } from "react"
import { redirect } from "next/navigation"

export const ChatTextarea = () => {
  const context = useContext(Context)

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = window.crypto.randomUUID()

    if(!context || context.prompt.length === 0) {
      return;
    }

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: context.prompt
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Request failed")
    }

    console.log(data.text)

    // redirect(`/chat/${id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <InputGroup className="w-full items-end rounded-3xl border px-1 shadow-sm">
        <InputGroupAddon>
          <ChatAddon />
        </InputGroupAddon>

        <InputGroupTextarea
          placeholder="Ask anything..."
          className="max-h-43 min-h-11 resize-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0"
          value={context?.prompt || ""}
          onChange={(e) => context?.setPrompt(e.target.value)}
        />

        <InputGroupAddon align="inline-end">
          <Button
            type="button"
            aria-label="Voice search"
            size="icon"
            className="rounded-full"
            variant="ghost"
          >
            <Mic />
          </Button>
          <Button
            type="submit"
            aria-label="Submit"
            size="icon"
            className="rounded-full"
          >
            <ArrowUp />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
