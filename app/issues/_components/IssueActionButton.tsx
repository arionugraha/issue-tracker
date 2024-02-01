import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
   action: string;
}

const IssueActionButton = ({ action }: Props) => {
   return (
      <div className="mb-5">
         <Link href={"/issues/new"}>
            <Button>
               {action}
            </Button>
         </Link>
      </div>
   );
};

export default IssueActionButton;
