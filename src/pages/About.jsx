import React from "react";

import FoundingStory from "../assets/Images/FoundingStory.jpg";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";

import Footer from "../components/common/Footer";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponenet from "../components/core/AboutPage/Stats";
import HighlightText from "../components/core/HomePage/HighlightText";
import Img from "../components/common/Img";
import ReviewSlider from "./../components/common/ReviewSlider";

import { motion } from "framer-motion";
import { fadeIn } from "../components/common/motionFrameVarients";

const About = () => {
  return (
    <div>
      {/* <section className="bg-richwhite-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <motion.header
            className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]"
          >
            <motion.p
              variants={fadeIn('down', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
            > Driving Innovation in Online Education for a
              <HighlightText text={"Brighter Future"} />
            </motion.p>

            <motion.p
              variants={fadeIn('up', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
              className="mx-auto mt-3 text-center text-base font-medium text-richwhite-300 lg:w-[95%]">
              GyanSrijan is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </motion.p>
          </motion.header>

          <div className="sm:h-[70px] lg:h-[150px]"></div>

          <div className=" absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <Img src={BannerImage1} alt="" />
            <Img src={BannerImage2} alt="" />
            <Img src={BannerImage3} alt="" />
          </div>
        </div>
      </section> */}

      {/* <section className="border-b border-richwhite-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richwhite-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section> */}
      <section className="flex flex-col items-center mt-10">
        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="w-full flex justify-center"
        >
          <div>
            <Img
              src={FoundingStory}
              alt="FoundingStory"
              className="shadow-[0_0_20px_0] shadow-[#FC6767] lg:h-[500px]"
              style={{ height: "100px", width: "auto" }}
            />
          </div>
        </motion.div>
        <div className="mx-auto max-w-maxContent gap-10 text-center text-white mt-10">
          <div className="gap-10">
            <motion.div
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
              className="flex flex-col gap-10"
            >
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] mx-auto">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richwhite-300 lg:w-[95%] mx-auto">
                The Famous Indian Professional Astrology website is owned by
                astrologer Mandiiip Chauhan who is registered member of
                International Astrology Federation Inc (India & USA), which is a
                big achievement. He is a Certified Astrologer & Vastu
                Consultant. He is an expert in Vedic Astrology, Vastu,
                Astro-Vastu, Numerology, reiki, Lal-Kitab & Nadi Astrology. He
                has years of experience in the occult field and has trained many
                students in this field. Your problem is our concern & your
                solution is our motive.
              </p>
              <p className="text-base font-medium text-richwhite-300 lg:w-[95%] mx-auto">
                In our life, many people are happy & many are sad due to our
                planets & karmas. Life is a memorable adventure where we aim to
                follow our ambitious goals related to family, health, finance,
                career, and love, among others. Our life is full of sudden
                turns, and we want to avoid such problems and the progress of
                life gets affected. The problem is De-Coding your life &
                Planets. Astrology is all about de-coding your life with the
                help of this precious study of planets.
              </p>
              <p className="text-base font-medium text-richwhite-300 lg:w-[95%] mx-auto">
                We are all connected with planets & elements in our life. If we
                have faith in this field, then planets & elements are always
                working for us 24X7 without any pause in our life. It’s like
                gravity working for us. Every life in the universe is bound by
                nature and universal law. We are all part of the universe and
                reflect the life of its component. Hence, our life is
                predominantly governed by planets and their movements.
              </p>
              <p className="text-base font-medium text-richwhite-300 lg:w-[95%] mx-auto">
                Astrology is a science and ancient knowledge repository to guide
                each of us to gain the most out of our life on earth. This will
                enable us to predict what is in store for you in this world,
                both good and bad, so that we are prepared to face anything. By
                doing remedies, we can increase or decrease the effects of
                planets & future events. Astrologer Mandiiip Chauhan is a famous
                astrologer. He is renowned in India, the U.S.A, Canada,
                Australia, and many other countries.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richwhite-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>

            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Our Mission
              </h1>
              <p className="text-base font-medium text-richwhite-300 lg:w-[95%]">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div> */}

      {/* <StatsComponenet /> */}

      {/* <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section> */}

      {/* Reviws from Other Learner */}
      {/* <div className=" my-20 px-5 text-white ">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div> */}

      {/* footer */}
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default About;
