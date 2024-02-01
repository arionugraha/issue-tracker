"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
   issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
   const router = useRouter();
   const [error, setError] = useState(false);

   const deleteIssue = async () => {
      const res = await fetch(`/api/issues/${issueId}`, { method: "DELETE" });

      if (!res.ok) {
         setError(true);
      } else {
         router.push("/issues");
         router.refresh();
      }
   };

   return (
      <>
         <AlertDialog.Root>
            <AlertDialog.Trigger>
               <Button color="red">
                  <TrashIcon />
                  Delete
               </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
               <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
               <AlertDialog.Description>Are you sure you want to delete this issue?</AlertDialog.Description>
               <Flex mt={"4"} gap={"3"}>
                  <AlertDialog.Cancel>
                     <Button color="gray" variant="soft">
                        Cancel
                     </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                     <Button color="red" onClick={deleteIssue}>Delete</Button>
                  </AlertDialog.Action>
               </Flex>
            </AlertDialog.Content>
         </AlertDialog.Root>
         <AlertDialog.Root open={error}>
            <AlertDialog.Content>
               <AlertDialog.Title>Error</AlertDialog.Title>
               <AlertDialog.Description>An unexpected error occurred.</AlertDialog.Description>
               <Button color="gray" variant="soft" mt="2" onClick={() => setError(false)}>OK</Button>
            </AlertDialog.Content>
         </AlertDialog.Root>
      </>
   );
};

export default DeleteIssueButton;
