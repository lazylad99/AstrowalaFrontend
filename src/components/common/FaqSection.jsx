import  { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

// Sample FAQ data
const initialFaqs = [
  {
    id: 1,
    question: "What is our service?",
    answer: "We provide accurate prediction astrology.",
  },
  {
    id: 2,
    question: "How can I contact support?",
    answer: "You can contact us through our support page.",
  },
  {
    id: 3,
    question: "What is our refund policy?",
    answer: "We offer a 30-day money-back guarantee.",
  },
];



function FaqSection() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  

  const toggleFaq = (id) => {
    setExpandedFaq((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className="text-gray-600 body-font py-7">
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
                    <p className="leading-relaxed text-newBlue text-base">
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
