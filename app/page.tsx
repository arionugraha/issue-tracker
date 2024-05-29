import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Issue Tracker - Dashboard",
   description: "View project issues summary.",
};

export default async function Home() {
   const open = await prisma.issue.count({ where: { status: "OPEN" } });
   const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });
   const done = await prisma.issue.count({ where: { status: "DONE" } });

   return (
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
         <Flex direction="column" gap="5">
            <IssueSummary open={open} inProgress={inProgress} done={done} />
            <IssueChart open={open} inProgress={inProgress} done={done} />
         </Flex>
         <LatestIssues />
      </Grid>
   );
}
