import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const looks = [
  { variant: "default", label: "Default" },
  { variant: "secondary", label: "Secondary" },
] as const
const items = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]

function SelectRounded() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {looks.map(({ variant, label }) => (
        <Select key={variant} variant={variant} shape="rounded">
          <SelectTrigger className="w-40">
            <SelectValue placeholder={label} />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}

export default SelectRounded
