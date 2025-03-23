"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, text }: { href: string; text: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative text-lg py-1 transition-colors hover:text-neon-light-blue ${
        isActive ? `font-medium  text-neon-light-blue` : ""
      }`}
    >
      {text}
      {isActive && (
        <span
          className={`absolute bottom-0 left-0 w-full h-[2px] bg-neon-light-blue`}
        />
      )}
    </Link>
  );
}
