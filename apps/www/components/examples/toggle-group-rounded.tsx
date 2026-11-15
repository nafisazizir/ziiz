import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

function ToggleGroupRounded() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup shape="rounded" defaultValue={["all"]}>
        <ToggleGroupItem value="all">All</ToggleGroupItem>
        <ToggleGroupItem value="unread">Unread</ToggleGroupItem>
        <ToggleGroupItem value="mentions">Mentions</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        variant="outline"
        shape="rounded"
        spacing={0}
        defaultValue={["day"]}
      >
        <ToggleGroupItem value="day">Day</ToggleGroupItem>
        <ToggleGroupItem value="week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month">Month</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export default ToggleGroupRounded
