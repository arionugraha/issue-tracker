import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { Link } from "@/app/components";
import NextLink from "next/link";
import { IssueActions, IssueStatusBadge } from "@/app/issues/_components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

interface Props {
   searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
   const columns: { label: string; value: keyof Issue; className?: string }[] = [
      { label: "Issue", value: "title" },
      { label: "Status", value: "status", className: "hidden md:table-cell" },
      { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
   ];
   const statuses = Object.values(Status);
   const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
   const orderBy = columns.map((column) => column.value).includes(searchParams.orderBy) ? { [searchParams.orderBy]: "asc" } : undefined;

   const issues = await prisma.issue.findMany({
      where: {
         status,
      },
      orderBy,
   });

   return (
      <>
         <IssueActions />
         <Table.Root variant="surface">
            <Table.Header>
               <Table.Row>
                  {columns.map((column) => (
                     <Table.ColumnHeaderCell key={column.value} justify={"center"} className={column.className}>
                        <NextLink
                           href={{
                              query: { ...searchParams, orderBy: column.value },
                           }}
                        >
                           {column.label}
                        </NextLink>
                        {column.value === searchParams.orderBy && <ArrowUpIcon className="inline" />}
                     </Table.ColumnHeaderCell>
                  ))}
               </Table.Row>
            </Table.Header>
            <Table.Body>
               {issues.map((issue) => (
                  <Table.Row key={issue.id}>
                     <Table.Cell justify={"center"}>
                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                        <div className="block md:hidden">
                           <IssueStatusBadge status={issue.status} />
                        </div>
                     </Table.Cell>
                     <Table.Cell className="hidden md:table-cell" justify={"center"}>
                        <IssueStatusBadge status={issue.status} />
                     </Table.Cell>
                     <Table.Cell className="hidden md:table-cell" justify={"center"}>
                        {issue.createdAt.toDateString()}
                     </Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table.Root>
         <Pagination itemCount={issues.length} pageSize={10} currentPage={parseInt(searchParams.page) || 1} />
      </>
   );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
