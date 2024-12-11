import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
