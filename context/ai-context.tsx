"use client"

import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react"

type ContextProps = {
  prompt: string
  setPrompt: Dispatch<SetStateAction<string>>
}

export const Context = createContext<ContextProps | undefined>(undefined)

export function ContextProvider({ children }: { children: ReactNode }) {
  const [prompt, setPrompt] = useState("")

  return (
    <Context.Provider value={{ prompt, setPrompt }}>
      {children}
    </Context.Provider>
  )
}
