import FoundingStory from "../assets/Images/FoundingStory.jpg";

import Footer from "../components/common/Footer";
import Img from "../components/common/Img";

import { motion } from "framer-motion";
import { fadeIn } from "../components/common/motionFrameVarients";

const About = () => {
  return (
    <div className="bg-pure-greys-25">
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
              className="flex flex-col gap-10 text-pure-greys-500"
            >
              <h1 className="bg-gradient-to-b from-[#44799f] via-[#10c8e9] to-[#73d89d] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] mx-auto">
                Our Founding Story
              </h1>
              <p className="text-base font-medium lg:w-[95%] mx-auto">
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
              <p className="text-base font-medium lg:w-[95%] mx-auto">
                In our life, many people are happy & many are sad due to our
                planets & karmas. Life is a memorable adventure where we aim to
                follow our ambitious goals related to family, health, finance,
                career, and love, among others. Our life is full of sudden
                turns, and we want to avoid such problems and the progress of
                life gets affected. The problem is De-Coding your life &
                Planets. Astrology is all about de-coding your life with the
                help of this precious study of planets.
              </p>
              <p className="text-base font-medium lg:w-[95%] mx-auto">
                We are all connected with planets & elements in our life. If we
                have faith in this field, then planets & elements are always
                working for us 24X7 without any pause in our life. It’s like
                gravity working for us. Every life in the universe is bound by
                nature and universal law. We are all part of the universe and
                reflect the life of its component. Hence, our life is
                predominantly governed by planets and their movements.
              </p>
              <p className="text-base font-medium lg:w-[95%] mx-auto">
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
