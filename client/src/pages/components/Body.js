import React, { useState } from "react";
import FileUpload from "./FileUpload"
import Hero from "./Hero";
import Results from "./TestResults"

export default function Body () {
    const [previewSource, setPreviewSource] = useState("");
    const [results, setResults] = useState(1)
    return (
        <>
            <div className="h-full p-5 mx-auto flex flex-col gap-11 items-center justify-center">
                <Hero />
                <div className="parent w-full flex flex-wrap p-4">
                    <div className="child w-1/2 flex flex-col items-center justify-center gap-3">
                        <FileUpload image={previewSource} setImage={setPreviewSource}/>
                        <button className="btn w-full rounded-lg hover:scale-105" onClick={() => sendData(previewSource, setResults)}>Submit Image</button>
                    </div>
                    <div className="child w-1/2 results flex flex-col gap-8 rounded-xl p-14 select-none" id="results">
                        <h2 className="text-4xl text-center">Test Results</h2>
                        <Results isPneumonia={results} />
                    </div>
                </div>
            </div>
        </>
    )
}

async function sendData(img, setResult) {
    if (!img) alert("Please input an image.")
    else{
        const formData = new FormData();
        formData.append('image', img);
        try {
            const response = await fetch("https://127.0.0.1:5000/api/home", {
                method: 'POST',
                body: formData,
            });
            const responseData = await response.json();
            if (responseData['predictions'] == "Normal"){
                setResult(2)
            } else {
                setResult(3)
            }
        } catch (error) {
            console.log(error);
        }
    }
}