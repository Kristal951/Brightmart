import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import Login from "./Pages/Auth/Login.jsx";
import SignUp from "./Pages/Auth/SignUp.jsx";
import WelcomePage from "./Pages/WelcomePage.jsx";
import AdminLayout from "./Pages/Admin/AdminLayout.jsx";
import Dashboard from "./Pages/Admin/Dashboard.jsx";
import Orders from "./Pages/Admin/Orders.jsx";
import ShopLayout from "./Pages/shop/ShopLayout.jsx";
import Home from "./Pages/shop/Home.jsx";
import Account from "./Pages/shop/Account.jsx";
import Listing from "./Pages/shop/Listing.jsx";
import CheckOut from "./Pages/shop/CheckOut.jsx";
import Index from "./Pages/NotFound/Index.jsx";
import CheckAuth from "./CheckAuth.jsx";
import AuthLayout from "./Pages/Auth/AuthLayout.jsx";
import { useEffect } from "react";
import { checkAuth } from "./store/AUTH";
import Products from "./Pages/Admin/Products.jsx";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner size="md"/>
      </div>
    )
  }

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShopLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="account" element={<Account />} />
            <Route path="listings" element={<Listing />} />
            <Route path="checkOut" element={<CheckOut />} />
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<Index />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
