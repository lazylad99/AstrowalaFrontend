import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchVideoData } from "../../../../services/operations/videoAPI";
import ReactPlayer from "react-player";
import { FaFilePdf, FaImage } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";

function ViewVideo() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    console.log("Video ID from params:", videoId);

    const fetchData = async () => {
      try {
        if (videoId) {
          const videoData = await fetchVideoData(videoId);
          setVideoData(videoData);
          // console.log(videoData);
        } else {
          console.error("videoId is undefined");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [videoId]);

  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* <GiReturnArrow
        className="mb-5 lg:mt-10 lg:mb-0 w-10 h-10 text-yellow-100 hover:text-yellow-50 cursor-pointer"
        onClick={() => navigate(-1)}
      /> */}

      <div className="space-y-8 m-3  rounded-md border-[1px] border-richblack-700 shadow bg-black p-5">
        <div>
        <h1 className="bg-gradient-to-b text-bold from-[#ffffff] via-[#ffffff] to-[#928d8d] text-transparent bg-clip-text text-4xl">
        {videoData?.title}
          </h1>
        </div>
        {videoData?.videoUrl ? (
          <ReactPlayer
            url={videoData?.videoUrl}
            controls={true}
            width="100%"
            height="100%"
          />
        ) : (
          "Loading..."
        )}

        <div className="font-medium text-white">
          <p>{videoData?.description}</p>
        </div>

        <h2 className="text-xl font-medium text-white">Source Materials</h2>

        <div className="flex flex-wrap gap-4">
          {videoData?.pdfUrl && (
            <a
              href={videoData.pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white"
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
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white"
              >
                <FaImage className="mr-2" /> Image {index + 1}
              </a>
            ))}
        </div>
      </div>
    </>
  );
}

export default ViewVideo;
