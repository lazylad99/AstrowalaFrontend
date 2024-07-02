import img from "../../assets/Images/Horoscope Imgs/new8.png";
import { Link } from "react-router-dom";

const MoreInfo = () => {
  return (
    <div className="container rounded-xl text-white mx-auto mt-[150px]">
              <div className="absolute left-100 bottom-100 w-full h-[25px] opacity_layer_bg2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2  bg2 rounded-3xl p-10">
        {/* Image Section */}
        <div className="relative flex items-center">
          <img
            src={img}
            alt="Astrowala Image"
            className="w-full h-auto object-cover ml-12 rounded-lg shadow-lg"
            style={{ maxHeight: "450px", maxWidth: "450px" }} // Adjust max height as needed
          />
          
        </div>
        
        {/* Text Section */}
        <div className="flex flex-col justify-center items-center p-8 rounded-3xl mr-10">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Discover the Best Astrologer Online for Consultation
          </h1>

          <div className="mb-8">
            <h4 className="text-sm font-semibold  text-center">
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
            <h4 className="text-sm font-semibold  text-center">
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
              className="inline-block bg-pink-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
              style={{ textShadow: "none" }}
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
