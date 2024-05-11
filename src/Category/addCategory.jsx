import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addCategory } from "../ApiListener/categoryApi";
// import { SketchPicker,ChromePicker } from 'react-color'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCategory() {
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    slugUrl: "",
    metaTitle: "",
    metaDescription: "",
    heading: "",
    content: "string",
    contentType: "",
    permaLink: "",
    color: "#00000",
    parentCategoryId: null,
    publisherId: userInfo.publisherId,
    porder: 0,
  });

  const notify = () =>
    toast.success("You successfully category!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleColorChange = (e) => {
    setFormData({ ...formData, color: e.target.value });
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, content: content });
    setWordsCount(content.split(/\s+/).length);
  };

  const saveCategoryHandler = (e) => {
    e.preventDefault();
    addCategory(formData).then((resp) => {
      console.log(resp);
      if (resp) {
        notify();
      }
    });
  };

  return (
    <div className="w-full h-screen overflow-auto">
      <section className="bg-[#f1f5f9]	 mt-4 mx-4 flex flex-row	justify-between items-center  ">
        <div className="mt-3 ms-3">
          <div className="font-medium text-md">
            <Link
              to="/admin/category/create/"
              className="text-gray px-1 bg-[#f1f5f9]	 text-xl "
            >
              Categories /
            </Link>
            Add Category
          </div>
          <div className="my-2  flex gap-x-4 justify-start items-center">
            <i>
              <FaArrowLeftLong />
            </i>
            <div className="font-semibold text-lg">Add Category</div>
          </div>
        </div>
        <div className="mt-3 me-2">
          <button
            type="button"
            className="py-1 px-4 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-primary rounded-full  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white "
            onClick={saveCategoryHandler}
          >
            {" "}
            Save Category
          </button>
        </div>
      </section>

      <div className="mx-3  ">
        <div>
          <div className=" text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
            Name <span className="text-red ps-1">*</span>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Enter Ctegory Name"
            value={formData.name}
            onChange={inputHandler}
            maxLength={10}
            required
            className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
          />
        </div>
        <div>
          <div className=" text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
            Name in English (Permalink) <span className="text-red ps-1">*</span>
          </div>
          <input
            type="text"
            name="permaLink"
            value={formData.permaLink}
            onChange={inputHandler}
            placeholder="Enter Name in English"
            maxLength={10}
            required
            className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
          />
        </div>
        <div>
          <div className=" text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
            Slug Url
          </div>
          <input
            type="text"
            name="slugUrl"
            placeholder="Slug Url"
            value={formData.slugUrl}
            onChange={inputHandler}
            maxLength={10}
            required
            className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
          />
        </div>
        <div>
          <div className=" text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
            {" "}
            Meta Title{" "}
          </div>
          <input
            type="text"
            name="metaTitle"
            placeholder="Meta Title"
            value={formData.metaTitle}
            onChange={inputHandler}
            maxLength={10}
            required
            className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
          />
          <p className="mb-2 text-sm text-gray">
            Recommended title length: 50-60 characters| 0 characters
          </p>
        </div>
        <div>
          <div className=" text-center text-gray-700 md:text-left flex items-center  my-2 font-sans   ">
            {" "}
            Brand Coler{" "}
          </div>
          <div className="flex justify-between h-10 items-center w-32 px-2 border shadow-md border-[#EAEAF8]  text-sm rounded-lg">
            <input
              type="color"
              value={formData.color}
              name="color"
              onChange={handleColorChange}
              className=""
            />
            <span className="">{formData.color}</span>
          </div>
        </div>

        <div className="w-full">
          <div className="text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  ">
            Meta Description
          </div>
          <textarea
            className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg  "
            rows="3"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={inputHandler}
            placeholder="Enter Meta Description "
          ></textarea>
          <p className="mb-2 text-sm text-gray">
            Recommended description length: 120-160 characters| 0 characters
          </p>
        </div>
        <div>
          <div className=" text-center text-gray-700 md:text-left flex items-center  mt-3 mb-2 font-sans  ">
            Heading H1
          </div>

          <input
            type="text"
            name="heading"
            placeholder="Heading H1"
            value={formData.heading}
            onChange={inputHandler}
            maxLength={10}
            required
            className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
          />
          <p className="my-2 text-sm text-gray">
            Recommended length: 50-80 characters| 0 characters
          </p>
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="ArticalDes" className="mb-2 mt-3">
            Display Name
          </label>
          <CKEditor editor={ClassicEditor} />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="ArticalDes" className=" mt-3 mb-2">
            Content
          </label>
          <CKEditor
            value={formData.content}
            style={{ height: "300px" }}
            onBlur={handleEditorChange}
          />
        </div>

        <div>
          <div className=" text-center text-gray-700 md:text-left flex items-center   mt-3 mb-2 font-sans  ">
            Parent Category
          </div>
          <input
            type="text"
            name="parentCategoryId"
            placeholder=" Select Parent Category"
            value={formData.parentCategoryId}
            onChange={inputHandler}
            maxLength={10}
            required
            className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
          />
        </div>
        <div className="mb-3">
          <div className=" text-center text-gray-700 md:text-left flex items-center   mt-3 mb-2  font-sans  ">
            Content Type
          </div>
          <input
            type="text"
            name="contentType"
            value={formData.contentType}
            onChange={inputHandler}
            placeholder="Select Content Type(Optional)"
            maxLength={10}
            required
            className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg"
          />
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
// change the type of input
