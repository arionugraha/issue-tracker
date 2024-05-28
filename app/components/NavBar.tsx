"use client";

import { Avatar, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsFillBugFill } from "react-icons/bs";
import { Spinner } from ".";

const NavBar = () => {
   return (
      <nav className="border-b px-5 py-3 mb-3">
         <Flex justify={"between"} align={"center"}>
            <Flex align={"center"} gap={"5"}>
               <Link href={"/"} className="hover:scale-105 text-zinc-900">
                  <BsFillBugFill size={25} />
               </Link>
               <NavLinks />
            </Flex>
            <AuthStatus />
         </Flex>
      </nav>
   );
};

const NavLinks = () => {
   const currentPath = usePathname();

   const links = [
      { label: "Dashboard", href: "/" },
      { label: "Issues", href: "/issues/list" },
   ];

   return (
      <ul className="flex space-x-5">
         {links.map((link) => (
            <li key={link.href}>
               <Link
                  href={link.href}
                  className={classNames({
                     "nav-link": true,
                     "!text-zinc-900": link.href === currentPath,
                  })}
               >
                  {link.label}
               </Link>
            </li>
         ))}
      </ul>
   );
};

const AuthStatus = () => {
   const { status, data: session } = useSession();

   if (status === "loading") {
      return <Spinner />;
   }

   if (status === "unauthenticated") {
      return (
         <Link href={"/api/auth/signin"} className="nav-link">
            Log In
         </Link>
      );
   }

   return (
      <DropdownMenu.Root>
         <DropdownMenu.Trigger>
            <Avatar src={session!.user!.image!} fallback={"?"} size={"3"} radius={"full"} className="cursor-pointer" referrerPolicy="no-referrer" />
         </DropdownMenu.Trigger>
         <DropdownMenu.Content>
            <DropdownMenu.Label>
               <Text size={"2"}>{session!.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
               <Link href={"/api/auth/signout"}>Log Out</Link>
            </DropdownMenu.Item>
         </DropdownMenu.Content>
      </DropdownMenu.Root>
   );
};

export default NavBar;
