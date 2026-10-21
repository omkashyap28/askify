import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { cn } from "cn"
import { Toaster } from "@/components/ui/toast"
import { Provider } from "@/providers"

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
        <Provider>
          <main className="@container mx-auto h-full w-full max-w-4xl">
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
