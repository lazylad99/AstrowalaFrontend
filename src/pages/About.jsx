/* eslint-disable react/no-unescaped-entities */
// import Img from "../components/common/Img";
import FoundingStory from "../assets/Images/FoundingStory.webp";

function About() {
  return (
<<<<<<< HEAD
    <div className="bg-richblack-25">
  
      <section className="flex flex-col items-center mt-10 w-full px-4 md:px-8">
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
              className="shadow-[0_0_20px_0] shadow-[#FC6767] h-auto lg:h-[500px] w-full max-w-screen-md"
              style={{ height: "100px", width: "auto" }}
            />
          </div>
        </motion.div>
        <div className="mx-auto max-w-screen-lg gap-10 mt-5 px-4 md:px-8"
        >
          <div className="gap-10">
            <motion.div
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
              className="flex flex-col gap-10 text-black"
            >
              <h1 className="bg-gradient-to-b text-center from-[#000000] via-[#303232] to-[#b3afaf] text-transparent bg-clip-text text-2xl md:text-3xl lg:text-4xl font-semibold w-full max-w-screen-md mx-auto">
                Our Founding Story
              </h1>
              <p className="text-base font-medium w-full max-w-screen-md mx-auto">
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
              <p className="text-base font-medium w-full max-w-screen-md mx-auto">
                In our life, many people are happy & many are sad due to our
                planets & karmas. Life is a memorable adventure where we aim to
                follow our ambitious goals related to family, health, finance,
                career, and love, among others. Our life is full of sudden
                turns, and we want to avoid such problems and the progress of
                life gets affected. The problem is De-Coding your life &
                Planets. Astrology is all about de-coding your life with the
                help of this precious study of planets.
              </p>
              <p className="text-base font-medium w-full max-w-screen-md mx-auto">
                We are all connected with planets & elements in our life. If we
                have faith in this field, then planets & elements are always
                working for us 24X7 without any pause in our life. It’s like
                gravity working for us. Every life in the universe is bound by
                nature and universal law. We are all part of the universe and
                reflect the life of its component. Hence, our life is
                predominantly governed by planets and their movements.
              </p>
              <p className="text-base font-medium w-full max-w-screen-md mx-auto">
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


      {/* footer */}
      <div className="mt-10">
        <Footer />
=======

    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="max-w-7xl w-full p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-1 shadow-lg bg-white">
            <div className="text-center mb-8">
              <h2 className="text-orange-500 text-md font-semibold text-start">
                How It Started
              </h2>
              <h1 className="text-4xl font-bold mt-4 text-start">
                Our Founding Story
              </h1>
            </div>
            <p className="text-gray-700">
              The Famous Indian Professional Astrology website is owned by
              astrologer Mandiiip Chauhan who is registered member of
              International Astrology Federation Inc (India & USA), which is a
              big achievement. He is a Certified Astrologer & Vastu Consultant.
              He is an expert in Vedic Astrology, Vastu, Astro-Vastu,
              Numerology, reiki, Lal-Kitab & Nadi Astrology. He has years of
              experience in the occult field and has trained many students in
              this field. Your problem is our concern & your solution is our
              motive.
            </p>
            <br />
            <p className="text-gray-700">
              In our life, many people are happy & many are sad due to our
              planets & karmas. Life is a memorable adventure where we aim to
              follow our ambitious goals related to family, health, finance,
              career, and love, among others. Our life is full of sudden turns,
              and we want to avoid such problems and the progress of life gets
              affected. The problem is De-Coding your life & Planets. Astrology
              is all about de-coding your life with the help of this precious
              study of planets.
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <img
              src={FoundingStory}
              alt="Astrowala"
              className="rounded-lg shadow-lg mb-6 h-[300px] w-full mt-12"
            />
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="bg-white p-4 rounded-lg border border-[#d1d1d1]  text-center">
                <h3 className="text-2xl font-bold">15,000</h3>
                <p className="text-gray-600">HAPPY CLIENTS</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#d1d1d1] text-center">
                <h3 className="text-2xl font-bold">75,000</h3>
                <p className="text-gray-600">STUDENTS</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#d1d1d1] text-center">
                <h3 className="text-2xl font-bold">33</h3>
                <p className="text-gray-600">AWARDS</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#d1d1d1] text-center">
                <h3 className="text-2xl font-bold">2,036</h3>
                <p className="text-gray-600">OVERSEAS CUSTOMERS</p>
              </div>
            </div>
          </div>
        </div>
>>>>>>> 297ce6be0807c9b68c6265f47e18dd1e9ef8a05e
      </div>
    </div>
  );
}

export default About;