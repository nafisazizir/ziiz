import { ChevronDownIcon } from "@/components/icons"

import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
            <ChevronDownIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>Docs</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  )
}
