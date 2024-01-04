import React from "react";
import AnimatedTextWord from "./AnimatedTextWord";
import FileUpload from "./FileUpload"

export default function Title () {
    return (
        <div className="h-fit p-10 mx-auto flex flex-col gap-11 items-center justify-center">
            <AnimatedTextWord text="biosense" />
            <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>How does it work?</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>
            <FileUpload />
        </div>
    )
}