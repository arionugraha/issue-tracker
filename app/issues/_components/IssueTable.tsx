import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { Link } from "@/app/components";

const columns: { label: string; value: keyof Issue; className?: string }[] = [
   { label: "Issue", value: "title" },
   { label: "Status", value: "status", className: "hidden md:table-cell" },
   { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export interface IssuePageQuery {
   status: Status;
   orderBy: keyof Issue;
   page: string;
}

interface Props {
   searchParams: IssuePageQuery;
   issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
   return (
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
   );
};

export default IssueTable;
