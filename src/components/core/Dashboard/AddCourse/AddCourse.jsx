// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { HiOutlineCurrencyRupee } from "react-icons/hi";
// import { MdNavigateNext } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   addCourseDetails,
//   editCourseDetails,
//   fetchCourseCategories,
// } from "../../../../services/operations/courseDetailsAPI";
// import { setCourse } from "../../../../slices/courseSlice";
// // import { COURSE_STATUS } from "../../../../utils/constants";
// import IconBtn from "../../../common/IconBtn";
// import Upload from "./Upload";
// import PublishCourse from "./PublishCourse/index";

// export default function AddCourse() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);
//   const { course, editCourse } = useSelector((state) => state.course);
//   const [loading, setLoading] = useState(false);
//   const [courseCategories, setCourseCategories] = useState([]);
//   // console.log({ editCourse });
//   useEffect(() => {
//     const getCategories = async () => {
//       setLoading(true);
//       const categories = await fetchCourseCategories();
//       if (categories.length > 0) {
//         setCourseCategories(categories);
//       }
//       setLoading(false);
//     };

//     getCategories();
//   }, []);

//   useEffect(() => {
//     if (editCourse && course) {
//       setValue("courseTitle", course.courseName);
//       setValue("courseShortDesc", course.courseDescription);
//       setValue("coursePrice", course.price);
//       setValue("courseCategory", course.category._id); // Assuming course.category is an object with _id
//       setValue("courseImage", course.thumbnailUrl);

//       console.log("CategoryId", course.category._id)
//     }
//   }, [course, editCourse, setValue]);

//   const isFormUpdated = () => {
//     const currentValues = getValues();
//     if (
//       currentValues.courseTitle !== course.courseName ||
//       currentValues.courseShortDesc !== course.courseDescription ||
//       currentValues.coursePrice !== course.price ||
//       currentValues.courseCategory !== course.category._id ||
//       currentValues.courseImage !== course.thumbnailUrl
//     ) {
//       return true;
//     }
//     return false;
//   };

//   const onSubmit = async (data) => {
//     if (editCourse) {
//       if (isFormUpdated()) {
//         const currentValues = getValues();
//         const formData = new FormData();
//         formData.append("courseId", course._id);
//         if (currentValues.courseTitle !== course.courseName) {
//           formData.append("courseName", data.courseTitle);
//         }
//         if (currentValues.courseShortDesc !== course.courseDescription) {
//           formData.append("courseDescription", data.courseShortDesc);
//         }
//         if (currentValues.coursePrice !== course.price) {
//           formData.append("price", data.coursePrice);
//         }
//         if (currentValues.courseCategory !== course.category._id) {
//           console.log(currentValues.courseCategory)
//           formData.append("category", data.courseCategory);
//         }
//         if (currentValues.courseImage !== course.thumbnailUrl) {
//           formData.append("thumbnailUrl", data.courseImage[0]);
//         }

//         setLoading(true);
//         const result = await editCourseDetails(formData, token);
//         setLoading(false);
//         if (result) {
//           dispatch(setCourse(result));
//           navigate("/dashboard/my-courses");
//         }
//       } else {
//         toast.error("No changes made to the form");
//       }
//       return;
//     }
//     console.log(data.courseImage);
//     const formData = new FormData();
//     formData.append("courseName", data.courseTitle);
//     formData.append("courseDescription", data.courseShortDesc);
//     formData.append("price", data.coursePrice);
//     formData.append("category", data.courseCategory);
//     // formData.append("status", COURSE_STATUS.DRAFT);
//     formData.append("thumbnailUrl", data.courseImage);

//     setLoading(true);
//     const result = await addCourseDetails(formData, token);
//     if (result) {
//       dispatch(setCourse(result));
//       navigate("/dashboard/my-courses");
//     }
//     setLoading(false);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-8 m-5 rounded-md border-[1px] border-richwhite-700 bg-richwhite-800 p-6 "
//     >
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-black" htmlFor="courseTitle">
//           Course Title <sup className="text-pink-600">*</sup>
//         </label>
//         <input
//           id="courseTitle"
//           placeholder="Enter Course Title"
//           {...register("courseTitle", { required: true })}
//           className="form-style w-full"
//         />
//         {errors.courseTitle && (
//           <span className="ml-2 text-xs tracking-wide text-pink-600">
//             Course title is required
//           </span>
//         )}
//       </div>

//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-black" htmlFor="courseShortDesc">
//           Course Short Description <sup className="text-pink-600">*</sup>
//         </label>
//         <textarea
//           id="courseShortDesc"
//           placeholder="Enter Description"
//           {...register("courseShortDesc", { required: true })}
//           className="form-style resize-x-none min-h-[130px] w-full"
//         />
//         {errors.courseShortDesc && (
//           <span className="ml-2 text-xs tracking-wide text-pink-600">
//             Course Description is required
//           </span>
//         )}
//       </div>

//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-black" htmlFor="coursePrice">
//           Course Price <sup className="text-pink-600">*</sup>
//         </label>
//         <div className="relative">
//           <input
//             id="coursePrice"
//             type="number"
//             placeholder="Enter Course Price"
//             {...register("coursePrice", {
//               required: true,
//               valueAsNumber: true,
//               pattern: {
//                 value: /^(0|[1-9]\d*)(\.\d+)?$/,
//               },
//             })}
//             className="form-style w-full !pl-12"
//           />
//           <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richwhite-400" />
//         </div>
//         {errors.coursePrice && (
//           <span className="ml-2 text-xs tracking-wide text-pink-600">
//             Enter a valid course price
//           </span>
//         )}
//       </div>

//       <div className="flex flex-col space-y-2">
//         <label
//           className="text-sm text-black"
//           htmlFor="courseCategory        "
//         >
//           Course Category
//         </label>
//         <select
//           {...register("courseCategory", { required: true })}
//           defaultValue=""
//           id="courseCategory"
//           className="form-style w-full cursor-pointer"
//         >
//           <option value="" disabled>
//             Choose a Category
//           </option>
//           {!loading &&
//             courseCategories?.map((category, indx) => (
//               <option key={indx} value={category?._id}>
//                 {category?.name}
//               </option>
//             ))}
//         </select>
//       </div>

//       <Upload
//         name="courseImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? [course?.thumbnailUrl] : null}
//       />

//       {/* <PublishCourse /> */}

//       <div className="flex justify-end gap-x-2">
//         {editCourse && (
//           <button
//             onClick={() => navigate("/dashboard/my-courses")}
//             disabled={loading}
//             className={`flex cursor-pointer items-center gap-x-2 rounded-md py-[8px] px-[20px] font-semibold
//               text-richwhite-900 bg-richwhite-300 hover:bg-richwhite-900 hover:text-richwhite-300 duration-300`}
//           >
//             Continue Without Saving
//           </button>
//         )}
//         <IconBtn
//           disabled={loading}
//           text={!editCourse ? "Next" : "Save Changes"}
//         >
//           <MdNavigateNext />
//         </IconBtn>
//       </div>
//     </form>
//   );
// }

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../slices/courseSlice";
// import { COURSE_STATUS } from "../../../../utils/constants";
import IconBtn from "../../../common/IconBtn";
import Upload from "./Upload";
// import PublishCourse from "./PublishCourse/index";

export default function AddCourse() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  // console.log({ editCourse });
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (editCourse && course) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseCategory", course.category._id); // Assuming course.category is an object with _id
      setValue("courseImage", course.thumbnailUrl);

      // console.log("CategoryId", course.category._id);
    }
  }, [course, editCourse, setValue]);

  useEffect(() => {
    if (editCourse && course && courseCategories.length > 0) {
      setValue("courseCategory", course.category._id);
    }
  }, [courseCategories, course, editCourse, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseCategory !== course.category._id ||
      currentValues.courseImage !== course.thumbnailUrl
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseCategory !== course.category._id) {
          console.log(currentValues.courseCategory);
          formData.append("category", data.courseCategory);
        }
        if (currentValues.courseImage !== course.thumbnailUrl) {
          formData.append("thumbnailUrl", data.courseImage);
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setCourse(result));
          navigate("/dashboard/my-courses");
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }
    console.log(data.courseImage);
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("category", data.courseCategory);
    // formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("thumbnailUrl", data.courseImage);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setCourse(result));
      navigate("/dashboard/my-courses");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 m-5 rounded-md border-[1px] border-richwhite-700 bg-richwhite-800 p-6 "
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-black" htmlFor="courseTitle">
          Course Title <sup className="text-pink-600">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-600">
            Course title is required
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-black" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-600">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-600">
            Course Description is required
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-black" htmlFor="coursePrice">
          Course Price <sup className="text-pink-600">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            type="number"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richwhite-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-600">
            Enter a valid course price
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-black" htmlFor="courseCategory">
          Course Category
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full cursor-pointer"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
      </div>

      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? [course?.thumbnailUrl] : null}
      />

      {/* <PublishCourse /> */}

      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => navigate("/dashboard/my-courses")}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md py-[8px] px-[20px] font-semibold
              text-richwhite-900 bg-richwhite-300 hover:bg-richwhite-900 hover:text-richwhite-300 duration-300`}
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
}
