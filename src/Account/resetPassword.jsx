import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { resetPassword } from "../ApiListener/accountApi";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import loginImage from "../../src/assets/pubsquare-main-cover-photo.png";

const ResetPassword = () => {
  const { id } = useParams();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showComfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [error, setError] = useState(false);

  const notify = () =>
    toast("Congratulations! Your password has been successfully reset.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const [formData, setFormData] = useState({
    newPassword: "",
    comfirmNewPassword: "",
  });

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (formData.newPassword === formData.comfirmNewPassword) {
      resetPassword(id, formData.newPassword)
        .then((response) => {
          if (response.data === true) {
            toast.success("Password Reset successfully");
          } else {
            toast.error("No member is associated with the provided email");
          }
        })
        .catch((error) => {
          toast.error("No member is associated with the provided email");
        });
    } else {
      setError(true);
      setFormData({
        newPassword: "",
        comfirmNewPassword: "",
      });
    }

    // navigate("/admin/login")
    //  notify()
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

      <div className=" md:min-w-[40%] min-w-full h-screen flex justify-center items-center ">
        <div className="w-[90%] h-[90%] py-8  rounded-md self-center   min-w-[80%]  ">
          <h1 className="text-center h-[15%]  w-full ">
            <span className="text-primary rubik text-5xl font-medium text-center">
              Pub
            </span>
            <span className=" text-5xl font-medium  rubik text-center">
            Square
            </span>
          </h1>

          <div className="h-12 w-full">
            {error && (
              <div className="h-full w-full bg-[#fff3cd] text-[#664d03] flex justify-start items-center text-center">
                <p className="ml-2">Password should match.</p>
              </div>
            )}
          </div>
          <div className="h-[85%] w-full ">
            <div
              className="h-10  flex justify-start items-center text-primary text-xl font-medium
            "
            >
              <Link to="/admin/login" className="flex  items-center ">
                {" "}
                <IoChevronBackCircleOutline /> <button>Back to Login</button>
              </Link>
            </div>

            <div className="my-2 flex flex-col">
              <p className="text-3xl font-bold">Reset your password</p>
              <p className="text-lg text-gray my-2 font-normal">
                Please choose your new password
              </p>
            </div>
            <form className="h-auto my-2 w-full" onSubmit={submitHandler}>
              <label className="w-full text-gray font-semibold ">
                New Password
              </label>
              <div className="w-full my-2 flex justify-center items-center  rounded-md border-[1px] border-primary">
                <input
                  type={showNewPassword ? "text" : "password"}
                  required
                  className="w-[90%] outline-none pl-4 py-2  rounded-md"
                  placeholder="Enter New Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={(e) => inputHandler(e)}
                />{" "}
                <div
                  className="w-[10%] text-xl text-primary"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {!showNewPassword ? <BiSolidShow /> : <BiSolidHide />}
                </div>
              </div>
              <label className="w-full text-gray font-semibold ">
                Confirm Password
              </label>
              <div className="w-full my-2 flex justify-center items-center  rounded-md border-[1px] border-primary">
                <input
                  type={showComfirmNewPassword ? "text" : "password"}
                  required
                  className="w-[90%] outline-none pl-4 py-2  rounded-md"
                  placeholder="Enter New Password"
                  name="comfirmNewPassword"
                  value={formData.comfirmNewPassword}
                  onChange={(e) => inputHandler(e)}
                />
                <div
                  className="w-[10%] text-xl text-primary"
                  onClick={() =>
                    setShowConfirmNewPassword(!showComfirmNewPassword)
                  }
                >
                  {!showComfirmNewPassword ? <BiSolidShow /> : <BiSolidHide />}
                </div>
              </div>
              <button
                type="submit"
                className="py-3 rounded-md bg-primary w-full my-6 text-white font-semibold"
              >
                Save New Password
              </button>
            </form>
          </div>
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

export default ResetPassword;
