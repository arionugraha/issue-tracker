import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
   params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props): Promise<NextResponse> {
   const body = await request.json();
   const validation = issueSchema.safeParse(body);

   if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
   }

   const existingIssue = await prisma.issue.findUnique({
      where: { id: Number(params.id) },
   });

   if (!existingIssue) {
      return NextResponse.json({ message: "Issue not found." }, { status: 404 });
   }

   const updatedIssue = await prisma.issue.update({
      where: { id: Number(params.id) },
      data: {
         title: body.title,
         description: body.description,
      },
   });

   return NextResponse.json(updatedIssue, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: Props): Promise<NextResponse> {
   const existingIssue = await prisma.issue.findUnique({
      where: { id: Number(params.id) },
   });

   if (!existingIssue) {
      return NextResponse.json({ message: "Issue not found."}, { status: 404 });
   }

   await prisma.issue.delete({
      where: { id: Number(params.id) },
   });
   
   return NextResponse.json({ message: "Issue deleted." }, { status: 200 });
}
