import { Input } from "@/components/ui/input"

function InputSize() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Input size="sm" placeholder="Small" />
      <Input placeholder="Default" />
      <Input size="lg" placeholder="Large" />
    </div>
  )
}

export default InputSize
