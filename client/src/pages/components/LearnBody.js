import React, { useState, useEffect } from "react";
import Title from "./Title";
import "../../../node_modules/aos/dist/aos.css";
import Aos from "aos";

export default function Body () {

    useEffect(() => {
        Aos.init({
            duration: 1500, // Animation duration in milliseconds
            easing: 'ease', // Easing for animation
            once: true, // Whether animation should only happen once on scroll
        })
    }, []); 

    return (
        <>
            <div className="h-full mx-auto flex flex-col items-center justify-center p-10 gap-10">
                <Title />
                <div className="flex flex-col gap-4">

                    <div className="collapse collapse-arrow bg-base-200 learn-container w-full h-fit text-center p-5">
                        <input type="radio" name="my-accordion-3" checked="checked" className="text-white"/>
                        <div className="p-10 flex flex-col gap-10 collapse-title">
                            <h1 className="ml-16 text-8xl text-slate-50 select-none" data-aos="fade-right">What is Pneumonia?</h1>
                        </div>
                        <div className="collapse-content">
                            <p className="text-slate-50 text-3xl leading-relaxed select-none">
                                Pneumonia, an infection of the lungs caused by bacteria, viruses, or fungi, is <span className="bg-red-500">one of the leading causes of hospitalizations and deaths annually.</span> Pneumonia causes pleural effusion, in which the air sacs in the lungs, called alveoli, become filled with fluid or pus.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-200 learn-container w-full h-fit text-center p-5">
                        <input type="radio" name="my-accordion-3" checked="checked" className="text-white"/>
                        <div className="p-10 flex flex-col gap-10 collapse-title">
                            <h1 className="ml-16 text-8xl text-slate-50 select-none" data-aos="fade-right">Symptoms of Pneumonia</h1>
                        </div>
                        <div className="collapse-content">
                            <p className="text-slate-50 text-3xl leading-relaxed select-none">
                                This can result in many symptoms such as: rapid or difficulty breathing, shortness of breath, cough with green, yellow, or bloody mucus, fever, bluish colour to lips and fingernails, extreme fatigue, rapid pulse, chills, heavy sweating, confused mental state or delirium, and sharp or stabbing chest pain that is worse with breathing or coughing.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-200 learn-container w-full h-fit text-center p-5">
                        <input type="radio" name="my-accordion-3" checked="checked" className="text-white"/>
                        <div className="p-10 flex flex-col gap-10 collapse-title">
                            <h1 className="ml-16 text-8xl text-slate-50 select-none" data-aos="fade-right">Chest X-Ray Usage</h1>
                        </div>
                        <div className="collapse-content">
                            <p className="text-slate-50 text-3xl leading-relaxed select-none">
                                Due to its severity, early diagnosis can greatly improve prognosis and survival rates in patients. <span className="bg-red-500">Chest x-rays are very commonly used</span> for providing a diagnosis alongside a medical history and a physical exam.
                                <br></br><br></br>
                                Even though CT scans are much more precise, they are not routinely used due to higher cost and time usage, along with greater exposure to radiation. Therefore, chest x-rays are currently the <span className="bg-red-500">standard radiographic test</span> for pneumonia evaluation. 
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}