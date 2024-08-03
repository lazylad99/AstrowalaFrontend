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
import { HeroSection } from "../components/core/HomePage/HeroSection";

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

  console.log("testing")

  return (
    <>
      <HeroSection />
      <CoursesCatalog />
      <MoreInfo />
      <Features />
         {/* <SiteInfo /> */}
      <Footer />
    </>
  );
};

export default Home;
