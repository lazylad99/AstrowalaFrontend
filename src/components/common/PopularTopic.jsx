import {
  FaBook,
  FaStar,
  FaMagic,
  FaUserGraduate,
  FaBookReader,
  FaBookDead,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const topics = [
  {
    name: "Vedic Astrology",
    color: "bg-[#9B1FE8]",
    textColor: "text-[#dfc2f1]",
    icon: <FaBook />,
    path: "catalog/6662ad7dbb3aa094b1109871",
  },
  {
    name: "Advance Level Numerology",
    color: "bg-yellow-200",
    textColor: "text-yellow-800",
    icon: <FaStar />,
    path: "catalog/6662adb8bb3aa094b1109875",
  },
  {
    name: "Advance Level Numerology",
    color: "bg-red-200",
    textColor: "text-red-800",
    icon: <FaMagic />,
    path: "catalog/6662adc8bb3aa094b1109879",
  },
  {
    name: "Foundation of Numerology",
    color: "bg-teal-200",
    textColor: "text-teal-800",
    icon: <FaUserGraduate />,
    path: "catalog/6662adbfbb3aa094b1109877",
  },
  {
    name: "Master Level Numerology",
    color: "bg-orange-200",
    textColor: "text-orange-800",
    icon: <FaBookReader />,
    path: "catalog/6662add9bb3aa094b110987d",
  },
  {
    name: "Vastu Shastra",
    color: "bg-blue-200",
    textColor: "text-blue-800",
    icon: <FaBookDead />,
    path: "catalog/6662ad7dbb3aa094b1109871",
  },
];

const PopularTopic = () => {
  return (
    <div className="container mx-auto px-5 pb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Popular Topics</h2>
        <Link to={"catalog/6662ad7dbb3aa094b1109871"} className="px-4 py-2 bg-newBlue text-white rounded-lg">
          Show All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {topics.map((topic, index) => (
          <Link to={topic.path}
            key={index}
            className={`flex items-center p-2 rounded-lg bg-white text-black border border-pure-greys-100 `}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-lg  mr-4 bg-richblack-5 text-pure-greys-600`}
            >
              {topic.icon}
            </div>
            <p className="text-lg font-medium">{topic.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTopic;
