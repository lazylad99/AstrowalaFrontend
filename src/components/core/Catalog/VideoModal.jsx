import React, { useEffect } from "react";
import ReactPlayer from "react-player";

const VideoModal = ({ videoUrl, setShowVideo }) => {
  const handleClose = () => {
    setShowVideo(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "video-modal-container") {
      setShowVideo(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowVideo(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setShowVideo]);

  if (!videoUrl) return null;

  return (
    <div
      id="video-modal-container"
      className="fixed inset-0 z-50 flex items-center justify-center bg-newBlue bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="relative bg-newBlue rounded-lg p-10 w-full max-w-4xl">
        <button
          className="absolute  text-white text-2xl top-2 right-3 text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <ReactPlayer
            url={videoUrl}
            controls={true}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
