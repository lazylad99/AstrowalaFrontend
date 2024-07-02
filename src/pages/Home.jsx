import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import HighlightText from "../components/core/HomePage/HighlightText";
import Footer from "../components/common/Footer";

import { getCatalogPageData } from "../services/operations/pageAndComponentData";

// import { MdOutlineRateReview } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

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
      <div>
        <div
          className="w-full h-[450px] md:h-[690px] absolute top-0 left-0 overflow-hidden object-cover"
          style={{
            boxShadow: "inset 0 0 5rem rgba(0, 0, 0, 1)",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url("${backgroundImg}")`,
          }}
        >
          <img
            src={backgroundImg}
            alt="Background"
            className="w-full h-full object-cover darken-image"
            style={{
              filter: "brightness(0.5)",
            }}
          />
          {/* <div className="absolute left-0 bottom-0 w-full h-[150px] opacity_layer_bg"></div> */}
        </div>
      </div>

      <div className=" ">
        <div className="relative h-[450px] md:h-[550px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white ">
          <motion.div
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
            className="text-center text-3xl lg:text-4xl font-semibold mt-7"
          >
            Explore the Cosmos,
            <HighlightText text={"Unlock Your Destiny"} />
          </motion.div>

          <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
            className=" mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richwhite-200"
          >
            At Astrowala, we harness the celestial energies to empower your
            journey towards self-discovery and personal growth. Explore the
            mysteries of the stars, unlock your destiny, and embark on a
            transformative learning experience with us.
          </motion.div>

          <div className="flex flex-row gap-7 mt-8">
            <Link to={"/catalog/6662ad7dbb3aa094b1109871"}>
              <div
                className="z-0 group p-1 mx-auto rounded-full bg-blue-100 font-bold text-white
                                        transition-all duration-200 hover:scale-95 w-fit"
              >
                <div
                  className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                              transition-all duration-200 "
                >
                  <p>Browse Courses</p>
                  <FaArrowRight />
                </div>
              </div>
            </Link>
          </div>
        </div>

        <SiteInfo />

        <MoreInfo />

        <Features />

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;

// import {bgImg} from "../../assets/Images/Horoscope Imgs/img.png"
