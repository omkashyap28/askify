import { ChatSidebar } from "@/components/layout/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "next-themes"

type Props = {
  children: React.ReactNode
}

export const Provider = ({ children }: Props) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <TooltipProvider>
      <SidebarProvider>
        <ChatSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  </ThemeProvider>
)
