import React from "react";
import img from "../../assets/Images/astro_images/download.gif";

const FeatureCard = ({ title, content }) => (
  <div className="p-6 shadow-md rounded-full text-white border border-yellow-50 text-center hover:scale-1 relative mb-10">
    <div className="absolute inset-0 w-full h-full object-cover rounded-full pointer-events-none">
      <img
        src={img}
        alt="feature border"
        className="w-full h-full object-cover rounded-full transform scale-110"
      />
    </div>
    <div className="relative p-6 rounded-full">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm">{content}</p>
    </div>
    <div
      className="absolute inset-0 rounded-full border border-transparent"
      style={{ boxShadow: "inset 0 0 10px 5px rgba(255, 223, 0, 0.5)" }}
    ></div>
  </div>
);

const Features = () => {
  const featuresData = [
    {
      title: "Expert Astrologers",
      content:
        "Our team includes some of the best astrologers in India, each with their own area of specialization. Each astrologer is skilled in interpreting birth charts and planetary movements, providing best prediction astrology for your unique situation.",
    },
    {
      title: "Accuracy",
      content:
        "We pride ourselves on providing accurate prediction astrology that you can trust.",
    },
    {
      title: "Personalized Astrology Consultations",
      content:
        "Every reading is tailored to your life, your questions, and your path. Our astrologers will review your birth chart and provide advice and precise astrological predictions for your concerns about love, job, finances, or health.",
    },
    {
      title: "Convenience and Flexibility",
      content:
        "With online consultations, you can seek guidance from the comfort of your home. Schedule online astrology consultations at your convenience, from anywhere in the world. Our platform allows you to connect with the best astrologer online, making valuable astrological guidance readily accessible.",
    },
    {
      title: "Free Daily & Weekly Horoscopes",
      content:
        "Gain a glimpse into your day or week with our free horoscope online feature. Explore planetary influences and potential transits impacting your zodiac sign. While free horoscopes offer a general outlook, astrology consultations provide a personalized roadmap for your journey.",
    },
    {
      title: "Safe and Secure Platform",
      content:
        "Astrowala prioritizes your privacy. Our secure platform ensures all communications and information shared with our astrologers remain confidential.",
    },
  ];

  return (
    <section className="px-4 md:px-8 lg:px-8 lg:m-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="bg-gradient-to-b text-center from-[#000000] via-[#303232] to-[#b3afaf] text-transparent p-4 mb-3 bg-clip-text text-4xl font-semibold lg:w-[100%] mx-auto">
          Why Choose Astrowala?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              content={feature.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
