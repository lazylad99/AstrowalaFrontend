import  { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

// Sample FAQ data
const initialFaqs = [
  {
    id: 1,
    question: "Does astrology really work?",
    answer: "Yes, astrology can provide valuable information and guidance by analyzing planetary patterns and their expected influence on human life. Its effectiveness varies from person to person, but many find astrology consultations helpful for personal growth and decision-making.",
  },
  {
    id: 2,
    question: "How much do astrologers charge?",
    answer: "The charges for an astrology consultation can depend on the knowledge and experience of the astrologer, the type of consultation, and the duration. For any details, contact us and we will provide you with our astrologers and their rates.",
  },
  {
    id: 3,
    question: "How do I consult an astrologer?",
    answer: "Consulting an astrologer is easy with our platform. You can book a session with the best online astrologer by visiting our website, choosing your preferred astrologer based on their expertise, and scheduling an appointment at your convenience for a personal, online astrology consultation.",
  },
  {
    id: 4,
    question: "Why do people consult astrologers?",
    answer: "People consult astrologers for various reasons, to get to know more about their career, love life, financial future, and more. Astrology can offer guidance on upcoming decisions and help individuals understand their personality traits and life patterns through horoscope prediction.",
  },
  {
    id: 5,
    question: "Are astrology predictions true?",
    answer: "Astrology predictions are based on the interpretation of planetary movements and their supposed influence on human affairs. While many find these predictions to be accurate and insightful, the truthfulness can depend on the skill of the astrologer and the individual’s belief in astrology. Our astrologers provide guidance that matches with the individual’s life and choices.",
  },
  {
    id: 6,
    question: "Why are astrologers so expensive?",
    answer: "The cost associated with astrology consultations, especially with the best astrologer in India, is because of their years of study, experience, and the personalized service they provide. Crafting a personalized horoscope and providing in-depth consultations require time and expertise, which is often reflected in the price.",
  },
  {
    id: 7,
    question: "Is online astrology accurate?",
    answer: "Online astrology, provided by experienced and skilled astrologers, can be just as accurate as in-person consultations. An online astrologer has the skills to offer insights and predictions with the same level of detail and precision, using your birth chart and other astrological tools, even from a distance.",
  },
  {
    id: 8,
    question: "Are online astrologers good?",
    answer: "Yes, many online astrologers are highly skilled and capable of providing valuable insights and accurate horoscope predictions. We ensure that only the best astrologers are available for our online consultation, maintaining a high standard of accuracy and guidance.",
  },
  {
    id: 9,
    question: "Who is a good astrologer?",
    answer: "A good astrologer is someone who has a deep understanding of astrological principles, years of experience, and the ability to provide accurate, personalized predictions and advice. They should be empathetic, professional, and committed to helping clients navigate their lives with the guidance of astrology.",
  },
  {
    id: 10,
    question: "Is there a free talk to astrologers?",
    answer: "We offer initial free horoscope online readings. While in-depth sessions with the best astrologers might come with a fee, you can often find options for a free online horoscope or a short consultation to get started.",
  },
];



function FaqSection() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  

  const toggleFaq = (id) => {
    setExpandedFaq((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className="text-gray-600 body-font py-7 testimonial_bg">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Frequently Asked Questions
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {initialFaqs.map((faq) => (
            <div key={faq.id} className="p-4 md:w-1/2 w-full">
              <div
                className={`border border-pure-greys-100 p-4 rounded-lg ${
                  expandedFaq === faq.id
                    ? "border-indigo-500"
                    : "border-gray-300"
                }`}
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <h2 className="text-lg text-newBlue font-medium title-font mb-2 cursor-pointer">
                    {faq.question}
                  </h2>
                  {expandedFaq === faq.id ? (
                    <IoMdArrowDropup className="text-2xl transition-all" />
                  ) : (
                    <IoMdArrowDropdown className="text-2xl transition-all" />
                  )}
                </div>
                {expandedFaq === faq.id && (
                  <>
                    <p className="leading-relaxed p-2 bg-richblack-5 rounded-lg text-sm text-newBlue">
                      {faq.answer}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

export default FaqSection;
