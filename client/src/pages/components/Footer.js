import React from "react"

const Footer = () => {
    return (
        <footer className="footer items-center p-4 bg-neutral text-neutral-content">
            <aside className="items-center grid-flow-col">
                <img src="/darkLogo.png" alt="logo" style={{
                    width : "100px",
                    height: "auto"
                }} className="select-none"/>
                <p className="select-none">Copyright © 2024 - All rights reserved</p>
            </aside> 
            <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <input type="text" placeholder="Write Feedback" className="w-full max-w-xs outline-none p-3 rounded-xl bg-neutral" />
            </div>
        </footer>
    )
}

export default Footer