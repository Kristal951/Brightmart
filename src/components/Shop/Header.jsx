import React, { useState, useEffect } from "react";
import { IoIosHome } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";
import { categories } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FiMenu, FiX } from "react-icons/fi";
import { logOut } from "../../store/AUTH";
import { MdArrowDropDown } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import clsx from "clsx";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [toggleSidebarOpen, setToggleSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleSidebar = () => {
    setToggleSidebarOpen(!toggleSidebarOpen);
  };
  const toggledropDown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logOut());
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown-menu")) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    if (openDropdown) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <div className="flex w-full h-screen">
      {/* Fixed Top Header */}
      <div className="w-full h-[70px] shadow-md fixed top-0 left-0 bg-white z-20">
        <div className="flex w-full h-full p-2 justify-between items-center">
          {/* Logo */}
          <div className="flex flex-row items-center gap-2">
            <Link
              to="/shop/home"
              className="p-2 flex items-center"
              aria-label="Home"
            >
              <IoIosHome className="w-6 h-6 text-primary" />
            </Link>
            <Link to="/shop/home" className="text-xl text-primary font-bold">
              BrightMart
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {categories.map((category) => (
              <NavLink
                key={category.id}
                to={category.path}
                className={({ isActive }) =>
                  clsx(
                    "text-[15px] p-1 font-medium transition-all text-primary hover:border-b-2",
                    {
                      "border-primary border-b-2": isActive,
                    }
                  )
                }
              >
                {category.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="cursor-pointer p-2 hover:bg-opacity-15 hover:bg-primary rounded-full">
              <GiShoppingCart className="w-6 h-6 text-primary" />
            </div>
            <div
              onClick={toggledropDown}
              className="hidden md:flex flex-row items-center justify-center relative p-1 bg-primary bg-opacity-15 rounded-lg cursor-pointer dropdown-menu"
            >
              <Avatar name={user?.name || "Guest"} cursor="pointer" />
              <span className="w-[30px] h-[30px] p-1">
                <MdArrowDropDown
                  className="w-full h-full"
                  onClick={toggledropDown}
                />
              </span>

              <div
                className={
                  openDropdown
                    ? "w-max h-max flex flex-col p-2 gap-2 absolute top-[65px] items-center justify-center right-0 white shadow-lg border-[1px]"
                    : "hidden"
                }
              >
                <div className="flex w-full text-primary cursor-text items-center gap-1 flex-row text-[18px] p-[0.3rem] hover:bg-secondary rounded-md transition-colors">
                  <MdOutlineAccountCircle fontSize={24} />
                  <p className="font-semibold">Logged in as {user?.name}</p>
                </div>
                <div className="flex w-full text-primary items-center gap-1 flex-row text-[18px] p-[0.3rem] hover:bg-secondary rounded-md transition-colors">
                  <MdAccountBox fontSize={28} />
                  <Link
                    to="/shop/account"
                    className="font-semibold w-full h-full"
                  >
                    Accounts
                  </Link>
                </div>
                <div className="flex w-max text-red-500 items-center justify-center gap-1 flex-row text-[18px] p-[0.3rem] hover:bg-red-500 hover:bg-opacity-15 rounded-md transition-colors">
                  <LuLogOut fontSize={28} />
                  <button
                    className="w-full h-max text-red-500 p-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <button
              className="flex items-center p-2 md:hidden"
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              {toggleSidebarOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <Sidebar
        isOpen={toggleSidebarOpen}
        toggleSidebar={toggleSidebar}
        navigationItems={categories}
      />
    </div>
  );
};

export default Header;
