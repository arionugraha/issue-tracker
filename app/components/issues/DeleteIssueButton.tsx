"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

interface Props {
   issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
   return (
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
                  <Button color="red">Delete</Button>
               </AlertDialog.Action>
            </Flex>
         </AlertDialog.Content>
      </AlertDialog.Root>
   );
};

export default DeleteIssueButton;
