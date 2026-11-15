import { Textarea } from "@/components/ui/textarea"

function TextareaVariants() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Textarea placeholder="Default" />
      <Textarea variant="secondary" placeholder="Secondary" />
      <Textarea variant="ghost" placeholder="Ghost" />
    </div>
  )
}

export default TextareaVariants
