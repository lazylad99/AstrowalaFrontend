import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";

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
    <div className="flex items-center justify-center bg-gray-900">
      <div className="w-96 p-10 bg-black bg-opacity-50 shadow-lg rounded-lg login-box">
        <h2 className="mb-8 text-2xl text-center text-white">Sign Up</h2>
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-6">
          <div className="flex gap-x-4">
            <div className="user-box mb-4 w-full">
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                className="w-full py-2 px-3 text-lg bg-gray-800 border border-gray-700 text-black rounded"
              />
              <label className="text-black ml-2 mb-2">First Name</label>
            </div>

            <div className="user-box mb-4 w-full">
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                className="w-full py-2 px-3 text-lg bg-gray-800 border border-gray-700 text-black rounded"
              />
              <label className="text-black ml-2 mb-2">Last Name</label>
            </div>
          </div>

          <div className="user-box mb-4 w-full">
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="w-full py-2 px-3 text-lg bg-gray-800 border border-gray-700 text-black rounded"
            />
            <label className="text-black ml-2 mb-2">Email Address</label>
          </div>

          <div className="user-box mb-4 w-full relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              className="w-full py-2 px-3 text-lg bg-gray-800 border border-gray-700 text-black rounded"
            />
            <label className="text-black ml-2 mb-2">Create Password</label>
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#000" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#000" />
              )}
            </span>
          </div>

          <div className="user-box w-full relative">
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              className="w-full py-2 px-3 text-lg bg-gray-800 border border-gray-700 text-black rounded"
            />
            <label className="text-black ml-2 mb-2">Confirm Password</label>
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#000" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#000" />
              )}
            </span>
          </div>

          <button
            type="submit"
            className="button-36"
          >
            Create Account
          </button>

          <p className="text-center text-xs text-white">
            Already have an account?{" "}
            <span className="text-md hover:underline">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;