"use client"

import * as React from "react"

import { Nav, NavItem, NavLink, NavList } from "@/components/ui/nav"

const filters = [
  "All",
  "Best practices",
  "Inspiration",
  "Product updates",
  "Solutions",
  "Trends & insights",
]

export default function NavMarker() {
  const [current, setCurrent] = React.useState("All")

  return (
    <Nav aria-label="Categories" className="w-56">
      <NavList marker>
        {filters.map((filter) => (
          <NavItem key={filter}>
            <NavLink
              active={filter === current}
              render={<button type="button" />}
              onClick={() => setCurrent(filter)}
            >
              {filter}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  )
}
