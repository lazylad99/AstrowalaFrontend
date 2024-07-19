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
    <div className="flex items-center justify-center bg-gray-900">
      <div className="w-96 p-10 bg-black bg-opacity-50 shadow-lg rounded-lg login-box">
        <h2 className="mb-8 text-2xl text-center text-white">Login</h2>
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-6">
          <div className="user-box mb-2">
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="w-full py-2 px-3 text-lg bg-gray-800 border border-gray-700 p-5 rounded"
            />          
              <label className=" text-black ml-2 mb-2">Email Address</label>

          </div>
          <div className=" user-box">
            <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          className="w-full py-2 px-3 text-lg bg-gray-800 border border-gray-700  rounded"
          />            
          <label className=" text-black ml-2 mb-2">Password</label>

        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[12px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#000" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#000" />
          )}
        </span>
           <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-white hover:underline">
            Forgot Password
          </p>
        </Link>
          </div>
          <button
            type="submit"
            className="button-36"
          >
            Sign In
          </button>
          <p className="text-center text-xs text-white">
            New Here? <span className="text-md hover:underline"><Link to="/signup">Sign Up</Link></span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
