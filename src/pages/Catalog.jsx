import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import Course_Card from "../components/core/Catalog/Course_Card";
import Loading from "./../components/common/Loading";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import img1 from "../assets/Images/astro_images/banner6.png";

function Catalog() {
  const { catID } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Fetching catalog data for category ID:", catID);
    if (catID) {
      (async () => {
        setLoading(true);
        try {
          const res = await getCatalogPageData(catID);
          setCatalogPageData(res);
          console.log(res)
        } catch (error) {
          console.log("Error fetching catalog data:", error);
        }
        setLoading(false);
      })();
    }
  }, [catID]);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <Loading />
      </div>
    );
  }
  if (!loading && !catalogPageData) {
    return (
      <div className="text-white text-4xl flex justify-center items-center mt-[20%]">
        No Courses found for selected Category
      </div>
    );
  }

  return (
    <div className="bg-">
      <div className="w-full h-[400px] sm:h-[400px] md:h-[500px] lg:h-[300px] xl:h-[600px] absolute top-0 left-0 overflow-hidden">
        <img src={img1} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Hero Section */}
      <div className="relative h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] mx-auto flex flex-col w-11/12 max-w-maxContent text-white translate1 sm:justify-center  text-left">
        <div className="flex min-h-[30px] m-3 max-w-maxContentTab mt-10 flex-col gap-5 lg:max-w-maxContent text-left sm:text-left">
        <p className="hidden sm:block text-sm text-richwhite-300 mb-2">
  <span onClick={() => navigate('/')} className="cursor-pointer hover:underline"> Home </span>
  / 
  <span onClick={() => navigate('/categories')} className="cursor-pointer hover:underline"> Categories </span>
  /  
  <span className="text-yellow-25">
    {catalogPageData?.selectedCategory?.category?.name}
  </span>
</p>


          <p className="text-xl sm:text-2xl md:text-3xl item-left text-white">
            {catalogPageData?.selectedCategory?.category?.name}
          </p>
          <p className="max-w-[870px] text-sm sm:text-base md:text-lg text-pure-greys-100">
            {catalogPageData?.selectedCategory?.category?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="relative z-10 mx-auto box-content w-[100%] max-w-maxContentTab px-4 py-12 mt-[120px] lg:max-w-maxContent">
        <h1 className="z-50 section_heading mb-5 m-1">Courses to get you started</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {catalogPageData?.selectedCategory?.courses?.map((course, i) => (
            <Course_Card course={course} key={i} Height={"h-[300px]"} />
          ))}
        </div>
      </div>

      {/* Section 3 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {catalogPageData?.mostSellingCourses
              ?.slice(0, 6)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[300px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Catalog;
