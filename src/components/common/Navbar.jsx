import { useState, useEffect } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { NavbarLinks } from "../../../data/navbar-links";
import AstrowalaLogo from "../../assets/Logo/GyanSrijanLogo.png";
import { fetchCourseCategories } from "./../../services/operations/courseDetailsAPI";

import ProfileDropDown from "../core/Auth/ProfileDropDown";
import MobileProfileDropDown from "../core/Auth/MobileProfileDropDown";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import ContactInfo from "./ContactInfo";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <ContactInfo />
      <nav
        className={`z-[10] flex h-16 w-full items-center justify-center border-shadow bg-white translate-y-0 transition-all ${showNavbar}`}
      >
        <div className="flex w-11/12 max-w-maxContent items-center justify-between ">
          <Link to="/" className="logo-container">
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

          <ul className="hidden sm:flex gap-x-4 text-shadow-md font-semibold text-blue-100">
            {NavbarLinks.map((link, index) =>
              link.title === "Profile" && !user ? null : (
                <li key={index}>
                  {link.title === "Categories" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catID")
                          ? "text-shadow-md text-blue-800 rounded-xl p-1 px-3"
                          : "text-shadow-md text-blue-100 rounded-xl p-1 px-3"
                      }`}
                    >
                      <p>{link.title}</p>
                      <MdKeyboardArrowDown />
                      <div
                        className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] 
                                                    flex-col rounded-lg bg-richwhite-5 p-4  text-shadow-md  opacity-0 transition-all duration-150 group-hover:visible 
                                                    group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                      >
                        <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded"></div>
                        {loading ? (
                          <p className="text-shadow-md text-center ">
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
                                className="rounded-lg bg-transparent py-4 pl-4 text-black hover:bg-richwhite-50"
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
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-blue-800"
                            : "text-blue-100"
                        } rounded-xl p-1 px-3 `}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              )
            )}
          </ul>

          <div className="flex gap-x-4 items-center">
            {user && user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-[2.35rem] text-blue-100 hover:bg-richwhite-700 rounded-full p-2 duration-200" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richwhite-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null && (
              <Link to="/login">
                <button
                  className={` px-[12px] py-[8px] text-white bg-blue-100 font-semibold rounded-md 
                                 ${
                                   matchRoute("/login")
                                     ? "border-[2.5px] border-blue-100"
                                     : "border border-richwhite-700 bg-blue-100"
                                 } `}
                >
                  Log in
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup">
                <button
                  className={` px-[12px] py-[8px] text-white bg-blue-100 font-semibold rounded-md 
                                 ${
                                   matchRoute("/signup")
                                     ? "border-[2.5px] border-blue-100"
                                     : "border border-richwhite-700 bg-blue-100"
                                 } `}
                >
                  Sign Up
                </button>
              </Link>
            )}

            {token !== null && <ProfileDropDown />}

            {token !== null && <MobileProfileDropDown />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
