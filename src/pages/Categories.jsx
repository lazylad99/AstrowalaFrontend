import React, { useEffect, useState } from "react";
import { fetchCourseCategories } from "../services/operations/courseDetailsAPI";
import Loading from "./../components/common/Loading";
import Footer from "../components/common/Footer";
import CategoryCard from "../components/common/CategoryCard";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/common/Modal";
import CategoryForm from "../components/core/Catalog/CategoryForm";
import { useSelector } from "react-redux";

function Categories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

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

  const handleAddCategory = (formData) => {
    console.log("Form Data:", formData);
    // Handle form submission logic here, like calling an API to save the data
    setShowModal(false);
  };

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
    <div className="bg-course-details">
      {/* Categories Section */}
      <div className="relative mx-auto box-content w-full  max-w-maxContentTab px-4 py-12 mt-5 lg:max-w-maxContent">
        <div className="flex justify-between">
          <h1 className="bg-gradient-to-b text-bold from-[#0b0b0b] via-[#464545] to-[#aaa8a8] text-transparent bg-clip-text text-4xl font-semibold lg:w-[60%]">
            Categories
          </h1>
          {user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
          <button
            className="button-36"
            onClick={() => setShowModal(true)}
          >
            Add Categories+
          </button>}
        </div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {categoriesData.map((category, i) => (
              <Link to={`/catalog/${category._id}`} key={i}>
                <CategoryCard category={category} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <CategoryForm onSubmit={handleAddCategory} />
      </Modal>
    </div>
  );
}

export default Categories;
