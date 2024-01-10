import React from "react";
import emailjs from "emailjs-com";

const Footer = () => {

    function sendEmail () {
        const message = document.getElementById("feedback").value
        if (!message) alert("Please enter feedback before sending")
        else{
            emailjs.send("service_uod7oc4", "template_gj4cqp7", { message })
            .then(() => {
                alert('Your feedback has been sent!')
                document.getElementById("feedback").value = "";
            }, (err) => {
                console.log(err)
            })
        }
    }
    return (
        <footer className="footer items-center p-4 bg-neutral text-neutral-content">
            <aside className="items-center grid-flow-col">
                <img src="/darkLogo.png" alt="logo" style={{
                    width : "100px",
                    height: "auto"
                }} className="select-none"/>
                <p className="select-none">Copyright © 2024 - All rights reserved</p>
            </aside> 
            <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end flex-wrap">
                <input id="feedback" type="text" placeholder="Write Feedback" className="w-full max-w-xs outline-none p-3 rounded-xl bg-neutral border-2 xs: text-md" />
                <button className="btn btn-accent hover:scale-105 rounded-xl" onClick={sendEmail}>Send Feedback</button>
            </div>
        </footer>
    )
}

export default Footer;
