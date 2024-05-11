import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageLibrary from "../Imagelibrary/ImageLibrary";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import { addVendor, editVendor } from "../ApiListener/vendorListApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function EditVendor() {
  const {id}=useParams()
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const [isblue, Setisblue] = useState(true);
  const [show, setShow] = useState(false);
  const [active, setIsActive] = useState(false);
  const [formData,setFormData]=useState({
    id: 0,
  vendorId: "",
  vendorName: "",
  emailId: "",
  mobNo: "",
  imgUrl: "",
  vendorType: "",
  panNumber: "",
  gstNo: "",
  slugUrl: "",
  websiteUrl: "",
  fullAddrass: "",
  referBy: "",
  isActive:1,
  publisherId:userInfo.publisherId
  })

 
  const image = useSelector((state) => state.imageReducer.vendorImage);


  const notify = () =>
    toast.success("Successfully Vendor Update", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    const navigate=useNavigate()

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const toggleColors = () => {
    Setisblue(!isblue);
  };
  

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

  const saveVendorHandler=(e)=>{
     e.preventDefault()
     Setisblue(!isblue);
     addVendor(formData).then((resp)=>{
      if (resp) {
        notify();
      } else {
        alert("something went wrong");
      }
   })
   setFormData({
    id: 0,
  vendorId: "",
  vendorName: "",
  emailId: "",
  mobNo: "",
  imgUrl: "",
  vendorType: "",
  panNumber: "",
  gstNo: "",
  slugUrl: "",
  websiteUrl: "",
  fullAddrass: "",
  referBy: "",
  isActive: 1,
  publisherId:0
  })
  navigate("/admin/vendor/create")


  }

 

  const deleteImage = () => {
    setFormData({ ...formData, imgUrl: "" });
    setShow(false);
  };

  useEffect(()=>{
    editVendor(id).then((resp)=>{
      setFormData(resp.data.data)
    })
  },[])

  return (
    <div className="w-full h-screen overflow-auto">
      <section className="bg-[#f1f5f9]	 mt-4 mx-4 flex flex-row	justify-between items-center  ">
        <div className="mt-3 ms-3">
          <div className="font-medium text-md">
            {" "}
            <Link
                to="/admin/vendor/create"
              className="text-gray px-1 bg-[#f1f5f9] text-xl "
            >
              Vendors /
            </Link>
            Edit New Vendors
          </div>
          <div className="my-2  flex gap-x-4 justify-start items-center">
            <Link to="/admin/vendor/create">
              <i>
                <FaArrowLeftLong />{" "}
              </i>
            </Link>

            <div className="font-semibold text-lg">Create Vendor</div>
          </div>
        </div>
        <div className="mt-3 me-2">
          <button
            type="button"
            onClick={toggleColors}
            className={`py-1  px-5 me-2 mb-2  border border-primary  rounded-full ${
              isblue ? "bg-slate-100	 text-primary" : "bg-primary text-white  "
            }  `}
          >
            {" "}
            Cancel
          </button>

          <button
            type="button"
           
            className={`py-1  px-5 me-2 mb-2  border border-primary   rounded-full  ${
              isblue ? "bg-primary text-white" : "bg-slate-100	 text-blue"
            }  `}

            onClick={saveVendorHandler}
          >
            Save
          </button>
        </div>
      </section>

      <div className="bg-[#f1f5f9] border border-[#EAEAF8] mt-4 mx-4">
        <div className="ms-4">
          <h4 className=" font-medium text-lg ms-5 pt-4">Edit New Vendor</h4>
          <p className="ms-5 text-sm pb-4">
            Enter the below details to add a new vendor
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
              {formData?.imgUrl ? (
                <div className="relative flex justify-center items-center flex-col  h-[120px] w-[120px] rounded-full ">
                  <img
                    className="h-full w-full rounded-full"
                    src={formData?.imgUrl}
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
                      type="ADD_Vendor_IMAGE"
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
              type="email"
              name="emailId"
              placeholder="Enter Email"
              value={formData.emailId}
              onChange={inputHandler}
              maxLength={50}
              className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
            />
            <div className=" text-center text-gray-700 md:text-left flex items-center my-2 font-sans">
              Name <span className="text-red ps-1">*</span>
            </div>
            <input
              type="text"
              name="vendorName"
              placeholder="Enter Name"
              value={formData.vendorName}
              onChange={inputHandler}
              maxLength={50}
              className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
            />
            {/* <div className=" text-center text-gray-700 md:text-left flex items-center my-2 font-sans">
              Vandor ID <span className="text-red ps-1">*</span>
            </div>
            <input
              type="text"
              name="vendorId"
              placeholder="Enter Vandor ID"
              value={formData.vendorId}
              onChange={inputHandler}
              maxLength={50}
              className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
            /> */}
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
              value={formData.slugUrl}
              onChange={inputHandler}
              maxLength={10}
              required
              className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
            />
          </div>
          <div>
            <div className=" text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
              Website <span className="text-red ps-1">*</span>
            </div>
            <input
              type="text"
              name="websiteUrl"
              placeholder="Enter Website"
              value={formData.websiteUrl}
              onChange={inputHandler}
              maxLength={10}
              required
              className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
            />
          </div>

          <div>
            <div className=" text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
              Full Address <span className="text-red ps-1">*</span>
            </div>

            <input
              name="fullAddrass"
              placeholder="Enter Full Address "
              value={formData.fullAddrass}
              onChange={inputHandler}
              maxLength={500}
              className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
            />
          </div>
          <div className="flex  gap-x-3 justify-between ">
            <div className="w-full md:w-1/2  ">
              <div className="flex">
                <div className="text-center text-gray-700 md:text-left flex items-center my-2 font-sans">
                  Mobile Number <span className="text-red ps-1">*</span>{" "}
                </div>
                <div className="mt-3 ms-1">
                  <IoIosInformationCircleOutline />{" "}
                </div>
              </div>
              <input
                type="text"
                name="mobNo"
                className="border  shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
                maxLength={50}
                placeholder="Enter Your Mobile Number"
                value={formData.mobNo}
                onChange={inputHandler}
              />
            </div>
            <div className="w-full md:w-1/2  ">
              <div className="flex">
                <div className=" text-center text-gray-700 md:text-left flex items-center my-2 font-sans">
                  Vandor Type <span className="text-red ps-1">*</span>
                </div>
                <div className="mt-3 ms-1">
                  <IoIosInformationCircleOutline />{" "}
                </div>
              </div>
              <input
                type="text"
                name="vendorType"
                maxLength={50}
                className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
                placeholder="Enter Vender Type"
                value={formData.vendorType}
                onChange={inputHandler}
              />
            </div>
          </div>
          <div className="flex  gap-x-3 justify-between ">
            <div className="w-full md:w-1/2  ">
                
                <div className=" text-center text-gray-700 md:text-left flex items-center my-2 font-sans">
              Vandor ID <span className="text-red ps-1">*</span>
            </div>
            <input
              type="text"
              name="vendorId"
              placeholder="Enter Vandor ID"
              value={formData.vendorId}
              onChange={inputHandler}
              maxLength={50}
              className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
            />
             
            </div>
            <div className="w-full md:w-1/2  ">
              <div className="flex">
                <div className=" text-center text-gray-700 md:text-left flex items-center my-2 font-sans">
                  Refered By <span className="text-red ps-1">*</span>
                </div>
                <div className="mt-3 ms-1">
                  <IoIosInformationCircleOutline />{" "}
                </div>
              </div>
              <input
                type="text"
                name="referBy"
                maxLength={50}
                className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
                placeholder="Enter Referd By"
                value={formData.referBy}
                onChange={inputHandler}
              />
            </div>
          </div>
          
<div className="flex  gap-x-3 justify-between ">
            <div className="w-full md:w-1/2  ">
              <div className="flex">
                <div className="text-center text-gray-700 md:text-left flex items-center my-2 font-sans">
                  PAN Number <span className="text-red ps-1">*</span>{" "}
                </div>
                <div className="mt-3 ms-1">
                  <IoIosInformationCircleOutline />{" "}
                </div>
              </div>
              <input
                type="text"
                name="panNumber"
                className="border  shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
                maxLength={50}
                value={formData.panNumber}
                onChange={inputHandler}
                placeholder="Enter Your PAN Number"
              />
            </div>
            <div className="w-full md:w-1/2  ">
              <div className="flex">
                <div className=" text-center text-gray-700 md:text-left flex items-center my-2 font-sans">
                  GST Number <span className="text-red ps-1">*</span>
                </div>
                <div className="mt-3 ms-1">
                  <IoIosInformationCircleOutline />{" "}
                </div>
              </div>
              <input
                type="text"
                name="gstNo"
                maxLength={50}
                value={formData.gstNo}
                onChange={inputHandler}
                className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
                placeholder="Enter Your GST Number"
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

