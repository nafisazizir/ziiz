import {
  Nav,
  NavGroup,
  NavGroupLabel,
  NavItem,
  NavLink,
  NavList,
} from "@/components/ui/nav"

export default function NavSize() {
  return (
    <Nav size="lg" aria-label="Docs" className="w-72">
      <NavGroup>
        <NavGroupLabel>Foundation</NavGroupLabel>
        <NavList>
          {["Colors", "Typography", "Materials"].map((item) => (
            <NavItem key={item}>
              <NavLink href="#" active={item === "Typography"}>
                {item}
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </NavGroup>
    </Nav>
  )
}
