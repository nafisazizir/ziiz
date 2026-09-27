import { IconFileText, IconGitBranch, IconSearch } from "@tabler/icons-react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

function MarkerBorderDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 py-12">
      <Marker variant="border">
        <MarkerIcon>
          <IconGitBranch />
        </MarkerIcon>
        <MarkerContent>Switched to release-candidate</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <IconSearch />
        </MarkerIcon>
        <MarkerContent>Reviewed 8 related files</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <IconFileText />
        </MarkerIcon>
        <MarkerContent>Opened implementation notes</MarkerContent>
      </Marker>
    </div>
  )
}

export default MarkerBorderDemo
