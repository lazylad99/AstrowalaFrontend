import React from "react";

const WhyChooseUs1 = () => {
  return (
    <div className="bg-gray-50 p-3  sm:p-10 testimonial_bg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        <div className="flex flex-col gap-5 text-left mb-10 md:mb-0 md:mr-10">
          <h2 className="text-2xl font-normal">AstroWala Benefits</h2>
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
            <h3 className="text-xl font-semibold">
              Yoga improves strength, balance & flexibility
            </h3>
            <p className="mt-2 text-gray-600">
              Yoga enhances physical fitness by building strength, improving
              balance, and increasing flexibility.
            </p>
          </div>
          <div className="border border-pure-greys-100 p-5 rounded-lg bg-white">
            <h3 className="text-xl font-semibold">
              Yoga helps with back pain relief
            </h3>
            <p className="mt-2 text-gray-600">
              Yoga alleviates back pain through postures that promote better
              posture, reduce muscle tension, and strengthen the back.
            </p>
          </div>
          <div className="border border-pure-greys-100 p-5 rounded-lg bg-white">
            <h3 className="text-xl font-semibold">
              Yoga relaxes you, to help you sleep better
            </h3>
            <p className="mt-2 text-gray-600">
              Yoga's relaxation techniques and deep breathing aid in achieving
              restful sleep by calming the mind.
            </p>
          </div>
          <div className="border border-pure-greys-100 p-5 rounded-lg bg-white">
            <h3 className="text-xl font-semibold">
              Yoga helps with back pain stress
            </h3>
            <p className="mt-2 text-gray-600">
              Yoga fosters stress management through mindfulness and meditation,
              promoting emotional resilience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs1;
