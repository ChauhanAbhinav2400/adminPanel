import React, { useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { Logininfo } from "../redux/actions/action.login";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import loginImage from "../../src/assets/pubsquare-main-cover-photo.png";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [show, setshow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      emailId: email,
      password: password,
    };
    console.log(formData);
    // toast.warn("Checking Credentials...")
    try {
      const newRoute = await dispatch(Logininfo(formData));
      if (newRoute) {
        navigate(newRoute);
        toast.success("Successfully Log In...");
      } else {
        toast.error("Invalid Credential. Please Try Again.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side content */}
      <div
        className="w-[60%] hidden md:block bg-cover bg-center "
        style={{
          backgroundImage: `url(${loginImage})`,
          background: "cover",
        }}
      >
      </div>

      <div className=" md:min-w-[40%] min-w-full h-screen flex justify-center items-center">
        <div className=" p-8  rounded-md self-center  h-[80%] min-w-[80%] ">
          <h1 className="text-center pb-14">
            <span className="text-primary rubik text-5xl font-medium text-center">
              Pub
            </span>
            <span className=" text-5xl font-medium  rubik text-center">
              Square
            </span>
          </h1>
          <h2 className="text-3xl text-center rubik font-medium mb-5">
            Sign In to PubSquare
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 gap-1  flex hover:border-primary border focus:outline-none focus:border-primary focus:shadow-md focus:shadow-primary bg-white shadow-sm shadow-gray border-gray rounded-md px-2 py-1 w-full ">
              <LuUser2 size={22} />
              <input
                type="email"
                id="email"
                value={email}
                autoComplete="on"
                onChange={(e) => setEmail(e.target.value)}
                className=" focus:outline-none  w-full"
                placeholder="Enter Email ID"
                required
              />
            </div>
            <div className=" relative mb-4 gap-1  flex hover:border-primary border focus:outline-none focus:border-primary focus:shadow-md focus:shadow-primary bg-white shadow-sm shadow-gray border-gray rounded-md px-2 py-1 w-full">
              <CiLock size={22} />
              <input
                type={`${show ? "text" : "password"}`}
                id="password"
                value={password}
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}
                className="focus:outline-none "
                placeholder="Enter Password"
                required
              />
              <div className="absolute right-5" onClick={() => setshow(!show)}>
                {" "}
                {show ? <LuEye size={20} /> : <LuEyeOff size={20} />}
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <label
                  htmlFor="rememberMe"
                  className="inline-flex  text-primary items-center"
                >
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  Stay signed in
                </label>
              </div>
              <Link
                to="/admin/user/forgot-password"
                className="text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="border-primary border rubik text-xl bg-primary hover:bg-blue-600 text-white  py-3 px-4 rounded-3xl w-full"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default LoginPage;
