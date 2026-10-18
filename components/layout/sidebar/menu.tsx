import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Edit, Search } from "lucide-react"
import Link from "next/link"

const SIDEBAR_MENU_PRIMARY = [
  {
    icon: <Edit />,
    title: "New Chat",
    href: "/new",
  },
]

export const Menu = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        {SIDEBAR_MENU_PRIMARY.map(({ href, title, icon }) => {
          return (
            <SidebarMenu key={title}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={title}
                  render={<Link href={href} />}
                >
                  {icon}
                  {title}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          )
        })}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Search">
              <Search />
              Search...
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
