import { IconAppWindow, IconCode } from "@tabler/icons-react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

function TabsIcons() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <IconAppWindow />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <IconCode />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default TabsIcons
