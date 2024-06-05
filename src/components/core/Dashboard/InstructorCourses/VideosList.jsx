import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Tab from "../../../common/Tab"; // Assuming you have a Tab component
import instructorImage from "../../../../assets/Images/new.png";

import axios from "axios";
import Img from "../../../common/Img";

// Mock API calls
const fetchCourseVideos = async (courseId, token) => {
  // return [
  //   {
  //     _id: "665eb4d11f8a45e277386d79",
  //     title: "Introduction to React",
  //     description: "This video covers the basics of React.",
  //     duration: "10:00",
  //     status: "PUBLISHED",
  //     createdAt: "2023-05-01",
  //     updatedAt: "2023-06-01",
  //   },
  //   {
  //     _id: "2",
  //     title: "Advanced Redux",
  //     description: "This video dives deep into advanced Redux concepts.",
  //     duration: "20:00",
  //     status: "DRAFT",
  //     createdAt: "2023-04-15",
  //     updatedAt: "2023-05-15",
  //   },
  //   {
  //     _id: "3",
  //     title: "Advanced NextJS",
  //     description: "This video dives deep into advanced Redux concepts.",
  //     duration: "20:00",
  //     status: "DRAFT",
  //     createdAt: "2023-04-15",
  //     updatedAt: "2023-05-15",
  //   },
  //   {
  //     _id: "4",
  //     title: "Introduction to NextJS",
  //     description: "This video covers the basics of NextJS.",
  //     duration: "10:00",
  //     status: "PUBLISHED",
  //     createdAt: "2023-05-01",
  //     updatedAt: "2023-06-01",
  //   }
  // ];

  const API = "http://localhost:5000";
  try {
    const response = await axios.get(
      `${API}/api/v1/video/all-videos/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching course videos:", error);
    return [];
  }
};

const deleteVideo = async ({ videoId }, token) => {
  return true;
};

export default function VideosList() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const token = "sample-token"; // Mocked token
  const dispatch = useDispatch();

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
    await deleteVideo({ videoId: videoId }, token);
    const result = await fetchCourseVideos(courseId, token);
    if (result) {
      setVideos(result);
    }
    setConfirmationModal(null);
    setLoading(false);
    toast.dismiss(toastId);
  };

  const skItem = () => (
    <div className="flex border-b border-richblack-800 px-6 py-8 w-full">
      <div className="flex flex-1 gap-x-4 ">
        <div className="h-[148px] min-w-[300px] rounded-xl skeleton "></div>
        <div className="flex flex-col w-[40%]">
          <p className="h-5 w-[50%] rounded-xl skeleton"></p>
          <p className="h-20 w-[60%] rounded-xl mt-3 skeleton"></p>
          <p className="h-2 w-[20%] rounded-xl skeleton mt-3"></p>
          <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
        </div>
      </div>
    </div>
  );

  // const filteredVideos = videos.filter((video) =>
  //   filter === "Published" ? video.status === "PUBLISHED" : video.status === "DRAFT"
  // );

  const filteredVideos = videos.filter((video) =>
    filter === "Published"
      ? video.isPublished === true
      : video.isPublished === false
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-richblack-100">Videos</h1>
        <Tab tabData={tabData} field={filter} setField={setFilter} />
      </div>

      <Table className="rounded-2xl border border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-3xl border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Videos
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left ml-2 mr-6 text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
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
            {filteredVideos.length === 0 ? (
              <Tr>
                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                  No videos found
                </Td>
              </Tr>
            ) : (
              filteredVideos.map((video) => (
                <Tr
                  key={video._id}
                  className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                >
                  <Td className="flex flex-1 gap-x-4 relative">
                    <Link
                      to={`/dashboard/view-video/${video._id}`}
                      className="flex flex-col"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Img
                        src={instructorImage}
                        alt={video?.title}
                        className="h-[148px] min-w-[270px] max-w-[270px] rounded-lg object-cover"
                      />
                    </Link>
                    <Link
                      to={`/dashboard/view-video/${video._id}`}
                      className="flex flex-col"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-lg font-semibold text-richblack-5 capitalize">
                        {video.title}
                      </p>
                      <p className="text-xs text-richblack-300 ">
                        {video.description.split(" ").length > TRUNCATE_LENGTH
                          ? video.description
                              .split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ") + "..."
                          : video.description}
                      </p>
                      <p className="text-[12px] text-richblack-100 mt-4">
                        Created: {formatDate(video.createdAt)}
                      </p>
                      <p className="text-[12px] text-richblack-100">
                        Updated: {formatDate(video.updatedAt)}
                      </p>
                      {video.isPublished === false ? (
                        <p className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                          <HiClock size={14} /> Drafted
                        </p>
                      ) : (
                        <div className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                          <p className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                            <FaCheck size={8} />
                          </p>{" "}
                          Published
                        </div>
                      )}
                    </Link>
                  </Td>
                  <Td className="text-sm font-medium text-richblack-100">
                    {video.duration}
                  </Td>
                  <Td className="text-sm font-medium text-richblack-100 ">
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
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        )}
      </Table>

      {confirmationModal && <ConfirmationModal {...confirmationModal} />}
    </>
  );
}
