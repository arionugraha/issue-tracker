import { Flex } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

export default async function Home() {
   const open = await prisma.issue.count({ where: { status: "OPEN" } });
   const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });
   const done = await prisma.issue.count({ where: { status: "DONE" } });

   return (
      <Flex direction="column" gap="5" align="stretch">
         <LatestIssues />
         <IssueSummary open={open} inProgress={inProgress} done={done} />
      </Flex>
   );
}
