import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import ImageLibrary from "../Imagelibrary/ImageLibrary";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import { IoMdCloseCircle } from "react-icons/io";
import { addTeamMembers } from "../ApiListener/teamMemberApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTeamMember() {
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    emailId: "",
    mobileNo: "s",
    imgUrl: "",
    userTyp: "",
    vendorId: "",
    publisherId: "",
    authorName: "",
    slugUrl: "",
    metaTitle: "",
    description: "",
    content: "",
    publisherId: userInfo.publisherId,
    vendorId: userInfo.vendorId,
    isActive: 1,
  });

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const image = useSelector((state) => state.imageReducer.teamImage);
  const notify = () =>
    toast.success("You successfully added !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const [isblue, Setisblue] = useState(true);

  const [isradio, Setisradio] = useState(true);
  const radiocolor = () => {
    Setisradio(!isradio);
  };
  const [active, setIsActive] = useState(false);

  function UploadImage() {
    setIsActive(true);
  }

  const handleOpenImageLibrary = () => {
    setShow(true);
  };

  const handleCloseImageLibrary = () => {
    console.log("handleCloseImageLibrary");
    setShow(false);
  };

  useEffect(() => {
    if (image) {
      setFormData({ ...formData, imgUrl: image.imgUrl });
    }
  }, [image]);

  const deleteImage = () => {
    setFormData({ ...formData, imgUrl: "" });
    setShow(false);
  };

  const saveMemberHandler = (e) => {
    e.preventDefault();
    Setisblue(!isblue);
    addTeamMembers(formData).then((resp) => {
      console.log(resp);
      if (resp) {
        notify();
      } else {
        alert("something went wrong");
      }
    });
    setFormData({
      id: 0,
      name: "",
      emailId: "",
      mobileNo: "s",
      imgUrl: "",
      userTyp: "",
      vendorId: "",
      publisherId: "",
      authorName: "h",
      slugUrl: "",
      metaTitle: "",
      description: "",
      content: "",
      publisherId: 0,
      vendorId: 0,
      isActive: 1,
    });
  };

  const cancelMemberHandler = (e) => {
    Setisblue(!isblue);
  };

  return (
    <div className="w-full h-screen overflow-auto">
      <section className="bg-[#f1f5f9]	 mt-4 mx-4 flex flex-row	justify-between items-center  ">
        <div className="mt-3 ms-3">
          <div className="font-medium text-md">
            {" "}
            <Link
              to="/admin/team/create"
              className="text-gray px-1 bg-[#f1f5f9]	 text-xl "
            >
              Teams /
            </Link>
            Add New Team Member
          </div>
          <div className="my-2  flex gap-x-4 justify-start items-center">
            <i>
              <FaArrowLeftLong />{" "}
            </i>
            <div className="font-semibold text-lg">Create Members</div>
          </div>
        </div>
        <div className="mt-3 me-2">
          <button
            type="button"
            className={`py-1  px-5 me-2 mb-2  border border-primary  rounded-full ${
              isblue ? "bg-slate-100	 text-primary" : "bg-primary text-white  "
            }  `}
            onClick={cancelMemberHandler}
          >
            {" "}
            Cancel
          </button>

          <button
            type="button"
            className={`py-1  px-5 me-2 mb-2  border border-primary   rounded-full  ${
              isblue ? "bg-primary text-white" : "bg-slate-100	 text-blue"
            }  `}
            onClick={saveMemberHandler}
          >
            Save
          </button>
        </div>
      </section>

      <div className="bg-[#f1f5f9]	 border  border-[#EAEAF8] mt-4 mx-4">
        <div className="ms-4">
          <h4 className=" font-medium text-lg ms-5 pt-4">
            Add New Team Member
          </h4>
          <p className="ms-5 text-sm pb-4">
            Enter the below details to add A new team mermber
          </p>
        </div>
      </div>

      <div className=" mx-4 bg-[#f1f5f9]">
        <div className="flex  gap-x-3  items-center justify-between me-3 ">
          <div className="w-full md:w-[20%] flex flex-col justify-center items-center border-r border-[#EAEAF8] mt-2">
            <div className="  mb-4 text-center text-gray-700 md:text-left flex items-center my-4 font-sans ">
              {" "}
              Upload A Profile Picture
            </div>

            <div className="  grid grid-cols-1  justify-center justify-items-center   h-[120px] w-[120px] border-indigo-500/100 rounded-full ">
              {formData.imgUrl ? (
                <div className="relative flex justify-center items-center flex-col  h-[120px] w-[120px] rounded-full ">
                  <img
                    className="h-full w-full rounded-full"
                    src={formData.imgUrl}
                  />
                  <div className="absolute inset-0 h-full w-full  flex justify-end items-start">
                    <IoMdCloseCircle
                      className="text-xl text-red"
                      onClick={() => deleteImage()}
                    />
                  </div>
                </div>
              ) : (
                <>
                  {show ? (
                    <ImageLibrary
                      isOpen={show}
                      onClose={handleCloseImageLibrary}
                      type="ADD_Team_IMAGE"
                    />
                  ) : (
                    <div
                      onClick={() => setShow(true)}
                      className="flex justify-center border items-center cursor-pointer flex-col  h-[120px] w-[120px] border-indigo-500/100 rounded-full  "
                    >
                      <div className="text-center cursor-pointer ">
                        <FiUploadCloud size={15} />
                      </div>
                      <div className="text-primary  text-[12px] text-center">
                        Upload a high-resolution Image
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="w-full md:w-[75%]  ">
            <div className=" text-center text-gray-700 md:text-left flex items-center my-2 font-sans ">
              {" "}
              Email <span className="text-red ps-1">*</span>
            </div>
            <input
              type="text"
              name="emailId"
              placeholder="Enter Email"
              maxLength={50}
              className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg "
              value={formData.emailId}
              onChange={inputHandler}
            />
            <div className=" text-center text-gray-700 md:text-left flex items-center my-2 font-sans">
              Name <span className="text-red ps-1">*</span>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              maxLength={50}
              className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
              value={formData.name}
              onChange={inputHandler}
            />
          </div>
        </div>

        <div className="mx-3  ">
          <div>
            <div className=" text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
              Slug <span className="text-red ps-1">*</span>
            </div>
            <input
              type="text"
              name="slugUrl"
              placeholder="Enter Slug"
              maxLength={10}
              required
              className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
              value={formData.slugUrl}
              onChange={inputHandler}
            />
          </div>
          <div>
            <div className=" text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
              Meta Title
            </div>
            <input
              name="metaTitle"
              placeholder="Enter Meta Title "
              maxLength={500}
              className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
              value={formData.metaTitle}
              onChange={inputHandler}
            />
          </div>
          <div className="w-full">
            <div className="text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
              Meta Description
            </div>
            <textarea
              className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg  "
              rows="3"
              name="description"
              placeholder="Enter Meta Description "
              value={formData.description}
              onChange={inputHandler}
            ></textarea>
          </div>

          <div className="flex  gap-x-3 justify-between ">
            <div className="w-full md:w-1/2  ">
              <div className="flex">
                <div className="text-center text-gray-700 md:text-left flex items-center my-2 font-sans">
                  Auther Name <span className="text-red ps-1">*</span>{" "}
                </div>
              </div>
              <input
                type="text"
                name="authorName"
                className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
                maxLength={50}
                placeholder="Enter Auther Name"
                value={formData.authorName}
                onChange={inputHandler}
              />
            </div>
            <div className="w-full md:w-1/2  ">
              <div className="flex">
                <div className=" text-center text-gray-700 md:text-left flex items-center my-2 font-sans">
                  Role <span className="text-red ps-1">*</span>
                </div>
                <div className="mt-3 ms-1">
                  <IoIosInformationCircleOutline />{" "}
                </div>
              </div>
              <select
                name="userTyp"
                value={formData.userTyp}
                onChange={inputHandler}
                className="outline-none border shadow-md text-gray border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
              >
                <option></option>
                <option>SUPER ADMIN</option>
                <option>OWNER</option>
                <option>ADMIN</option>
                <option>CONTENT WRITER</option>
                <option>VENDOR-C</option>
                <option>VENDOR-T</option>
                <option>VENDOR-CT</option>
              </select>
            </div>
          </div>
          <div className="w-full">
            <div className=" text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
              {" "}
              Description
            </div>
            <textarea
              className="outline-none border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg "
              rows="3"
              name="content"
              placeholder="Enter Description"
              value={formData.content}
              onChange={inputHandler}
            ></textarea>
          </div>

          <div>
            <div className="flex mb-2">
              <div>Hide Author on website</div>
              <div className="mt-1 ms-1">
                {" "}
                <IoIosInformationCircleOutline />
              </div>
            </div>
            <label className="items-center mb-5 cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="peer absolute inset-0 w-1 h-1 overflow-hidden whitespace-nowrap"
              />

              <div
                onClick={radiocolor}
                className={`relative w-9 h-5 bg-gray-200 bg-gray peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary`}
              ></div>
            </label>
          </div>

          <div>
            <div className="  text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
              {" "}
              Add Social Profile{" "}
            </div>
            <div className=" mb-3 flex">
              <i className="me-2 mt-2">
                <FaLink />
              </i>
              <input
                type="link"
                name="link"
                placeholder="Add Social Link"
                maxLength={10}
                required
                className="outline-none border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
                value={formData.link}
                onChange={inputHandler}
              />
            </div>
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
        theme="colored"
      />
    </div>
  );
}
