import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
import Course_Slider from "../components/core/Catalog/Course_Slider";

import { getCatalogPageData } from "../services/operations/pageAndComponentData";

import { MdOutlineRateReview } from "react-icons/md";
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
// import backgroundImg8 from "../assets/Images/astro_images/img1.jpg";

// const categories = [
//   {
//     name: "Technology",
//     description:
//       "Dive into the world of technology with our comprehensive courses covering programming languages, software development, cloud computing, cybersecurity, and more.",
//     courses: [
//       "Web Development",
//       "Data Science",
//       "Mobile App Development",
//       "Cybersecurity",
//       "Cloud Computing",
//     ],
//   },
//   {
//     name: "Business & Finance",
//     description:
//       "Gain valuable skills in business management, finance, marketing, entrepreneurship, and project management to succeed in today's competitive business landscape.",
//     courses: [
//       "Business Administration",
//       "Financial Management",
//       "Marketing Strategies",
//       "Entrepreneurship",
//       "Project Management",
//     ],
//   },
//   {
//     name: "Creative Arts",
//     description:
//       "Unleash your creativity and explore your artistic talents with courses in photography, graphic design, video production, music production, and creative writing.",
//     courses: [
//       "Photography Basics",
//       "Graphic Design Fundamentals",
//       "Video Editing Mastery",
//       "Music Composition",
//       "Creative Writing Workshop",
//     ],
//   },
//   {
//     name: "Personal Development",
//     description:
//       "Invest in yourself and enhance your personal and professional growth with courses focused on communication skills, leadership development, time management, mindfulness, and goal setting.",
//     courses: [
//       "Effective Communication",
//       "Leadership Essentials",
//       "Time Management Techniques",
//       "Mindfulness Practices",
//       "Goal Setting Strategies",
//     ],
//   },
//   {
//     name: "Health & Wellness",
//     description:
//       "Take care of your mind and body with courses that promote physical and mental well-being, including yoga, nutrition, meditation, stress management, and holistic health.",
//     courses: [
//       "Yoga for Beginners",
//       "Nutrition Fundamentals",
//       "Meditation Practices",
//       "Stress Relief Techniques",
//       "Holistic Health & Healing",
//     ],
//   },
// ];

const randomImges = [
  backgroundImg1,
  backgroundImg2,
  backgroundImg3,
  backgroundImg4,
  backgroundImg5,
  backgroundImg6,
  backgroundImg7,
];

// hardcoded

const Home = () => {
  // get background random images
  const [backgroundImg, setBackgroundImg] = useState(null);

  useEffect(() => {
    const bg = randomImges[Math.floor(Math.random() * randomImges.length)];
    setBackgroundImg(bg);
  }, []);

  // console.log('bg ==== ', backgroundImg)

  // get courses data
  const [CatalogPageData, setCatalogPageData] = useState(null);
  const categoryID = "6662ad7dbb3aa094b1109871"; // hard coded
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCatalogPageData = async () => {
      const result = await getCatalogPageData(categoryID, dispatch);
      setCatalogPageData(result);
      // console.log("page data ==== ",CatalogPageData);
    };
    if (categoryID) {
      fetchCatalogPageData();
    }
  }, [categoryID]);

  // console.log('================ CatalogPageData?.selectedCourses ================ ', CatalogPageData)

  return (
    <React.Fragment>
      {/* background random image */}
      <div>
        <div
          className="w-full h-[450px] md:h-[650px] absolute top-0 left-0 overflow-hidden object-cover"
          style={{
            boxShadow: "inset 0 0 5rem rgba(0, 0, 0, 1)", // Increased darkness
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url("${backgroundImg}")`, // Applying linear gradient and background image
          }}
        >
          {/* No need to apply opacity to the image itself */}
          <img
            src={backgroundImg}
            alt="Background"
            className="w-full h-full object-cover darken-image"
            style={{
              filter: "brightness(0.5)", // Adjust the brightness value to darken the image
            }}
          />

          <div className="absolute left-0 bottom-0 w-full h-[250px] opacity_layer_bg"></div>
        </div>
      </div>

      <div className=" ">
        {/*Section1  */}
        <div className="relative h-[450px] md:h-[550px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-richwhite-100 ">
          <motion.div
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
            className="text-center text-3xl lg:text-4xl font-semibold mt-7  "
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
                className="z-0 group p-1 mx-auto rounded-full bg-yellow-50 font-bold text-black
                                        transition-all duration-200 hover:scale-95 w-fit"
              >
                <div
                  className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                              transition-all duration-200 group-hover:bg-richwhite-100"
                >
                  <p>Browse Courses</p>
                  <FaArrowRight />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* animated code */}
        <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
          {/* Code block 1 */}
          <div className="">
            <CodeBlocks
              position={"lg:flex-col"}
              heading={
                <div className="text-3xl lg:text-4xl font-semibold">
                  Explore
                  <HighlightText text={"Our Courses "} />
                </div>
              }
              subheading={
                "Astrowala offers a wide range of astrology courses designed to help you understand the mysteries of the cosmos. Whether you're new to astrology or an experienced practitioner, you'll find courses that cater to your needs and help you unlock your full potential."
              }
              ctabtn1={{
                btnText: "try it yourself",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "learn more",
                linkto: "/login",
                active: false,
              }}
              //   codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
              //   codeColor={"text-yellow-25"}
              //   backgroundGradient={"code-block1-grad"}
            />
            {/* <div className="explore-courses bg-gray-100 py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      {category.name}
                    </h3>
                    <ul className="list-disc list-inside">
                      {category.courses.map((course, i) => (
                        <li key={i} className="text-gray-600">
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Code block 2 */}
          {/* <div>
            <CodeBlocks
              position={"lg:flex-row-reverse"}
              heading={
                <div className="w-[100%] text-3xl lg:text-4xl font-semibold lg:w-[50%]">
                  Start
                  <HighlightText text={"learning in seconds"} />
                </div>
              }
              subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be learning stuff from your very first lesson."
              }
              ctabtn1={{
                btnText: "Continue Lesson",
                link: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn More",
                link: "/signup",
                active: false,
              }}
              codeColor={"text-white"}
              codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
              backgroundGradient={"code-block2-grad"}
            />
          </div> */}
        </div>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
