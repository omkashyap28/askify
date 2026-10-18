import { ChatTextarea } from "@/components/layout/chat-textarea"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"
import { MessageCircle } from "lucide-react"

export default function Page () {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <Empty className="w-full max-w-2xl">
        <EmptyHeader className="max-w-full!">
          <EmptyMedia className="bg-muted text-muted-foreground flex h-14 w-14 items-center justify-center rounded-full">
            <MessageCircle className="h-6 w-6" />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-semibold">Start a new conversation</EmptyTitle>
          <EmptyDescription>
            Type a message below to begin chatting with your AI assistant.
          </EmptyDescription>
        </EmptyHeader>
        
        <EmptyContent className="w-full max-w-full! mt-4">
          <ChatTextarea />
        </EmptyContent>
      </Empty>
    </div>
  )
}