"use client";

import { Box, Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsFillBugFill } from "react-icons/bs";

const NavBar = () => {
   const currentPath = usePathname();
   const { status, data: session } = useSession();

   const links = [
      { label: "Dashboard", href: "/" },
      { label: "Issues", href: "/issues/list" },
   ];

   return (
      <nav className="border-b px-5 py-3 h-14 mb-3">
            <Flex justify={"between"} align={"center"}>
               <Flex align={"center"} gap={"5"}>
                  <Link href={"/"} className="hover:scale-105 text-zinc-900">
                     <BsFillBugFill size={30} />
                  </Link>
                  <ul className="flex space-x-5">
                     {links.map((link) => (
                        <li key={link.href}>
                           <Link
                              href={link.href}
                              className={classNames({
                                 "text-zinc-900": link.href === currentPath,
                                 "text-zinc-500": link.href !== currentPath,
                                 "hover:text-zinc-900 transition-colors": true,
                              })}
                           >
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </Flex>
               <Box>
                  {status === "unauthenticated" && (<Link href={"/api/auth/signin"}>Log In</Link>)}
                  {status === "authenticated" && (<Link href={"/api/auth/signout"}>Log Out</Link>)}
               </Box>
            </Flex>
      </nav>
   );
};

export default NavBar;
