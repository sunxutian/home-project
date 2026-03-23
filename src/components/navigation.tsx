import React from "react";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tasks", label: "Tasks" },
  { href: "/house", label: "House" },
  { href: "/records", label: "Records" },
  { href: "/settings", label: "Settings" }
];

export function Navigation() {
  return (
    <nav aria-label="Primary">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
