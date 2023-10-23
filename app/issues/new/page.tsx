import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/components/issues/IssueForm"), { ssr: false, loading: () => <IssueFormSkeleton /> });

const NewIssuePage = () => {
   return <IssueForm />;
};

export default NewIssuePage;
