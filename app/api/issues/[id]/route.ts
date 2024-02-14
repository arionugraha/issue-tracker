import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

interface Props {
   params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props): Promise<NextResponse> {
   const session = await getServerSession(authOptions);

   // if (!session) {
   //    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   // }

   const body = await request.json();
   const validation = patchIssueSchema.safeParse(body);

   if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
   }

   const { title, description, assigneeId } = body;
   if (assigneeId) {
      const user = await prisma.user.findUnique({
         where: { id: assigneeId },
      });

      if (!user) {
         return NextResponse.json({ message: "Invalid user." }, { status: 400 });
      }
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
         title,
         description,
         assigneeId,
      },
   });

   return NextResponse.json(updatedIssue, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: Props): Promise<NextResponse> {
   const session = await getServerSession(authOptions);

   if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   const existingIssue = await prisma.issue.findUnique({
      where: { id: Number(params.id) },
   });

   if (!existingIssue) {
      return NextResponse.json({ message: "Issue not found." }, { status: 404 });
   }

   await prisma.issue.delete({
      where: { id: Number(params.id) },
   });

   return NextResponse.json({ message: "Issue deleted." }, { status: 200 });
}
