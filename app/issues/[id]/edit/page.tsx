import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/components/issues/IssueForm"), { ssr: false, loading: () => <IssueFormSkeleton /> });

interface Props {
   params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
   const issue = await prisma.issue.findUnique({
      where: { id: Number(params.id) },
   });

   if (!issue) notFound();

   return <IssueForm issue={issue} />;
};

export default EditIssuePage;
