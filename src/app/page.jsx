import { prisma } from "@/libs/prisma";
import TaskCard from "@/components/TaskCard";

async function loadTasks() {
  //2. obteniendo de la base de datos
  return await prisma.task.findMany()

  //1. haciendo una peticion HTTP /api/tasks
  // const res = await fetch("http://localhost:3000/api/tasks")
  // const data = await res.json()
  // console.log(data)
}

// export const revalidate = 60;
export const dynamic = 'force-dynamic'

async function HomePage() {
  const tasks = await loadTasks()

  return (
    <section className="container mx-auto my-10">
      <div className="grid grid-cols-3 gap-3">
        {tasks.map(task => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </section>
  )
}

export default HomePage;
