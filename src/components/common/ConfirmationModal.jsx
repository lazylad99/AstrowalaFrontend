import React from "react";
import ReactPlayer from "react-player";
import IconBtn from "./IconBtn";

export default function ConfirmationModal({
  isVideo = false,
  videoUrl,
  modalData,
}) {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-full max-w-[800px] rounded-lg border border-richwhite-400 bg-richwhite-800 p-6">
        {isVideo ? (
          videoUrl ? (
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <ReactPlayer
                url={videoUrl}
                controls={true}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
              />
              <button
                className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer rounded-md bg-richwhite-200 text-richwhite-900 hover:bg-richwhite-900 hover:text-richwhite-200
                                     py-[8px] px-[20px] font-semibold duration-300 z-[1100]"
                onClick={modalData?.btn2Handler}
              >
                
                {modalData?.btn2Text}
              </button>
            </div>
          ) : (
            "Loading..."
          )
        ) : (
          <>
            <p className="text-2xl font-semibold text-white">
              {modalData?.text1}
            </p>

            <p className="mt-3 mb-5 leading-6 text-richwhite-200">
              {modalData?.text2}
            </p>

            <div className="flex items-center gap-x-4">
              <IconBtn
                onclick={modalData?.btn1Handler}
                text={modalData?.btn1Text}
              />
              <button
                className="cursor-pointer rounded-md bg-richwhite-200 text-richwhite-900 hover:bg-richwhite-900 hover:text-richwhite-200
                                     py-[8px] px-[20px] font-semibold duration-300"
                onClick={modalData?.btn2Handler}
              >
                {modalData?.btn2Text}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
