"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
   const [users, setUsers] = useState<User[]>([]);

   useEffect(() => {
      const fetchUser = async () => {
         const response = await fetch("/api/users");
         const data = await response.json();
         setUsers(data);
      };

      fetchUser();
   });

   return (
      <Select.Root>
         <Select.Trigger placeholder="Assign to ..." />
         <Select.Content>
            <Select.Group>
               <Select.Label>Suggestions</Select.Label>
               {users.map((user) => (
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
