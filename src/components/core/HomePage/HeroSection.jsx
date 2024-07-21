import { motion } from "framer-motion";
import { fadeIn } from "../../common/motionFrameVarients";
import videoSrc from "../../../assets/Images/astro_images/heroSection.mp4"; // Replace with your video file
import IconBtn from "../../common/IconBtn";
import { FaArrowRight } from "react-icons/fa";

export const HeroSection = () => {
  return (
    <div>
      {/* Background video */}
      <div className="w-full h-screen absolute top-0 left-0 shadow overflow-hidden">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.3)" }}
        ></video>
      </div>

      <div className="relative w-full h-screen flex flex-col justify-center items-center text-center text-white -translate-y-12">
        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
          className="bg-gradient-to-b text-bold from-[#ffffff] via-[#ffffff] to-[#928d8d] text-transparent bg-clip-text text-2xl md:text-4xl lg:text-6xl mb-5"
        >
          Explore the Cosmos,
          <div>Unlock Your Destiny</div>
        </motion.div>

        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
          className="w-[90%] md:w-[70%] lg:w-[50%] text-sm md:text-lg lg:text-xl font-bold mb-8"
        >
          Explore the mysteries of the stars, unlock your destiny, and embark on a transformative learning experience with us.
        </motion.div>

        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
          className="mb-6"
        >
          <IconBtn
            onclick={() => navigate("/catalog/6662ad7dbb3aa094b1109871")}
            customClasses={"flex flex-row gap-7 mr-5 w-fit "}
          >
            <p>Browse Courses</p>
            <FaArrowRight />
          </IconBtn>
        </motion.div>
      </div>
    </div>
  );
}
