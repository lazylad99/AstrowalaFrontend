import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import {ACCOUNT_TYPE} from "../../utils/constants"



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

// Modal styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function FaqSection() {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({
    id: null,
    question: "",
    answer: "",
  });
  const [expandedFaq, setExpandedFaq] = useState(null);

  const openModal = (faq) => {
    setCurrentFaq(faq);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentFaq({ id: null, question: "", answer: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentFaq((prevFaq) => ({ ...prevFaq, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentFaq.id === null) {
      // Add new FAQ
      setFaqs((prevFaqs) => [
        ...prevFaqs,
        { id: prevFaqs.length + 1, ...currentFaq },
      ]);
    } else {
      // Update existing FAQ
      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) => (faq.id === currentFaq.id ? currentFaq : faq))
      );
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id));
  };

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <section className="text-gray-600 body-font py-7">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Frequently Asked Questions
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-4 md:w-1/2 w-full">
              <div
                className={`border p-4 rounded-lg ${
                  expandedFaq === faq.id
                    ? "border-indigo-500"
                    : "border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleFaq(faq.id)}
                >
                  <h2
                    className="text-lg text-gray-900 font-medium title-font mb-2 cursor-pointer"
                    
                  >
                    {faq.question}
                  </h2>
                  {expandedFaq === faq.id ? ( <IoMdArrowDropup className="text-2xl transition-all" /> ) : ( <IoMdArrowDropdown className="text-2xl transition-all" /> )}
                </div>
                {expandedFaq === faq.id && (
                  <>
                    <p className="leading-relaxed text-base">{faq.answer}</p>
                    <div className="mt-4">
                      <button
                        onClick={() => openModal(faq)}
                        className="px-4 text-sm py-2 bg-newBlue text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="ml-4 text-sm px-4 py-2 bg-button-color text-white rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {
          ACCOUNT_TYPE === "Instructor" && (
            <button
              onClick={openModal}
              className="mt-8 px-4 py-2 bg-newBlue text-white rounded-md"
            >
              Add FAQ
            </button>
          )
        }
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit FAQ"
      >
        <h2 className="text-2xl mb-4">
          {currentFaq.id === null ? "Add FAQ" : "Edit FAQ"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700"
            >
              Question
            </label>
            <input
              type="text"
              id="question"
              name="question"
              value={currentFaq.question}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700"
            >
              Answer
            </label>
            <textarea
              id="answer"
              name="answer"
              value={currentFaq.answer}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-newBlue text-white rounded-md"
          >
            Save
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="ml-4 px-4 py-2 bg-button-color text-white rounded-md"
          >
            Cancel
          </button>
        </form>
      </Modal>
    </section>
  );
}

export default FaqSection;
