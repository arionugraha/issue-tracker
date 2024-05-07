"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
   { label: "All" },
   { label: "Open", value: "OPEN" },
   { label: "In Progress", value: "IN_PROGRESS" },
   { label: "Done", value: "DONE" },
   { label: "Cancelled", value: "CANCELLED" },
];

const IssueStatusFilter = () => {
   const router = useRouter();

   return (
      <Select.Root
         onValueChange={(status) => {
            let query;
            if (status !== "all") {
               query = `?status=${status}`;
            } else {
               query = "";
            }

            router.push("/issues/list" + query);
         }}
      >
         <Select.Trigger placeholder="Filter by status" />
         <Select.Content>
            <Select.Group>
               <Select.Label>Statuses</Select.Label>
               {statuses.map((status, index) => (
                  <Select.Item key={index} value={status.value || "all"}>
                     {status.label}
                  </Select.Item>
               ))}
            </Select.Group>
         </Select.Content>
      </Select.Root>
   );
};

export default IssueStatusFilter;
