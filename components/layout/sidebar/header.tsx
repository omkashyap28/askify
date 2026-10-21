"use client"

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"

export const Header = () => {
  const { state } = useSidebar()

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className="flex">
          {state === "collapsed" ? (
            <SidebarTrigger size="icon" />
          ) : (
            <>
              <SidebarMenuButton
                className="hover:bg-transparent active:bg-transparent"
                render={<Link href="/" />}
              >
                Askify
              </SidebarMenuButton>
              <SidebarTrigger size="icon" />
            </>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
