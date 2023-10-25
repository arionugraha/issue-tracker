import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
   issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
   return (
      <Button color="red">
         <TrashIcon />
         <Link href={`/issues/${issueId}/delete`}>Delete</Link>
      </Button>
   );
};

export default DeleteIssueButton;
