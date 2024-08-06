import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { uploadVideo } from "../../../../services/operations/videoAPI";
import { setVideos } from "../../../../slices/videosSlice";
import { toast } from "react-hot-toast";
import Upload from "../AddCourse/Upload";
import IconBtn from "../../../common/IconBtn";
import ConfirmationModal from "../../../common/ConfirmationModal"; // Import your ConfirmationModal component

export default function AddVideo() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      videos: [
        { title: "", description: "", videoUrl: "", pdfUrl: "", imagesUrl: [] },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "videos" });

  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const formDataArray = data.videos.map((videoData) => {
      const formData = new FormData();
      formData.append("title", videoData.title);
      formData.append("description", videoData.description);
      formData.append("courseId", courseId);
      formData.append("videoUrl", videoData.videoUrl);
      formData.append("pdfUrl", videoData.pdfUrl);
      videoData.imagesUrl.forEach((image) =>
        formData.append("imagesUrl", image)
      );
      return formData;
    });

    const results = await Promise.all(
      formDataArray.map((formData) => uploadVideo(formData, token))
    );

    if (results.every((result) => result)) {
      dispatch(setVideos(results));
      setIsModalOpen(true); // Open the modal
    } else {
      toast.error("Failed to upload one or more videos");
    }
    setLoading(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate(`/dashboard/${courseId}/videos`);
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="max-w-4xl mx-auto bg-newBlue p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4">
              <div className="flex flex-col">
                <Upload
                  name={`videos[${index}].videoUrl`}
                  label="Video"
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  video
                />
                <Upload
                  name={`videos[${index}].pdfUrl`}
                  label="PDF"
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  pdf
                />
                <Upload
                  name={`videos[${index}].imagesUrl`}
                  label="Images"
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  multiple
                />
              </div>
              <div className="mb-4 mt-4">
                <label
                  htmlFor={`videos[${index}].title`}
                  className="block text-white text-sm font-medium"
                >
                  Video Title
                </label>
                <input
                  id={`videos[${index}].title`}
                  type="text"
                  {...register(`videos[${index}].title`, { required: true })}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.videos?.[index]?.title && (
                  <span className="text-red-500 text-sm">
                    Video title is required
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor={`videos[${index}].description`}
                  className="block text-white text-sm font-medium"
                >
                  Video Description
                </label>
                <textarea
                  id={`videos[${index}].description`}
                  {...register(`videos[${index}].description`, {
                    required: true,
                  })}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.videos?.[index]?.description && (
                  <span className="text-red-500 text-sm">
                    Video description is required
                  </span>
                )}
              </div>

              <div className="flex">
                <div>
                  <button
                    type="button"
                    className="mr-3 button-36"
                    onClick={() => remove(index)}
                  >
                    Remove Video
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="mr-3 button-36"
                    onClick={() =>
                      append({
                        title: "",
                        description: "",
                        videoUrl: "",
                        pdfUrl: "",
                        imagesUrl: [],
                      })
                    }
                  >
                    Add Another Video
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <IconBtn
              type="submit"
              disabled={loading}
              text={loading ? "Uploading..." : "Upload Videos"}
            />
          </div>
        </form>
      </div>
      {isModalOpen && (
        <ConfirmationModal
          modalData={{
            text1: "Videos Uploaded Successfully",
            text2: "Your videos have been successfully uploaded and is in Draft Section. Add them to course to make them available to the public.",
            btn1Text: "Go to Videos",
            btn2Text: "Close",
            btn1Handler: () => {
              navigate(`/dashboard/${courseId}/videos`);
              handleModalClose();
            },
            btn2Handler: handleModalClose,
          }}
        />
      )}
    </div>
  );
}
