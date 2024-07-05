import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  return (
    <div className="relative h-auto w-[400px] shadow flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-opacity-50 bg-black shadow-lg rounded-lg">
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4">
          <div className="flex gap-x-4">
            <div className="relative w-full">
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                className="peer w-full py-2 text-lg bg-transparent border-b-2 border-white text-white outline-none"
                placeholder=" "
              />
              <label className="absolute ml-2 top-0 left-0 py-2 text-lg text-white transition-all duration-500 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-6 peer-focus:text-sm">
                First Name <sup className="text-pink-200">*</sup>
              </label>
            </div>

            <div className="relative mb-4 w-full">
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                className="peer w-full py-2 text-lg bg-transparent border-b-2 border-white text-white outline-none"
                placeholder=" "
              />
              <label className="absolute ml-2 top-0 left-0 py-2 text-lg text-white transition-all duration-500 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-6 peer-focus:text-sm">
                Last Name <sup className="text-pink-200">*</sup>
              </label>
            </div>
          </div>

          <div className="relative mb-4 w-full">
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="peer w-full py-2 text-lg bg-transparent border-b-2 border-white text-white outline-none"
              placeholder="  "
            />
            <label className="absolute ml-2 top-0 left-0 py-2 text-lg text-white transition-all duration-500 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-6 peer-focus:text-sm">
              Email Address <sup className="text-pink-200">*</sup>
            </label>
          </div>

          <div className="relative mb-4 w-full">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              className="peer w-full py-2 text-lg bg-transparent border-b-2 border-white text-white outline-none"
              placeholder=" "
            />
            <label className="absolute ml-2 top-0 left-0 py-2 text-lg text-white transition-all duration-500 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-6 peer-focus:text-sm">
              Create Password <sup className="text-pink-200">*</sup>
            </label>
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute ml-2 right-3 top-2 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>

          <div className="relative mb-4 w-full">
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              className="peer w-full py-2 text-lg bg-transparent border-b-2 border-white text-white outline-none"
              placeholder=" "
            />
            <label className="absolute ml-2 top-0 left-0 py-2 text-lg text-white transition-all duration-500 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-6 peer-focus:text-sm">
              Confirm Password <sup className="text-pink-200">*</sup>
            </label>
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-2 cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>

          <button
            type="submit"
            className=" button-36"
          >
            Create Account
          </button>

          <p className=" text-center text-xs text-white">
                Already have a account?<span className="text-md hover:underline"><Link to="/login"> Login</Link></span> 
              </p>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
