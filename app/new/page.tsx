import { EmptyChat } from "@/components/chat/empty-chat"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "$s | Askify",
    default: "Askify",
  },
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptates pariatur facilis, quae deserunt reprehenderit odit tenetur consequatur ducimus quibusdam minima doloribus doloremque explicabo nulla velit id voluptas recusandae ipsum!",
}

export default async function Page() {
  return <EmptyChat />
}
