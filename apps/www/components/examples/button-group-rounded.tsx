import { IconChevronDown } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TLDS = [
  { label: ".com", value: ".com" },
  { label: ".dev", value: ".dev" },
]

export default function ButtonGroupRounded() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ButtonGroup>
        <Button shape="rounded" variant="outline">
          Archive
        </Button>
        <Button shape="rounded" variant="outline">
          Report
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button shape="rounded">API Console</Button>
        <ButtonGroupSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button shape="rounded" size="icon" aria-label="More" />}
          >
            <IconChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>Docs</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText shape="rounded">https://</ButtonGroupText>
        <Input shape="rounded" placeholder="example" aria-label="Domain" />
        <Select items={TLDS} defaultValue=".com" shape="rounded">
          <SelectTrigger aria-label="Top-level domain">
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="end">
            <SelectGroup>
              {TLDS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </ButtonGroup>
    </div>
  )
}
