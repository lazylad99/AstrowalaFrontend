import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { updateUserProfileImage } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";
import Img from './../../../common/Img';

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      previewFile(file);
      handleFileUpload(file); // Automatically upload the file once selected
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profileImage", file);

      dispatch(updateUserProfileImage(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      setLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (profileImage) {
      previewFile(profileImage);
    }
  }, [profileImage]);

  return (
    <>
      <div className="flex flex-col mb-0  justify-between rounded-t-md pt-8 bg-newBlue p-4 px-3 sm:px-12 text-white">
        <h2 className="text-lg font-semibold text-white mb-2">
          Change Profile Picture
        </h2>
        <div className="flex items-center gap-x-4">
          <Img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg, image/jpg"
            />
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleClick}
              disabled={loading}
            >
              {!loading && <FiUpload className="text-lg" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </>
  );
}
