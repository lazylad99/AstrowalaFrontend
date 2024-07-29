import { Link } from "react-router-dom";
import bg from "../../assets/Images/astro_images/black1.jpg";

const MoreInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${bg})`,
          // transform: 'rotate(-1deg)', // Rotate the image slightly counterclockwise
        }}
      ></div>
      <div className="relative h-[800px] md:h-[800px] lg:h-[550px] w-full flex flex-col items-center justify-center text-center p-8 text-white">
        <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-4">
          Discover the Best Astrologer Online for Consultation
        </h1>
        <div className="mb-8 mx-4 md:mx-[100px] lg:mx-[350px]">
          <h4 className="text-sm md:text-lg lg:text-xl font-semibold">
            At Astrowala, we connect you with the best astrologer in India for online consultation. Our platform is home to a team of skilled astrologers known for their deep understanding of the stars and planets, offering personalized and insightful readings. Whether you're seeking guidance on career, love, finance, or personal growth, our best astrologers are here to provide you with the clarity and direction you need.
          </h4>
        </div>
        <div className="mb-8 mx-4 md:mx-[100px] lg:mx-[350px]">
          <h4 className="text-sm md:text-lg lg:text-xl font-semibold">
            Astrowala is known for its accurate prediction astrology services. Our experts use a combination of traditional techniques and modern technology to provide the best prediction astrology has to offer. With years of experience and a passion for the subject, our astrologers make sure that every consultation is custom to meet your specific needs and questions.
          </h4>
        </div>
        <div>
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
  );
};

export default MoreInfo;
