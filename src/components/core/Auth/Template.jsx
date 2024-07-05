import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import img1 from "../../../assets/Images/Img4.jpg";
import Img from "./../../common/Img";

function Template({ title, description1, description2, image, formType }) {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-pure-greys-25 overflow-hidden">
      {/* Background Image */}
      <Img
        src={img1}
        alt="background"
        className="absolute inset-0 object-cover w-full h-full opacity-30"
      />

      <div className="relative flex w-11/12 max-w-4xl mx-auto bg-black rounded-lg shadow-lg">
        {/* Form container */}
        <div className="w-full  p-12 rounded-l-lg">
          <div className="mt-6">
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
        </div>

        {/* Text container */}
        <div className="flex flex-col justify-center w-full max-w-md p-12 bg-white rounded-r-lg">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-black">
            {title}
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-black">{description1}</span>{" "}
            <span className="font-edu-sa font-bold italic text-richblack-400">
              {description2}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Template;
