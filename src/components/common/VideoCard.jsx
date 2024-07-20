// components/common/VideoCard.js
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Img from "./Img";
import IconBtn from "./IconBtn";
import Certificate from "../core/Dashboard/Certificate/Certificate";
import img2 from "../../assets/Images/astro_images/video_bg.png";
import { ACCOUNT_TYPE } from "../../utils/constants";

function VideoCard({ course, user, handleVideo, handleBuyCourse, handleAddToCart, studentsEnrolled, setVideo, video }) {
  const navigate = useNavigate();

  const {
    _id,
    courseName = "",
    thumbnailUrl = "",
    introductoryVideoUrl = "",
  } = course || {};

  return (
    <div className="right-[1.5rem] top-[60px] mx-auto hidden lg:block lg:absolute min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0">
      <div className="flex flex-col gap-4 rounded-2xl shadow-lg bg3 p-2 text-black">
        <div onClick={() => setVideo(introductoryVideoUrl)} className="cursor-pointer relative">
          <Img
            src={thumbnailUrl}
            alt={courseName}
            className="hidden rounded-2xl aspect-auto w-full max-h-[350px] lg:flex"
          />
          {video && <img
            src={img2}
            alt="Overlay"
            className="absolute rounded-2xl top-0 left-0 w-full h-full opacity-60"
          />}
        </div>
        {user?.accountType === ACCOUNT_TYPE.STUDENT ? (
          <div className="flex flex-col gap-4">
            <IconBtn
              onClick={
                user && studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </IconBtn>
            {(!user || !studentsEnrolled.includes(user?._id)) && (
              <IconBtn onClick={handleAddToCart}>Add to Cart</IconBtn>
            )}
            {user && studentsEnrolled.includes(user?._id) ? (
              <Certificate userId={user?._id} courseId={_id} />
            ) : null}
          </div>
        ) : user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
          <div className="flex flex-col gap-4">
            <IconBtn onClick={() => navigate(`/dashboard/${_id}/videos`)}>
              Go to Videos
            </IconBtn>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default VideoCard;
