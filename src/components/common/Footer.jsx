import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ImFacebook, ImYoutube, ImInstagram } from "react-icons/im";
import { fetchCourseCategories } from "./../../services/operations/courseDetailsAPI";

// Images
import AstroWalaLogo from "../../assets/Logo/GyanSrijanLogo.png";

// footer data
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Services = [
  "Vedic Astrology",
  "Advanced Vedic Astrology",
  "Foundation of Numerology",
  "Advance Level Numerology",
  "Medical Astrology",
  "Master Level Numerology",
];
const QuickLinks = ["Home", "About", "Contact"];

const Footer = () => {
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSublinks = async () => {
    try {
      setLoading(true);
      const res = await fetchCourseCategories();
      // const result = await apiConnector("GET", categories.CATEGORIES_API);
      // const result = await apiConnector('GET', 'http://localhost:4000/api/v1/course/showAllCategories');
      // console.log("Printing Sublinks result:", result);
      setSubLinks(res);
    } catch (error) {
      console.log("Could not fetch the category list = ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  return (
    <div className="bg-richwhite-700 mx-7 rounded-3xl mb-10">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richwhite-100 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richwhite-700">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richwhite-700 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <Link to="/" className="logo-container">
                <img
                  src={AstroWalaLogo}
                  alt="Logo"
                  className="logo"
                  loading="lazy"
                  style={{
                    height: "60px",
                    width: "auto",
                  }}
                />
              </Link>
              <h1 className="text-richblue-500  font-semibold text-[16px]">
                Connect with Us
              </h1>
              <div className="flex gap-3 text-lg duration-200">
                <Link to="https://www.facebook.com/astrowala5">
                  <ImFacebook className="cursor-pointer hover:scale-95" />
                </Link>
                <Link to="https://www.youtube.com/@AstroWala">
                  <ImYoutube className="cursor-pointer hover:scale-95" />
                </Link>
                <Link to="https://www.instagram.com/numerowala/?hl=en">
                  <ImInstagram className="cursor-pointer hover:scale-95" />
                </Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblue-500  font-semibold text-[16px]">
                Quick Links
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {QuickLinks.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblue-500  transition-all duration-200"
                  >
                    {ele === "Home" ? (
                      <Link to="#">Home</Link>
                    ) : (
                      <Link to={ele.toLowerCase().replace(/\s+/g, "-")}>
                        {ele}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblue-500  font-semibold text-[16px]">
                Services
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {subLinks?.map((subLink, i) => (
                  <Link
                    to={`/catalog/${subLink._id
                      .split(" ")
                      .join("-")
                      .toLowerCase()}`}
                    className="text-[14px] cursor-pointer hover:text-richblue-500  transition-all duration-200"
                    key={i}
                  >
                    <p>{subLink.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            <div className="w-[35%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblue-500  font-semibold text-[16px]">
                Contact Us
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                <div className="text-[14px]">+91-91157-17321</div>
                <div className="text-[14px]">astrowala3@gmail.com</div>
              </div>
            </div>

            {/* <div className="w-[35%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblue-500  font-semibold text-[16px]">
                Location
              </h1>
              <div className="text-[14px]">Add your location here</div>
            </div> */}
          </div>
        </div>
      </div>

      {/* bottom footer */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblue-400 mx-auto pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex">
            {BottomFooter.map((ele, ind) => (
              <div
                key={ind}
                className={`${
                  BottomFooter.length - 1 === ind
                    ? ""
                    : "border-r border-richwhite-700"
                } px-3 cursor-pointer hover:text-richblue-500  transition-all duration-200`}
              >
                {/* <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link> */}
                <Link to="#">{ele}</Link>
              </div>
            ))}
          </div>

          <div className="text-center flex flex-col sm:flex-row">
            <div className="flex">
              <span>Made with ❤️</span>
              <Link
                to="#"
                target="__blank"
                className="text-white hover:underline ml-1"
              >
                CODE_YOGIS
              </Link>
            </div>
            <span> © 2024 AstroWala</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
