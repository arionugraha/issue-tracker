import { DeleteIssueButton, EditIssueButton, IssueDetails } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface Props {
   params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
   const issue = await prisma.issue.findUnique({
      where: { id: Number(params.id) },
   });

   if (!issue) notFound();

   return (
      <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
         <Box className="lg:col-span-4">
            <IssueDetails issue={issue} />
         </Box>
         <Box>
            <Flex direction={"column"} gap={"4"}>
               <EditIssueButton issueId={issue.id} />
               <DeleteIssueButton issueId={issue.id} />
            </Flex>
         </Box>
      </Grid>
   );
};

export default IssueDetailPage;
