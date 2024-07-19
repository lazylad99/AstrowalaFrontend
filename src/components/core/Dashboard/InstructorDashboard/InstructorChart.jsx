import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students");

  // Function to generate black, white, and gray colors for the chart
  const generateThemeColors = (numColors) => {
    const colors = [];
    const shades = [
      "rgb(0, 0, 0)",
      "rgb(34, 34, 34)",
      "rgb(68, 68, 68)",
      "rgb(102, 102, 102)",
      "rgb(136, 136, 136)",
      "rgb(170, 170, 170)",
      "rgb(204, 204, 204)",
      "rgb(238, 238, 238)",
      "rgb(255, 255, 255)",
    ];
    for (let i = 0; i < numColors; i++) {
      colors.push(shades[i % shades.length]);
    }
    return colors;
  };

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateThemeColors(courses.length),
      },
    ],
  };

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateThemeColors(courses.length),
      },
    ],
  };

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "white", // Color of the legend text
        },
      },
      tooltip: {
        titleColor: "white", // Color of the tooltip title text
        bodyColor: "white", // Color of the tooltip body text
      },
    },
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-xl bg-black p-6">
      <p className="text-lg font-bold text-white">Visualize</p>

      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-500 text-yellow-50"
              : "text-white"
          }`}
        >
          Students
        </button>

        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-500 text-yellow-50"
              : "text-white"
          }`}
        >
          Income
        </button>
      </div>

      <div className="relative text-white mx-auto aspect-square h-full w-full">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}
