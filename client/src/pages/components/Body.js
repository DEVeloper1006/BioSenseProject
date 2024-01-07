import React, { useState } from "react";
import FileUpload from "./FileUpload"
import Hero from "./Hero";

export default function Body () {
    const [previewSource, setPreviewSource] = useState("");

    return (
        <div className="h-full p-10 mx-auto flex flex-col gap-11 items-center justify-center">
            <Hero />
            <FileUpload image={previewSource} setImage={setPreviewSource}/>
            <button className="btn rounded-lg hover:scale-105" onClick={() => sendData(previewSource)}>Submit Image</button>
        </div>
    )
}

async function sendData(img) {
    const formData = new FormData();
    formData.append('image', img);
    try {
        const response = await fetch("http://localhost:8080/api/home", {
            method: 'POST',
            body: formData,
        });
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.log(error);
    }
}
