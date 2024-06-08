import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";

import "video-react/dist/video-react.css";
import { Player } from "video-react";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  pdf = false,
  viewData = null,
  editData = null,
  multiple = false
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewSources, setPreviewSources] = useState(viewData ? viewData : editData ? editData : []);
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    if (multiple) {
      setSelectedFiles(acceptedFiles);
      previewFiles(acceptedFiles);
    } else {
      const file = acceptedFiles[0];
      if (file) {
        previewFile(file);
        setSelectedFiles([file]);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video ? { "video/*": [".mp4"] } : pdf ? { "application/pdf": [".pdf"] } : { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: multiple,
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSources([reader.result]);
    };
  };

  const previewFiles = (files) => {
    const readers = files.map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return reader;
    });

    Promise.all(readers.map(reader => new Promise(resolve => {
      reader.onloadend = () => resolve(reader.result);
    }))).then(results => {
      setPreviewSources(results);
    });
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, multiple ? selectedFiles : selectedFiles[0]);
  }, [selectedFiles, setValue, multiple]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"} flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewSources.length > 0 ? (
          <div className="flex w-full flex-col p-6">
            {previewSources.map((source, index) => (
              <div key={index} className="mb-4">
                {!video && !pdf ? (
                  <img src={source} alt="Preview" className="h-full w-full rounded-md object-cover" />
                ) : video ? (
                  <Player aspectRatio="16:9" playsInline src={source} />
                ) : (
                  <embed src={source} type="application/pdf" className="h-full w-full rounded-md object-cover" />
                )}
              </div>
            ))}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSources([]);
                  setSelectedFiles([]);
                  setValue(name, null);
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6" {...getRootProps()}>
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop a {video ? "video" : pdf ? "PDF" : "image"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
