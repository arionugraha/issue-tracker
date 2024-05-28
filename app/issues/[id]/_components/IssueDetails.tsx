import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";
import { Issue } from "@prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

interface Props {
   issue: Issue;
}

const IssueDetails = ({ issue }: Props) => {
   return (
      <>
         <Heading>{issue.title}</Heading>
         <Flex my={"2"} gap={"3"}>
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
         </Flex>
         <Card className="prose max-w-full" my={"4"}>
            <Markdown>{issue.description}</Markdown>
         </Card>
      </>
   );
};

export default IssueDetails;
