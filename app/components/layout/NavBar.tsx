import Link from "next/link";
import React from "react";
import { BsFillBugFill } from "react-icons/bs";

const NavBar = () => {
   const links = [
      { label: "Dashboard", href: "/" },
      { label: "Issues", href: "/issues" },
   ];

   return (
      <nav className="flex justify-between items-center px-5 h-14 border-b mb-3">
         <Link href={"/"} className="hover:scale-105">
            <BsFillBugFill size={30} />
         </Link>
         <ul className="flex space-x-5">
            {links.map((link) => (
               <Link key={link.href} href={link.href} className="text-zinc-500 hover:text-zinc-800 transition-colors">
                  {link.label}
               </Link>
            ))}
         </ul>
      </nav>
   );
};

export default NavBar;
