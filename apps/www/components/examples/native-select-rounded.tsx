import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

const looks = [
  { variant: "default", label: "Default" },
  { variant: "secondary", label: "Secondary" },
] as const

export default function NativeSelectRounded() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {looks.map(({ variant, label }) => (
        <NativeSelect
          key={variant}
          variant={variant}
          shape="rounded"
          aria-label={label}
        >
          <NativeSelectOption value="">{label}</NativeSelectOption>
          <NativeSelectOption value="todo">Todo</NativeSelectOption>
          <NativeSelectOption value="done">Done</NativeSelectOption>
        </NativeSelect>
      ))}
    </div>
  )
}
