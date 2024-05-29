import authOptions from "@/app/api/auth/authOptions";
import { AssigneeSelect, DeleteIssueButton, EditIssueButton, IssueDetails } from "@/app/issues/[id]/_components";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface Props {
   params: { id: string };
}

export async function generateMetadata({ params }: Props) {
   const issue = await prisma.issue.findUnique({ where: { id: Number(params.id) } });

   return {
      title: issue?.title,
      description: `Details of issue ${issue?.id}`,
   };
}

const IssueDetailPage = async ({ params }: Props) => {
   const session = await getServerSession(authOptions);

   const issue = await prisma.issue.findUnique({
      where: { id: Number(params.id) },
   });

   if (!issue) notFound();

   return (
      <Grid columns={{ initial: "1", sm: "8" }} gap={"4"}>
         <Box className={"md:col-span-8"}>
            <IssueDetails issue={issue} />
         </Box>
         {session && (
            <Box>
               <Flex direction={"column"} gap={"2"}>
                  <AssigneeSelect issue={issue} />
                  <EditIssueButton issueId={issue.id} />
                  <DeleteIssueButton issueId={issue.id} />
               </Flex>
            </Box>
         )}
      </Grid>
   );
};

export default IssueDetailPage;
