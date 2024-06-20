import React from "react";

const cardData = [
  {
    id: 1,
    title: "Expert Astrologers",
    description:
      "Our team includes some of the best astrologers in India, each with their own area of specialization. Each astrologer is skilled in interpreting birth charts and planetary movements, providing best prediction astrology for your unique situation.",
  },
  {
    id: 2,
    title: "Accuracy",
    description:
      "We pride ourselves on providing accurate prediction astrology that you can trust.",
  },
  {
    id: 3,
    title: "Personalized Astrology Consultations",
    description:
      "Every reading is tailored to your life, your questions, and your path. Our astrologers will review your birth chart and provide advice and precise astrological predictions for your concerns about love, job, finances, or health.",
  },
];

const Card = () => (
  <div className="cards-container">
    <div className="card">
      <div className="card-icon">{/* Placeholder for SVG icon */}</div>

      {cardData.map((card, index) => (
        <div className="card-content" key={index}>
          <h3 className="card-title">{card.title}</h3>
          <p className="card-description">{card.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const App = () => (
  <div className="cards-container">
    {cardData.map((card) => (
      <Card key={card.id} title={card.title} description={card.description} />
    ))}
  </div>
);

export default App;
