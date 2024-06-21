// AddVideos.jsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateVideo,
  uploadVideo,
} from "../../../../services/operations/videoAPI";
import { setVideos } from "../../../../slices/videosSlice";
import { toast } from "react-hot-toast";
import Upload from "../AddCourse/Upload";
import IconBtn from "../../../common/IconBtn";

export default function AddVideos() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { videoId } = useParams();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { videos, editVideo } = useSelector((state) => state.videos);
  const [loading, setLoading] = useState(false);

  const courseID = courseId || videos?.courseId;

  useEffect(() => {
    if (editVideo && videos) {
      setValue("title", videos?.title);
      setValue("description", videos?.description);
      setValue("videoUrl", videos?.videoUrl);
      setValue("pdfUrl", videos?.pdfUrl);
      setValue("imagesUrl", videos?.imagesUrl);
    }
  }, [editVideo, videos, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.title !== videos?.title ||
      currentValues.description !== videos?.description ||
      currentValues.videoUrl !== videos?.videoUrl ||
      currentValues.pdfUrl !== videos?.pdfUrl ||
      currentValues.imagesUrl !== videos?.imagesUrl
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (editVideo) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        formData.append("videoId", videoId);

        if (currentValues.title !== videos?.title) {
          formData.append("title", data.title);
        }
        if (currentValues.description !== videos?.description) {
          formData.append("description", data.description);
        }
        if (currentValues.videoUrl !== videos?.videoUrl) {
          formData.append("video", data.videoUrl);
        }
        if (currentValues.pdfUrl !== videos?.pdfUrl) {
          formData.append("pdf", data.pdfUrl);
        }
        if (currentValues.imagesUrl !== videos?.imagesUrl) {
          for (let i = 0; i < data.imagesUrl.length; i++) {
            formData.append("imagesUrl", data.imagesUrl[i]);
          }
        }

        setLoading(true);
        const result = await updateVideo(videoId, formData, token);
        setLoading(false);
        if (result) {
          dispatch(setVideos(result));
          navigate(`/dashboard/${courseID}/videos`);
        }
      } else {
        toast.error("No changes made to the form");
      }
    } else {
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("courseId", courseId);
      formData.append("videoUrl", data.videoUrl);
      formData.append("pdfUrl", data.pdfUrl);
      for (let i = 0; i < data.imagesUrl.length; i++) {
        formData.append("imagesUrl", data.imagesUrl[i]);
      }

      setLoading(true);
      const result = await uploadVideo(formData, token);
      if (result) {
        dispatch(setVideos(result));
        navigate(`/dashboard/${courseID}/videos`);
      }
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-">
      <div className="max-w-lg mx-auto bg-richwhite-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* {video.videoUrl && (
            <div className="mb-4">
              <label className="block text-white text-sm font-medium text-gray-700 " >
                Current Video
              </label>
              <video src={video.videoUrl} controls className="w-full mt-1 mb-4" />
            </div>
          )}
          {video.pdfUrl && (
            <div className="mb-4">
              <label className="block text-white text-sm font-medium text-gray-700">
                Current PDF
              </label>
              <a
                href={video.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                View PDF
              </a>
            </div>
          )}
          {video.imagesUrl.length > 0 && (
            <div className="mb-4">
              <label className="block text-white text-sm font-medium text-gray-700">
                Current Images
              </label>
              <div className="flex flex-wrap">
                {video.imagesUrl.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="w-1/4 h-auto mt-1 mr-2"
                  />
                ))}
              </div>
            </div>
          )} */}

          <Upload
            name="videoUrl"
            label="Upload New Video"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editVideo ? videos?.videoUrl : null}
            video
          />
          <Upload
            name="pdfUrl"
            label="Upload New PDF"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editVideo ? videos?.pdfUrl : null}
            pdf
          />
          <Upload
            name="imagesUrl"
            label="Upload New Images"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editVideo ? videos?.imagesUrl : null}
            multiple
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
              text={
                loading
                  ? `${videoId ? "Updating..." : "Adding..."} `
                  : `${videoId ? "Update Video" : "Add Video"}`
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
