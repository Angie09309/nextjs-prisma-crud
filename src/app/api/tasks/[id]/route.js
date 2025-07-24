import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const resolvedParams = await params;

  const task = await prisma.task.findUnique({
    where: {
      id: Number(resolvedParams.id),
    },
  });
  return NextResponse.json(task);
}

export async function PUT(request, { params }) {
  const resolvedParams = await params;

  const data = await request.json();
  const taskUpdated = await prisma.task.update({
    where: {
      id: Number(resolvedParams.id),
    },
    data: data,
  });

  return NextResponse.json(taskUpdated);
}

export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;

    const taskRemoved = await prisma.task.delete({
      where: {
        id: Number(resolvedParams.id),
      },
    });

    return NextResponse.json(taskRemoved);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
