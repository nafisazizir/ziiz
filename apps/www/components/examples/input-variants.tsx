import { Input } from "@/components/ui/input"

function InputVariants() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Input placeholder="Default" />
      <Input variant="secondary" placeholder="Secondary" />
      <Input variant="ghost" placeholder="Ghost" />
    </div>
  )
}

export default InputVariants
