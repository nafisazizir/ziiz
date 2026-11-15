import { Input } from "@/components/ui/input"

function InputRounded() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Input shape="rounded" placeholder="Email" />
      <Input shape="rounded" variant="secondary" placeholder="Search" />
    </div>
  )
}

export default InputRounded
