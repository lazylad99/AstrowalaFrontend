import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="relative flex items-center  justify-center bg-gray-100">
      <div className="w-96 p-10  bg-black shadow rounded-lg ">
        <h2 className="mb-8 text-2xl text-center text-white">Login</h2>
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-6 ">
          <div className="relative mb-4 mt-2">
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="peer w-full py-2 text-lg bg-transparent border-b-2 border-white text-white outline-none"
              placeholder=" "
            />
            <label className="absolute top-0 left-0 py-2 text-lg ml-4 text-white transition-all duration-500 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-6 peer-focus:text-sm">
              Email Address <sup className="text-pink-200">*</sup>
            </label>
          </div>
          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              className="peer w-full py-2 text-lg bg-transparent border-b-2 border-white text-white outline-none"
              placeholder=" "
            />
            <label className="absolute top-0 left-0 py-2 text-lg ml-4 text-white transition-all duration-500 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-6 peer-focus:text-sm">
              Password <sup className="text-pink-200">*</sup>
            </label>
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-0 mr-2 top-3 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            <Link to="/forgot-password">
              <p className="mt-1 text-right text-xs text-white">
                Forgot Password
              </p>
            </Link>
          </div>
          <button
            type="submit"
            className="mt-3 button-36 py-2 px-4"
          >
            Sign In
          </button>

          
              <p className=" text-center text-xs text-white">
                New Here?<span className="text-md hover:underline"><Link to="/signup"> Sign Up</Link></span> 
              </p>
            
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
