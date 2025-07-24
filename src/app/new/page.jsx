"use client"
import { useRouter } from "next/navigation"

function NewPage() {
  const router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value

    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()
    console.log(data)

    router.push("/")
  }

  return (
    <div className=" h-screen flex justify-center items-center">
      <form className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2"
        onSubmit={onSubmit}>

        <label htmlFor="title" className="font-bold text-sm">Título De La Tarea</label>
        <input type="text" id="title" className="border border-gray-400 p-2 mb-4 w-full text-white"
          placeholder="Título" />

        <label htmlFor="description" className="font-bold text-sm">Descripcion De La Tarea</label>
        <textarea rows="3" id="description" className="border border-gray-400 p-2 mb-4 w-full  text-white"
          placeholder="Describe tu tarea"></textarea>

        <button className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 ounded">
          Crear
        </button>
      </form>
    </div>
  )
}

export default NewPage