import { Spinner, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/AUTH";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    exit: { opacity: 0, x: -50, transition: { duration: 1 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast({
        title: "Please fill in all fields",
        description: "Please make sure to fill in all fields",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    const payload = { email, password };

    try {
      dispatch(loginUser(payload)).then((res) => {
        if (res?.payload?.status === "success") {
          return toast({
            title: "Login successful.",
            description: "You have been successfully logged in.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          
          return toast({
            title: "Login failed.",
            description: res.payload.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      });
    } catch (error) {
      console.error(error);
      // Display error toast for unexpected errors
      toast({
        title: "Something went wrong.",
        description: "An error occurred while logging in.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <motion.div
      className="w-full flex bg-[#DBEBFC] h-screen items-center gap-[5%]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
    >
      <div className="flex w-[45%] bg-[#0A6EA9] h-screen items-center justify-center rounded-r-lg">
        <h1 className="text-4xl font-bold text-center text-[#FFFFFF]">
          Welcome Back To Brightmart.
        </h1>
      </div>
      <div className="flex w-[45%] h-screen bg-transparent items-center justify-center">
        <form
          className="flex flex-col gap-12 items-center justify-center bg-white h-[60%] w-full rounded-lg shadow-white shadow-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-[#0A6EA9] font-bold">Sign in to your account</h1>
          <input
            type="email"
            className="w-[80%] bg-[#DBEBFC] p-2 focus:bg-white rounded-md focus:outline-1 outline-[#0A6EA9]"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            className="w-[80%] bg-[#DBEBFC] p-2 focus:bg-white rounded-md focus:outline-1 outline-[#0A6EA9]"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-col h-max w-full items-center justify-center">
            <button
              type="submit"
              className="px-3 py-3 text-xl font-extrabold text-center text-[#ffff] bg-[#34BCF4] rounded-2xl hover:scale-105 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Sign In"}
            </button>

            <span className="p-3 text-[1rem] text-[#34BCF4]">
              Don't have an account?{" "}
              <Link className="text-xl capitalize hover:text-red-500" to="/auth/signup">
                Sign up here.
              </Link>
            </span>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
