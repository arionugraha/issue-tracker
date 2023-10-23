"use client";

import { FormError, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";
import z from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
   issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
   const router = useRouter();
   const {
      register,
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<IssueFormData>({ resolver: zodResolver(issueSchema) });
   const [error, setError] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   async function postIssue(data: IssueFormData) {
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
         router.refresh();
      }
   }

   return (
      <Box className="max-w-xl">
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
               <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register("title")} />
            </TextField.Root>
            <FormError>{errors.title?.message}</FormError>
            <Controller
               name="description"
               control={control}
               defaultValue={issue?.description}
               render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
            />
            <FormError>{errors.description?.message}</FormError>
            <Button disabled={isSubmitting}>Submit {isSubmitting && <Spinner />}</Button>
         </form>
      </Box>
   );
};

export default IssueForm;
