import React, { useState } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/AUTH";
import {motion} from 'framer-motion'

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    exit: { opacity: 0, x: -50, transition: { duration: 1 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      return toast({
        title: "Password mismatch",
        description: "please match your password correctly",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (!userName || !email || !tel || !password || !confirmPassword) {
      return toast({
        title: "Please fill in all field",
        description: "please make sure to fill in all field",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    const payload = {
      userName,
      email,
      tel,
      password,
    };

    try {
      dispatch(registerUser(payload)).then((res) => {
        if (res?.payload.status === "success") {
          navigate("/auth/login");
          return toast({
            title: "Registered successfully",
            description: "You have successfully registered, please sign in.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          console.log(res);
          return toast({
            title: "Something went wrong",
            description: res.payload.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      });
    } catch (error) {
      console.log(error);
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
          Welcome To Brightmart
        </h1>
      </div>
      <div className="flex w-[45%] h-screen bg-transparent items-center justify-center">
        <form
          action=""
          className="flex flex-col gap-9 items-center justify-center bg-white h-[80%] w-full rounded-lg shadow-white shadow-md"
        >
          <h1 className="text-3xl text-[#0A6EA9] font-bold">
            Create An Account
          </h1>
          <input
            type="text"
            className="w-[80%] bg-[#DBEBFC] p-2 focus:bg-white rounded-md focus:outline-1 outline-[#0A6EA9]"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            autoFocus
          />
          <input
            type="email"
            className="w-[80%] bg-[#DBEBFC] p-2 focus:bg-white rounded-md focus:outline-1 outline-[#0A6EA9]"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            className="w-[80%] bg-[#DBEBFC] p-2 focus:bg-white rounded-md focus:outline-1 outline-[#0A6EA9]"
            placeholder="Tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <div className="flex flex-row w-[80%] gap-[5%] h-max">
            <input
              type="password"
              className="w-[47%] bg-[#DBEBFC] p-2 focus:bg-white rounded-md focus:outline-1 outline-[#0A6EA9]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="w-[47%] bg-[#DBEBFC] p-2 focus:bg-white rounded-md focus:outline-1 outline-[#0A6EA9]"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col h-max w-full items-center justify-center">
            <button
              type="submit"
              className="px-3 py-3 text-xl font-extrabold text-center text-[#ffff] bg-[#34BCF4] rounded-2xl hover:scale-105 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "SignUp"}
            </button>

            <span className="p-3 text-[1rem] text-[#34BCF4]">
              Already have an account, please sign in{" "}
              <Link
                className="text-xl capitalize hover:text-red-500"
                to="/auth/login"
              >
                here.
              </Link>
            </span>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SignUp;
