"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";

interface IssueForm {
   title: string;
   description: string;
}

const NewIssuePage = () => {
   const router = useRouter();
   const { register, control, handleSubmit } = useForm<IssueForm>();
   const [error, setError] = useState("");

   async function postIssue(data: IssueForm) {
      const res = await fetch("/api/issues", {
         method: "POST",
         body: JSON.stringify(data),
         headers: {
            "Content-Type": "application/json",
         },
      });
      if (!res.ok) {
         setError("An unexpected error occurred.");
         console.log(res);
      } else {
         router.push("/issues");
      }
   }

   return (
      <div className="max-w-xl ">
         {error && (
            <Callout.Root className="mb-5" color="red">
               <Callout.Icon>
                  <AiOutlineWarning size={18} />
               </Callout.Icon>
               <Callout.Text>
                  <strong>{error}</strong>
               </Callout.Text>
            </Callout.Root>
         )}
         <form className="space-y-3" onSubmit={handleSubmit(postIssue)}>
            <TextField.Root>
               <TextField.Input placeholder="Title" {...register("title")} />
            </TextField.Root>
            <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
            <Button>Submit</Button>
         </form>
      </div>
   );
};

export default NewIssuePage;
