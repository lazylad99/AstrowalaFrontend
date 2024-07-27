import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { bypassTransactionThroughTeacher } from "../../../../services/operations/studentFeaturesAPI";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../../../services/operations/courseDetailsAPI";

export default function HandlePayment() {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const fetchSublinks = async () => {
    try {
      const res = await getAllCourses();
      setSubLinks(res);
    } catch (error) {
      console.log("Could not fetch the category list = ", error);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const submitForm = async (data) => {
    try {
      setLoading(true);
      // Submit form data to the server
      await bypassTransactionThroughTeacher(data, token);
      setLoading(false);
      reset({
        studentEmail: "",
        courses: "",
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
        courses: "",
        amountPaid: "",
        nextPaymentDate: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      className="flex flex-col gap-7 p-6 mx-auto mt-3 bg-white text-black rounded-2xl shadow1 w-full max-w-[600px]"
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
        <label htmlFor="courses" className="lable-style">
          Courses
        </label>
        <select
          name="courses"
          id="courses"
          className=" text-black"
          {...register("courses", { required: true })}
        >
          <option value="">Select a course</option>
          {subLinks.map((course, index) => (
            <option key={index} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
        {errors.courses && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please select a course.
          </span>
        )}
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
