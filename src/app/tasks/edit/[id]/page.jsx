import { EditForm } from "@/components/EditForm";

async function EditPage({ params }) {
    const { id } = await params
    return (
        <div className=" h-screen flex justify-center items-center">
            <EditForm id={id} />
        </div>
    )
}

export default EditPage