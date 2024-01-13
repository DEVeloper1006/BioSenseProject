import AnimatedTextWord from "./AnimatedTextWord"
import Aos from "aos"
import { useEffect } from "react"
import "../../../node_modules/aos/dist/aos.css";
import Image from "next/image";

const Title = () => {

    useEffect(() => {
        Aos.init({
            duration: 1500, // Animation duration in milliseconds
            easing: 'ease', // Easing for animation
            once: true, // Whether animation should only happen once on scroll
        })
    }, []); 

    return (
        <>
            <div className="flex flex-wrap justify-center items-center gap-3" data-aos="fade-left">
                <Image src="/logo.png" alt="logo" className="logo select-none" width={200} height={200} />
                <AnimatedTextWord text="biosense" />
            </div>
        </>
    )
}

export default Title