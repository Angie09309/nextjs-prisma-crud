import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    console.log("Tareas obtenidas:", tasks);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return NextResponse.json(
      { message: "Error al obtener tareas", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, description } = await request.json();

    if (!title || title.trim() === "") {
      console.error("Error: El título es obligatorio.");
      return NextResponse.json(
        { message: "El título de la tarea es obligatorio." },
        { status: 400 }
      );
    }

    const newTasks = await prisma.task.create({
      data: {
        title: title,
        description: description || null,
      },
    });

    console.log("Nueva tarea creada exitosamente:", newTasks);

    return NextResponse.json(newTasks, { status: 201 });
  } catch (error) {
    console.error("Error al crear la tarea en el servidor:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          message: "Ya existe una tarea con este título.",
          error: error.message,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: "Error interno del servidor al crear la tarea.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
