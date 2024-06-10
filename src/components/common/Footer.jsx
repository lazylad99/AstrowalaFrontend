import React from "react";
import { Link } from "react-router-dom";
import { ImFacebook, ImYoutube, ImInstagram } from "react-icons/im";

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
const QuickLinks = ["Home", "About", "Courses", "Contact Us"];

const Footer = () => {
  return (
    <div className="bg-richwhite-700 mx-7 rounded-3xl mb-10">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblue-400 leading-6 mx-auto relative py-14">
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
                <ImFacebook className="cursor-pointer hover:scale-95" />
                <ImYoutube className="cursor-pointer hover:scale-95" />
                <ImInstagram className="cursor-pointer hover:scale-95" />
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
                    <Link to={ele.toLowerCase().replace(/\s+/g, "-")}>
                      {ele}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblue-500  font-semibold text-[16px]">
                Services
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {Services.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblue-500  transition-all duration-200"
                  >
                    <Link to={ele.toLowerCase().replace(/\s+/g, "-")}>
                      {ele}
                    </Link>
                  </div>
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
                <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
              </div>
            ))}
          </div>

          <div className="text-center flex flex-col sm:flex-row">
            <div className="flex">
              <span>Made with ❤️</span>
              <Link
                to=" "
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
