import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

function TabsRounded() {
  return (
    <div className="flex flex-wrap items-start gap-8">
      <Tabs defaultValue="for-you">
        <TabsList shape="rounded">
          <TabsTrigger value="for-you">For you</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="account" orientation="vertical">
        <TabsList shape="rounded">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default TabsRounded
