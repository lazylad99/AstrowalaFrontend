import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import HighlightText from "../components/core/HomePage/HighlightText";
import Footer from "../components/common/Footer";

import { getCatalogPageData } from "../services/operations/pageAndComponentData";

// import { MdOutlineRateReview } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import img1 from "../assets/Images/astro_images/banner3.jpg";

import { motion } from "framer-motion";
import { fadeIn } from "./../components/common/motionFrameVarients";

// background random images
import backgroundImg1 from "../assets/Images/astro_images/img.png";
import backgroundImg2 from "../assets/Images/astro_images/img1.jpg";
import backgroundImg3 from "../assets/Images/astro_images/img2.jpg";
import backgroundImg4 from "../assets/Images/astro_images/img3.jpg";
import backgroundImg5 from "../assets/Images/astro_images/img4.jpg";
import backgroundImg6 from "../assets/Images/astro_images/img5.jpg";
import backgroundImg7 from "../assets/Images/astro_images/vastu.jpg";
import SiteInfo from "../components/common/SiteInfo";
import MoreInfo from "../components/common/Moreinfo";
import Features from "../components/common/Features";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import IconBtn from "../components/common/IconBtn";

const randomImges = [
  backgroundImg1,
  backgroundImg2,
  backgroundImg3,
  backgroundImg4,
  backgroundImg5,
  backgroundImg6,
  backgroundImg7,
];

const Home = () => {
  const [backgroundImg, setBackgroundImg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const bg = randomImges[Math.floor(Math.random() * randomImges.length)];
    setBackgroundImg(bg);
  }, []);

  const [catalogPageData, setCatalogPageData] = useState(null);
  const categoryID = "6662ad7dbb3aa094b1109871"; // hard coded
  const dispatch = useDispatch();

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
    <React.Fragment>
      {/* background random image */}

      <div
        className="w-full h-[200px] md:h-[650px] absolute top-0 left-0 overflow-hidden object-cover"
       
      >
        <img
        src={img1}
        alt="Background"
        className="w-full h-full object-cover"
        style={{
          filter: 'brightness(0.5)',
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))',
        }}
      />
            <div className="absolute left-0 bottom-0 w-full h-[50px] opacity_layer_bg"></div>

    </div>

      <div>
        <div className="relative h-[450px] md:h-[600px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent text-white translate1">
          <div className="flex min-h-[40px] max-w-maxContentTab flex-col gap-4 lg:max-w-maxContent mb-10 ">
            <motion.div
              variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.1 }}
              className="bg-gradient-to-b text-bold from-[#ffffff] via-[#ffffff] to-[#928d8d] text-transparent bg-clip-text text-2xl md:text-4xl"
            >
              Explore the Cosmos,
              <HighlightText text={"Unlock Your Destiny"} />
            </motion.div>

            <motion.div
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.1 }}
              className="w-[50%] text-base lg:text-lg font-bold text-white"
            >
              Explore the mysteries of the stars, unlock your destiny, and
              embark on a transformative learning experience with us.
            </motion.div>
            <motion.div
              variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.1 }}
              className="w-[50%] text-base lg:text-lg font-bold text-white"
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

        <SiteInfo />

        <MoreInfo />

        {/* <ExploreMore /> */}

        <Features />

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;

// import {bgImg} from "../../assets/Images/Horoscope Imgs/img.png"
