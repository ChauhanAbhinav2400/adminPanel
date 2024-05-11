import React, { useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { toast } from "react-toastify";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { forgotPassword } from "../ApiListener/accountApi";
import { MdManageAccounts } from "react-icons/md";
import loginImage from "../../src/assets/pubsquare-main-cover-photo.png";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [succesfullMsg, setSuccesfullMsg] = useState(false);

  const inputHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    forgotPassword(email)
      .then((response) => {
        if (response.data.data === true) {
          toast.success(
            "An email with reset password instructions sent successfully"
          );
          setSuccesfullMsg(true);
        } else {
          toast.error("No member is associated with the provided email");
        }
      })
      .catch((error) => {
        toast.error("No member is associated with the provided email");
      });
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
        <div className="w-[90%] h-[90%] py-8  rounded-md self-center  min-w-[80%]  ">
          <h1 className="text-center h-[12%]  w-full ">
            <span className="text-primary rubik text-5xl font-medium text-center">
            Pub
            </span>
            <span className=" text-5xl font-medium  rubik text-center">
            Square
            </span>
          </h1>
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
              <p className="text-3xl font-bold">Forgot your password</p>
              <p className="text-lg text-gray my-2 font-normal">
                Send a link to your email to reset your password
              </p>
            </div>
            <form className="h-auto my-6 w-full" onSubmit={submitHandler}>
              <label className="w-full text-gray font-semibold ">
                Email ID
              </label>
              <div className="w-full border-[1px] border-primary rounded-md my-2 flex justify-center items-center">
                <MdManageAccounts className="w-[10%] text-2xl text-primary" />
                <input
                  required
                  type="email"
                  className="w-[90%] outline-none py-2  "
                  placeholder="Enter email ID"
                  name="emailId "
                  onChange={(e) => inputHandler(e)}
                />
              </div>
              <button
                type="submit"
                className="py-3 rounded-md bg-primary w-full my-6 text-white font-semibold"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
