import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { directCourseAccessEndpoints } from "../apis"

const { DIRECT_ENROLL_STUDENTS_API } = directCourseAccessEndpoints



// send direct access request to the server
export const directAccessCourse = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("POST", DIRECT_ENROLL_STUDENTS_API, data, {
      Authorization: `Bearer ${token}`,
    })
    // console.log("DIRECT ENROLL STUDENTS API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Enroll Students")
    }

    result = response?.data
    toast.success("Students Enrolled Successfully")
  } catch (error) {
    // console.log("DIRECT ENROLL STUDENTS API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}