import { ChatTextarea } from "@/components/layout/chat-textarea"

export default function Page() {
  return (
    <div className="h-[calc(100%-50px)] w-full">
      <div className="h-full"></div>
      <div className="sticky inset-x-auto bottom-0 pb-4">
        <ChatTextarea />
      </div>
    </div>
  )
}
