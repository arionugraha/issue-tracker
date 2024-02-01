import { Table } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";
import { IssueActionButton } from "@/app/issues/_components";

const LoadingIssuesPage = () => {
   const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

   return (
      <>
         <IssueActionButton action="New Issue" />
         <Table.Root variant="surface">
            <Table.Header>
               <Table.Row>
                  <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
               </Table.Row>
            </Table.Header>
            <Table.Body>
               {issues.map((issue) => (
                  <Table.Row key={issue}>
                     <Table.Cell>
                        <Skeleton />
                        <div className="block md:hidden">
                           <Skeleton />
                        </div>
                     </Table.Cell>
                     <Table.Cell className="hidden md:table-cell">
                        <Skeleton />
                     </Table.Cell>
                     <Table.Cell className="hidden md:table-cell">
                        <Skeleton />
                     </Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table.Root>
      </>
   );
};

export default LoadingIssuesPage;
