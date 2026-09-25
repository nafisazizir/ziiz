import { Button } from "@/components/ui/button"
import {
  Nav,
  NavContent,
  NavFooter,
  NavHeader,
  NavItem,
  NavLink,
  NavList,
} from "@/components/ui/nav"

const pages = [
  "Overview",
  "Deployments",
  "Analytics",
  "Logs",
  "Storage",
  "Domains",
  "Integrations",
  "Usage",
  "Settings",
]

export default function NavRail() {
  return (
    <div className="h-96 w-60 rounded-md border border-gray-alpha-400">
      <Nav aria-label="Project" className="h-full gap-4 p-4">
        <NavHeader>
          <span className="px-2.5 text-heading-16 text-gray-1000">Acme</span>
        </NavHeader>
        <NavContent>
          <NavList>
            {pages.map((page) => (
              <NavItem key={page}>
                <NavLink href="#" active={page === "Overview"}>
                  {page}
                </NavLink>
              </NavItem>
            ))}
          </NavList>
        </NavContent>
        <NavFooter>
          <Button shape="rounded" variant="outline" size="sm" className="w-fit">
            Sign In
          </Button>
        </NavFooter>
      </Nav>
    </div>
  )
}
