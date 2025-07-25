"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Llamada a tu API para crear una nueva nota
        await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
        });

        // Después de crear la nota, vuelve a la página principal
        router.push("/");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
            <h1 className="text-xl font-bold mb-4">Crear nueva nota</h1>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border p-2 w-full rounded"
            />
            <textarea
                placeholder="Contenido"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border p-2 w-full rounded"
                rows={5}
            ></textarea>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Guardar
            </button>
        </form>
    );
}
