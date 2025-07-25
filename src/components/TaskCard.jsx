"use client"
import { useRouter } from "next/navigation"

export default function TaskCard({ task }) {
    const router = useRouter()

    return (
        <div className="bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer rounded-xl"
            onClick={() => {
                router.push("/tasks/edit/" + task.id)
            }}
        >
            <h3 className="font-bold text-xl mb-2">{task.title}</h3>
            <p className="text-sm">{task.description}</p>
            <p className="text-sm">{new Date(task.createdAt).toLocaleDateString()}</p>
        </div>
    )
}

