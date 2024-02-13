"use client";

import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
   const {
      data: users,
      error,
      isLoading,
   } = useQuery<User[]>({
      queryKey: ["users"],
      queryFn: async () => {
         const response = await fetch("/api/users");
         return response.json();
      },
      staleTime: 60 * 1000,
      retry: 3,
   });

   if (isLoading) return <Skeleton />;

   if (error) return null;

   return (
      <Select.Root>
         <Select.Trigger placeholder="Assign to ..." />
         <Select.Content>
            <Select.Group>
               <Select.Label>Suggestions</Select.Label>
               {users?.map((user) => (
                  <Select.Item value={user.id} key={user.id}>
                     {user.name}
                  </Select.Item>
               ))}
            </Select.Group>
         </Select.Content>
      </Select.Root>
   );
};

export default AssigneeSelect;
