import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { HiClock } from 'react-icons/hi';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import IconBtn from '../../../common/IconBtn';
import { formatDate } from '../../../../services/formatDate';
import Img from '../../../common/Img';
import video_bg from '../../../../assets/Images/video_bg.png';
import { ACCOUNT_TYPE } from '../../../../utils/constants';

const VideoCard = ({
  video,
  user,
  loading,
  setConfirmationModal,
  togglePublishStatus,
  handleVideoDelete,
}) => {
  const navigate = useNavigate();
  const TRUNCATE_LENGTH = 25;

  return (
    <div
      className="flex flex-col gap-4 p-5 cursor-pointer m-10 shadow1 rounded-lg bg-white bg-opacity-15 transform hover:scale-105 transition-transform duration-300"
      onClick={() => navigate(`/dashboard/view-video/${video._id}`)}
    >
        <Img
          src={video_bg}
          className="h-[160px] w-full rounded-lg object-cover"
          />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-black capitalize">
            {video.title}
          </p>
          <p className="text-xs text-black">
            {video.description.split(' ').length > TRUNCATE_LENGTH
              ? video.description.split(' ').slice(0, TRUNCATE_LENGTH).join(' ') + '...'
              : video.description}
          </p>
          {user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <div>
              <p className="text-[12px] text-black mt-4">
                Created: {formatDate(video.createdAt)}
              </p>
              <p className="text-[12px] text-black">
                Updated: {formatDate(video.updatedAt)}
              </p>
            </div>
          )}
          {user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <div>
              {!video.isPublished ? (
                <p className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-black px-2 py-[2px] text-[12px] font-medium text-pink-25">
                  <HiClock size={14} /> Drafted
                </p>
              ) : (
                <div className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-black px-2 py-[2px] text-[12px] font-medium text-blue-25">
                  <p className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-5 text-black">
                    <FaCheck size={8} />
                  </p>{' '}
                  Added to Course
                </div>
              )}
            </div>
          )}
        </div>
      {user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
        <div className="flex flex-col mt-2">
          <div className="flex pb-2">
            <button
              disabled={loading}
              onClick={(event) => {
                event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
                navigate(`/dashboard/edit-video/${video._id}`);
              }}
              title="Edit"
              className="px-5 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
            >
              <FiEdit2 size={20} />
            </button>
            {/* <button
              disabled={loading}
              onClick={(event) => {
                event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
                setConfirmationModal({
                  text1: 'Do you want to delete this video?',
                  text2: 'All the data related to this video will be deleted',
                  btn1Text: 'Delete',
                  btn2Text: 'Cancel',
                  btn1Handler: () => handleVideoDelete(video._id),
                  btn2Handler: () => setConfirmationModal(null),
                });
              }}
              className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
              title="Delete"
            >
              <RiDeleteBin6Line size={20} />
            </button> */}
          </div>
          <div>
            <button
              onClick={(event) => {
                event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
                setConfirmationModal({
                  text1: `Do you want to ${!video.isPublished ? 'add this video to the course?' : 'move this video to draft?'}`,
                  text2: `This video will be ${!video.isPublished ? 'added to the course' : 'moved to draft'}`,
                  btn1Text: !video.isPublished ? 'Add to Course' : 'Draft',
                  btn2Text: 'Cancel',
                  btn1Handler: !loading
                    ? () => {
                        togglePublishStatus(video._id, !video.isPublished);
                        setConfirmationModal(null);
                      }
                    : () => {},
                  btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                });
              }}
              className={`${
                !video.isPublished ? 'text-[#00ff00]' : 'text-[#ff0000]'
              } px-1 transition-all duration-200 hover:scale-110`}
            >
              <IconBtn text={!video.isPublished ? 'Add to Course' : 'Add to Draft'}></IconBtn>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
