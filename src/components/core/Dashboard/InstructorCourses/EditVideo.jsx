import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideoData } from "../../../../services/operations/videoAPI";
import { setEditVideo, setVideos } from "../../../../slices/videosSlice";
import Loading from "../../../common/Loading";
import AddVideos from "../InstructorCourses/AddVideos";

export default function EditVideo() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { videos } = useSelector((state) => state.videos);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getVideoDetails = async () => {
      setLoading(true);
      const result = await fetchVideoData(videoId, token);
      // console.log("Data from edit video file = ", result);
      if (result) {
        dispatch(setEditVideo(true));
        dispatch(setVideos(result));
      }
      setLoading(false);
    };

    getVideoDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full items-start gap-x-6">
      <div className="flex flex-1 flex-col">
        <h1 className="mb-14 text-3xl font-medium text-black text-center sm:text-left">
          Edit Video
        </h1>
        <div className="flex-1">
          {videos ? (
            <AddVideos />
          ) : (
            <p className="mt-14 text-center text-3xl font-semibold text-black">
              Video not found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
