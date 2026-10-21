import { Sidebar, SidebarContent, SidebarRail } from "../../ui/sidebar"
import { PinnedChat } from "./pinned-chat"
import { RecentChat } from "./recent-chat"
import { Menu } from "./menu"
import { Footer } from "./footer"
import { Header } from "./header"

export const ChatSidebar = () => {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <Header />

      <SidebarContent>
        <Menu />
        <PinnedChat />
        <RecentChat />
      </SidebarContent>

      <Footer />
      <SidebarRail />
    </Sidebar>
  )
}
