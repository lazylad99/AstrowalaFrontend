import React, { useState } from 'react';
import Select from "react-select";
import axios from 'axios';

const BASE_URL = 'https://example.com/'; // Replace with your actual base URL

const EnrollStudentsForm = () => {
  const [formData, setFormData] = useState({
    selectedCourse: null,
    studentEmails: [""],
    expirationPeriod: "",
  });
  
  const coursesOptions = [
    { value: "Components of Numerology", label: "Components of Numerology" },
    { value: "Advanced Numerological Analysis Techniques", label: "Advanced Numerological Analysis Techniques" },
    { value: "Introduction to Vedic Astrology", label: "Introduction to Vedic Astrology" },
    { value: "Medical Astrology", label: "Medical Astrology" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCourseChange = (selectedOption) => {
    setFormData({
      ...formData,
      selectedCourse: selectedOption,
    });
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...formData.studentEmails];
    newEmails[index] = value;
    setFormData({
      ...formData,
      studentEmails: newEmails,
    });
  };

  const addEmailField = () => {
    setFormData({
      ...formData,
      studentEmails: [...formData.studentEmails, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}payment/enroll-directly`, formData);
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-black text-white p-5 rounded-xl">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">
            Select Course
          </label>
          <Select
            id="course"
            name="course"
            value={formData.selectedCourse}
            onChange={handleCourseChange}
            options={coursesOptions}
            className="shadow appearance-none border rounded w-full text-black py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Student Emails
          </label>
          {formData.studentEmails.map((email, index) => (
            <div key={index} className="mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addEmailField}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Email
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expirationPeriod">
            Expiration Period
          </label>
          <input
            type="date"
            id="expirationPeriod"
            name="expirationPeriod"
            value={formData.expirationPeriod}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="button-36"
        >
          Enroll Students
        </button>
      </form>
    </div>
  );
};

export default EnrollStudentsForm;
