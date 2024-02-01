import { DeleteIssueButton, EditIssueButton, IssueDetails } from "@/app/issues/_components";
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
      <Grid columns={{ initial: "1", sm: "8" }} gap={"4"}>
         <Box className={"md:col-span-8"}>
            <IssueDetails issue={issue} />
         </Box>
         <Box>
            <Flex direction={"column"} gap={"2"}>
               <EditIssueButton issueId={issue.id} />
               <DeleteIssueButton issueId={issue.id} />
            </Flex>
         </Box>
      </Grid>
   );
};

export default IssueDetailPage;
