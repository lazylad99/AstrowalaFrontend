import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"
import Img from './../../../common/Img';

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()


  return (
    <div className="flex flex-1 flex-col bg-white shadow1 hover:scale-105  rounded-xl p-5">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full flex-wrap items-center justify-center gap-6 ${
            indx !== cart.length - 1 && "pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            {/* course thumbnailUrl */}
            <Img
              src={course?.thumbnailUrl}
              alt={course?.courseName}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />

            <div className="flex flex-col items-center justify-center mb-7 space-y-1">
              <p className="text-lg font-medium text-black">
                {course?.courseName}
              </p>
              <p className="text-sm text-black">
                {course?.category?.name}
              </p>
              {/* <div className="flex items-center gap-2"> */}
                {/* <span className="text-yellow-5">4.5</span> */}
                {/* <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                /> */}
                {/* <span className="text-black">
                  {course?.ratingAndReviews?.length} Ratings
                </span> */}
              {/* </div> */}
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 button-36"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-yellow-100">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}