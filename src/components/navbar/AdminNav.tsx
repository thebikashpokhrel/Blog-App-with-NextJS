"use client";
import Link from "next/link";
import React, { ComponentProps, ReactElement } from "react";
import { adminLinks } from "@/components/navbar/adminLinks";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const activeClass = pathname == props.href ? "text-primary" : "";
  return (
    <Link
      {...props}
      className={cn(
        "text-muted-foreground hover:text-primary p-4 transition-all",
        activeClass
      )}
    ></Link>
  );
}

export default function AdminNav() {
  return (
    <nav className="w-full flex justify-center">
      {adminLinks.map((link) => (
        <NavLink key={link.title} href={link.href}>
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
}
