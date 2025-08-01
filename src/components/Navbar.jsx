import Link from "next/link"

function Navbar() {
    return (
        <nav className="bg-slate-900">
            <div className="container mx-auto flex justify-between items-center py-3 px-6">
                <Link href={"/"}>
                    <h3 className="font-bold text-3xl">
                        NEXTCRUD
                    </h3>
                </Link>

                <ul className="flex gap-x-2 text-lg font-bold">
                    <li>
                        <Link href={"/"} className="text-slate- hover:text-slate-200" >
                            Tasks
                        </Link>
                    </li>
                    <li>
                        <Link href={"/new"} className="text-slate- hover:text-slate-200">
                            New
                        </Link>
                    </li>
                    <li className="text-slate- hover:text-slate-200">
                        <Link href={"/about"}>
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </nav >
    )
}

export default Navbar