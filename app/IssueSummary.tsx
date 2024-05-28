import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import NextLink from "next/link";

interface Props {
   open: number;
   inProgress: number;
   done: number;
}

const IssueSummary = ({ open, inProgress, done }: Props) => {
   const containers: { label: string; value: number; status: Status }[] = [
      { label: "Open Issues", value: open, status: "OPEN" },
      { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
      { label: "Done Issues", value: done, status: "DONE" },
   ];

   return (
      <Flex gap="4">
         {containers.map((container) => (
            <Card key={container.label}>
               <Flex direction="column" gap="1" align="center">
                  <NextLink href={`/issues/list?status=${container.status}`} className="text-sm font-medium">
                     {container.label}
                  </NextLink>
                  <Text size="8" className="font-bold">
                     {container.value}
                  </Text>
               </Flex>
            </Card>
         ))}
      </Flex>
   );
};

export default IssueSummary;
