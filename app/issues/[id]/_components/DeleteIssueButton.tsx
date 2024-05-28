"use client";

import { Spinner } from "@/app/components";
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
   const [isDeleting, setDeleting] = useState(false);

   const deleteIssue = async () => {
      setDeleting(true);
      const res = await fetch(`/api/issues/${issueId}`, { method: "DELETE" });

      if (!res.ok) {
         setDeleting(false);
         setError(true);
      } else {
         router.push("/issues/list");
         router.refresh();
      }
   };

   return (
      <>
         <AlertDialog.Root>
            <AlertDialog.Trigger>
               <Button color="red" disabled={isDeleting}>
                  <TrashIcon />
                  Delete
                  {isDeleting && <Spinner />}
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
