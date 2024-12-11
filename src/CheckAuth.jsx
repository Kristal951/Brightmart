import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

function CheckAuth({ isAuthenticated, user , children}) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location, isAuthenticated);
    if (!isAuthenticated) {
      if (
        !(
          location.pathname.includes("/auth") ||
          location.pathname.includes("/auth")
        )
      ) {
        navigate("/");
      }
      return;
    }

    if (
      isAuthenticated &&
      (location.pathname.includes("/auth") ||
        location.pathname.includes("/auth"))
    ) {
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/shop/home");
      }
      return;
    }

    if (
      isAuthenticated &&
      user?.role !== "admin" &&
      location.pathname.includes("/admin")
    ) {
      navigate("/unauth-page");
      return;
    }

    if (
      isAuthenticated &&
      user?.role === "admin" &&
      location.pathname.includes("/shop")
    ) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, user, location, navigate]);

  // Render the child components for valid routes
  return (
    <div className="w-full h-screen">
      {
        children
      }
    </div>
  );
}

export default CheckAuth;
