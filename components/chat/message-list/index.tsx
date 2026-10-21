import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageContent, MessageFooter } from "@/components/ui/message"
import { Marker, MarkerContent } from "@/components/ui/marker"
import { UIMessage } from "@ai-sdk/react"
import { Copy, Edit, Trash2 } from "lucide-react"
import { Streamdown } from "streamdown"
import { code } from "@streamdown/code"
import { math } from "@streamdown/math"
import { cjk } from "@streamdown/cjk"
import { mermaid } from "@streamdown/mermaid"
import { Button } from "../../ui/button"
import Image from "next/image"

type Props = {
  messages: UIMessage[]
  status: "submitted" | "streaming" | "ready" | "error"
}

const StreamMessage = ({ message }: { message: UIMessage }) => {
  if (message.role === "user") {
    return (
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>
              {message.parts.map((part) =>
                part.type === "text" ? part.text : null
              )}
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <Button size="icon-sm" variant="ghost">
              <Copy />
            </Button>
            <Button size="icon-sm" variant="ghost">
              <Edit />
            </Button>
            <Button size="icon-sm" variant="destructive">
              <Trash2 />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
    )
  }

  return message.parts.map((prt, idx) => {
    switch (prt.type) {
      case "text":
        return (
          <Streamdown
            key={idx}
            plugins={{ code, mermaid, math, cjk }}
            isAnimating={status === "streaming"}
          >
            {prt.text}
          </Streamdown>
        )

      case "reasoning":
        return (
          <Marker>
            <MarkerContent>{prt.text}</MarkerContent>
          </Marker>
        )

      case "file":
        if (prt.mediaType.startsWith("image/")) {
          return (
            <Image
              key={idx}
              src={prt.url}
              alt="Generated image"
              className="size-56"
              height={224}
              width={224}
            />
          )
        }

      default:
        return null
    }
  })
}

export const MessageList = ({ messages }: Props) => {
  return (
    <div className="scrollbar-none space-y-10 overflow-auto">
      {messages.map((message) => (
        <div key={message.id}>
          <StreamMessage message={message} />
        </div>
      ))}
    </div>
  )
}
