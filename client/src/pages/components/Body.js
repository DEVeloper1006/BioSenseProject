import React, { useState } from "react";
import FileUpload from "./FileUpload"
import Hero from "./Hero";

export default function Body () {
    const [previewSource, setPreviewSource] = useState("");

    return (
        <>
            <div id="alertTag" role="alert" className="hidden alert bg-red-500 fixed top-0 transition-opacity duration-300 opacity-0 fade-enter fade-enter-active fade-enter-done">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-white select-none">ERROR : Please input an image</span>
                <div>
                    <button onClick={alertOK} className="btn btn-sm">OK</button>
                </div>
            </div>
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

function alertOK () {
    document.getElementById("alertTag").classList.add("hidden")
}

async function sendData(img) {
    if (!img) document.getElementById('alertTag').classList.remove("hidden");
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
