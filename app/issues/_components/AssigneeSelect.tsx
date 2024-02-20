"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

interface Props {
   issue: Issue;
}

const AssigneeSelect = ({ issue }: Props) => {
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
      <>
         <Select.Root
            defaultValue={issue.assigneeId || "empty"}
            onValueChange={async (userId) => {
               let assigneeId: string | null;

               if (userId === "empty") {
                  assigneeId = null;
               } else {
                  assigneeId = userId;
               }

               try {
                  await fetch(`/api/issues/${issue.id}/`, {
                     method: "PATCH",
                     headers: {
                        "Content-Type": "application/json",
                     },
                     body: JSON.stringify({ assigneeId }),
                  });
               } catch {
                  toast.error("Failed to save changes.");
               }
            }}
         >
            <Select.Trigger placeholder="Assign to ..." />
            <Select.Content>
               <Select.Group>
                  <Select.Label>Suggestions</Select.Label>
                  <Select.Item value="empty">Unassigned</Select.Item>
                  {users?.map((user) => (
                     <Select.Item value={user.id} key={user.id}>
                        {user.name}
                     </Select.Item>
                  ))}
               </Select.Group>
            </Select.Content>
         </Select.Root>
         <Toaster />
      </>
   );
};

export default AssigneeSelect;
