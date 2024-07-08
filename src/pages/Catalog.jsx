import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Footer from "../components/common/Footer";
import Course_Card from "../components/core/Catalog/Course_Card";
import Course_Slider from "../components/core/Catalog/Course_Slider";
import Loading from "./../components/common/Loading";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import img1 from "../assets/Images/astro_images/banner6.png";
import img2 from "../assets/Images/Horoscope Imgs/img4.jpg";

function Catalog() {
  const { catID } = useParams();
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
      <div className="w-full h-[200px] md:h-[500px] absolute top-0 left-0 overflow-hidden object-cover ">
        <img src={img1} alt="Background" className="w-full h-full" />
      </div>

      {/* Hero Section */}
      <div className="relative h-[450px] md:h-[250px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent text-white translate1">
        <div className="flex min-h-[30px] m-3 max-w-maxContentTab mt-10 flex-col gap-5 lg:max-w-maxContent ">
          <p className="text-sm text-richwhite-300 mb-2">
            {`Home / Categories / `}
            <span className="text-yellow-25">
              {catalogPageData?.selectedCategory?.category?.name}
            </span>
          </p>
          <p className="text-3xl text-white">
            {catalogPageData?.selectedCategory?.category?.name}
          </p>
          <p className="max-w-[870px] text-pure-greys-100">
            {catalogPageData?.selectedCategory?.category?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="relative z-10 mx-auto box-content w-full max-w-maxContentTab px-4 py-12 mt-[120px] lg:max-w-maxContent">
        {/* <div className="absolute w-full h-[200px] md:h-[500px] top-0 left-0 overflow-hidden object-cover ">
                    <img src={img2} alt="Background" className="w-full h-full" />
                </div> */}
        <h1 className="z-50 section_heading">Courses to get you started</h1>
        <div className="my-4 flex border-b border-b-richblack-500 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1 ? "border-b text-richblack-500" : "text-black0"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2 ? "border-b text-richblack-500" : "text-black0"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <Course_Slider Courses={catalogPageData?.selectedCategory?.courses} />
        </div>
      </div>

      {/* Section 2 */}
      {/* <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">
                    Top courses in {catalogPageData?.differentCategory?.name}
                </div>
                <div>
                    <Course_Slider Courses={catalogPageData?.differentCategory?.courses} />
                </div>
            </div> */}

      {/* Section 3 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {" "}
            {/* Adjusted grid-cols */}
            {catalogPageData?.mostSellingCourses
              ?.slice(0, 6) // Displaying 6 items in 3 columns (2 per column)
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

export default Catalog
