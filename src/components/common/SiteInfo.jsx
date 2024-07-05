import React from "react";
import bgImg from "../../assets/Images/Horoscope Imgs/img2.gif";
import { motion } from "framer-motion";
import { fadeIn } from "../common/motionFrameVarients";



const SiteInfo = () => {
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center">
      <div className="relative h-[600px] md:h-[800px] w-full justify-center mx-auto flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-[650px] md:h-[880px] overflow-hidden object-cover">
        {/* <div className="absolute left-100 bottom-100 w-full h-[180px] opacity_layer_bg2"></div> */}
          {/* <img
            src={bgImg}
            alt="Background"
            className="w-full h-full object-cover bg-black bg-opacity-25"
          />
            {/* <div className="absolute left-0 bottom-0 w-full h-[80px] opacity_layer_bg"></div> */}
        </div> 

        <div className="relative flex flex-col justify-center items-center text-white h-full w-full mt-[75px]">
          <motion.div
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
            className="text-center text-3xl lg:text-4xl font-semibold"
          >
            <h1 className="bg-gradient-to-b text-bold from-[#0b0b0b] via-[#464545] to-[#aaa8a8] text-transparent bg-clip-text text-4xl font-semibold lg:w-[60%] mx-auto">
              Know Your Destiny with India's Top Astrologers
            </h1>
          </motion.div>

          <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
            className="mt-4 lg:w-[33%] text-center text-base lg:text-lg font-bold text-black"
            // style={{ textShadow: "1px 1px 1px" }}

          >
            Welcome to{" "}
            <strong>
              Astrowala,{" "}
              <a
                href="https://astrowala.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brown-600 hover:underline"
              >
                the best astrologer in India
              </a>
            </strong>
            , your ultimate destination for expert astrology consultation and
            guidance. At <strong>Astrowala</strong>, we believe in unlocking the
            mysteries of the cosmos, a time-honored tradition that’s been
            guiding us Indians for generations, to guide you through life’s
            challenges and opportunities.
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
            className="mt-4 w-[70%] lg:w-[30%] text-center text-base lg:text-lg font-bold text-black"
          >
            Our mission is to provide you with accurate prediction astrology
            services that fits your life’s unique narrative. Astrology, simply
            put, is the study of celestial bodies and how they influence our
            lives, from our personalities to our future events. It’s like having
            a cosmic roadmap that helps us navigate through life’s ups and
            downs.
          </motion.div>

          {/* <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
            className="mt-4 w-[70%] text-center text-base lg:text-lg font-bold text-black"
          >
            Now, why is astrology so important, you ask? Well, in our vibrant
            Indian culture, astrology is more than just predictions; it’s a way
            of understanding ourselves and the world around us. It gives us
            insights into our strengths, weaknesses, and what the future might
            hold. Whether it’s choosing the right career, finding your soulmate,
            or making big life decisions, astrology can be your go-to guide.
          </motion.div> */}
        </div>
      </div>
    </div>
  );
};

export default SiteInfo;
