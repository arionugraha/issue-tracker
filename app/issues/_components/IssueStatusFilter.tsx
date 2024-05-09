"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
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
   const searchParams = useSearchParams();

   return (
      <Select.Root
         defaultValue={searchParams.get("status") || "all"}
         onValueChange={(status) => {
            const params = new URLSearchParams();

            if (status && status !== "all") {
               params.append("status", status);
            }

            if (searchParams.has("orderBy")) {
               params.append("orderBy", searchParams.get("orderBy")!);
            }

            const query = params.toString() ? `?${params.toString()}` : "";
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
