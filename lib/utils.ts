"use client"

export const writeToClipboard = (message: string) => {
  if (!window.navigator.clipboard) return false

  return window.navigator.clipboard
    .writeText(message)
    .then(() => true)
    .catch((error) => {
      console.log("Fail to write on clipboard", error)
    })
}

export const readFromClipboard = async () => {
  if (!window.navigator.clipboard) return

  return window.navigator.clipboard
    .readText()
    .then((content) => content)
    .catch((error) => {
      console.log("Fail to read from clipboard", error)
    })
}

export const isTypingTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}
