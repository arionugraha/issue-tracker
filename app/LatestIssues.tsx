import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import Link from "next/link";
import IssueStatusBadge from "./components/IssueStatusBadge";
import { TriangleUpIcon } from "@radix-ui/react-icons";

const LatestIssues = async () => {
   const issues = await prisma.issue.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { assignee: true },
   });

   return (
      <Card>
         <Heading size="4" mb="5">
            Latest Issues
         </Heading>
         <Table.Root>
            <Table.Body>
               {issues.map((issue) => (
                  <Table.Row key={issue.id}>
                     <Table.Cell>
                        <Flex justify={"between"}>
                           <Flex direction={"column"} align={"start"} gap={"2"}>
                              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                              <IssueStatusBadge status={issue.status} />
                           </Flex>
                           {issue.assigneeId && <Avatar src={issue.assignee?.image!} fallback="?" radius="full" size="2" />}
                        </Flex>
                     </Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table.Root>
      </Card>
   );
};

export default LatestIssues;
