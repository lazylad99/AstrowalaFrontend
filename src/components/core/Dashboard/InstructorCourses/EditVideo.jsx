import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchVideoData, editVideoDetails } from "../../../../services/operations/videoAPI";
import { setEditVideo, setVideos } from "../../../../slices/videosSlice";
import Loading from "../../../common/Loading";
import Upload from "../AddCourse/Upload";
import IconBtn from "../../../common/IconBtn";
import { toast } from "react-hot-toast";
import UploadMultipleImages from "./UploadMultipleImages";

export default function EditVideo() {
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

  useEffect(() => {
    const getVideoDetails = async () => {
      setLoading(true);
      const result = await fetchVideoData(videoId, token);
      if (result) {
        dispatch(setEditVideo(true));
        dispatch(setVideos(result));
        setValue("title", result.title);
        setValue("description", result.description);
        setValue("videoUrl", result.videoUrl);
        setValue("pdfUrl", result.pdfUrl);
        setValue("imagesUrl", result.imagesUrl);
      }
      setLoading(false);
    };

    getVideoDetails();
  }, [videoId, token, dispatch, setValue]);

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
      const result = await editVideoDetails(videoId, formData, token);
      setLoading(false);
      if (result) {
        dispatch(setVideos(result));
        navigate(`/dashboard/${courseId || videos?.courseId}/videos`);
      }
    } else {
      toast.error("No changes made to the form");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-4xl mx-auto bg-black p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="flex flex-col">
            <Upload
              name="videoUrl"
              label="Video"
              register={register}
              setValue={setValue}
              errors={errors}
              editData={editVideo ? videos?.videoUrl : null}
              video
            />
            <Upload
              name="pdfUrl"
              label="PDF"
              register={register}
              setValue={setValue}
              errors={errors}
              editData={editVideo ? videos?.pdfUrl : null}
              pdf
            />
            <UploadMultipleImages
              name="imagesUrl"
              label="Images"
              register={register}
              setValue={setValue}
              errors={errors}
              editData={editVideo ? videos?.imagesUrl : null}
            />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="title" className="block text-white text-sm font-medium">
              Video Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: true })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">Video title is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-white text-sm font-medium">
              Video Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: true })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">Video description is required</span>
            )}
          </div>
          <div className="flex justify-end">
            <IconBtn type="submit" disabled={loading} text={loading ? "Updating..." : "Update Video"} />
          </div>
        </form>
      </div>
    </div>
  );
}
