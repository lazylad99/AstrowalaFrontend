import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import video_bg from "../../../../assets/Images/video_bg.png";
import Img from "../../../common/Img";
import { fetchCourseVideos } from "../../../../services/operations/videoAPI";

const StudentVideosTable = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const token = useSelector((state) => state.auth.token);

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const TRUNCATE_LENGTH = 25;

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCourseVideos(courseId, token);
      console.log("Fetched videos:", result); // Add logging here
      if (result) {
        setVideos(result);
      }
      setLoading(false);
    };
    fetchData();
  }, [courseId, token]);

  const skItem = () => (
    <Tr className="skeleton-row">
      <Td colSpan={3}>
        <div className="flex flex-wrap border-b border-black  px-6 py-8 w-full">
          <div className="h-[148px] min-w-[300px] rounded-xl skeleton"></div>
          <div className="flex flex-col w-full md:w-[60%] ml-4">
            <p className="h-5 w-[50%] rounded-xl skeleton"></p>
            <p className="h-20 w-full md:w-[60%] rounded-xl mt-3 skeleton"></p>
            <p className="h-2 w-[20%] rounded-xl skeleton mt-3"></p>
            <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          </div>
        </div>
      </Td>
    </Tr>
  );

  const filteredVideos = videos.filter((video) => video.isPublished);

  console.log("Filtered videos:", filteredVideos); // Add logging here

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="bg-gradient-to-b font-semibold from-[#0b0b0b] via-[#464545] to-[#aaa8a8] text-transparent bg-clip-text text-4xl">
          Course Videos
        </h1>
      </div>

      <Table className="rounded-2xl">
        <Thead>
          <Tr className="flex rounded-md px-6 py-2 shadow1 bg-newBlue">
            <Th className="flex-1 text-left text-sm font-medium ml-[100px] uppercase text-white">
              Videos
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {loading ? (
            <>
              {skItem()}
              {skItem()}
              {skItem()}
            </>
          ) : (
            <>
              {filteredVideos?.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={3}
                    className="py-10 text-center text-2xl font-medium text-black"
                  >
                    No videos found
                  </Td>
                </Tr>
              ) : (
                filteredVideos?.map((video) => (
                  <Tr
                    key={video._id}
                    className="flex gap-x-10 p-5 cursor-pointer m-10 shadow1 rounded-lg bg-white bg-opacity-15 transform hover:scale-105 transition-transform duration-300 "
                    onClick={() =>
                      navigate(`/dashboard/view-video/${video._id}`)
                    }
                  >
                    <Td className="flex flex-1 gap-x-4 relative">
                      <div className="flex w-full md:w-auto">
                        <Img
                          src={video_bg}
                          className="h-[160px] min-w-[270px] max-w-[270px] rounded-lg object-cover mr-5"
                        />
                        <div className="flex flex-col ">
                          <p className="text-lg font-semibold text-black capitalize">
                            {video.title}
                          </p>
                          <p className="text-xs text-black">
                            {video.description.split(" ").length >
                            TRUNCATE_LENGTH
                              ? video.description
                                  .split(" ")
                                  .slice(0, TRUNCATE_LENGTH)
                                  .join(" ") + "..."
                              : video.description}
                          </p>
                          
                          <div>
                            
                          </div>
                        </div>
                      </div>
                    </Td>
                  </Tr>
                ))
              )}
            </>
          )}
        </Tbody>
      </Table>
    </>
  );
};

export default StudentVideosTable;
