// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from 'react-router-dom';

// import { uploadVideo } from "../../../../services/operations/videoAPI";
// import { setVideos } from "../../../../slices/videosSlice";
// import IconBtn from "../../../common/IconBtn";
// import Upload from "../AddCourse/Upload";

// export default function AddVideos() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();
//   const { courseId } = useParams();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const { token } = useSelector((state) => state.auth);
//   const { videos } = useSelector((state) => state.videos);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("video", data.video);
//     formData.append("courseId", courseId); // Add courseId to the form data
    
// console.log(formData.entries())
//  // Log formData contents
//  for (let [key, value] of formData.entries()) {
//     console.log(key, value);
//   }

//     try {
//       const result = await uploadVideo(formData, token); // Pass token to uploadVideo function
//       if (result) {
//         const updatedVideos = [...videos, result];
//         dispatch(setVideos(updatedVideos));
//         toast.success("Video added successfully");
//         // Reset form fields
//         setValue("title", "");
//         setValue("description", "");
//         setValue("video", null);

//       }
//     } catch (error) {
//       console.error("Error uploading video:", error);
//     } finally {
//       setLoading(false);
//       navigate(`/dashboard/my-courses`)
//     }
//   };
    

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="max-w-lg mx-auto bg-richblack-800 p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl text-white font-semibold mb-4">Add Video</h2>
//         <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//           <Upload
//             name="video"
//             label="Video"
//             register={register}
//             setValue={setValue}
//             errors={errors}
//             video={true}
//           />
//           <div className="mb-4 mt-4">
//             <label htmlFor="title" className="block text-white text-sm font-medium text-gray-700">
//               Video Title
//             </label>
//             <input
//               id="title"
//               type="text"
//               name="title"
//               {...register("title", { required: true })}
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.title && (
//               <span className="text-red-500 text-sm">Video title is required</span>
//             )}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="description" className="block text-white text-sm font-medium text-gray-700">
//               Video Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               {...register("description", { required: true })}
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.description && (
//               <span className="text-red-500 text-sm">Video description is required</span>
//             )}
//           </div>
//           <div className="flex justify-end">
//             <IconBtn
//               type="submit"
//               disabled={loading}
//               text={loading ? "Adding..." : "Add Video"}
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



// New Code

// AddVideos.jsx

// AddVideos.jsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { uploadVideo } from "../../../../services/operations/videoAPI";
import { setVideos } from "../../../../slices/videosSlice";
import IconBtn from "../../../common/IconBtn";
import Upload from "../AddCourse/Upload";

export default function AddVideos() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { videos } = useSelector((state) => state.videos);

  const constructFormData = (data, courseId) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoUrl", data.videoUrl);
    formData.append("courseId", courseId);
    formData.append("videoUrl", data.videoUrl);
    formData.append("pdfUrl", data.pdfUrl);
    for (let i = 0; i < data.imagesUrl.length; i++) {
      formData.append("imagesUrl", data.imagesUrl[i]);
    }
    return formData;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = constructFormData(data, courseId);

    try {
      const result = await uploadVideo(formData, token);
      if (result) {
        const updatedVideos = [...videos, result];
        dispatch(setVideos(updatedVideos));
        toast.success("Video added successfully");
        // Reset form fields
        setValue("title", "");
        setValue("description", "");
        setValue("videoUrl", null);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setLoading(false);
      navigate(`/dashboard/my-courses`);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-lg mx-auto bg-richblack-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-white font-semibold mb-4">Add Video</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Upload
            name="videoUrl"
            label="videoUrl"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
          />
          <Upload
            name="pdfUrl"
            label="pdfUrl"
            register={register}
            setValue={setValue}
            errors={errors}
            pdf={true}
          />
          <Upload
            name="imagesUrl"
            label="imagesUrl"
            register={register}
            setValue={setValue}
            errors={errors}
            video={false}
            pdf={false}
            multiple={true}
      
          />

        
          <div className="mb-4 mt-4">
            <label htmlFor="title" className="block text-white text-sm font-medium text-gray-700">
              Video Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              {...register("title", { required: true })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">Video title is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-white text-sm font-medium text-gray-700">
              Video Description
            </label>
            <textarea
              id="description"
              name="description"
              {...register("description", { required: true })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">Video description is required</span>
            )}
          </div>
          <div className="flex justify-end">
            <IconBtn
              type="submit"
              disabled={loading}
              text={loading ? "Adding..." : "Add Video"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}