"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsFillBugFill } from "react-icons/bs";

const NavBar = () => {
   const currentPath = usePathname();

   const links = [
      { label: "Dashboard", href: "/" },
      { label: "Issues", href: "/issues/list" },
   ];

   return (
      <nav className="flex justify-between items-center px-5 h-14 border-b mb-3">
         <Link href={"/"} className="hover:scale-105 text-zinc-900">
            <BsFillBugFill size={30} />
         </Link>
         <ul className="flex space-x-5">
            {links.map((link) => (
               <Link
                  key={link.href}
                  href={link.href}
                  className={classNames({
                     "text-zinc-900": link.href === currentPath,
                     "text-zinc-500": link.href !== currentPath,
                     "hover:text-zinc-900 transition-colors": true,
                  })}
               >
                  {link.label}
               </Link>
            ))}
         </ul>
      </nav>
   );
};

export default NavBar;
