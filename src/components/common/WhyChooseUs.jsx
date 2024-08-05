import accurateImg from "../../assets/Images/whychooseimg/apw1.png"
function WhyChooseUs() {
  const reasons = [
    {
      id: 1,
      title: 'Accurate Predictions',
      description: 'Our astrology predictions are precise and reliable, ensuring you can trust the guidance you receive.',
      icon: accurateImg, // Replace with your icon path
    },
    {
      id: 2,
      title: 'Expert Astrologers',
      description: 'Our team consists of highly experienced and knowledgeable astrologers.',
      icon: 'path/to/expert-icon.svg', // Replace with your icon path
    },
    {
      id: 3,
      title: 'Personalized Guidance',
      description: 'We provide personalized astrological guidance tailored to your unique life circumstances.',
      icon: 'path/to/personalized-icon.svg', // Replace with your icon path
    },
    {
      id: 4,
      title: 'Trusted Service',
      description: 'We pride ourselves on providing accurate prediction astrology that you can trust.',
      icon: 'path/to/trust-icon.svg', // Replace with your icon path
    },
    {
      id: 5,
      title: '24/7 Support',
      description: 'Our customer support team is available 24/7 to assist you with any queries or concerns.',
      icon: 'path/to/support-icon.svg', // Replace with your icon path
    },
    {
      id: 6,
      title: 'Free Horoscopes',
      description: 'Get free daily and weekly horoscopes to know what the stars have in store for you.',
      icon: 'path/to/horoscope-icon.svg', // Replace with your icon path
    },{
      id: 7,
      title: 'Vastu Consultation',
      description: 'Get expert Vastu consultation to create a harmonious living space.',
      icon: 'path/to/vastu-icon.svg', // Replace with your icon path
    },{
      id: 8,
      title: 'Secure Platform',
      description: 'We ensure your privacy and data security with our safe and secure platform.',
      icon: 'path/to/security-icon.svg', // Replace with your icon path
    }
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Why Choose AstroWala</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div key={reason.id} className="flex flex-col items-center p-6 bg-white rounded-lg border-2 border-pure-greys-100">
              <img src={reason.icon} alt={reason.title} className="w-16 h-16 mb-4" />
              <h3 className="mb-2 text-xl font-semibold text-gray-800">{reason.title}</h3>
              <p className="text-center text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
