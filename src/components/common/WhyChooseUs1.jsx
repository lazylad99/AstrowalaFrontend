import React from "react";

const WhyChooseUs1 = () => {
  return (
    <div className="bg-gray-50 p-3  sm:p-10 testimonial_bg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        <div className="flex flex-col gap-5 text-left mb-10 md:mb-0 md:mr-10">
          <h2 className="text-2xl font-normal">Astrowala Benefits</h2>
          <p className="text-3xl font-bold mt-4">
            Shaping your destiny through the stars.
          </p>
          <p className="text-md text-gray-600 mt-2">
            Fostering spiritual well-being and inner strength through the wisdom
            of astrology, offering guidance and insight to navigate life's
            challenges and opportunities.
          </p>
          <button className="w-[200px] mt-6 px-6 py-2 bg-pink-500 text-white font-semibold rounded">
            Discover More
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          <div className="border border-pure-greys-100 p-5 rounded-lg bg-white">
            <h3 className="text-xl font-semibold">Expert Astrologers</h3>
            <p className="mt-2 text-gray-600">
              Our team of skilled astrologers in India offers expert birth chart
              and planetary movement interpretations.
            </p>
          </div>
          <div className="border border-pure-greys-100 p-5 rounded-lg bg-white">
            <h3 className="text-xl font-semibold">Accuracy</h3>
            <p className="mt-2 text-gray-600">
              We pride ourselves on delivering highly accurate astrology
              predictions, ensuring trust and reliability for our clients.
            </p>
          </div>
          <div className="border border-pure-greys-100 p-5 rounded-lg bg-white">
            <h3 className="text-xl font-semibold">
              Personalized Astrology Consultations
            </h3>
            <p className="mt-2 text-gray-600">
              Our astrologers tailor readings to your life, providing precise
              predictions on love, job, finances, and health
            </p>
          </div>
          <div className="border border-pure-greys-100 p-5 rounded-lg bg-white">
            <h3 className="text-xl font-semibold">
              Convenience and Flexibility
            </h3>
            <p className="mt-2 text-gray-600">
              Schedule online astrology consultations from home, connecting with
              top astrologers worldwide for valuable guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs1;
