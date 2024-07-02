import React from "react";
import bgImg from "../../assets/Images/Horoscope Imgs/new7.jpg";
import img1 from "../../assets/Images/Horoscope Imgs/new10.gif";
import img2 from "../../assets/Images/Horoscope Imgs/new.png";
import { motion } from "framer-motion";
import { fadeIn } from "../common/motionFrameVarients";

const Features = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center">
                <div className="absolute left-100 bottom-100 w-full h-[180px] opacity_layer_bg2"></div>

      <div className="relative h-[600px] md:h-[800px] w-full justify-center mx-auto flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-[600px] md:h-[800px] overflow-hidden object-cover">
            
          <img
            src={bgImg}
            alt="Background"
            className="w-full h-full object-cover bg-blend-lighten"
          />
          <div className="absolute left-0 bottom-0 w-full h-[100px] opacity_layer_bg"></div>
        </div>

        <div className="relative flex flex-col justify-center items-center text-white h-full w-full mt-[150px] ">
          <motion.div
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
            className="text-center text-3xl lg:text-4xl font-semibold"
          >
            <h1 className="bg-gradient-to-b from-[#f46b6b] via-[#d47b22] to-[#d7c76a] text-transparent bg-clip-text text-3xl font-semibold mx-auto">
              Why Choose AstroWala?
            </h1>
          </motion.div>
        </div>

        <div className="relative h-screen">
          <img src={img1} className="h-[80%] w-full object-cover" alt="Background" />
          <motion.img 
            src={img2} 
            className="absolute h-1/2 top-[15%] left-[33%] transform -translate-x-1/2 -translate-y-1/2" 
            alt="Overlay" 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
