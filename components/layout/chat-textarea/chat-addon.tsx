import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InputGroupButton } from "@/components/ui/input-group"
import {
  GlobeIcon,
  ImageIcon,
  PaperclipIcon,
  PlusIcon,
  TelescopeIcon,
} from "lucide-react"

export const ChatAddon = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <InputGroupButton
            aria-label="Add files"
            type="button"
            size="icon-sm"
            variant="ghost"
            className="rounded-full"
          >
            <PlusIcon />
          </InputGroupButton>
        }
      />
      <DropdownMenuContent align="start" side="top" className="w-44">
        <DropdownMenuItem>
          <PaperclipIcon />
          Add Photos & Files
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ImageIcon />
          Create Image
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TelescopeIcon />
          Deep Research
        </DropdownMenuItem>
        <DropdownMenuItem>
          <GlobeIcon />
          Web Search
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
