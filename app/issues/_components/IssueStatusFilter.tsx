"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
   { label: "All" },
   { label: "Open", value: "OPEN" },
   { label: "In Progress", value: "IN_PROGRESS" },
   { label: "Done", value: "DONE" },
   { label: "Cancelled", value: "CANCELLED" },
];

const IssueStatusFilter = () => {
   return (
      <Select.Root>
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
