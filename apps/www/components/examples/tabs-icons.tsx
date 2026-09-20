import { AppWindowIcon, CodeIcon } from "@/components/icons"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

function TabsIcons() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindowIcon />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <CodeIcon />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default TabsIcons
