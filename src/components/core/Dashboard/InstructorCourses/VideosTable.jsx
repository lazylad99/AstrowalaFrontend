import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../../services/formatDate";
import ConfirmationModal from "../../../common/ConfirmationModal";
import toast from "react-hot-toast";
import video_bg from "../../../../assets/Images/video_bg.png";
import Tab from "../../../common/Tab";
import Img from "../../../common/Img";
import {
  fetchCourseVideos,
  toggleVideoPublishStatus,
} from "../../../../services/operations/videoAPI";
import IconBtn from "../../../common/IconBtn";
import { ACCOUNT_TYPE } from "../../../../utils/constants";
import VideoCard from "./VideoCard"; 

const VideosTable = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.profile);

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [filter, setFilter] = useState("Added to Course");
  const TRUNCATE_LENGTH = 25;

  console.log("Videos:", videos); // Debugging line

  const tabData = [
    { id: 1, type: "Added to Course", tabName: "Added to Course" },
    { id: 2, type: "Drafted", tabName: "Drafted" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCourseVideos(courseId, token);
      console.log("Fetched videos:", result); // Add logging here
      if (result) {
        setVideos(result);
      }
      setLoading(false);
    };
    fetchData();
  }, [courseId, token]);



  // const handleVideoDelete = async (videoId) => {
  //   setLoading(true);
  //   const toastId = toast.loading("Deleting...");
  //   await deleteVideo({ videoId }, token);
  //   const result = await fetchCourseVideos(courseId, token);
  //   if (result) {
  //     setVideos(result);
  //   }
  //   setConfirmationModal(null);
  //   setLoading(false);
  //   toast.dismiss(toastId);
  // };

  

  const togglePublishStatus = async (videoId, newStatus) => {
    setLoading(true);
    const toastId = toast.loading("Updating status...");
    const result = await toggleVideoPublishStatus(videoId, token);
    if (result.success) {
      toast.success(result.message);
      const updatedVideos = await fetchCourseVideos(courseId, token);
      setVideos(updatedVideos);
      setFilter(newStatus ? "Added to Course" : "Drafted");
    } else {
      toast.error(result.message);
    }
    setLoading(false);
    toast.dismiss(toastId);
  };

  const skItem = () => (
    <Tr className="skeleton-row">
      <Td colSpan={3}>
        <div className="flex flex-wrap border-b border-black  px-6 py-8 w-full">
          <div className="h-[148px] min-w-[300px] rounded-xl skeleton"></div>
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
    user?.accountType === ACCOUNT_TYPE.STUDENT
      ? video.isPublished
      : filter === "Added to Course"
      ? video.isPublished
      : !video.isPublished
  );


  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="bg-gradient-to-b font-semibold from-[#0b0b0b] via-[#464545] to-[#aaa8a8] text-transparent bg-clip-text text-4xl">
          Course Videos
        </h1>
        {user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <Tab tabData={tabData} field={filter} setField={setFilter} />
        )}
      </div>

      <div className="hidden md:block">
      <Table className="rounded-2xl">
        <Thead>
          <Tr className="flex rounded-md px-6 py-2 shadow1 bg-black">
            <Th className="flex-1 text-left text-sm font-medium ml-[100px] uppercase text-white">
              Videos
            </Th>
            {user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <Th className="text-left mr-[100px] text-sm font-medium uppercase text-white">
                Actions
              </Th>
            )}
          </Tr>
        </Thead>

        {loading ? (
            <div>
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          ) : (
            <Tbody>
              {filteredVideos?.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={3}
                    className="py-10 text-center text-2xl font-medium text-black"
                  >
                    No videos found
                  </Td>
                </Tr>
              ) : (
                filteredVideos?.map((video) => (
                  <Tr
                    key={video._id}
                    className="flex gap-x-10 p-5 cursor-pointer m-10 shadow1 rounded-lg bg-white bg-opacity-15 transform hover:scale-105 transition-transform duration-300 "
                    onClick={() =>
                      navigate(`/dashboard/view-video/${video._id}`)
                    }
                  >
                    <Td className="flex flex-1 gap-x-4 relative">
                      <div className="flex w-full md:w-auto">
                        <Img
                          src={video_bg}
                          className="h-[160px] min-w-[270px] max-w-[270px] rounded-lg object-cover mr-5"
                        />
                        <div className="flex flex-col ">
                          <p className="text-lg font-semibold text-black capitalize">
                            {video.title}
                          </p>
                          <p className="text-xs text-black">
                            {video.description.split(" ").length >
                            TRUNCATE_LENGTH
                              ? video.description
                                  .split(" ")
                                  .slice(0, TRUNCATE_LENGTH)
                                  .join(" ") + "..."
                              : video.description}
                          </p>

                          {user &&
                            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                              <div>
                                <p className="text-[12px] text-black mt-4">
                                  Created: {formatDate(video.createdAt)}
                                </p>
                                <p className="text-[12px] text-black">
                                  Updated: {formatDate(video.updatedAt)}
                                </p>
                              </div>
                            )}

                          {user &&
                            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                              <div>
                                {!video.isPublished ? (
                                  <p className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-black px-2 py-[2px] text-[12px] font-medium text-pink-25">
                                    <HiClock size={14} /> Drafted
                                  </p>
                                ) : (
                                  <div className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-black  px-2 py-[2px] text-[12px] font-medium text-blue-25">
                                    <p className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-5 text-black">
                                      <FaCheck size={8} />
                                    </p>{" "}
                                    Added to Course
                                  </div>
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    </Td>
                    {user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                      <Td className="text-sm font-medium text-black">
                        <div className="flex flex-col mr-2">
                          <div className="flex pb-5 ">
                            <button
                              disabled={loading}
                              onClick={(event) => {
                                event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
                                navigate(`/dashboard/edit-video/${video._id}`);
                              }}
                              title="Edit"
                              className="px-5 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                            >
                              <FiEdit2 size={20} />
                            </button>
                            {/* <button
                              disabled={loading}
                              onClick={(event) => {
                                event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
                                setConfirmationModal({
                                  text1: "Do you want to delete this video?",
                                  text2:
                                    "All the data related to this video will be deleted",
                                  btn1Text: "Delete",
                                  btn2Text: "Cancel",
                                  btn1Handler: () =>
                                    handleVideoDelete(video._id),
                                  btn2Handler: () => setConfirmationModal(null),
                                });
                              }}
                              className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                              title="Delete"
                            >
                              <RiDeleteBin6Line size={20} />
                            </button> */}
                          </div>
                          <div>
                            <button
                              onClick={(event) => {
                                event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
                                setConfirmationModal({
                                  text1: `Do you want to ${
                                    !video.isPublished
                                      ? "add this video to the course?"
                                      : "move this video to draft?"
                                  }`,
                                  text2: `This video will be ${
                                    !video.isPublished
                                      ? "added to the course"
                                      : "moved to draft"
                                  }`,
                                  btn1Text: !video.isPublished
                                    ? "Add to Course"
                                    : "Draft",
                                  btn2Text: "Cancel",
                                  btn1Handler: !loading
                                    ? () => {
                                        togglePublishStatus(
                                          video._id,
                                          !video.isPublished
                                        );
                                        setConfirmationModal(null);
                                      }
                                    : () => {},
                                  btn2Handler: !loading
                                    ? () => setConfirmationModal(null)
                                    : () => {},
                                });
                              }}
                              className={`${
                                !video.isPublished
                                  ? "text-[#00ff00]"
                                  : "text-[#ff0000]"
                              } px-1 transition-all duration-200 hover:scale-110`}
                            >
                              <IconBtn
                                text={
                                  !video.isPublished
                                    ? "Add to Course"
                                    : "Add to Draft"
                                }
                              ></IconBtn>
                            </button>
                          </div>
                        </div>
                      </Td>
                    )}
                  </Tr>
                ))
              )}
            </Tbody>
          )}
      </Table>
      </div>

      <div className="block md:hidden">
      {loading ? (
          <div>
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        ) : (
              filteredVideos?.map((video) => (
                <VideoCard
                  key={video._id}
                  video={video}
                  user={user}
                  loading={loading}
                  setConfirmationModal={setConfirmationModal}
                  togglePublishStatus={togglePublishStatus}
                  // handleVideoDelete={handleVideoDelete}
                  />
                ))
              )}
            </div>

      

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default VideosTable;
