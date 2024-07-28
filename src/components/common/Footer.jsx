import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ImFacebook, ImYoutube, ImInstagram } from "react-icons/im";
import { FaPhoneSquareAlt, FaEnvelope } from "react-icons/fa";
import AstroWalaLogo from "../../assets/Logo/GyanSrijanLogo.png";
import { fetchCourseCategories } from "./../../services/operations/courseDetailsAPI";

const QuickLinks = ["Home", "About", "Contact"];

const Footer = () => {
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSublinks = async () => {
    try {
      const res = await fetchCourseCategories();
      setSubLinks(res);
    } catch (error) {
      console.log("Could not fetch the category list = ", error);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  return (
    <div className="bg-richblack-800 text-white mx-7 rounded-3xl mb-4">

{/* <div className="absolute left-100 bottom-100 w-full h-[30px] opacity_layer_bg2"></div> */}

      <div className="grid lg:grid-cols-4 gap-8 items-start justify-evenly w-11/12 max-w-maxContent leading-6 mx-auto relative py-14">


        {/* Column 1 */}
        <div className="w-full mb-2 lg:pl-0 lg:w-auto">
          <div className="flex flex-col gap-3">
            <Link to="/" className="logo-container">
              <img
                src={AstroWalaLogo}
                alt="Logo"
                className="logo"
                loading="lazy"
                style={{
                  height: "80px",
                  width: "250px",
                }}
              />
            </Link>
            <p>
              Explore courses, connect with expert readers, discover insightful
              products, and access a vast library of recorded content.
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="w-full ml-10 mb-2 lg:pl-0 lg:w-auto">
          <h1 className="text-richblack-100 font-semibold text-[16px]">
            Quick Links
          </h1>
          <div className="flex flex-col gap-2 mt-2">
            {QuickLinks.map((ele, index) => (
              <div
                key={index}
                className="text-[14px] cursor-pointer hover:text-pure-greys-500 transition-all duration-200"
              >
                {ele === "Home" ? (
                  <Link to="#">Home</Link>
                ) : (
                  <Link to={ele.toLowerCase().replace(/\s+/g, "-")}>{ele}</Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Column 3 */}
        <div className="w-full mb-2 lg:pl-0 lg:w-auto">
          <h1 className="text-richblack-100 font-semibold text-[16px]">
            Services
          </h1>
          <div className="flex flex-col gap-2 mt-2">
            {subLinks?.map((subLink, i) => (
              <Link
                to={`/catalog/${subLink?._id
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
                className="text-[14px] cursor-pointer hover:text-richblack-100 transition-all duration-200"
                key={i}
              >
                <p>{subLink.name}</p>
              </Link>
            ))}
          </div>
        </div>

      

        {/* Column 5 */}
        <div className="w-full mb-2 lg:pl-0 lg:w-auto">
          <h1 className="text-richblack-100 font-semibold text-[16px]">
            Contact Us
          </h1>
          <div className="flex flex-col gap-2 mt-2">
            <div className="text-[14px]">
              <a
                href="tel:+919115717321"
                className="flex items-center space-x-2 text-white mr-5"
              >
                <FaPhoneSquareAlt size={20} />
                <span>+91-91157-17321</span>
              </a>
            </div>
            <div className="text-[14px]">
              <a
                href="mailto:astrowala3@gmail.com"
                className="flex items-center space-x-2 text-white mr-3"
              >
                <FaEnvelope size={20} />
                <span>astrowala3@gmail.com</span>
              </a>
            </div>
          </div>
        
      


  {/* Column 4 */}
        <div className="w-full mb-2 lg:pl-0 lg:w-auto mt-5">
          <h1 className="text-richblack-100 font-semibold text-[16px]">
            Connect with Us
          </h1>
          <div className="flex gap-3 text-lg duration-200">
            <a
                href="https://www.facebook.com/astrowala5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImFacebook className="cursor-pointer hover:scale-95" />
              </a>
              <a
                href="https://www.youtube.com/@AstroWala"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImYoutube className="cursor-pointer hover:scale-95" />
              </a>
              <a
                href="https://www.instagram.com/numerowala/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImInstagram className="cursor-pointer hover:scale-95" />
              </a>
          </div>
        </div></div>
</div>
      {/* Rest of the Footer */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-white mx-auto pb-8 text-sm">
      
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="text-center flex flex-col sm:flex-row">
            <div className="flex">
              <span>
                © 2021 Astrowala All Right Reserved | Designed by: Astrowala
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
