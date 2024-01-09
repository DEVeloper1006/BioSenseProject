import React, { useState } from "react";
import FileUpload from "./FileUpload"
import Hero from "./Hero";

export default function Body () {
    const [previewSource, setPreviewSource] = useState("");

    return (
        <>
            <div className="h-full p-10 mx-auto flex flex-col gap-11 items-center justify-center">
                <Hero />
                <div className="parent w-full flex flex-wrap p-4">
                    <div className="w-1/2 flex flex-col items-center justify-center gap-3">
                        <FileUpload image={previewSource} setImage={setPreviewSource}/>
                        <button className="btn w-full rounded-lg hover:scale-105" onClick={() => sendData(previewSource)}>Submit Image</button>
                    </div>
                    <div className="w-1/2 results text-center flex flex-col gap-40">
                        <h2 className="font-semibold text-2xl">Test Results</h2>
                        <h3 className="text-3xl test-results"></h3>
                    </div>
                </div>
            </div>
        </>
    )
}

async function sendData(img) {
    if (!img) alert("Please input an image.")
    else{
        const formData = new FormData();
        formData.append('image', img);
        try {
            const response = await fetch("http://localhost:8080/api/home", {
                method: 'POST',
                body: formData,
            });
            const responseData = await response.json();
            document.querySelector('.test-results').textContent = responseData['predictions']
        } catch (error) {
            console.log(error);
        }
    }
}
