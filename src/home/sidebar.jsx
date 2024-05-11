import React, { useState } from "react";
import { AiOutlineHome, AiOutlineClose } from "react-icons/ai";
import { VscThreeBars } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiOpenBook } from "react-icons/gi";
import { MdLibraryAdd } from "react-icons/md";
import { BsFillBookmarkFill, BsPencilSquare } from "react-icons/bs";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import logo from "../../src/assets/image.png";
import userPersonImg from "../../src/assets/google_person_img.png";

const SidebarComponent = () => {
  const [closesidebar, setClosesidebar] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const [showContent, setShowContent] = useState({});
  const path = window.location.pathname;
  console.log(path);
  const handleClick = (category) => {
    setShowContent({ ...showContent, [category]: !showContent[category] });
  };

  const navigate = useNavigate();

  const arrIcons = [
    <MdLibraryAdd />,
    <BsPencilSquare />,
    <GiOpenBook />,
    <BsFillBookmarkFill />,
  ];

  const signOutHandler = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/admin/login");
  };

  return (
    <div className="flex relative h-screen ">
      <div className="flex z-10 flex-col h-screen">
        <div className="flex justify-end items-center px-4 py-2 bg-primary text-white md:hidden">
          <div
            className="cursor-pointer "
            onClick={() => setClosesidebar(!closesidebar)}
          >
            {closesidebar ? <VscThreeBars /> : <AiOutlineClose />}
          </div>
        </div>

        <div
          className={`${
            closesidebar
              ? "w-60 bg-white shadow-md transition-all duration-300 ease-in-out"
              : "w-0 transition-all duration-300 ease-in-out"
          } h-full md:flex ${
            closesidebar
              ? "hidden"
              : "flex z-10 w-64 bg-white shadow-md transition-all duration-300 ease-in-out"
          } flex-col`}
        >
          <div className="p-2 pt-8 h-14  flex justify-center items-center w-full">
            <img src={logo} alt="" className="h-14" />
          </div>
          <div className="flex items-center p-4 border-b">
            <div className="w-10 h-10 rounded-full border-2 border-green-500 cursor-pointer">
               <img src={userPersonImg} alt="{userInfo?.name}"/>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold">{userInfo?.name}</h3>
              <p className="text-gray text-sm">{userInfo?.emailId}</p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-2 p-4 pb-5">
              <li className="bg-primary py-2 mb-5 flex justify-center pr-5 rounded-2xl shadow-md shadow-gray/80  px-2">
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 text-gray hover:text-primary"
                >
                  <AiOutlineHome color="white" size={22} />
                  <span className="font-medium text-white">Dashboard</span>
                </Link>
              </li>
              {Object.keys(userInfo?.userRoleList || {}).map(
                (category, categoryIndex) => (
                  <div key={categoryIndex}>
                    {userInfo?.userRoleList[category].length > 0 && (
                      <div>
                        <div
                          className="flex  items-center justify-between px-4 py-2 mb-5 rounded-2xl shadow-md shadow-gray/80 bg-primary cursor-pointer"
                          onClick={() => handleClick(category)}
                        >
                          <button
                            className="font-medium text-white hover:text-white "
                            onClick={() => handleClick(category)}
                          >
                            {category}
                          </button>
                          {showContent[category] ? (
                            <AiOutlineClose className="text-white hover:text-white" />
                          ) : (
                            <VscThreeBars className="text-white hover:text-white" />
                          )}
                        </div>
                        {showContent[category] && (
                          <div className="px-4 py-2 space-y-2">
                            {userInfo?.userRoleList[category].map(
                              (menuItem, menuItemIndex) => (
                                <NavLink
                                  key={menuItemIndex}
                                  to={menuItem.slugUrl}
                                  className={({ isActive }) =>
                                    `flex items-center space-x-2 text-gray hover:text-primary ${
                                      isActive ? "text-primary" : ""
                                    }`
                                  }
                                >
                                  {arrIcons[menuItemIndex]}
                                  <span className="font-medium">
                                    {menuItem.screenNm}
                                  </span>
                                </NavLink>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              )}
            </ul>
          </nav>

          <div className=" ml-6 mb-5 p-1 flex  hover:bg-red/90 hover:text-white  text-xs hover:text-sm text-red border border-red items-center w-36 space-x-2   cursor-pointer">
            <div className="flex gap-2 self-center items-center hover:text-white   pl-5 justify-center">
              <CiLogout size={20} color="red" />
              <button
                onClick={signOutHandler}
                className="font-medium text-center    "
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SidebarComponent;
