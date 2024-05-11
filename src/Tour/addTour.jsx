import React, { useEffect, useRef, useState } from "react";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import ImageLibrary from "../Imagelibrary/ImageLibrary";
import { GoSearch } from "react-icons/go";
import { Editor } from "@tinymce/tinymce-react";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isAction } from "redux";
import { addTourPkg } from "../ApiListener";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../redux/actions/action.imageUpload";
import JoditEditor from 'jodit-react';

function AddTour() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [file, setFile] = useState(null);
  const [vendor,setVendor] = useState()
  const image = useSelector((state) => state.imageReducer.imageTour);
  const multipleImage = useSelector((state)=>state.imageReducer.multipleImage)
  console.log( "multipleImage",multipleImage)
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  console.log(userInfo.vendorId);
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    slugUrl: "",
    summary: "",
    seoTitle: "",
    description: "",
    headerImgUrl: "",
    imgDescription: "",
    content: "",
    price: "",
    location: "",
    days: "",
    nights: "",
    vendorId: 0,
    publisherId: 0,
    isActive: 0
  });

  const [numDays, setNumDays] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [contentData, setContentData] = useState([]);
  const [images, setImages] = useState([]);
  const [indexRemove, setIndexRemove] = useState([])
  
console.log("images",images)
    const handleAddImage = (e) => {
       setShow1(true)
       e.preventDefault()
       };
      
     const handleRemoveImage = (index) => { 
      setIndexRemove([...indexRemove,index])
              
     }; 

useEffect(()=>{
  const updatedImages = images.filter((_, i) => !indexRemove.includes(i));
  setImages(updatedImages); 
},[indexRemove])

            const handleSendImages = (e) => {
               e.preventDefault()
               const dataToSend = {
                vendorId:vendor,
                images:images
               }
               console.log(dataToSend)
             }; 

  useEffect(() => {
    console.log(image);
    if (image) {
      setFormData({ ...formData, headerImgUrl: image.imgUrl });
    }
  }, [image]);

  useEffect(() => {
    if (multipleImage.length>0) {
      setImages(multipleImage);
    }
  }, [multipleImage]);

  const handleCloseImageLibrary = () => {
    setShow(false);
  };

  const handleCloseImageLibrary1 = () => {
    setShow1(false);
  };

  const editor = useRef(null);
  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
    setFormData({ ...formData, content: content });
  };

  useEffect(() => {
    if (formData.title !== "" && formData.slugUrl !== "") {
      addTourPkg(formData)
        .then((response) => {
          console.log(response.data.id);
          if (formData.id !== response.data.id) {
            setFormData((prevData) => ({
              ...prevData,
              id: response.data.id,
            }));
            setId(response.data.id);
            setVendor(response.data.vendorId)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formData]);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const initEditor = (editor) => {
    editorRef.current = editor;
  };

  const handleSubmit = (e) => {
    console.log("hitsubmit");

    const updatedFormData = { ...formData, isActive: 1 };
    setFormData(updatedFormData);

    if (formData.title && formData.slugUrl) {
      if (formData.title && formData.slugUrl) {
        addTourPkg(updatedFormData)
          .then((response) => {
            setFormData({
              id: 0,
              title: "",
              slugUrl: "",
              summary: "",
              seoTitle: "",
              description: "",
              headerImgUrl: "",
              imgDescription: "",
              content: "",
              price: 0,
              location: "",
              days: 0,
              nights: 0,
              vendorId: 0,
              publisherId: 0,
              isActive: 0
            });
            dispatch(ImageUpload({}, "ADD_TOUR_IMAGE"));
            toast.success("Published successfully");
            navigate("/admin/tour-package/published");
          })
          .catch((error) => {
            toast.error("Something went  Wrong");
            console.log(error);
          });
      }
    }

    
  };

 

  const handleNumDaysChange = (e) => {
    // setNumDays(parseInt(e.target.value));
    setNumDays(formData.days);
    // Reset contentData if needed
    setContentData([]);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleContentChange = (content) => {
    const updatedContentData = [...contentData];
    updatedContentData[selectedDay - 1] = { day: selectedDay, content };
    setContentData(updatedContentData);
  };

  const handleSubmitContent = () => {
    
    console.log({
      daysData:contentData,
      vendorId:vendor
    });
  };

  return (
    <>
      <div className="flex w-full h-screen ">
        <div className="md:w-[75%] w-full py-20  flex flex-col max-h-screen bg-gray/10 overflow-y-auto  px-5">
          <div className="flex flex-col w-full gap-4 ">
            <div className="w-full  relative ">
              <input
                type="text"
                onBlur={handleChange}
                name="title"
                autoComplete="off"
                placeholder="Title"
                className="py-3 pl-5 w-full focus:outline-none font-medium  text-2xl  bg-white"
              />
              <div className="text-end">characters:{formData.title.length}</div>
            </div>

            <div className="w-full relative">
              <input
                type="text"
                placeholder="SlugUrl"
                autoComplete="off"
                onBlur={handleChange}
                name="slugUrl"
                className="py-3 pl-5 w-full focus:outline-none font-medium  text-2xl  bg-white"
              />

              <div className="text-end">
                characters:{formData.slugUrl.length}/255
              </div>
            </div>

            <div className="w-full h-80 py-6 rounded-lg px-5 flex justify-between bg-white ">
              <div className="w-[48%]  relative">
                <label className="font-medium text-gray mb-2 block">
                  Description
                </label>
                <textarea
                  onChange={handleChange}
                  value={formData.description}
                  name="description"
                  placeholder="Description"
                  className="py-3 pl-5 pt-2 placeholder-left border  scrollbar-hide rounded-xl border-gray w-full focus:outline-none font-medium overflow-y-auto  bg-white resize-none"
                  style={{ minHeight: "200px" }}
                ></textarea>

                <div className="text-end">
                  characters:{formData.description.length}/255
                </div>
              </div>

              <div className="w-[48%] h-40 relative">
                <label className="font-medium text-gray mb-2 block">
                  Summary{" "}
                </label>
                <textarea
                  onChange={handleChange}
                  value={formData.summary}
                  name="summary"
                  placeholder="summary"
                  className="py-3 pl-5 pt-2 placeholder-left scrollbar-hide  border rounded-xl border-gray w-full focus:outline-none font-medium overflow-y-auto  bg-white resize-none"
                  style={{ minHeight: "200px" }}
                ></textarea>

                <div className="text-end">
                  characters:{formData.summary.length}/255
                </div>
              </div>
            </div>

            <div className="w-full h-80 py-6 rounded-lg px-5 flex justify-between bg-white ">
              <div className="w-[48%] items-center  relative">
                <label className="font-medium text-gray mb-2 block">
                  Featured Image
                </label>
                <div
                  className="py-3 pl-5 pt-2 placeholder-left border-2 border-dashed border-primary scrollbar-hide rounded-xl w-full focus:outline-none font-medium overflow-y-auto  bg-white/10 resize-none bg-cover"
                  style={{
                    minHeight: "200px",
                    backgroundImage: `url(${formData.headerImgUrl})`,
                  }}
                ></div>

                {!formData.headerImgUrl ? (
                  <div
                    className="absolute flex justify-center flex-col  w-full  items-center bottom-28"
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
                    className=" absolute left-0 top-8 w-8 h-8 flex justify-center items-center border border-dashed border-white  hover:bg-red  hover:text-white text-xl bg-blue text-white  rounded-full "
                    onClick={() =>
                      setFormData({ ...formData, headerImgUrl: "" })
                    }
                  >
                    <p className="self-center pb-1">x</p>
                  </button>
                )}

                {show ? (
                  <ImageLibrary
                    isOpen={show}
                    onClose={handleCloseImageLibrary}
                    type="ADD_TOUR_IMAGE"
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="w-[48%] h-40 relative">
                <label className="font-medium text-gray mb-2 block">
                  Image Description{" "}
                </label>
                <textarea
                  onChange={handleChange}
                  name="imgDescription"
                  placeholder="imgDescription"
                  className="py-3 pl-5 pt-2 placeholder-left scrollbar-hide  border rounded-xl border-gray w-full focus:outline-none font-medium overflow-y-auto  bg-white resize-none"
                  style={{ minHeight: "200px" }}
                ></textarea>

                <div className="text-end">characters:0/255</div>
              </div>
            </div>

           

            <Editor
              value={formData.content}
              onEditorChange={handleEditorChange}
              apiKey="rni5zforqs7sz9pj074sya5n27q2943ma0fa8w7s29e4fq4h"
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help",
              }}
            />

<div className="w-full h-40 py-6 rounded-lg px-5 flex  justify-between bg-white">
              <div className="w-[45%]   relative">
                <label className="font-medium text-gray mb-2 block">
                Price
                </label>
                <input
                value={formData.price}
                  type="number"
                  onChange={handleChange}
                  name="price"
                  placeholder="Price"
                  className="py-3 pl-5 pt-2 placeholder-left border border-primary rounded-lg scrollbar-hide w-full focus:outline-none font-medium overflow-y-auto  bg-white resize-none"
                ></input>
              </div>
              <div className="w-[45%]   relative">
                <label className="font-medium text-gray mb-2 block">
                Location
                </label>
                <input
                value={formData.location}
                  type="text"
                  onChange={handleChange}
                  name="location"
                  placeholder="Location"
                  className="py-3 pl-5 pt-2 placeholder-left border border-primary rounded-lg scrollbar-hide w-full focus:outline-none font-medium overflow-y-auto  bg-white resize-none"
                ></input>
              </div>
            </div>

            <div className="w-full h-40 py-6 rounded-lg px-5 flex  justify-between bg-white">
              <div className="w-[45%]   relative">
                <label className="font-medium text-gray mb-2 block">
                Days
                </label>
                <input
                value={formData.days}
                  type="number"
                  onChange={handleChange}
                  onBlur={handleNumDaysChange}
                  name="days"
                  placeholder="Days"
                  className="py-3 pl-5 pt-2 placeholder-left border border-primary rounded-lg scrollbar-hide w-full focus:outline-none font-medium overflow-y-auto  bg-white resize-none"
                ></input>
              </div>
              <div className="w-[45%]   relative">
                <label className="font-medium text-gray mb-2 block">
                Nights
                </label>
                <input
                value={formData.nights}
                  type="number"
                  onChange={handleChange}
                  name="nights"
                  placeholder="Nights"
                  className="py-3 pl-5 pt-2 placeholder-left border border-primary rounded-lg scrollbar-hide w-full focus:outline-none font-medium overflow-y-auto  bg-white resize-none"
                ></input>
              </div>
            </div>

{
  formData.title && formData.slugUrl ?
  (
    <>
    { formData.days >0  && <div className="w-full  py-6 rounded-lg px-5 flex flex-col overflow-y-auto max-h-[550px] gap-4 bg-white ">
  <div className="w-full gap-4  flex flex-col">
    {/* <label className="text-gray flex flex-col rubik" htmlFor=""> Fill How many Days of Tour You want To Added
  <input placeholder="Number of  Tour Days" className="w-full border border-primary p-1" type="number" value={numDays} onChange={handleNumDaysChange} />
  </label> */}
  <select className="w-full border border-primary p-1" value={selectedDay} onChange={(e) => handleDaySelect(parseInt(e.target.value))}> 
    
        {Array.from({ length: numDays }, (_, index) => (
          <option key={index + 1} value={index + 1}>Day {index + 1}</option>
        ))}
      </select>
      <JoditEditor
        value={(contentData[selectedDay - 1] && contentData[selectedDay - 1].content) || ''}
        onChange={handleContentChange}
      />
      <button  className ="p-2 self-center w-32 hover:rounded-lg active:shadow-md active:shadow-green bg-primary text-white" onClick={handleSubmitContent}>Submit</button>
  </div>
  </div>}


  <div className="w-full  py-6 rounded-lg px-5 flex flex-col overflow-y-auto max-h-96 gap-4 bg-white ">
    <div className="flex w-full flex-col gap-4">
    <button  className="p-2 mb-4 bg-primary text-white hover:shadow-sm cursor-pointer hover:shadow-gray w-32 rounded-xl" onClick={handleAddImage}>Add Image</button> 
    {/* {showImageInput && (
    <div> 
      <input type="file" onChange={handleImageUpload} /> 
      </div>
    )} */}
     {show1 ? (
                  <ImageLibrary
                    isOpen={show1}
                    onClose={handleCloseImageLibrary1}
                    type="ADD_MULTIPLE_IMAGE"
                  />
                ) : (
                  ""
                )}
                <div className="max-w-[95%] flex gap-4 overflow-x-auto ">
     {images.map((image, index) => (
     <div className=" relative min-w-[30%] max-w-[30%] " key={index}> 
     <img className="w-full" src={image} alt="Selected" /> 
     <button  className=" absolute right-0 top-0 bg-red text-white hover:shadow-sm  cursor-pointer hover:shadow-gray h-6 w-6 rounded-full" onClick={() => handleRemoveImage(index)}>X</button>
      </div>
    ))}
    </div>
    {images.length > 0  && <button  className="p-2 bg-primary text-white hover:shadow-sm cursor-pointer hover:shadow-gray w-32 rounded-xl" onClick={handleSendImages}>Send Images</button> }
    </div> 
  </div>
    </>
  ):""
}             
           
          </div>
        </div>


        <div className="min-w-80  h-full   flex-col gap-6  hidden md:flex bg-gray/10 ">
          <div className="flex pl-4  gap-3 w-full pt-4">
            <button
              className={`p-2 ${show ? "bg-primary" : "bg-gray"
                } text-white active:shadow-sm cursor-pointer active:shadow-gray w-32 rounded-xl`}
            >
              Preview
            </button>
            <button
              onClick={() => handleSubmit()}
              disabled={
                !formData.title && !formData.slugUrl && !formData.headerImgUrl
              }
              className={`p-2 ${formData.title && formData.slugUrl && formData.headerImgUrl
                  ? "bg-primary"
                  : "bg-gray"
                } text-white active:shadow-sm cursor-pointer active:shadow-gray w-32 rounded-xl`}
            >
              Publish
            </button>
          </div>

          <div className="flex pt-10 flex-col pl-6 bg-white gap-6 w-full h-full">
            <div className="flex gap-6  ">
              <div
                className={`rounded-full ${formData.title ? "bg-primary p-2 " : "bg-gray w-8 h-8"
                  }`}
              >
                {formData.title ? <TiTick color="white" size={20} /> : ""}
              </div>
              <div className="text-gray font-medium text-2xl">Title</div>
            </div>

            <div className="flex gap-6  ">
              <div
                className={`rounded-full ${formData.slugUrl ? "bg-primary p-2" : "bg-gray w-8 h-8"
                  }`}
              >
                {formData.slugUrl ? <TiTick color="white" size={20} /> : ""}
              </div>
              <div className="text-gray font-medium text-2xl">Slugurl</div>
            </div>

            <div className="flex gap-6  ">
              <div
                className={`rounded-full ${
                  formData.headerImgUrl ? "bg-primary p-2" : "bg-gray w-8 h-8"
                }`}
              >
                {formData.headerImgUrl ? (
                  <TiTick color="white" size={20} />
                ) : (
                  ""
                )}
              </div>
              <div className="text-gray font-medium text-2xl">Image</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTour;
