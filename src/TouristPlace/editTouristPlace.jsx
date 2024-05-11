import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageLibrary from "../Imagelibrary/ImageLibrary";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import { IoMdCloseCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addTouristPlace, editTouristPlace } from "../ApiListener/touristPlace";

export default function EditTouristPlace() {
  const {id}=useParams()
    const navigate=useNavigate()
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    id: 0,
    placeName: "",
    slugUrl: "",
    seoTitle: "",
    description: "",
    rssUrl: "",
    imgUrl: "",
    shortDescription: "",
    publisherId: userInfo.publisherId,
    isActive: 1,
  });

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const image = useSelector((state) => state.imageReducer.touristPlaceImage);
  const notify = () =>
    toast.success("Place Update Successfully", {
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

  const savePlaceHandler = (e) => {
    e.preventDefault();
    Setisblue(!isblue);
    addTouristPlace(formData).then((resp) => {
      console.log(resp);
      if (resp) {
        notify();
      } else {
        alert("something went wrong");
      }
    });
    setFormData({
        id: 0,
        placeName: "",
        slugUrl: "",
        seoTitle: "",
        description: "",
        rssUrl: "",
        imgUrl: "",
        shortDescription: "",
        publisherId:0,
        isActive: 1,
    });
    navigate("/admin/tourist-place/create")
  };

  const cancelPlaceHandler = (e) => {
    Setisblue(!isblue);
  };


  useEffect(()=>{
    editTouristPlace(id).then((resp)=>{
        
        setFormData(resp)
    })
  },[])

  return (
    <div className="w-full h-screen overflow-auto pb-4">
      <section className="bg-[#f1f5f9]	 mt-4 mx-4 flex flex-row m	justify-between items-center  ">
        <div className="mt-3 ms-3">
          <div className="font-medium text-md">
            {" "}
            <Link
              to="/admin/tourist-place/create"
              className="text-gray px-1 bg-[#f1f5f9]	 text-xl "
            >
              Teams /
            </Link>
            Add New Tourist Place
          </div>
          <div className="my-2  flex gap-x-4 justify-start items-center">
            <i>
              <FaArrowLeftLong />{" "}
            </i>
            <div className="font-semibold text-lg">Create Tourist Place</div>
          </div>
        </div>
        <div className="mt-3 me-2">
          <button
            type="button"
            className={`py-1  px-5 me-2 mb-2  border border-primary  rounded-full ${
              isblue ? "bg-slate-100	 text-primary" : "bg-primary text-white  "
            }  `}
            onClick={cancelPlaceHandler}
          >
            {" "}
            Cancel
          </button>

          <button
            type="button"
            className={`py-1  px-5 me-2 mb-2  border border-primary   rounded-full  ${
              isblue ? "bg-primary text-white" : "bg-slate-100	 text-blue"
            }  `}
            onClick={savePlaceHandler}
          >
            Save
          </button>
        </div>
      </section>

      <div className="bg-[#f1f5f9]	 border  border-[#EAEAF8] mt-4 mx-4">
        <div className="ms-4">
          <h4 className=" font-medium text-lg ms-5 pt-4">
            Add New Tourist Place
          </h4>
          <p className="ms-5 text-sm pb-4">
            Enter the below details to add A new tourist place
          </p>
        </div>
      </div>

      <div className=" mx-4 bg-[#f1f5f9]">
        <div className="flex  gap-x-3  items-center justify-between me-3 ">
        
          <div className="w-full mx-3  ">
            
            <div className=" text-center text-gray-700 md:text-left flex items-center my-2 font-sans">
             Place Name <span className="text-red ps-1">*</span>
            </div>
            <input
              type="text"
              name="placeName"
              placeholder="Enter Place Name"
              maxLength={50}
              className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
              value={formData.placeName}
              onChange={inputHandler}
            />
          </div>
        </div>

        <div className="mx-3  ">
          <div>
            <div className=" text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
              Slug Url <span className="text-red ps-1">*</span>
            </div>
            <input
              type="text"
              name="slugUrl"
              placeholder="Enter Slug Url"
              maxLength={10}
              required
              className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
              value={formData.slugUrl}
              onChange={inputHandler}
            />
          </div>
          <div>
            <div className=" text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
            Seo Title
            </div>
            <input
              name="seoTitle"
              placeholder="Enter Seo Title "
              maxLength={500}
              className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
              value={formData.seoTitle}
              onChange={inputHandler}
            />
          </div>


          <div className="w-full h-auto py-2 rounded-l">
              <div className="w-full items-center  relative">
                <label className="text-center text-gray-700 md:text-left flex items-center  my-2 font-sans ">
                  Image
                </label>
                <div className="h-full w-full flex justify-center items-center rounded-lg shadow-md border-[#EAEAF8] bg-white">
                <div
                  className="relative h-full w-full md:h-[200px] md:w-[40%] placeholder-left border-[2px] bg-white border-dashed border-primary scrollbar-hide rounded-xl  focus:outline-none font-medium overflow-y-auto  bg-white/10 resize-none bg-cover flex justify-center items-center"
                 
                >
                  <img className="h-full w-full" src={formData.imgUrl}/>


                  {!formData.imgUrl? (
                  <div
                    className="absolute flex justify-center  flex-col  w-full  items-center"
                    onClick={() => setShow(!show)}
                  >
                    <div className="text-center cursor-pointer ">
                      <FiUploadCloud size={25} />
                    </div>
                    <div className="text-primary font-medium">
                      Upload a high-resolution Image
                    </div>
                  </div>
                ) : (
                  <button
                    className=" absolute right-0 top-0 w-8 h-8 flex justify-center items-center border border-dashed border-white  hover:bg-red  hover:text-white text-xl bg-red text-white  rounded-full "
                    onClick={deleteImage}
                  >
                    <p className="self-center pb-1">x</p>
                  </button>
                )}


                </div>


              

                {show ? (
                  <ImageLibrary
                    isOpen={show}
                    onClose={handleCloseImageLibrary}
                    type="ADD_TOURISTPLACE_IMAGE"
                  />
                ) : (
                  ""
                )}
              </div>
              </div>
</div>




          <div className="w-full">
            <div className="text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
              Description
            </div>
            <textarea
              className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg  "
              rows="3"
              name="description"
              placeholder="Enter Description "
              value={formData.description}
              onChange={inputHandler}
            ></textarea>
          </div>
          <div className="w-full">
            <div className="text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
            Short Description
            </div>
            <textarea
              className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg  "
              rows="3"
              name="shortDescription"
              placeholder="Enter Short Description "
              value={formData.shortDescription}
              onChange={inputHandler}
            ></textarea>
          </div>
          
          <div className="w-full">
            <div className=" text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
              {" "}
              Rss Url
            </div>
            <input
              className="outline-none border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg "
              rows="3"
              name="rssUrl"
              placeholder="Enter Description"
              value={formData.rssUrl}
              onChange={inputHandler}
            />
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
