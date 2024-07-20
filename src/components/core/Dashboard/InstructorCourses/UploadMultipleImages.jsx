import { useEffect, useRef, useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";

export default function UploadMultipleImages({
  name,
  label,
  register,
  setValue,
  editData = null,
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewSources, setPreviewSources] = useState(
    Array.isArray(editData) ? editData : []
  );
  const inputRef = useRef(null);

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFiles);
  }, [selectedFiles, setValue, name]);

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
    ).then((results) => setPreviewSources(results));
  };

  const removeFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    const updatedSources = [...previewSources];
    updatedSources.splice(index, 1);
    setPreviewSources(updatedSources);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-white">{label}</label>

      <div className="flex flex-col items-center">
        {previewSources.length > 0 ? (
          <div className="flex w-full flex-col p-6">
            {previewSources.map((source, index) => (
              <div key={index} className="mb-4 flex flex-col items-center">
                <img
                  src={source}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
                <div className="flex items-center mt-2 max-w-xs">
                  <span className="text-white p-3 rounded-lg bg-richblack-500 truncate">
                    {selectedFiles[index]?.name.length > 20
                      ? selectedFiles[index]?.name.substring(0, 20) + "..."
                      : selectedFiles[index]?.name}
                  </span>
                  <FiX
                    className="text-white cursor-pointer ml-2"
                    onClick={() => removeFile(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center p-6">
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              ref={inputRef}
              multiple
              className="hidden"
            />
            <div
              className="flex cursor-pointer"
              onClick={() => inputRef.current.click()}
            >
              <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                <FiUploadCloud className="text-2xl text-yellow-50" />
              </div>
              <p className="ml-4 mt-5 max-w-[200px] text-sm text-richwhite-200">
                Click to <span className="font-semibold text-yellow-50">Browse images</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
