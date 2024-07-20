import React, { useEffect, useState } from 'react';
import { fetchCourseCategories } from '../../../services/operations/courseDetailsAPI';
import Loading from '../../common/Loading';
import { Link } from 'react-router-dom';
import img from "../../../assets/Images/border.png";

const CategoryCard = ({ category }) => (
  <div className="category-card h-60 relative flex items-center hover:scale-105 justify-center w-[95%] sm:w-64 md:w-72 lg:w-full">
    <img
      src={img}
      alt="border"
      className="absolute inset-0 w-full h-full object-cover rounded-lg pointer-events-none "
    />
    <h3 className="relative text-lg font-semibold text-center">{category.name}</h3>
  </div>
);

const CoursesCatalog = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchCourseCategories();
        setCategoriesData(res);
      } catch (error) {
        console.log("Error fetching categories data:", error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <Loading />
      </div>
    );
  }

  if (!loading && (!categoriesData || categoriesData.length === 0)) {
    return (
      <div className="text-white text-4xl flex justify-center items-center mt-[20%]">
        No Categories found
      </div>
    );
  }

  return (
    <div>
      {/* Categories Section */}
      <div className="relative mx-auto box-content w-full max-w-maxContentTab px-4 py-4 mt-5 mb-12 lg:max-w-maxContent">
        <div className="flex justify-between">
          <h1 className="bg-gradient-to-b text-center from-[#000000] via-[#303232] to-[#b3afaf] text-transparent p-4 mb-3 bg-clip-text text-4xl font-semibold lg:w-[100%] mx-auto">
            Explore Our Courses
          </h1>
        </div>
        <div className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {categoriesData.map((category, i) => (
              <Link to={`/catalog/${category._id}`} key={i}>
                <CategoryCard category={category} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesCatalog;
