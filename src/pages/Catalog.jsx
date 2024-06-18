import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// import CourseCard from "../components/Catalog/CourseCard"
// import CourseSlider from "../components/Catalog/CourseSlider"
import Footer from "../components/common/Footer"
import Course_Card from '../components/core/Catalog/Course_Card'
import Course_Slider from "../components/core/Catalog/Course_Slider"
import Loading from './../components/common/Loading';
import { getCatalogPageData } from '../services/operations/pageAndComponentData'
// import { fetchCourseCategories } from './../services/operations/courseDetailsAPI';




function Catalog() {

    const { catID } = useParams()
    const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null)
    // const [categoryId, setCategoryId] = useState("")
    const [loading, setLoading] = useState(false);


    // Fetch All Categories
    // useEffect(() => {
    //     ; (async () => {
    //         try {
    //             const res = await fetchCourseCategories();
    //             console.log(res)
    //             const category_id = res[0]._id;
    //             console.log(res)
    //             setCategoryId(category_id)
    //         } catch (error) {
    //             console.log("Could not fetch Categories.", error)
    //         }
    //     })()
    // }, [catID])


    useEffect(() => {
        console.log('Fetching catalog data for category ID:', catID);
        if (catID) {
            (async () => {
                setLoading(true);
                try {
                    const res = await getCatalogPageData(catID);
                    setCatalogPageData(res);
                    // console.log('Fetched catalog data:', res);
                } catch (error) {
                    console.log('Error fetching catalog data:', error);
                }
                setLoading(false);
            })();
        }
    }, [catID]);
    

    // console.log('======================================= ', catalogPageData)
    // console.log('categoryId ==================================== ', categoryId)

    if (loading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Loading />
            </div>
        )
    }
    if (!loading && !catalogPageData) {
        return (
            <div className="text-white text-4xl flex justify-center items-center mt-[20%]">
                No Courses found for selected Category
            </div>)
    }

    return (
      <>
        {/* Hero Section */}
        <div className=" box-content bg-richwhite-800 px-4">
          <div className="mx-auto flex min-h-[260px] m-3 max-w-maxContentTab flex-col justify-center gap-5 lg:max-w-maxContent ">
            <p className="text-sm text-richwhite-300">
              {`Home / Catalog / `}
              <span className="text-yellow-25">
                {catalogPageData?.selectedCategory?.category?.name}
              </span>
            </p>
            <p className="text-3xl text-black">
              {catalogPageData?.selectedCategory?.category?.name}
            </p>
            <p className="max-w-[870px] text-richwhite-200">
              {catalogPageData?.selectedCategory?.category?.description}
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">Courses to get you started</div>
          <div className="my-4 flex border-b border-b-richwhite-600 text-sm">
            <p
              className={`px-4 py-2 ${
                active === 1
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-black0"
              } cursor-pointer`}
              onClick={() => setActive(1)}
            >
              Most Popular
            </p>
            <p
              className={`px-4 py-2 ${
                active === 2
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-black0"
              } cursor-pointer`}
              onClick={() => setActive(2)}
            >
              New
            </p>
          </div>
          <div>
            <Course_Slider
              Courses={catalogPageData?.selectedCategory?.courses}
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">
            Top courses in {catalogPageData?.differentCategory?.name}
          </div>
          <div>
            <Course_Slider
              Courses={catalogPageData?.differentCategory?.courses}
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">Frequently Bought</div>
          <div className="py-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {catalogPageData?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, i) => (
                  <Course_Card course={course} key={i} Height={"h-[300px]"} />
                ))}
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
}

export default Catalog
