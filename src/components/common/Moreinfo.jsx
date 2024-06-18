import img from "../../assets/Images/astro_images/astrology-service-500x500.png";
import { Link } from "react-router-dom";

const MoreInfo = () => {
  return (
    <div className="container bg-blue-800 text-white mb-8 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="relative flex items-center">
          <img
            src={img}
            alt="Astrowala Image"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col text-center items-center justify-center p-8">
          <h1 className="text-3xl font-bold mb-4">
            Discover the Best Astrologer Online for Consultation
          </h1>

          <div className="mb-8">
            <h4 className="text-sm font-semibold">
              At Astrowala, we connect you with the best astrologer in India for
              online consultation. Our platform is home to a team of skilled
              astrologers known for their deep understanding of the stars and
              planets, offering personalized and insightful readings. Whether
              you're seeking guidance on career, love, finance, or personal
              growth, our best astrologers are here to provide you with the
              clarity and direction you need.
            </h4>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-semibold">
              Astrowala is known for its accurate prediction astrology services.
              Our experts use a combination of traditional techniques and modern
              technology to provide the best prediction astrology has to offer.
              With years of experience and a passion for the subject, our
              astrologers make sure that every consultation is custom to meet
              your specific needs and questions.
            </h4>
          </div>

          <div className="text-center lg:text-left">
            <Link
              to={"/catalog/6662ad7dbb3aa094b1109871"}
              className="inline-block bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
            >
              Our Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
