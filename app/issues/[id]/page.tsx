import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

interface Props {
   params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
   const issue = await prisma.issue.findUnique({
      where: { id: Number(params.id) },
   });

   if (!issue) notFound();

   return (
      <>
         <Heading>{issue.title}</Heading>
         <Flex my={"2"} gap={"3"}>
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
         </Flex>
         <Card className="prose" my={"4"}>
            <Markdown>{issue.description}</Markdown>
         </Card>
      </>
   );
};

export default IssueDetailPage;
