import { Badge } from "@/components/ui/badge"

function BadgeCustomColors() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-blue-100 text-blue-900">Blue</Badge>
      <Badge className="bg-green-100 text-green-900">Green</Badge>
      <Badge className="bg-teal-100 text-teal-900">Teal</Badge>
      <Badge className="bg-purple-100 text-purple-900">Purple</Badge>
      <Badge className="bg-red-100 text-red-900">Red</Badge>
    </div>
  )
}

export default BadgeCustomColors
