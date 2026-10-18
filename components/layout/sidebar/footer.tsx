import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { User2 } from "lucide-react"

export const Footer = () => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Avatar>
              <AvatarImage src="/profile.jfif" alt="User profile" />
              <AvatarFallback>
                <User2 className="size-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <h2 className="text-base">Hariom Kashyap</h2>
              <span className="text-foreground-muted truncate text-xs">
                omkashyap@gmail.com
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
