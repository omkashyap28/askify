import { create, StateCreator } from "zustand"
import { devtools } from "zustand/middleware"

type PromptSlice = {
  prompt: string
  setPrompt: (val: string) => void
  pendingPrompt: string | null
  setPendingPrompt: (prompt: string) => void
  getPendingPrompt: () => string | null
}

type ChatStore = PromptSlice

const promptSlice: StateCreator<ChatStore> = (set, get) => ({
  prompt: "",
  setPrompt: (prompt) => set({ prompt }),
  pendingPrompt: null,
  setPendingPrompt: (prompt) => set({ pendingPrompt: prompt }),
  getPendingPrompt: () => {
    return get().pendingPrompt
  },
})

export const useChatStore = create<ChatStore>()(
  devtools(
    (...args) => ({
      ...promptSlice(...args),
    }),
    { name: "askify" }
  )
)
