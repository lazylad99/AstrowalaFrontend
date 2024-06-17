import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseVideos,
  fetchVideoData,
} from "../../../services/operations/videoAPI";
import ReactPlayer from "react-player";
import { FaFilePdf, FaImage } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { setCourseViewSidebar } from "../../../slices/sidebarSlice";
import { HiMenuAlt1 } from "react-icons/hi";

const VideoDetails = () => {
  const { videoId } = useParams();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [videoData, setVideoData] = useState(null);
  const [courseVideos, setCourseVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const videos = await fetchCourseVideos(token);
        setCourseVideos(videos);
        if (videoId) {
          const video = await fetchVideoData(videoId);
          setVideoData(video);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [videoId, token]);

  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { courseViewSidebar } = useSelector((state) => state.sidebar);

  if (courseViewSidebar && window.innerWidth <= 640) return;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white ${
          courseViewSidebar ? "w-64" : "w-20"
        } transition-all`}
      >
        <div className="p-4">
          <HiMenuAlt1
            size={33}
            onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}
            className="cursor-pointer"
          />
        </div>
        <ul>
          {courseVideos.map((video) => (
            <li
              key={video._id}
              onClick={() => navigate(`/view-video/${video._id}`)}
              className="cursor-pointer p-4 hover:bg-gray-700"
            >
              {video.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 text-white">
        <div
          className="mb-5 lg:mt-10 lg:mb-0 z-[100]"
          onClick={() => navigate(-1)}
        >
          <GiReturnArrow className="w-10 h-10 text-yellow-100 hover:text-yellow-50 cursor-pointer" />
        </div>
        <div className="space-y-8 m-5 rounded-md border-[1px] border-richwhite-700 bg-richwhite-800 p-6">
          <div>
            <h1 className="text-2xl font-medium text-white">
              {videoData?.title}
            </h1>
          </div>
          {videoData?.videoUrl ? (
            <ReactPlayer
              url={videoData?.videoUrl}
              controls
              width="100%"
              height="100%"
            />
          ) : (
            "Loading..."
          )}
          <div className="font-medium text-black">
            <p>{videoData?.description}</p>
          </div>
          <h2 className="text-xl font-medium text-white">Source Materials</h2>
          <div className="flex flex-wrap gap-4">
            {videoData?.pdfUrl && (
              <a
                href={videoData.pdfUrl}
                download
                className="flex items-center text-black"
              >
                <FaFilePdf className="mr-2" /> PDF
              </a>
            )}
            {videoData?.imagesUrl &&
              videoData.imagesUrl.length > 0 &&
              videoData.imagesUrl.map((imgUrl, index) => (
                <a
                  key={index}
                  href={imgUrl}
                  download
                  className="flex items-center text-white"
                >
                  <FaImage className="mr-2" /> Image {index + 1}
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
