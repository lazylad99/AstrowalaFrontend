import React from "react";

const SiteInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-8 p-8">
      <div className="text-center mb-4 max-w-5xl">
        <h2 className="text-4xl font-bold text-blue-100">
          Know Your Destiny with India's Top Astrologers
        </h2>
      </div>
      <div className="w-full flex justify-center mb-4 max-w-5xl">
        <hr className="w-full border-t border-gray-800" />
      </div>
      <div className="text-pure-greys-500 text-sm max-w-5xl">
        <p className="mb-4">
          Welcome to{" "}
          <strong>
            Astrowala,{" "}
            <a
              href="https://astrowala.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              the best astrologer in India
            </a>
          </strong>{" "}
          and your ultimate destination for expert astrology consultation and
          guidance. At <strong>Astrowala</strong>, we believe in unlocking the
          mysteries of the cosmos, a time-honored tradition that’s been guiding
          us Indians for generations, to guide you through life’s challenges and
          opportunities.
        </p>
        <p className="mb-4">
          Our mission is to provide you with accurate prediction astrology
          services that fits your life’s unique narrative. Astrology, simply
          put, is the study of celestial bodies and how they influence our
          lives, from our personalities to our future events. It’s like having a
          cosmic roadmap that helps us navigate through life’s ups and downs.
        </p>
        <p className="mb-4">
          Now, why is astrology so important, you ask? Well, in our vibrant
          Indian culture, astrology is more than just predictions; it’s a way of
          understanding ourselves and the world around us. It gives us insights
          into our strengths, weaknesses, and what the future might hold.
          Whether it’s choosing the right career, finding your soulmate, or
          making big life decisions, astrology can be your go-to guide.
        </p>
      </div>
    </div>
  );
};

export default SiteInfo;
