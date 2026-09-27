import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const sizes = ["sm", "default", "lg"] as const
const items = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]

function SelectSize() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Select key={size} size={size}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={`Fruit · ${size}`} />
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

export default SelectSize
