import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from '../../../../data/countrycode.json';

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    try {
      setLoading(true);
      // const res = await apiConnector(
      //   "POST",
      //   contactusEndpoint.CONTACT_US_API,
      //   data
      // )
      // console.log("Email Res - ", res)
      setLoading(false);
    } catch (error) {
      console.log("ERROR WHILE CONTACTING US  - ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="relative flex items-center justify-center bg-newBlue">
      <div className="w-100 p-5 bg-newBlue  rounded-lg">
        {/* <h2 className="text-2xl text-center text-white">Contact Us</h2> */}
        <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-7 newform">
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstname" className="text-lg text-white">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter first name"
                className="w-full py-2 px-3 text-lg bg-gray-800 border border-gray-700 p-5 rounded text-black"
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <span className="-mt-1 text-[12px] text-pink-300">
                  Please enter your name.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastname" className="text-lg text-white">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter last name"
                className="w-full py-2 px-3 text-lg bg-gray-800 border border-gray-700 p-5 rounded text-black"
                {...register("lastname")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg text-white">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
                className="w-full py-2 px-3 text-lg bg-gray-800 border border-gray-700 p-5 rounded text-black"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="-mt-1 text-[12px] text-pink-300">
                Please enter your Email address.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phonenumber" className="text-lg text-white">
              Phone Number
            </label>
            <div className="flex gap-5">
              <div className="flex w-[70px] rounded-md flex-col gap-2">
                <select
                  type="text"
                  name="countrycode"
                  id="countrycode"
                  placeholder="Enter country code"
                  className="peer w-full py-2 rounded-sm text-lg bg-white border-b-2 border-white text-black outline-none"
                  {...register("countrycode", { required: true })}
                >
                  {CountryCode.map((ele, i) => (
                    <option key={i} value={ele.code}>
                      {ele.code} - {ele.country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                <input
                  type="number"
                  name="phonenumber"
                  id="phonenumber"
                  placeholder="12345 67890"
                className="w-full py-2 px-3 text-lg bg-gray-800 border border-gray-700 p-5 rounded text-black"
                  {...register("phoneNo", {
                    required: {
                      value: true,
                      message: "Please enter your Phone Number.",
                    },
                    maxLength: { value: 12, message: "Invalid Phone Number" },
                    minLength: { value: 10, message: "Invalid Phone Number" },
                  })}
                />
              </div>
            </div>
            {errors.phoneNo && (
              <span className="-mt-1 text-[12px] text-pink-300">
                {errors.phoneNo.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-lg text-white">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="7"
              placeholder="Enter your message here"
              style={{ color: 'black' }} 
              className="w-full py-2 px-3 text-lg bg-gray-800 border border-gray-700 p-5 rounded text-black"
              {...register("message", { required: true })}
            />
            {errors.message && (
              <span className="-mt-1 text-[12px] text-pink-300">
                Please enter your Message.
              </span>
            )}
          </div>
          <button
            disabled={loading}
            type="submit"
            className={`rounded-md w-1/2 button-36 px-6 py-3 text-center text-[13px] font-bold text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
             ${
               !loading &&
               "transition-all duration-200 hover:scale-95 hover:shadow-none"
             }  disabled:bg-richwhite-500 sm:text-[16px]`}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
