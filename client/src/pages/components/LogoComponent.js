import React from 'react';
import Image from 'next/image';
import Aos from "aos";
import "/Users/devmody/Documents/Projects/biosense/client/node_modules/aos/dist/aos.css";

const LogoComponent = ({ logoTheme }) => {

    useEffect(() => {
        Aos.init({
            duration: 1500, 
            easing: 'ease', 
            once: true, 
        })
    }, []); 

    return (
        <div className='flex flex-wrap justify-center items-center' >
            <Image src={logoTheme} alt="logo" width={100} height={50} />
            <AnimatedTextWord text="biosense" />
        </div>
    );
};

export default LogoComponent;