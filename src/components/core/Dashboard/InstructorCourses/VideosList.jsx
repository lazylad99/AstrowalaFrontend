import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../../services/formatDate";
import ConfirmationModal from "../../../common/ConfirmationModal";
import toast from "react-hot-toast";
import video_bg from "../../../../assets/Images/video_bg.png";
import Tab from "../../../common/Tab"; // Assuming you have a Tab component
import Img from "../../../common/Img";
import {
  fetchCourseVideos,
  toggleVideoPublishStatus,
} from "../../../../services/operations/videoAPI";
import IconBtn from "../../../common/IconBtn";

const deleteVideo = async ({ videoId }, token) => {
  return true;
};
const VideosList = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const token = useSelector((state) => state.auth.token); // Get token from Redux store

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [filter, setFilter] = useState("Published"); // State for filtering videos
  const TRUNCATE_LENGTH = 25;

  const tabData = [
    { id: 1, type: "Published", tabName: "Published" },
    { id: 2, type: "Drafted", tabName: "Drafted" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCourseVideos(courseId, token);
      if (result) {
        setVideos(result);
      }
      setLoading(false);
    };
    fetchData();
  }, [courseId, token]);

  const handleVideoDelete = async (videoId) => {
    setLoading(true);
    const toastId = toast.loading("Deleting...");
    await deleteVideo({ videoId }, token);
    const result = await fetchCourseVideos(courseId, token);
    if (result) {
      setVideos(result);
    }
    setConfirmationModal(null);
    setLoading(false);
    toast.dismiss(toastId);
  };

  const togglePublishStatus = async (videoId) => {
    setLoading(true);
    const toastId = toast.loading("Updating status...");
    const result = await toggleVideoPublishStatus(videoId, token);
    if (result.success) {
      toast.success(result.message);
      const updatedVideos = await fetchCourseVideos(courseId, token);
      setVideos(updatedVideos);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
    toast.dismiss(toastId);
  };

  const skItem = () => (
    <Tr className="skeleton-row">
      <Td colSpan={3}>
        <div className="flex flex-wrap border-b border-richwhite-800 px-6 py-8 w-full">
          <div className="h-[148px] min-w-[300px] rounded-xl skeleton "></div>
          <div className="flex flex-col w-full md:w-[60%] ml-4">
            <p className="h-5 w-[50%] rounded-xl skeleton"></p>
            <p className="h-20 w-full md:w-[60%] rounded-xl mt-3 skeleton"></p>
            <p className="h-2 w-[20%] rounded-xl skeleton mt-3"></p>
            <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          </div>
        </div>
      </Td>
    </Tr>
  );

  const filteredVideos = videos.filter((video) =>
    filter === "Published" ? video.isPublished : !video.isPublished
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-richwhite-100">Videos</h1>
        <Tab tabData={tabData} field={filter} setField={setFilter} />
      </div>

      <Table className="rounded-2xl border border-richwhite-800">
        <Thead>
          <Tr className="gap-x-10 rounded-t-3xl border-b border-b-richwhite-800 px-6 py-2">
            <Th className="text-left text-sm font-medium uppercase p-4 text-richwhite-100">
              Videos
            </Th>
            {/* <Th className="text-left text-sm font-medium uppercase p-4 text-richwhite-100">Duration</Th> */}
            <Th className="text-left text-sm font-medium uppercase p-4 text-richwhite-100">
              Actions
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {loading ? (
            <>
              {skItem()}
              {skItem()}
              {skItem()}
            </>
          ) : (
            <>
              {filteredVideos?.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={3}
                    className="py-10 text-center text-2xl font-medium text-richwhite-100"
                  >
                    No videos found
                  </Td>
                </Tr>
              ) : (
                filteredVideos?.map((video) => (
                  <Tr
                    key={video._id}
                    className="gap-x-10 border-b border-richwhite-800 px-6 py-8"
                  >
                    <Td className="flex flex-wrap md:flex-nowrap gap-x-4 relative p-4">
                      <Img
                        src={video_bg}
                        className="h-[148px] min-w-[270px] max-w-[270px] rounded-lg object-cover"
                      />
                      <Link
                        to={`/dashboard/view-video/${video._id}`}
                        className="flex flex-col w-full md:w-auto"
                      >
                        <p className="text-lg font-semibold text-richwhite-5 capitalize">
                          {video.title}
                        </p>
                        <p className="text-xs text-richwhite-300 ">
                          {video.description.split(" ").length > TRUNCATE_LENGTH
                            ? video.description
                                .split(" ")
                                .slice(0, TRUNCATE_LENGTH)
                                .join(" ") + "..."
                            : video.description}
                        </p>
                        <p className="text-[12px] text-richwhite-100 mt-4">
                          Created: {formatDate(video.createdAt)}
                        </p>
                        <p className="text-[12px] text-richwhite-100">
                          Updated: {formatDate(video.updatedAt)}
                        </p>
                        {video.status === "DRAFT" ? (
                          <p className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-richwhite-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                            <HiClock size={14} /> Drafted
                          </p>
                        ) : (
                          <div className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-richwhite-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                            <p className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richwhite-700">
                              <FaCheck size={8} />
                            </p>{" "}
                            Published
                          </div>
                        )}
                      </Link>
                    </Td>
                    <Td className="text-sm font-medium text-richwhite-100">
                      {video.duration}
                    </Td>
                    <Td className="text-sm font-medium text-richwhite-100">
                      <button
                        disabled={loading}
                        onClick={() =>
                          navigate(`/dashboard/edit-video/${video._id}`)
                        }
                        title="Edit"
                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                      >
                        <FiEdit2 size={20} />
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Do you want to delete this video?",
                            text2:
                              "All the data related to this video will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleVideoDelete(video._id),
                            btn2Handler: () => setConfirmationModal(null),
                          });
                        }}
                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-pink-300"
                        title="Delete"
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                      <button
                        onClick={(event) => {
                          event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
                          togglePublishStatus(video._id); // Call the function to toggle publish status
                        }}
                        className="z-40 m-4"
                      >
                        <IconBtn
                          text={
                            !video.isPublished ? "Publish Video" : "Draft Video"
                          }
                        ></IconBtn>
                      </button>
                    </Td>
                  </Tr>
                ))
              )}
            </>
          )}
        </Tbody>
      </Table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default VideosList;
