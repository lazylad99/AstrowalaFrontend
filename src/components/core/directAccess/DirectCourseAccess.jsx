import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { directAccessCourse } from "../../../services/operations/directCourseAccessAPI";
import { getAllCourses } from "../../../services/operations/courseDetailsAPI";

function DirectCourseAccess() {
  const [courseId, setCourseId] = useState("");
  const [studentEmails, setStudentEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [expirationPeriod, setExpirationPeriod] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [courses, setCourses] = useState([]);


  

  const { token } = useSelector((state) => state.auth);

  const handleAddEmail = (e) => {
    e.preventDefault();
    if (emailInput && !studentEmails.includes(emailInput)) {
      setStudentEmails([...studentEmails, emailInput]);
      setEmailInput("");
    }
  };

  const handleRemoveEmail = (email) => {
    setStudentEmails(studentEmails.filter((e) => e !== email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = {
      courseId,
      studentEmails,
      expirationPeriod: Number(expirationPeriod),
    };

    try {
      const response = await directAccessCourse(data, token);
      if (response.success) {
        setMessage(response.message);
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAllCourses = async () => {
    try {
      const response = await getAllCourses();
      setCourses(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleAllCourses();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-6">Enroll Students</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Course</label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseName} - ₹{course.price}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Student Email</label>
        <div className="flex">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddEmail(e);
              }
            }}
            className="flex-grow p-2 border border-gray-300 rounded-l"
          />
          <button
            type="button"
            onClick={handleAddEmail}
            className="px-4 bg-blue-500 text-white rounded-r"
          >
            Add
          </button>
        </div>
      </div>
      {studentEmails.length > 0 && (
        <ul className="mb-4">
          {studentEmails.map((email, index) => (
            <li key={index} className="flex items-center justify-between p-2 border-b">
              <span>{email}</span>
              <button
                type="button"
                onClick={() => handleRemoveEmail(email)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Expiration Period (days)</label>
        <input
          type="number"
          value={expirationPeriod}
          onChange={(e) => setExpirationPeriod(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 bg-blue-500 text-white rounded ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        {loading ? "Enrolling..." : "Enroll Students"}
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
}

export default DirectCourseAccess;
