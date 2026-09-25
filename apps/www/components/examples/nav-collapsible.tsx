import {
  Nav,
  NavCollapsible,
  NavCollapsibleContent,
  NavCollapsibleTrigger,
  NavItem,
  NavLink,
  NavList,
  NavSub,
  NavSubItem,
} from "@/components/ui/nav"

const sections = [
  { title: "Introduction" },
  { title: "Basics", items: ["Overview", "Why X", "Getting started"] },
  {
    title: "Advertising",
    items: ["Overview", "Best practices", "Measurement"],
  },
  { title: "Resources" },
]

export default function NavCollapsibleExample() {
  return (
    <Nav aria-label="Sections" className="w-56">
      <NavList>
        {sections.map((section) =>
          section.items ? (
            <NavCollapsible
              key={section.title}
              defaultOpen={section.title === "Advertising"}
            >
              <NavCollapsibleTrigger>{section.title}</NavCollapsibleTrigger>
              <NavCollapsibleContent>
                <NavSub>
                  {section.items.map((item) => (
                    <NavSubItem key={item}>
                      <NavLink href="#" active={item === "Best practices"}>
                        {item}
                      </NavLink>
                    </NavSubItem>
                  ))}
                </NavSub>
              </NavCollapsibleContent>
            </NavCollapsible>
          ) : (
            <NavItem key={section.title}>
              <NavLink href="#">{section.title}</NavLink>
            </NavItem>
          )
        )}
      </NavList>
    </Nav>
  )
}
