import img from "../../assets/Images/Horoscope Imgs/new8.png";
import { Link } from "react-router-dom";
import bg from "../../assets/Images/astro_images/bg1.png"

const MoreInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center">
    <div className="relative h-[600px] md:h-[800px] w-full justify-center mx-auto flex flex-col items-center">
      <div className="absolute w-full h-[650px] md:h-[750px] overflow-hidden object-cover">
      <div className="absolute left-100 bottom-100 w-full h-[30px] opacity_layer_bg2"></div>
      <img src={bg} alt="Background" className="absolute top-0 left-0 w-full h-full object-cover"  />
      <div className="absolute left-0 bottom-0 w-full h-[80px] opacity_layer_bg"></div>
      </div>
      
      {/* Text Overlay Section */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white p-8">
        <h1 className="text-4xl font-bold mb-4 m-10 text-center">
          Discover the Best Astrologer Online for Consultation
        </h1>

        <div className="mb-8 mx-[250px]">
          <h4 className="text-md font-semibold text-center">
            At Astrowala, we connect you with the best astrologer in India for
            online consultation. Our platform is home to a team of skilled
            astrologers known for their deep understanding of the stars and
            planets, offering personalized and insightful readings. Whether
            you're seeking guidance on career, love, finance, or personal
            growth, our best astrologers are here to provide you with the
            clarity and direction you need.
          </h4>
        </div>

        <div className="mb-8 mx-[250px]">
          <h4 className="text-md font-semibold text-center">
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
            className="inline-block button-36"
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
