import React, { useState, Fragment } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { AdminSidebarLinks } from "../";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { logOut } from "../../store/AUTH";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault()
    dispatch(logOut());
  };

  return (
    <Fragment>
      <div className="w-64 h-screen fixed hidden md:flex bg-primary flex-col p-2">
        <div className="flex w-max flex-row h-max items-center cursor-pointer pb-2">
          <div className="flex w-[70px] h-[70px] p-2">
            <MdAdminPanelSettings
              className="w-full h-full text-white"
              aria-label="Admin Panel Settings"
            />
          </div>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>
        <nav className="flex flex-col w-full h-max gap-2">
          {AdminSidebarLinks.map((link) => (
            <NavLink
              to={link.path}
              key={link.id}
              className={({ isActive }) =>
                `w-full h-[50px] flex flex-row items-center justify-start rounded-md hover:border-white hover:border-[1px] focus:outline-none focus:ring-2 focus:ring-white transition-all ${
                  isActive ? "bg-white text-primary font-bold" : "text-white"
                }`
              }
            >
              <div className="flex items-center justify-center p-2 w-[45px] h-[45px]">
                <link.icon className="w-full h-full" />
              </div>
              {link.label}
            </NavLink>
          ))}
        </nav>
        
        <button
          className="flex w-[80%] absolute bottom-2 rounded-md items-center justify-start hover:shadow-md hover:border-[1px] hover:border-white"
          onClick={handleLogout}
        >
          <div className="flex w-[50px] h-[50px] p-1 flex-row text-white">
            <MdLogout className="w-full h-full" />
          </div>
          <p className="text-xl text-white font-bold">Logout</p>
        </button>
      </div>

      <div className="md:hidden">
        <button
          className={`p-2 flex rounded-md items-center justify-center bg-primary text-white fixed top-2 ${
            isSidebarOpen ? "right-4" : "right-4"
          } z-[1300]`}
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>

        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleSidebar}
        ></div>
        <aside
          className={`fixed top-0 left-0 w-[17rem] h-full z-[9100] bg-primary transform transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex w-full flex-row h-max items-center cursor-pointer pb-2 p-4">
            <div className="flex w-[50px] h-[50px] p-2">
              <MdAdminPanelSettings
                className="w-full h-full text-white"
                aria-label="Admin Panel Settings"
              />
            </div>
            <h1 className="text-base font-bold text-white">Admin Panel</h1>
          </div>
          <nav className="flex flex-col w-full h-max gap-2 p-2">
            {AdminSidebarLinks.map((link) => (
              <NavLink
                to={link.path}
                key={link.id}
                className={({ isActive }) =>
                  `w-full h-[50px] flex flex-row items-center justify-start rounded-md hover:border-white hover:border-[1px] focus:outline-none focus:ring-2 focus:ring-white transition-all ${
                    isActive ? "bg-white text-primary font-bold" : "text-white"
                  }`
                }
                onClick={toggleSidebar}
              >
                <div className="flex items-center justify-center p-2 w-[45px] h-[45px]">
                  <link.icon className="w-full h-full" />
                </div>
                <p className="w-full">{link.label}</p>
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </Fragment>
  );
};

export default Sidebar;
