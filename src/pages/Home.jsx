import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import HighlightText from "../components/core/HomePage/HighlightText";
import Footer from "../components/common/Footer";

import { getCatalogPageData } from "../services/operations/pageAndComponentData";

import { FaArrowRight } from "react-icons/fa";
import videoSrc from "../assets/Images/astro_images/heroSection.mp4"; // Replace with your video file

import { motion } from "framer-motion";
import { fadeIn } from "./../components/common/motionFrameVarients";

import SiteInfo from "../components/common/SiteInfo";
import MoreInfo from "../components/common/Moreinfo";
import Features from "../components/common/Features";
import IconBtn from "../components/common/IconBtn";
import CoursesCatalog from "../components/core/HomePage/CoursesCatalog";
import ContactForm from "../components/core/ContactPage/ContactForm";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [catalogPageData, setCatalogPageData] = useState(null);
  const categoryID = "6662ad7dbb3aa094b1109871"; // hard coded

  useEffect(() => {
    const fetchCatalogPageData = async () => {
      const result = await getCatalogPageData(categoryID, dispatch);
      setCatalogPageData(result);
    };
    if (categoryID) {
      fetchCatalogPageData();
    }
  }, [categoryID, dispatch]);

  return (
    <>
    <React.Fragment>
      {/* background video */}
      <div className="w-full h-screen absolute top-0 left-0 shadow overflow-hidden">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.5)" }}
        ></video>
        
      </div>

      <div className="relative w-full h-screen flex flex-col justify-center items-center text-center text-white">
        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
          className="bg-gradient-to-b text-bold from-[#ffffff] via-[#ffffff] to-[#928d8d] text-transparent bg-clip-text text-2xl md:text-4xl lg:text-6xl"
        >
          Explore the Cosmos, Unlock Your Destiny
          {/* <HighlightText text={"Unlock Your Destiny"} /> */}
        </motion.div>

        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
          className="w-[90%] md:w-[70%] lg:w-[50%] text-sm md:text-lg lg:text-xl font-bold mt-4"
        >
          Explore the mysteries of the stars, unlock your destiny, and embark on a transformative learning experience with us.
        </motion.div>

        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
          className="mt-6"
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

      <CoursesCatalog />
      {/* <SiteInfo /> */}
      <MoreInfo />
      <Features />
      {/* <div className="relative mx-auto box-content w-full max-w-maxContentTab lg:max-w-maxContent">
        <div className="flex justify-center">
            <ContactForm />
        </div>
        </div> */}
      
      <Footer />
    </React.Fragment></>
  );
};

export default Home;
