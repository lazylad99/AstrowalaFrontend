import { useRef, useState, useEffect } from "react";
import videojs from "video.js";
import VideoPlayer from "./VideoPlayer";
import { useParams } from "react-router-dom";
import { fetchVideoData } from "../../../../services/operations/videoAPI";
import { FaFilePdf, FaImage } from "react-icons/fa";
import {BACKEND_URL} from "../../../../services/apis"
// import ReactPlayer from "react-player";

function ViewVideo() {
  const { videoId } = useParams();
  const playerRef = useRef(null);
  const [keyInfo, setKeyInfo] = useState(null);
  const [videoData, setVideoData] = useState(null);

  // const port = 5000;
  // const API = `http://localhost:${port}`;
  // const API = `https://astrowala-backend-deployed.onrender.com`;
  const API = BACKEND_URL;


  useEffect(() => {
    console.log("Video ID from params:", videoId); // Debugging line

    const fetchData = async () => {
      try {
        if (videoId) {
          // Ensure videoId is defined before calling fetchVideoData
          const videoData = await fetchVideoData(videoId);
          setVideoData(videoData);
          console.log(videoData);
        } else {
          console.error("videoId is undefined");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [videoId]);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  // Fetch key information for decryption
  useEffect(() => {
    fetch(`${API}/getKeyInfo`)
      .then((response) => response.json())
      .then((data) => {
        setKeyInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching key info:", error);
      });

    // const videoId = '665eb4d11f8a45e277386d79'
    fetchVideoData(videoId);
  }, [videoId]);

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoData ? videoData.videoUrl : "",
        type: "application/x-mpegURL",
      },
    ],
  };

  return (
    <>
      <div className="space-y-8 m-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
        <div>
          <h1 className="text-2xl font-medium text-white">
            {videoData?.title}
          </h1>
        </div>
        {videoData?.videoUrl ? (
          <VideoPlayer
            options={videoPlayerOptions}
            onReady={handlePlayerReady}
            keyInfo={keyInfo}
          />

          // <ReactPlayer
          //   url={videoData?.videoUrl}
          //   controls={true}
          //   width="100%"
          //   height="100%"
          // />
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
