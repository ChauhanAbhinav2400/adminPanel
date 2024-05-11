import React, { useEffect, useState } from "react";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import { SiWindows11 } from "react-icons/si";
import { RiArrowLeftCircleFill } from "react-icons/ri";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ImageUpload } from "../redux/actions/action.imageUpload";
import ProgressBar from "@ramonak/react-progress-bar";
import baseUrl from "../baseUrl";

const ImageLibrary = ({ isOpen, onClose, type }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [screen, setScreen] = useState(true);
  const [file, setFile] = useState(null);
  const [showloader, setShowLoader] = useState(false);
  const [loaderValue, setLoaderValue] = useState(0);
  const [imageData, setImageData] = useState({
    imgName: "",
    altTag: "",
    upload: file,
  });
  const [images, setImages] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("hit");
    if (file) {
      setImageData({ ...imageData, imgName: file.name, upload: file });
    }
  }, [file]);

  useEffect(() => {
    console.log("hit");
    if (!images) {
      getImages();
    }
  }, [images]);

  const handleImageUpload = (e) => {
    console.log("hit");
    setShowLoader(true);
    setLoaderValue(20);
    console.log(imageData);
    const token = localStorage.getItem("Protectedtoken");

    axios.post(
        baseUrl + "api/admin-service/img/upload",
        imageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
    ).then((response) => {
        setLoaderValue(100);
        console.log("Image uploaded:", response.data);
        setScreen(true);
        setImages(null);
    }).catch((error) => {
        console.error("Error submitting form data:", error);
    });
    e.preventDefault();
  };

  
  // const handleScreen = () => {
  //   console.log('screen');
  //   setScreen(!screen);
  // }
  const getImages = async () => {
    console.log("hit");
    try {
      const token = localStorage.getItem("Protectedtoken");

      const response = await axios.get(
        baseUrl + "api/admin-service/img/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImages(response.data.data.content);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const uploadbannerimage = () => {
    console.log("hit");
    dispatch(ImageUpload(selectedImage, type));
    onClose();
  };

  const handleImageSelect = (image) => {
    console.log("hit");
    const timestamp = image.updatedDt;
    const date = new Date(timestamp);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setSelectedImage({ ...image, formattedDate: formattedDate });
    console.log(image);
  };

  const handleScreen = (e) => {
    console.log("screen");
    setScreen(!screen);
    e.preventDefault();
  };

  const handleFinishUpload = (e) => {
    console.log("hit");
    e.preventDefault();
    handleImageUpload();
  };

  const handleImageRemove = () => {
    console.log("hit");
    setSelectedImage(null);
  };

  const handleModalClose = (e) => {
    if (e.target === e.currentTarget) {
      console.log("close");
      onClose();
    }
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 z-50 w-full h-full  flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleModalClose}
      >
        <div className="bg-white  flex flex-col shadow-lg rounded-xl w-3/4 overflow-y-auto h-full md:h-[95%] md:w-[85%] lg:w-[85%]">
          <div className="text-gray font-medium text-xl text-center py-3">
            Images
          </div>
          <hr className="border border-gray" />
          <div className="flex justify-between p-4  ">
            <h2 className="text-xl font-bold rubik pt-2 ">Image Library</h2>
            {screen ? (
              <button
                className="bg-blue/70 rubik hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                onClick={handleScreen}
              >
                <FiUploadCloud size={22} />
                Upload Image
              </button>
            ) : (
              <button
                className="bg-blue/70  rubik hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                onClick={handleScreen}
              >
                <RiArrowLeftCircleFill size={22} />
                Back to main Library
              </button>
            )}
          </div>
          <hr className="border border-gray" />

          {screen ? (
            <>
              <div className="flex  p-1 w-full ">
                <div className=" w-[75%] flex pl-10 items-center border-r-2 border-gray ">
                  <SiWindows11 size={28} color="lightblue" />
                </div>
                <div className="flex gap-1 w-[25%] relative">
                  <div className="relative top-2 left-2">
                    <HiOutlineSearch size={25} />
                  </div>
                  <input
                    className="px-4 py-2  focus:outline-none"
                    type="text "
                    placeholder="Search by name "
                  />
                </div>
              </div>
              <hr className="border border-gray" />

              <div className="flex w-full md:flex-row flex-col  ">
                <div className="flex flex-wrap w-full max-h-[400px] overflow-y-auto  p-4 gap-8 border-r-2 border-gray">
                  {images?.map((image) => (
                    <div className="flex flex-col">
                      <div
                        key={image.id}
                        className={`cursor-pointer border-2 w-40 h-36 flex justify-center items-center p-1 rounded-lg  ${
                          selectedImage?.id === image.id
                            ? "border-blue"
                            : "border-gray"
                        }`}
                        onClick={() => handleImageSelect(image)}
                      >
                        <img
                          src={image.imgUrl}
                          alt={image.imgName}
                          className="w-40 h-32 object-cover" style={{backgroundSize:"cover"}}
                        />
                      </div>
                      <p>{image.imgName}</p>
                    </div>
                  ))}
                </div>

                {selectedImage && (
                  <div className="mt-4 w-[40%] ">
                    <h3 className="text-2xl pl-14 text-gray rubik font-medium mb-2">
                      Selected Image
                    </h3>
                    <div className=" relative flex  justify-evenly ">
                      <img
                        src={selectedImage.imgUrl}
                        alt={selectedImage.imgName}
                        className="w-40 h-40 object-cover border   border-primary rounded-lg"
                      />
                      <button
                        className=" relative w-8 h-8 flex justify-center items-center border border-dashed border-red   left-10 hover:bg-red  hover:text-white text-xl text-red  rounded-full "
                        onClick={handleImageRemove}
                      >
                        <p className="self-center pb-1">x</p>
                      </button>
                    </div>
                    <div className="flex flex-col pl-16 gap-1  ">
                      <p className="font-medium text-black text-lg">
                        {selectedImage.imgName.toUpperCase()}{" "}
                      </p>
                      <p className="font-medium text-black text-lg">
                        ALT TEXT:{selectedImage.altTag.toUpperCase()}{" "}
                      </p>
                      <p className="rubik text-gra/80">
                        updated on :{selectedImage.formattedDate}{" "}
                      </p>
                    </div>
                    <button
                      className=" w-32  hover:bg-red-600 pt-10 text-xl text-red rounded-lg px-4 py-2 flex items-center gap-2"
                      onClick={handleImageRemove}
                    >
                      <FiTrash2 color="red" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <hr className="border border-gray" />
              <div className="flex justify-between px-5 py-4">
                <div className="flex gap-2">
                  <button className="bg-gray hover:bg-blue-600 text-white rounded-lg px-3  flex items-center gap-2">
                    Prev
                  </button>
                  <button className="bg-gray hover:bg-blue-600 text-white rounded-lg px-3  flex items-center gap-2">
                    Next
                  </button>
                </div>
                <button
                  className="bg-blue hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                  onClick={() => uploadbannerimage()}
                >
                  Upload banner image
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-full flex justify-center  items-center gap-10 ">
                <div
                  className={`${
                    !file
                      ? "border-b-2 border-primary text-primary"
                      : "border-b-2 border-gray text-gray"
                  }   rubik text-lg pb-1 pt-2 `}
                >
                  Update Image
                </div>

                <div
                  className={`${
                    file
                      ? "border-b-2 border-primary text-primary"
                      : "border-b-2 border-gray text-gray"
                  }   rubik text-lg pb-1 pt-2 `}
                >
                  Update Info
                </div>
              </div>
              <hr className="border border-gray" />

              {!file && (
                <div className="flex pt-20 justify-center w-1/3 h-56 self-center mt-20 rounded-xl border-2 border-dashed border-primary  items-center">
                  <label htmlFor="fileInput" className="relative">
                    <input
                      id="fileInput"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  <div className="absolute flex justify-center flex-col w-full items-center bottom-80 cursor-pointer">
                    <FiUploadCloud
                      size={25}
                      onClick={() => {
                        document.getElementById("fileInput").click();
                      }}
                    />
                    <div className="text-primary font-medium">
                      Upload a high-resolution Image
                    </div>
                  </div>
                </div>
              )}

              {file && (
                <div className="flex flex-col gap-2 pt-14 justify-center items-center">
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="w-48 h-48 object-cover border  border-primary rounded-lg"
                  />

                  <input
                    className="px-4 py-2  w-80 border rounded-md border-primary focus:outline-none"
                    type="text"
                    placeholder="Image Name"
                    value={imageData.imgName}
                    onChange={(e) =>
                      setImageData({ ...imageData, imgName: e.target.value })
                    }
                  />

                  <input
                    className="px-4 py-2  w-80 rounded-md border border-primary  focus:outline-none"
                    type="text"
                    placeholder="Alt Name"
                    value={imageData.altTag}
                    onChange={(e) =>
                      setImageData({ ...imageData, altTag: e.target.value })
                    }
                    required
                  />
                  <button
                    type="submit"
                    className={`${
                      imageData.altTag.length > 0 ? "bg-blue/70" : "bg-gray"
                    } rubik hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex self-center items-center gap-2`}
                    onClick={handleImageUpload}
                    disabled={imageData.altTag.length <= 0}
                  >
                    Finish Uploading
                  </button>
                  {showloader ? (
                    <div className="self-center" style={{ width: "500px" }}>
                      <ProgressBar bgColor="red" completed={loaderValue} />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="text-gray text-lg rubik">
                    <span className="text-red">*</span> Image upload can not be
                    possible without alt tag
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  );
};

export default ImageLibrary;
