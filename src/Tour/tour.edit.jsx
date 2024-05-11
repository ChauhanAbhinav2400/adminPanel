import React, { useEffect, useRef, useState } from "react";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import ImageLibrary from "../Imagelibrary/ImageLibrary";
import { GoSearch } from "react-icons/go";
import { Editor } from "@tinymce/tinymce-react";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addArticle, addTourPkg } from "../ApiListener";
import { ImageUpload } from "../redux/actions/action.imageUpload";

function EditTour() {
    const dispatch = useDispatch()
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const image = useSelector((state) => state.imageReducer.imageTour);
  console.log(image)
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const getNewFormData = useSelector(
    (state) => state.TourEditReducer.editTourFormData
  );
//   console.log("getNewFormData", getNewFormData);
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
    focusKeyword: "",
    tags: "",
    authorId: 0,
    authorName: "",
    categoryName: "",
    isActive: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(image);
    if (image) {
      console.log(id);
      setFormData({ ...formData, headerImgUrl: image.imgUrl });
    }
  }, [image]);

  useEffect(() => {
    if (formData.title !== "" && formData.slugUrl !== "" ) {
       
      addTourPkg(formData)
        .then((response) => {
            console.log("chnage form data")
          console.log(response?.data?.id);
          if (formData.id !== response?.data?.id) {
            setFormData((prevData) => ({
              ...prevData,
              id: response?.data?.id,
            }));
            setId(response?.data?.id);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formData]);

  useEffect(() => {
    console.log(getNewFormData.id>0)
    if (getNewFormData.id>0) {
      setFormData(getNewFormData);
    }
  }, [getNewFormData]);

  const options = [
    {
      id: 1,
      value: "Traveling",
    },
  ];

  const handleOpenImageLibrary = () => {
    setShow(true);
  };

  const handleCloseImageLibrary = () => {
    setShow(false);
  };

  const editor = useRef(null);
  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
    setFormData({ ...formData, content: content });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
              focusKeyword: "",
              tags: "",
              vendorId: userInfo.vendorId,
              isAction: 0,
            })
            dispatch(ImageUpload({}, "ADD_TOUR_IMAGE"));
            toast.success("Published successfully");
            navigate("/admin/tour-package/published");
           
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    // console.log("submit");
    // console.log(formData);
  };

  const initEditor = (editor) => {
    editorRef.current = editor;
  };

  return (
    <>
      <div className="flex w-full h-screen ">
        <div className="md:w-[75%] w-full py-20  flex flex-col max-h-screen bg-background overflow-y-auto  px-5">
          <form className="flex flex-col w-full gap-4 " onSubmit={handleSubmit}>
            <div className="w-full  relative ">
              <input
                type="text"
                onChange={handleChange}
                name="title"
                value={formData.title}
                autoComplete="off"
                placeholder="Title"
                className="py-3 pl-5 w-full focus:outline-none font-medium  text-2xl  bg-white"
              />
              <div className="text-end">
                characters:{formData?.title?.length}
              </div>
            </div>

            <div className="w-full relative">
              <input
                type="text"
                placeholder="SlugUrl"
                autoComplete="off"
                value={formData.slugUrl}
                onChange={handleChange}
                name="slugUrl"
                className="py-3 pl-5 w-full focus:outline-none font-medium  text-2xl  bg-white"
              />

              <div className="text-end">
                characters:{formData?.slugUrl?.length}/255
              </div>
            </div>

            <div className="w-full h-80 py-6 rounded-lg px-5 flex justify-between bg-white ">
              <div className="w-[48%]  relative">
                <label className="font-medium text-gray mb-2 block">
                  Description
                </label>
                <textarea
                  onChange={handleChange}
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  className="py-3 pl-5 pt-2 placeholder-left border  scrollbar-hide rounded-xl border-gray w-full focus:outline-none font-medium overflow-y-auto  bg-white resize-none"
                  style={{ minHeight: "200px" }}
                ></textarea>

                <div className="text-end">
                  characters:{formData?.description?.length}/255
                </div>
              </div>

              <div className="w-[48%] h-40 relative">
                <label className="font-medium text-gray mb-2 block">
                  Summary{" "}
                </label>
                <textarea
                  onChange={handleChange}
                  name="summary"
                  placeholder="summary"
                  value={formData.summary}
                  className="py-3 pl-5 pt-2 placeholder-left scrollbar-hide  border rounded-xl border-gray w-full focus:outline-none font-medium overflow-y-auto  bg-white resize-none"
                  style={{ minHeight: "200px" }}
                ></textarea>

                <div className="text-end">
                  characters:{formData?.summary?.length}/255
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
                  value={formData?.imgDescription}
                  placeholder="imgDescription"
                  className="py-3 pl-5 pt-2 placeholder-left scrollbar-hide  border rounded-xl border-gray w-full focus:outline-none font-medium overflow-y-auto  bg-white resize-none"
                  style={{ minHeight: "200px" }}
                ></textarea>

                <div className="text-end">
                  characters:{formData?.imgDescription}/255
                </div>
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

            <div className="w-full h-40 py-6 rounded-lg px-5 flex flex-col justify-between bg-white">
              <div className="w-full   relative">
                <h1 className="mb-4 font-medium text-gray">SEO</h1>
                <label className="font-medium text-gray mb-2 block">
                  Focus Keyword
                </label>
                <input
                  type="text"
                  value={formData.focusKeyword}
                  onChange={handleChange}
                  name="focusKeyword"
                  placeholder="focus keyword"
                  className="py-3 pl-5 pt-2 placeholder-left border border-primary rounded-lg scrollbar-hide w-full focus:outline-none font-medium overflow-y-auto  bg-white resize-none"
                ></input>
              </div>
            </div>

            <div className="w-full h-32 py-6 rounded-lg px-5 flex flex-col justify-between bg-white">
              <div className="w-full   relative">
                <label className="font-medium text-gray mb-2 block">Tags</label>

                <div className="  py-3 cursor-pointer gap-2 pl-2 text-lg placeholder-left border border-primary rounded-lg  scrollbar-hide w-full focus:outline-none flex font-medium overflow-y-auto  bg-white resize-none  ">
                  <GoSearch size={25} />
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={handleChange}
                    name="tags"
                    autoComplete="on"
                    placeholder="tags"
                    className="w-full focus:outline-none "
                  />
                </div>
              </div>
            </div>

            <div className="w-full h-64 py-6 rounded-lg px-5 flex flex-col justify-between bg-white">
              <div className="w-full relative">
                <label className="font-medium text-gray mb-2 block">
                  Author Name
                </label>
                <select
                  className="py-3 pl-5 pt-2 w-full border border-primary rounded-sm focus:outline-none font-medium bg-white"
                  onChange={handleChange}
                  name="authorName"
                  value={formData.authorId}
                >
                  {options.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full relative">
                <label className="font-medium text-gray mb-2 block">
                  Category Name
                </label>
                <select
                  className="py-3 pl-5 pt-2 w-full border border-primary rounded-sm focus:outline-none font-medium bg-white"
                  onChange={handleChange}
                  name="categoryName"
                  value={formData.categoryName}
                >
                  {options.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* <input
              type="submit"
              value = "Update"
              className="p-2 bg-primary text-white hover:shadow-sm cursor-pointer hover:shadow-gray w-32 rounded-xl"
            /> */}
          </form>
        </div>
        <div className="min-w-80  h-full   flex-col gap-6  hidden md:flex bg-background ">
          <div className="flex pl-4  gap-3 w-full pt-4">
            <button
              className={`p-2 ${
                show ? "bg-primary" : "bg-gray"
              } text-white active:shadow-sm cursor-pointer active:shadow-gray w-32 rounded-xl`}
            >
              Preview
            </button>
            <button
              onClick={() => handleSubmit()}
              className={`p-2 ${
                formData.title && formData.slugUrl ? "bg-primary" : "bg-gray"
              } text-white active:shadow-sm cursor-pointer active:shadow-gray w-32 rounded-xl`}
            >
              Publish
            </button>
          </div>

          <div className="flex pt-10 flex-col pl-6 bg-white gap-6 w-full h-full">
            <div className="flex gap-6  ">
              <div
                className={`rounded-full ${
                  formData.title ? "bg-primary p-2 " : "bg-gray w-8 h-8"
                }`}
              >
                {formData.title ? <TiTick color="white" size={20} /> : ""}
              </div>
              <div className="text-gray font-medium text-2xl">Title</div>
            </div>

            <div className="flex gap-6  ">
              <div
                className={`rounded-full ${
                  formData.slugUrl ? "bg-primary p-2" : "bg-gray w-8 h-8"
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

export default EditTour;
