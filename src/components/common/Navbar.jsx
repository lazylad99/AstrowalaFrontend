

import React, { useState, useEffect } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavbarLinks } from "../../../data/navbar-links";
import AstrowalaLogo from "../../assets/Logo/GyanSrijanLogo.png";
import { fetchCourseCategories } from "./../../services/operations/courseDetailsAPI";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import MobileProfileDropDown from "../core/Auth/MobileProfileDropDown";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdKeyboardArrowDown, MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchSublinks = async () => {
    try {
      setLoading(true);
      const res = await fetchCourseCategories();
      setSubLinks(res);
    } catch (error) {
      console.log("Could not fetch the category list = ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [showNavbar, setShowNavbar] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  });

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) setShowNavbar("hide");
      else setShowNavbar("show");
    } else setShowNavbar("top");

    setLastScrollY(window.scrollY);
  };

  const handleLinkClick = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`z-[10] flex w-full items-center justify-center border-shadow pt-4 p-6 translate-y-0 transition-all ${showNavbar}`}
        style={{
          background:
            location.pathname === "/" || location.pathname.startsWith("/catalog")
              ? "linear-gradient(to bottom, black, transparent)"
              : "black",
        }}
      >
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
          <Link to="/" className="logo-container hover:shadow-white">
            <img
              src={AstrowalaLogo}
              alt="Logo"
              className="logo"
              loading="lazy"
              style={{
                height: "60px",
                width: "auto",
              }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-x-4 items-center text-shadow-md font-semibold text-richwhite-100 list-none">
            {NavbarLinks.map((link, index) =>
              link.title === "Profile" && !user ? null : (
                <li key={index}>
                  {link.title === "Categories" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catID")
                          ? "text-shadow-md text-richwhite-100 rounded-xl p-1 px-3"
                          : "text-shadow-md text-richwhite-100 rounded-xl p-1 px-3"
                      } hoverable`}
                    >
                      <p className="flex"><span>{link.title}</span><span className="mt-1"><MdKeyboardArrowDown /></span></p>
                      
                      <div
                        className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] 
                                                flex-col rounded-lg bg-richwhite-5 p-4 text-shadow-md opacity-0 transition-all duration-150 group-hover:visible 
                                                group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                      >
                        <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded"></div>
                        {loading ? (
                          <p className="text-shadow-md text-center">
                            Loading...
                          </p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink._id
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 text-black hover:bg-richblack-25 hoverable"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path} className="hoverable">
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-richwhite-500"
                            : "text-richwhite-100"
                        } rounded-xl p-1 px-3`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              )
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex gap-x-4 items-center">
            {user && user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className="relative hoverable">
                <AiOutlineShoppingCart className="text-[2.35rem] text-white hover:bg-richblack-700 rounded-full p-2 duration-200" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null && (
              <>
                <Link to="/login" className="px-[12px] py-[8px] button-36">Log in</Link>
                <Link to="/signup" className="px-[12px] py-[8px] button-36">Sign Up</Link>
              </>
            )}
            {token !== null && <ProfileDropDown />}
          </div>

          {/* Mobile Menu Button */}
          {token === null && (
            <div className="flex sm:hidden items-center">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white text-3xl">
                {sidebarOpen ? <MdClose /> : <MdMenu />}
              </button>
            </div>
          )}

          {/* Mobile Dropdown for logged-in users */}
          {token !== null && (
            <div className="sm:hidden flex items-center">
              <MobileProfileDropDown />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Sidebar for non-logged in users */}
      {sidebarOpen && token === null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-end">
          <div className="w-64 h-full bg-richblack-900 text-white p-4">
            <button onClick={() => setSidebarOpen(false)} className="text-white text-3xl mb-4">
              <MdClose />
            </button>
            <ul className="flex flex-col gap-y-4 text-shadow-md font-semibold text-richwhite-100">
              {NavbarLinks.map((link, index) =>
                link.title === "Profile" && !user ? null : (
                  <li key={index} className="w-full text-center">
                    {link.title === "Categories" ? (
                      <div
                        className={`group relative flex cursor-pointer items-center justify-center gap-1 ${
                          matchRoute("/catalog/:catID")
                            ? "text-shadow-md text-richwhite-100 rounded-xl p-1 px-3"
                            : "text-shadow-md text-richwhite-100 rounded-xl p-1 px-3"
                        } hoverable`}
                      >
                        <p className="flex">
                          <span>{link.title}</span>
                          <span className="mt-1">
                            <MdKeyboardArrowDown />
                          </span>
                        </p>

                        <div
                          className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] 
                                                flex-col rounded-lg bg-richwhite-5 p-4 text-shadow-md opacity-0 transition-all duration-150 group-hover:visible 
                                                group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                        >
                          <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded"></div>
                          {loading ? (
                            <p className="text-shadow-md text-center">Loading...</p>
                          ) : subLinks.length ? (
                            <>
                              {subLinks?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink._id
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 text-black hover:bg-richblack-25 hoverable"
                                  key={i}
                                  onClick={handleLinkClick}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                            </>
                          ) : (
                            <p className="text-center">No Courses Found</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={link?.path}
                        className="hoverable"
                        onClick={handleLinkClick}
                      >
                        <p
                          className={`${
                            matchRoute(link?.path)
                              ? "text-richwhite-500"
                              : "text-richwhite-100"
                          } rounded-xl p-1 px-3`}
                        >
                          {link.title}
                        </p>
                      </Link>
                    )}
                  </li>
                )
              )}
            </ul>
            <div className="flex flex-col gap-y-4 items-center mt-6">
              {token === null && (
                <>
                  <Link to="/login" onClick={handleLinkClick}>
                    <p className="text-white">Log in</p>
                  </Link>
                  <Link to="/signup" onClick={handleLinkClick}>
                    <p className="text-white">Sign Up</p>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;




