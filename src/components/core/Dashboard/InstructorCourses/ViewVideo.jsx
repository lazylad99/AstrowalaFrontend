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
      <GiReturnArrow
        className="mb-5 lg:mt-10 lg:mb-0 w-10 h-10 text-yellow-100 hover:text-yellow-50 cursor-pointer"
        onClick={() => navigate(-1)}
      />

      <div className="space-y-8 m-5 rounded-md border-[1px] border-richwhite-700 bg-richwhite-800 p-6">
        <div>
          <h1 className="text-2xl font-medium text-white">
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
                className="flex items-center text-black"
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
