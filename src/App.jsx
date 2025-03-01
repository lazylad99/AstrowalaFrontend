import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import CourseDetails from "./pages/CourseDetails";
import Catalog from "./pages/Catalog";

import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ProtectedRoute from "./components/core/Auth/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
// import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings/Settings";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Instructor from "./components/core/Dashboard/Instructor";

import Cart from "./components/core/Dashboard/Cart/Cart";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";

import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";

import { ACCOUNT_TYPE } from "./utils/constants";

import { HiArrowNarrowUp } from "react-icons/hi";
import AddVideos from "./components/core/Dashboard/InstructorCourses/AddVideos";
import VideosTable from "./components/core/Dashboard/InstructorCourses/VideosTable";
import ViewVideo from "./components/core/Dashboard/InstructorCourses/ViewVideo";
import EditVideo from "./components/core/Dashboard/InstructorCourses/EditVideo";
import Profile from "./components/core/Dashboard/Profile";
import Categories from "./pages/Categories";
import StudentVideosTable from "./components/core/Dashboard/InstructorCourses/StudentVideosTable";
import EditProfile from "./components/core/Dashboard/Settings/EditProfile";
import ServiceSection from "./components/common/ServiceSection";
import EnrollStudents from "./components/core/Dashboard/HandlePayment/EnrollStudents";


function App() {
  const { user } = useSelector((state) => state.profile);

  // Scroll to the top of the page when the component mounts
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Go upward arrow - show , unshow
  const [showArrow, setShowArrow] = useState(false);

  const handleArrow = () => {
    if (window.scrollY > 500) {
      setShowArrow(true);
    } else setShowArrow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleArrow);
    return () => {
      window.removeEventListener("scroll", handleArrow);
    };
  }, [showArrow]);

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* go upward arrow */}
      <button
        onClick={() => window.scrollTo(0, 0)}
        className={`bg-richblack-500 hover:bg-blue-400 hover:scale-110 p-3 text-lg text-white rounded-2xl fixed right-3 z-10 duration-500 ease-in-out ${
          showArrow ? "bottom-6" : "-bottom-24"
        } `}
      >
        <HiArrowNarrowUp />
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalog/:catID" element={<Catalog />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/services" element={<ServiceSection />} />

        {/* Open Route - for Only Non Logged in User */}
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        {/* Protected Route - for Only Logged in User */}
        {/* Dashboard */}
        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<Profile />} />
          <Route path="dashboard/edit-profile" element={<EditProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />

          {/* Route only for Students */}
          {/* cart , EnrolledCourses */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              {/* <Route
                path="dashboard/:courseId/videos"
                element={<StudentVideosTable />}
              /> */}

              <Route
                path="dashboard/:courseId/videos"
                element={<VideosTable />}
              />
              <Route
                path="dashboard/view-video/:videoId"
                element={<ViewVideo />}
              />
            </>
          )}

          {/* Route only for Instructors */}
          {/* add course , , EditCourse*/}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="dashboard/enroll-students"
                // error here in main repo
                element={<EnrollStudents />}
              />
              <Route
                path="dashboard/:courseId/add-videos"
                element={<AddVideos />}
              />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
              <Route
                path="dashboard/:courseId/videos"
                element={<VideosTable />}
              />

              <Route
                path="dashboard/view-video/:videoId"
                element={<ViewVideo />}
              />
              <Route
                path="dashboard/edit-video/:videoId"
                element={<EditVideo />}
              />
            </>
          )}
        </Route>

        {/* For the watching course lectures */}
        <Route
          element={
            <ProtectedRoute>
              <ViewCourse />
            </ProtectedRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route
              path="view-course/:courseId/:videoId/view-video"
              element={<VideoDetails />}
            />
          )}
        </Route>

        {/* Page Not Found (404 Page ) */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
