import AnimatedTextWord from "./AnimatedTextWord"
import Aos from "aos"
import { useEffect } from "react"
import "../../../node_modules/aos/dist/aos.css";

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
            <div className="flex flex-wrap justify-center items-center" data-aos="fade-left">
                <img src="/logo.png" alt="logo" style={{
                    width : "250px",
                    height: "auto"
                }} className="logo select-none"/>
                <AnimatedTextWord text="biosense" />
            </div>
        </>
    )
}

export default Title