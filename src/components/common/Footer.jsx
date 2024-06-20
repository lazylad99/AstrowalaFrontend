import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ImFacebook, ImYoutube, ImInstagram } from "react-icons/im";
import { fetchCourseCategories } from "./../../services/operations/courseDetailsAPI";

// Images
import AstroWalaLogo from "../../assets/Logo/GyanSrijanLogo.png";

// footer data
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const QuickLinks = ["Home", "About", "Contact"];

const Footer = () => {
  const [subLinks, setSubLinks] = useState([]);
  const [
    // loading,
    setLoading,
  ] = useState(false);

  const fetchSublinks = async () => {
    try {
      setLoading(true);
      const res = await fetchCourseCategories();
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
    <div className="bg-pure-greys-100 mx-7 rounded-3xl mb-4">
      <div className="grid lg:grid-cols-4 gap-8 items-start justify-between w-11/12 max-w-maxContent text-pure-greys-500 leading-6 mx-auto relative py-14">
        {/* Column 1 */}
        <div className="w-full mb-2 lg:pl-0">
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
              products, and access a vast library of recorded content. Unlock
              the secrets written in the stars.
            </p>
            <h1 className="text-richblue-500 font-semibold text-[16px]">
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
        </div>

        {/* Column 2 */}
        <div className="w-full mb-2 lg:pl-0">
          <h1 className="text-richblue-500 font-semibold text-[16px]">
            Quick Links
          </h1>
          <div className="flex flex-col gap-2 mt-2">
            {QuickLinks.map((ele, index) => (
              <div
                key={index}
                className="text-[14px] cursor-pointer hover:text-richblue-500 transition-all duration-200"
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
        <div className="w-full mb-2 lg:pl-0">
          <h1 className="text-richblue-500 font-semibold text-[16px]">
            Services
          </h1>
          <div className="flex flex-col gap-2 mt-2">
            {subLinks?.map((subLink, i) => (
              <Link
                to={`/catalog/${subLink?._id
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
                className="text-[14px] cursor-pointer hover:text-richblue-500 transition-all duration-200"
                key={i}
              >
                <p>{subLink.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 4 */}
        <div className="w-full mb-2 lg:pl-0">
          <h1 className="text-richblue-500 font-semibold text-[16px]">
            Contact Us
          </h1>
          <div className="flex flex-col gap-2 mt-2">
            <div className="text-[14px]">+91-91157-17321</div>
            <div className="text-[14px]">astrowala3@gmail.com</div>
          </div>
        </div>
      </div>

      {/* Rest of the Footer */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblue-400 mx-auto pb-8 text-sm">
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
                <Link to="#">{ele}</Link>
              </div>
            ))}
          </div>

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
