import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { bypassTransactionThroughTeacher } from "../../../../services/operations/studentFeaturesAPI"
import { useSelector } from "react-redux";

// Example courses data
const courses = [
  "Vedic Astrology",
  "Medical Astrology",
  "Advance Level Numerology",
  "Advanced Vedic Astrology",
  "Foundation of Numerology",
  "Master Level Numerology",
];

export default function HandlePayment() {

  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitForm = async (data) => {
    try {
      setLoading(true);
      // Submit form data to the server
      const response = await bypassTransactionThroughTeacher(data, token)
      setLoading(false);
      reset({
        studentEmail: "",
        courses: [],
        amountPaid: "",
        nextPaymentDate: "",
      });
    } catch (error) {
      console.error("Error while submitting form:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        studentEmail: "",
        courses: [],
        amountPaid: "",
        nextPaymentDate: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      className="flex flex-col gap-7 p-6 mx-auto mt-8 bg-white border  rounded-lg shadow-lg w-full max-w-[600px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="studentEmail" className="lable-style">
          Student Email
        </label>
        <input
          type="email"
          name="studentEmail"
          id="studentEmail"
          placeholder="Enter student email"
          className="form-style"
          {...register("studentEmail", { required: true })}
        />
        {errors.studentEmail && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter the student's email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="lable-style">Courses</label>
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-1/2">
            {courses.slice(0, 3).map((course, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={course}
                  {...register("courses")}
                />
                {course}
              </label>
            ))}
          </div>
          <div className="flex flex-col gap-2 lg:w-1/2">
            {courses.slice(3).map((course, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={course}
                  {...register("courses")}
                />
                {course}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amountPaid" className="lable-style">
          Amount Paid
        </label>
        <input
          type="number"
          name="amountPaid"
          id="amountPaid"
          placeholder="Enter amount paid"
          className="form-style"
          {...register("amountPaid", { required: true })}
        />
        {errors.amountPaid && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter the amount paid.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="nextPaymentDate" className="lable-style">
          Date of Next Payment
        </label>
        <input
          type="date"
          name="nextPaymentDate"
          id="nextPaymentDate"
          className="form-style"
          {...register("nextPaymentDate", { required: true })}
        />
        {errors.nextPaymentDate && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please select the date of next payment.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md w-full max-w-[300px] mx-auto button-36 bg-pink-200 px-6 py-3 text-center text-[13px] font-bold text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richwhite-500 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
  );
}
