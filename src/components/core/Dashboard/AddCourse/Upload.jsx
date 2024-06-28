import { useEffect, useRef, useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  viewData = null,
  editData = null,
  multiple = false,
  pdf = false,
  video = false,
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewSources, setPreviewSources] = useState(
    Array.isArray(viewData)
      ? viewData
      : viewData
      ? [viewData]
      : Array.isArray(editData)
      ? editData
      : editData
      ? [editData]
      : []
  );
  const inputRef = useRef(null);

  const fileAccept = () => {
    if (pdf) {
      return ".pdf";
    } else if (video) {
      return "video/*";
    } else {
      return "image/*";
    }
  };

  const onFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      setSelectedFiles(fileList);
      previewFiles(fileList);
    }
  };

  const previewFiles = (files) => {
    const readers = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return reader;
    });

    Promise.all(
      readers.map(
        (reader) =>
          new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result);
          })
      )
    ).then((results) => {
      setPreviewSources(results);
    });
  };

  const removeFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setPreviewSources([]);
    setValue(name, null);
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, multiple ? selectedFiles : selectedFiles[0]);
  }, [selectedFiles, setValue, name, multiple]);


  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-white" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div className="flex flex-col items-center">
        {previewSources.length > 0 ? (
          <div className="flex w-full flex-col p-6">
            {previewSources.map((source, index) => (
              <div key={index} className="mb-4 flex items-center">
                <span className="text-white p-3 rounded-lg bg-blue-100 truncate mr-2">
                  {selectedFiles[index]?.name}
                </span>
                {!viewData && (
                  <FiX
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      removeFile(index);
                      setPreviewSources([]);
                      setSelectedFiles([]);
                      setValue(name, null);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center p-6">
            <input
              type="file"
              accept={fileAccept()}
              onChange={onFileChange}
              ref={inputRef}
              className="hidden"
            />
            <div
              className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800 cursor-pointer"
              onClick={() => inputRef.current.click()}
            >
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="ml-4 max-w-[200px] text-sm text-richwhite-200">
              Click to{" "}
              <span className="font-semibold text-yellow-50">
                Browse a {pdf ? "PDF" : video ? "video" : "image"}
              </span>{" "}
              file
            </p>
          </div>
        )}
      </div>

      {/* {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )} */}
    </div>
  );
}
