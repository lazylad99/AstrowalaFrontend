import { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoPlayer = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady, keyInfo } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current && keyInfo) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));


      // Configure decryption
      if (keyInfo) {
        player.src({
          src: options.sources[0].src,
          type: "application/x-mpegURL",
          keySystems: {
            "com.apple.fps.1_0": {
              getLicense: (emeOptions, callback) => {
                // Fetch the key from the server
                fetch(keyInfo.uri)
                  .then((response) => response.arrayBuffer())
                  .then((key) => {
                    const iv = keyInfo.iv;
                    // Return the key and IV
                    callback(null, key, iv);
                  })
                  .catch((error) => {
                    console.error("Error fetching key:", error);
                    callback(error, null, null);
                  });
              },
            },
          },
        });
      }


      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      // player.autoplay(options.autoplay ? 'muted':false);
      // player.src(options.sources);
    }
  }, [options, videoRef, keyInfo]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div
      data-vjs-player
      // style={{ width: "600px" }}
    >
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;