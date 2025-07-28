"use client";

import React from 'react'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const EditForm = ({ id }) => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const getDefaultData = async () => {
        if (id) {
            fetch(`/api/tasks/${id}`)
                .then(res => res.json())
                .then(data => {
                    setTitle(data.title)
                    setDescription(data.description)
                })
        }
    }

    useEffect(() => {
        getDefaultData()
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()

        if (id) {
            const res = await fetch(`/api/tasks/${id}`, {
                method: "PUT",
                body: JSON.stringify({ title, description }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json();

            console.log(data)
        } else {
            const res = await fetch("/api/tasks", {
                method: "POST",
                body: JSON.stringify({ title, description }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json()
        }
        router.refresh()
        router.push("/")
    }

    return (

        <form className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2"
            onSubmit={onSubmit}>
            <h1 className="text-xl font-bold mb-4  text-center">Edición De La Tarea</h1>
            <label htmlFor="title" className="font-bold text-sm">Edita La Tarea</label>
            <input type="text" id="title" className="border border-gray-400 p-2 mb-4 w-full text-white"
                placeholder="Título"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label htmlFor="description" className="font-bold text-sm">Editar La Descripcion</label>
            <textarea rows="3" id="description" className="border border-gray-400 p-2 mb-4 w-full  text-white"
                placeholder="Describe tu tarea"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            ></textarea>

            <div className='flex justify-between gap-2'>
                <button type='submit'
                    className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-1 px-2 rounded-lg shadow-md transition-transform hover:scale-105">
                    Guardar Edición
                </button>

                {
                    id && (
                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg shadow-md transition-transform hover:scale-105'
                            type='button'
                            onClick={async () => {
                                const res = await fetch(`/api/tasks/${id}`, {
                                    method: "DELETE"
                                })
                                const data = await res.json()
                                router.refresh()
                                router.push("/")
                            }}>

                            Delete
                        </button>
                    )
                }
            </div>

        </form>
    )
}
