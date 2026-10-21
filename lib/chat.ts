"use server"

import { toast } from "@/components/ui/toast"
import { UIMessage } from "ai"
import { existsSync, mkdirSync } from "node:fs"
import { writeFile, readFile } from "node:fs/promises"
import path from "node:path"
import z from "zod"

const ID_REGEX = /^[A-Za-z0-9_-]+$/

export const createChat = async (id: string) => {
  await writeFile(getChatFile(id), "[]")
}

const getChatFile = (id: string): string => {
  if (!ID_REGEX.test(id)) {
    throw new Error("Invalid chat ID")
  }

  const chatDir = path.resolve(process.cwd(), ".chats")
  const chatFile = path.resolve(chatDir, `${id}.json`)

  if (!chatFile.startsWith(`${chatDir}${path.sep}`)) {
    throw new Error("Invalid chat id")
  }

  if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true })

  return chatFile
}

export const loadChat = async (id: string): Promise<UIMessage[]> => {
  const idSchema = z.uuid("Invalid ID")

  if (!idSchema.safeParse(id)) {
    toast.add({
      type: "error",
      description: "Invalid ID",
    })
    throw new Error("Invalid ID")
  }

  return JSON.parse(await readFile(getChatFile(id), "utf-8"))
}
