/* eslint-disable react/no-unescaped-entities */
// import Img from "../components/common/Img";
import FoundingStory from "../assets/Images/FoundingStory.webp";

function About() {
  return (

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
      </div>
    </div>
  );
}

export default About;
