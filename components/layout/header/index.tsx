import { Button } from "@/components/ui/button"

export const Header = () => {
  return (
    <header className="flex h-13 w-full items-center justify-end gap-2 bg-background px-4 md:px-5">
      <Button>SignIn</Button>
    </header>
  )
}
