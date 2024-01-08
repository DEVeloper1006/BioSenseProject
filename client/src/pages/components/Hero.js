import AnimatedTextWord from "./AnimatedTextWord"
import logo from "../../../public/logo.png"
import Image from "next/image"
import Aos from "aos"
import { useEffect } from "react"
import "/Users/devmody/Documents/Projects/biosense/client/node_modules/aos/dist/aos.css";

const Hero = () => {

    useEffect(() => {
        Aos.init({
            duration: 1500, // Animation duration in milliseconds
            easing: 'ease', // Easing for animation
            once: true, // Whether animation should only happen once on scroll
        })
    }, []); 

    return (
        <>
            <div className="flex flex-wrap justify-center items-center" data-aos="fade-left">
                <Image src={logo} alt="logo" style={{
                    width : "250px",
                    height: "auto"
                }} className="logo select-none"/>
                <AnimatedTextWord text="biosense" />
            </div>
            <button className="btn rounded-lg hover:scale-105" onClick={() => document.getElementById('my_modal_3').showModal()}>How does it work?</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>
        </>
    )
}

export default Hero