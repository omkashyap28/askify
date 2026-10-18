import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ChatSidebar } from "@/components/layout/sidebar"
import { ContextProvider } from "@/context/ai-context"
import { Header } from "@/components/layout/header"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body cz-shortcut-listen="true">
        <ThemeProvider>
          <TooltipProvider>
            <ContextProvider>
              <SidebarProvider>
                <ChatSidebar />
                <SidebarInset>
                  <main className="mx-auto h-screen w-full max-w-3xl p-8 sm:p-4">
                    {children}
                  </main>
                </SidebarInset>
              </SidebarProvider>
            </ContextProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
