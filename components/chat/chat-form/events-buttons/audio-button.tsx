import { Button } from "@/components/ui/button"
import { Mic } from "lucide-react"

export const AudioButton = () => {
  return (
    <Button
      type="button"
      aria-label="Voice search"
      size="icon"
      className="rounded-full"
      variant="ghost"
    >
      <Mic />
    </Button>
  )
}
