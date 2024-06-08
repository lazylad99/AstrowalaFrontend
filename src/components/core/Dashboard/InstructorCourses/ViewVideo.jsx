import { useRef, useState, useEffect } from "react";
import videojs from "video.js";
import VideoPlayer from "./VideoPlayer";
import { useParams } from "react-router-dom";
import { fetchVideoData } from "../../../../services/operations/videoAPI";

function ViewVideo() {
  const { videoId } = useParams();
  const playerRef = useRef(null);
  const [keyInfo, setKeyInfo] = useState(null);
  const [videoData, setVideoData] = useState(null);

  const port = 5000;
  const API = `http://localhost:${port}`;

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
        ) : (
          "Loading..."
        )}

        <div className="font-medium text-richblack-100">
          <p>{videoData?.description}</p>
        </div>
      </div>
    </>
  );
}

export default ViewVideo;
