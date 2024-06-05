import { useRef, useState, useEffect } from 'react'
// import './App.css'
import videojs from 'video.js'
import VideoPlayer from './VideoPlayer'
import axios from 'axios'
import { useParams } from "react-router-dom";

function ViewVideo() {
  const { videoId } = useParams()
  console.log(videoId)
  const playerRef = useRef(null)
  const [keyInfo, setKeyInfo] = useState(null);
  const [videoData, setVideoData] = useState(null);

  // const API = "https://testing-video.onrender.com"
  const port = 5000
  const API = `http://localhost:${port}`

  // const videoLink = `${API}/uploads/videos/96acbd7c-3d98-42c1-8174-fc9e3fadcf4d-2024-06-04/index.m3u8`

  // Fetch video information by video ID from the backend
  const fetchVideoData = async (videoId) => {
    try {
      const response = await axios.get(`${API}/api/v1/video/${videoId}`); // Make GET request to backend API
      if (response.data.success) {
        setVideoData(response.data.data); // Set the fetched video data in state
      } else {
        console.error("Error fetching video:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };



  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
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
        type: "application/x-mpegURL"
      }
    ]
  }


  return (
    <>
      <div>
        <h1>Video player</h1>
      </div>
      {videoData?.videoUrl ?
        <VideoPlayer
          options={videoPlayerOptions}
          onReady={handlePlayerReady}
          keyInfo={keyInfo}
        /> : "Loading..."}
    </>
  )
}

export default ViewVideo