"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, set } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import z from "zod";
import FormError from "@/app/components/FormError";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
   const router = useRouter();
   const {
      register,
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });
   const [error, setError] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   async function postIssue(data: IssueForm) {
      setIsSubmitting(true);
      const res = await fetch("/api/issues", {
         method: "POST",
         body: JSON.stringify(data),
         headers: {
            "Content-Type": "application/json",
         },
      });
      if (!res.ok) {
         setIsSubmitting(false);
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
            <FormError>{errors.title?.message}</FormError>
            <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
            <FormError>{errors.description?.message}</FormError>
            <Button disabled={isSubmitting}>Submit {isSubmitting && <Spinner />}</Button>
         </form>
      </div>
   );
};

export default NewIssuePage;
