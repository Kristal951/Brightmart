import React from "react";
import { categories } from "..";
import { NavLink } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user } = useSelector((state) => state.auth);
    console.log(user)
  return (
    <div
      className={`fixed inset-0 z-40 w-[85%] p-4 bg-white h-screen transform transition-transform flex flex-col justify-between md:hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={category.path}
            className={({ isActive }) =>
              `text-xl font-medium p-2 transition-all ${
                isActive ? "border-primary border-b-2" : ""
              } text-primary`
            }
            onClick={toggleSidebar}
          >
            {category.label}
          </NavLink>
        ))}
      </div>

      <div className="flex w-full h-max items-center gap-2 flex-row">
        <Avatar name={user?.name || "Guest"}/>
        <p className="text-xl text-primary font-semibold">{user?.name}</p>
      </div>
    </div>
  );
};

export default Sidebar;
