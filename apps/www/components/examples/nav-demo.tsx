import {
  Nav,
  NavGroup,
  NavGroupLabel,
  NavItem,
  NavLink,
  NavList,
} from "@/components/ui/nav"

const groups = [
  {
    label: "Getting started",
    items: ["Introduction", "Installation", "Theming"],
  },
  {
    label: "Components",
    items: ["Button", "Input", "Nav", "Select"],
  },
]

export default function NavDemo() {
  return (
    <Nav aria-label="Docs" className="w-56">
      {groups.map((group) => (
        <NavGroup key={group.label}>
          <NavGroupLabel>{group.label}</NavGroupLabel>
          <NavList>
            {group.items.map((item) => (
              <NavItem key={item}>
                <NavLink href="#" active={item === "Nav"}>
                  {item}
                </NavLink>
              </NavItem>
            ))}
          </NavList>
        </NavGroup>
      ))}
    </Nav>
  )
}
