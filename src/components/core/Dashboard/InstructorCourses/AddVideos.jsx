// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   uploadVideo,
//   updateVideo,
// } from "../../../../services/operations/videoAPI";
// import { setVideos } from "../../../../slices/videosSlice";
// import IconBtn from "../../../common/IconBtn";
// import Upload from "../AddCourse/Upload";

// export default function AddVideos() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { courseId, videoId } = useParams();
//   const [loading, setLoading] = useState(false);
//   const { token } = useSelector((state) => state.auth);
//   const { video, editVideo, videos } = useSelector((state) => state.videos);

//   useEffect(() => {
//     if (editVideo && video) {
//       setValue("title", video.title);
//       setValue("description", video.description);
//       setValue("videoUrl", video.videoUrl);
//       setValue("pdfUrl", video.pdfUrl);
//       setValue("imagesUrl", video.imagesUrl);
//     }
//   }, [editVideo, video, setValue]);

//   const constructFormData = (data) => {
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("courseId", courseId);
//     formData.append("videoUrl", data.videoUrl[0]);
//     formData.append("pdfUrl", data.pdfUrl[0]);
//     for (let i = 0; i < data.imagesUrl.length; i++) {
//       formData.append("imagesUrl", data.imagesUrl[i]);
//     }
//     return formData;
//   };

//   const onSubmit = async (data) => {
//     setLoading(true);
//     const formData = constructFormData(data);
//     try {
//       let result;
//       if (editVideo) {
//         result = await updateVideo(videoId, formData, token);
//         if (result) {
//           const updatedVideos = videos.map((vid) =>
//             vid._id === videoId ? result : vid
//           );
//           dispatch(setVideos(updatedVideos));
//           toast.success("Video updated successfully");
//         }
//       } else {
//         result = await uploadVideo(formData, token);
//         if (result) {
//           const updatedVideos = [...videos, result];
//           dispatch(setVideos(updatedVideos));
//           toast.success("Video added successfully");
//         }
//       }
//       navigate(`/dashboard/${courseId}/videos`);
//     } catch (error) {
//       console.error("Error uploading video:", error);
//       toast.error("Failed to upload video");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="max-w-lg mx-auto bg-richwhite-800 p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl text-white font-semibold mb-4">
//           {editVideo ? "Edit Video" : "Add Video"}
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//           <Upload
//             name="videoUrl"
//             label="Video"
//             register={register}
//             setValue={setValue}
//             errors={errors}
//             video={true}
//           />
//           <Upload
//             name="pdfUrl"
//             label="PDF"
//             register={register}
//             setValue={setValue}
//             errors={errors}
//             pdf={true}
//           />
//           <Upload
//             name="imagesUrl"
//             label="Images"
//             register={register}
//             setValue={setValue}
//             errors={errors}
//             video={false}
//             pdf={false}
//             multiple={true}
//           />
//           <div className="mb-4 mt-4">
//             <label
//               htmlFor="title"
//               className="block text-white text-sm font-medium"
//             >
//               Video Title
//             </label>
//             <input
//               id="title"
//               type="text"
//               {...register("title", { required: true })}
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.title && (
//               <span className="text-red-500 text-sm">
//                 Video title is required
//               </span>
//             )}
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="description"
//               className="block text-white text-sm font-medium"
//             >
//               Video Description
//             </label>
//             <textarea
//               id="description"
//               {...register("description", { required: true })}
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.description && (
//               <span className="text-red-500 text-sm">
//                 Video description is required
//               </span>
//             )}
//           </div>
//           <div className="flex justify-end">
//             <IconBtn
//               type="submit"
//               disabled={loading}
//               text={
//                 loading
//                   ? editVideo
//                     ? "Updating..."
//                     : "Adding..."
//                   : editVideo
//                   ? "Update Video"
//                   : "Add Video"
//               }
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// AddVideos.jsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchVideoData,
  // editVideoDetails,
} from "../../../../services/operations/videoAPI";
import { setVideos } from "../../../../slices/videosSlice";
import IconBtn from "../../../common/IconBtn";
import Upload from "../AddCourse/Upload";

export default function AddVideos() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { courseId, videoId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { videos } = useSelector((state) => state.videos);

  const [videoUrl, setVideoUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [imagesUrl, setImagesUrl] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const video = await fetchVideoData(videoId);
        if (video) {
          setVideoUrl(video.videoUrl);
          setPdfUrl(video.pdfUrl);
          setImagesUrl(video.imagesUrl);
          setValue("title", video.title);
          setValue("description", video.description);
          setValue("videoUrl", videoUrl);
          setValue("pdfUrl", pdfUrl);
          setValue("imagesUrl", imagesUrl);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchData();
  }, [videoId, setValue]);

  const constructFormData = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoUrl", data.videoUrl[0]);
    formData.append("pdfUrl", data.pdfUrl[0]);
    for (let i = 0; i < data.imagesUrl.length; i++) {
      formData.append("imagesUrl", data.imagesUrl[i]);
    }
    return formData;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = constructFormData(data);
    try {
      const result = await editVideoDetails(videoId, formData, token);
      if (result) {
        const updatedVideos = videos.map((video) =>
          video._id === videoId ? result : video
        );
        dispatch(setVideos(updatedVideos));
        toast.success("Video updated successfully");
      }
    } catch (error) {
      console.error("Error updating video:", error);
    } finally {
      setLoading(false);
      navigate(`/dashboard/my-courses`);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-lg mx-auto bg-richwhite-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-white font-semibold mb-4">Edit Video</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {videoUrl && (
            <div className="mb-4">
              <label className="block text-white text-sm font-medium text-gray-700">
                Current Video
              </label>
              <video src={videoUrl} controls className="w-full mt-1 mb-4" />
            </div>
          )}
          {pdfUrl && (
            <div className="mb-4">
              <label className="block text-white text-sm font-medium text-gray-700">
                Current PDF
              </label>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                View PDF
              </a>
            </div>
          )}
          {imagesUrl && imagesUrl.length > 0 && (
            <div className="mb-4">
              <label className="block text-white text-sm font-medium text-gray-700">
                Current Images
              </label>
              <div className="flex flex-wrap">
                {imagesUrl.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="w-1/4 h-auto mt-1 mr-2"
                  />
                ))}
              </div>
            </div>
          )}
          <Upload
            name="videoUrl"
            label="Upload New Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
          />
          <Upload
            name="pdfUrl"
            label="Upload New PDF"
            register={register}
            setValue={setValue}
            errors={errors}
            pdf={true}
          />
          <Upload
            name="imagesUrl"
            label="Upload New Images"
            register={register}
            setValue={setValue}
            errors={errors}
            video={false}
            pdf={false}
            multiple={true}
          />

          <div className="mb-4 mt-4">
            <label
              htmlFor="title"
              className="block text-white text-sm font-medium text-gray-700"
            >
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
              <span className="text-red-500 text-sm">
                Video title is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-white text-sm font-medium text-gray-700"
            >
              Video Description
            </label>
            <textarea
              id="description"
              name="description"
              {...register("description", { required: true })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                Video description is required
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <IconBtn
              type="submit"
              disabled={loading}
              text={loading ? "Updating..." : "Update Video"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
