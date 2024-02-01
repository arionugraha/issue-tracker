import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
   status: Status;
}

const statusMap: Record<Status, { label: string; color: "red" | "yellow" | "green" }> = {
   OPEN: { label: "OPEN", color: "red" },
   IN_PROGRESS: { label: "IN PROGRESS", color: "yellow" },
   DONE: { label: "CLOSED", color: "green" },
};

const IssueStatusBadge = ({ status }: Props) => {
   return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>;
};

export default IssueStatusBadge;
