import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import img1 from "../../../assets/Images/Img4.jpg";
import Img from "./../../common/Img";

function Template({ title, description1, description2, image, formType }) {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] max-h-[80vh] lg:max-h-[calc(100vh-3.5rem)] items-center justify-center bg-course-details1 overflow-hidden">
      {/* Background Image */}
      <Img
        src={img1}
        alt="background"
        className="absolute inset-0 object-cover w-full h-full opacity-30"
      />

      <div className="relative flex flex-col lg:flex-row w-11/12 max-w-5xl mx-auto bg-black rounded-lg shadow2">
        {/* Text container */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-12 bg-white rounded-t-lg lg:rounded-t-none lg:rounded-l-lg">
          <h1 className="text-[1.5rem] lg:text-[1.875rem] font-semibold leading-[2.375rem] text-black">
            {title}
          </h1>
          <p className="mt-4 text-sm lg:text-[1.125rem] leading-[1.625rem]">
            <span className="text-black">{description1}</span>{" "}
            <span className="font-edu-sa font-bold italic text-richblack-400">
              {description2}
            </span>
          </p>
        </div>

        {/* Form container */}
        <div className="w-full lg:w-1/2 p-6 pt-0 lg:p-12 bg-black rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none h-auto max-h-[65vh] lg:max-h-[initial] order-2 lg:order-2">
          <div className="mt-6">
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template;