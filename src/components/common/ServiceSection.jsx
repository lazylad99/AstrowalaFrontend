import {
  FaRegBookmark,
  FaRegCompass,
  FaRegFileAlt,
  FaRegGem,
  FaRegLightbulb,
  FaRegNewspaper,
} from "react-icons/fa";
import ServiceCard from "./ServiceCard";

const ServiceSection = () => {
  const services = [
    {
      title: "Mega Astrology Webinar",
      description:
        "Join our Mega Astrology Webinar and learn about the future.",
      icon: <FaRegLightbulb className="w-8 h-8" />,
    },
    {
      title: "Astrology Consultation",
      description: "Get your astrology consultation from the best astrologers.",
      icon: <FaRegCompass className="w-8 h-8" />,
    },
    {
      title: "Astrology Courses",
      description: "Learn Astrology from the best teachers in the industry.",
      icon: <FaRegBookmark className="w-8 h-8" />,
    },
    {
      title: "Astrology Books",
      description: "Get the best astrology books from our online store.",
      icon: <FaRegFileAlt className="w-8 h-8" />,
    },
    {
      title: "Astrology Merchandise",
      description: "Buy Astrology Merchandise from our online store.",
      icon: <FaRegGem className="w-8 h-8" />,
    },
    {
      title: "Astrology Blog",
      description: "Read our Astrology Blog and learn about the stars.",
      icon: <FaRegNewspaper className="w-8 h-8" />,
    },
    {
      title: "Astrology Consultation",
      description: "Get your astrology consultation from the best astrologers.",
      icon: <FaRegCompass className="w-8 h-8" />,
    },
    {
      title: "Astrology Courses",
      description: "Learn Astrology from the best teachers in the industry.",
      icon: <FaRegBookmark className="w-8 h-8" />,
    },
  ];

  return (
    <div className="testimonial_bg">
      <section className="relative mx-auto box-content w-full max-w-maxContentTab px-4 pb-4 mb-12 lg:max-w-maxContent lg:w-full ">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-semibold text-center">Our Services</h2>
          <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
            We provide the best services for our customers
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 mt-10 sm:grid-cols-2 lg:grid-cols-4 p-4 mr-5 sm:mr-0">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              buttonText="Learn More"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServiceSection;
