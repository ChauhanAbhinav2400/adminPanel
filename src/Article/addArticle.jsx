import React, { useEffect, useRef, useState } from "react";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import ImageLibrary from "../Imagelibrary/ImageLibrary";
import { GoSearch } from "react-icons/go";
import { Editor } from "@tinymce/tinymce-react";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAuthorList } from "../redux/actions/action.author";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addArticle } from "../ApiListener";
import { primaryCategory } from "../ApiListener/addArticalApi";
import { credits } from "../ApiListener/addArticalApi";
import { tagsList } from "../ApiListener/addArticalApi";
import { RiArrowDropDownLine } from "react-icons/ri";
import JoditEditor from "jodit-react";
import Select from "react-select";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoIosInformationCircle } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

function AddArticle() {
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [inputValue, setInputValue] = useState();
  const image = useSelector((state) => state.imageReducer.imageArticle);
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const [category, setCategory] = useState([]);
  const [filtercategory, setFilterCategory] = useState([]);

  const [subCategory, setSubCategory] = useState([]);
  const [Credits, setCredits] = useState([]);
  const [primarySelected, setPrimarySelected] = useState();
  const [subSelected, setSubSelected] = useState();
  const [primaryDropDown, setPrimaryDropDown] = useState(false);
  const [subDropDown, setSubDropDown] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagslist, setTagslist] = useState([
    { name: "ram" },
    { name: "dishant chauhan" },
    { name: "ram swami" },
    { name: "abhinav chauhan" },
    { name: "rohan rajput " },
  ]);
  console.log("tagslist", tagslist);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [wordsCount, setWordsCount] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [showtags, setShowTags] = useState(false);

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
    categoryId: 0,
    subCategoryId: 0,
    isActive: 0,
    publisherId: userInfo.publisherId,
    wordCount: wordsCount,
  });

  console.log(formData);

  const handleTagSelection = (tag) => {
    
    setSelectedTags([...selectedTags, tag]);
    setShowTags(false);
  };

  const handleTagRemoval = (tag) => {
    setSelectedTags(selectedTags.filter((item) => item !== tag));
  };

  const config = {
    readonly: false,
    height: 300,
  };

  const dispatch = useDispatch();
  const authorList = useSelector((state) => state.AuthorReducer.authorList);

  useEffect(() => {
    dispatch(getAuthorList());
  }, []);

  useEffect(() => {
    if (image) {
      setFormData({ ...formData, headerImgUrl: image.imgUrl });
    }
  }, [image]);

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

  const handleEditorChange = (content) => {
    setFormData({ ...formData, content: content });
    setWordsCount(content.trim().split(/\s+/).length);
    console.log(wordsCount);
  };

  useEffect(() => {
    if (
      formData.title !== "" &&
      formData.slugUrl !== "" &&
      formData.isActive === 0
    ) {
      addArticle(formData)
        .then((response) => {
          if (formData.id !== response.data.id) {
            setFormData((prevData) => ({
              ...prevData,
              id: response.data.id,
            }));
            setId(response.data.id);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formData]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    calculateProgressPercentage();
  };

  const handleSubmit = (e) => {
    const tagString = selectedTags.join(", ");
    const updatedFormData = {
      ...formData,
      isActive: 1,
      seoScore: progressPercentage,
      tags: tagString,
    };

    setFormData(updatedFormData);
    if (formData.title && formData.slugUrl) {
      addArticle(updatedFormData)
        .then((response) => {
          toast.success("Published successfully");
          navigate("/admin/article/published");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    primaryCategory()
      .then((resp) => {
        setCategory(resp.data.data.content);
        setFilterCategory(resp.data.data.content);
        return resp.data.data;
      })
      .then((respData) => {
        const filterData = respData.filter((item) => {
          return item.id !== formData.categoryId;
        });
        setSubCategory(filterData);
      });

    credits().then((resp) => {
      console.log(resp.data.data);
      setCredits(resp.data.data.content);
    });

    tagsList().then((resp) => {
      // setTagslist(resp.data.data.content);
    });
  }, [formData.categoryId]);

  useEffect(() => {
    if (inputValue?.length > 0) {
      const filterCategory = filtercategory.filter((item) =>
        item.name.includes(inputValue)
      );

      setCategory(filterCategory);
    }
  }, [inputValue]);

  useEffect(() => {
    const filteredTags = tagslist.filter((tag) => {
      return tag.name.includes(filterText);
    });

    setTagslist(filteredTags);
  }, [filterText]);

   useEffect(()=>{
     if(selectedTags){
       setFormData({...formData,tags:selectedTags.join(",")})
     }
    
   },[selectedTags])
   
  const calculateProgressPercentage = () => {
    let percentage = 0;
    if (formData.title.length < 80) {
      percentage += 20;
    }
    if (formData.slugUrl.length < 70 && formData.slugUrl.length > 0) {
      percentage += 20;
    }
    if (formData.headerImgUrl) {
      percentage += 20;
    }
    if (formData.content) {
      percentage += 20;
    }
    if (formData.authorId) {
      percentage += 2;
    }
    if (formData.tags) {
      percentage += 2;
    }
    if (formData.categoryId) {
      percentage += 2;
    }
    if (formData.focusKeyword) {
      percentage += 2;
    }
    if (formData.description) {
      percentage += 4;
    }
    if (formData.summary) {
      percentage += 4;
    }
    setProgressPercentage(percentage);
  };

  return (
    <>
      <div className="flex w-full h-screen ">
        <div className="md:w-[75%] w-full py-10  flex flex-col max-h-screen bg-background overflow-y-auto  px-5">
          <form className="flex flex-col w-full gap-4 " onSubmit={handleSubmit}>
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
                  name="description"
                  placeholder="Description"
                  value={formData.description}
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
                  name="summary"
                  placeholder="summary"
                  value={formData.summary}
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
                    type="ADD_ARTICLE_IMAGE"
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
                  value={formData.imgDescription}
                  placeholder="imgDescription"
                  className="py-3 pl-5 pt-2 placeholder-left scrollbar-hide  border rounded-xl border-gray w-full focus:outline-none font-medium overflow-y-auto  bg-white resize-none"
                  style={{ minHeight: "200px" }}
                ></textarea>

                <div className="text-end">
                  characters:{formData?.imgDescription?.length}
                </div>
              </div>
            </div>

            <JoditEditor
              value={formData.content}
              style={{ height: "300px" }}
              onChange={handleEditorChange}
            />
            <p>Word Count: {wordsCount}</p>

            <div className="w-full h-40 py-6 rounded-lg px-5  flex flex-col justify-between bg-white">
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

            <div className="w-full h-auto space-y-10 py-10 rounded-lg px-5 flex flex-col justify-between bg-white">
              <div className="w-full relative">
                <label className="font-medium text-gray mb-2 block">
                  Primary Category (Required)
                </label>
                <div className="  cursor-pointer gap-2 pl-2 text-lg  border border-primary rounded-lg  scrollbar-hide w-full  flex font-medium  justify-center items-center  bg-white  ">
                  <div
                    className="bg-white w-full p-2 flex items-center justify-between rounded-lg"
                    onClick={() => setPrimaryDropDown(!primaryDropDown)}
                  >
                    <GoSearch size={25} />
                    <div className="h-[30px] text-[#444] font-medium  mx-2 text-[16px] w-full ">
                      {primarySelected}
                      
                    </div>
                    <RiArrowDropDownLine className="text-4xl " />
                  </div>

                  <ul
                    className={` ${
                      !primaryDropDown ? "hidden" : "flex"
                    } bg-white rounded-b-md  flex-col border-b-[1px] border-x-[1px] border-[#b4b1b1] w-[92%] ml-4  h-[242px] overflow-y-scroll scrollbar scrollbar-thumb-[#b5b2b2] scrollbar-track-[#ede9e9] absolute top-[78px] z-40`}
                  >
                    <li>
                      <input
                        className="w-[97%] mx-2 pl-2 outline-none p-[5px] border-[1px] border-[#9f9e9e] text-[#514e4e]"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </li>

                    {category.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className=" cursor-pointer p-[6px] py-[2px] my-[4px] bg-[#f9f6f6] hover:bg-[#5897fb] hover:text-white w-full text-[#212529] text-[16px] font-medium "
                         
                          onClick={() => {
                            setPrimarySelected(item.name);
                            formData.categoryId = item.id;
                            setPrimaryDropDown(false);
                          }}
                        >
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="w-full relative">
                <label className="font-medium text-gray mb-2 block">
                  Additional Category (Optional)
                </label>
                <div className="  cursor-pointer gap-2 pl-2 text-lg  border border-primary rounded-lg  scrollbar-hide w-full  flex font-medium  justify-center items-center  bg-white  ">
                  <div
                    className="bg-white w-full p-2 flex items-center justify-between rounded-lg"
                    onClick={() => setSubDropDown(!subDropDown)}
                  >
                    <GoSearch size={25} />
                    <div className="h-[30px] text-[#444] font-medium  text-[16px] mx-2  w-full ">
                      {subSelected}
                    </div>
                    <RiArrowDropDownLine className="text-4xl " />
                  </div>

                  <ul
                    className={` ${
                      !subDropDown ? "hidden" : "flex"
                    } bg-white rounded-b-md  flex-col border-b-[1px] border-x-[1px] border-[#b4b1b1] w-[92%] ml-4  h-[242px] overflow-y-scroll scrollbar scrollbar-thumb-[#b5b2b2] scrollbar-track-[#ede9e9] absolute top-[78px] z-40`}
                  >
                    <li>
                      <input
                        className="w-[97%] mx-2 pl-2 outline-none p-[5px] border-[1px] border-[#9f9e9e] text-[#514e4e]"
                        value={inputValue}
                        onChange={(e) =>
                          setInputValue(e.target.value.toLocaleLowerCase())
                        }
                      />
                    </li>

                    {category.map((item, index) => {
                      return (
                        <li
                          key={index}
                          disabled={item.name === primarySelected}
                          className=" cursor-pointer p-[6px] py-[2px] my-[4px] bg-[#f9f6f6] hover:bg-[#5897fb] hover:text-white w-full text-[#212529] text-[16px] font-medium "
                          onClick={() => {
                            if (item.name !== primarySelected) {
                              // Perform action only if not disabled
                              setSubSelected(item.name);
                              formData.subCategoryId = item.id;
                              setSubDropDown(false);
                            }
                          }}
                        >
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="w-full h-auto  relative">
                <label className="font-medium text-gray mb-2 block">Tags</label>
                <div className="w-full h-auto">
                  <div
                    className="flex h-auto border cursor-pointer justify-start  items-center border-primary rounded-lg p-4  w-full"
                    onClick={() => setShowTags(!showtags)}
                  >
                    <FiSearch className="text-2xl text-[#3b3a3a]" />

                    <div className="flex  flex-wrap pl-2 gap-2">
                      {selectedTags.map((tag) => (
                        <div
                          className="flex  border-[1px] border-[#b2afaf] rounded-[5px] p-1 bg-[#f3eded] text-[#444] font-medium  text-[16px]"
                          key={tag}
                        >
                          {tag}
                          <button
                            className="border-l ml-2 px-1 border-gray"
                            onClick={() => handleTagRemoval(tag)}
                          >
                            X
                          </button>
                        </div>
                      ))}{" "}
                      <input
                        className="w-auto h-auto pl-2 outline-none  text-[#302f2f]"
                        type="text"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                      />
                    </div>
                  </div>
                  {showtags && (
                    <ul className="bg-white rounded-b-md  flex-col  border-x-[1px] border-[#b4b1b1] w-[92%] ml-10  h-[135px] overflow-y-scroll scrollbar scrollbar-thumb-[#b5b2b2] scrollbar-track-[#ede9e9] absolute top-[84px] z-40">
                      {tagslist.length > 0 ? (
                        tagslist.map((tag) => (
                          <li
                            className=" cursor-pointer p-[6px] py-[2px] my-[4px] bg-[#f9f6f6] hover:bg-[#5897fb] hover:text-white w-full text-[#212529] text-[16px] font-medium "
                            onClick={() => handleTagSelection(tag.name)}
                          >
                            {tag.name}
                          </li>
                        ))
                      ) : (
                        <li
                          className="bg-gray hover:bg-primary w-full text-white "
                          onClick={() => handleTagSelection(filterText)}
                        >
                          {filterText}
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>

              <div className="w-full relative">
                <label className="font-medium text-gray mb-2 block">
                  Credits (Required)
                </label>
                <div className=" justify-center items-center  border border-primary cursor-pointer gap-2 pl-2 text-lg placeholder-left  rounded-lg  scrollbar-hide w-full focus:outline-none flex font-medium overflow-y-auto  bg-white resize-none  ">
                  <GoSearch size={25} />
                  <select
                    className="py-3 pl-5 pt-2 w-full  text-gray text-[18px]  rounded-sm focus:outline-none font-medium bg-white"
                    onChange={handleChange}
                    name="authorId"
                    value={formData.authorId}
                  >
                    <option></option>
                    {Credits.map((option) => (
                      <option
                        selected={userInfo.emailId === option.emailId}
                        className="text-gray text-[18px] font-medium"
                        key={option.id}
                        value={option.id}
                      >
                        {option.name} ( {option.emailId} )
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* <input
              type="submit"
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
              disabled={
                !formData.title && !formData.slugUrl && !formData.headerImgUrl
              }
              onClick={() => handleSubmit()}
              className={`p-2 ${
                formData.title && formData.slugUrl && formData.headerImgUrl
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
            <div className="flex flex-col w-full justify-center mt-4 items-center">
              {formData.headerImgUrl &&
              formData.content &&
              formData.slugUrl &&
              formData.title ? (
                ""
              ) : (
                <p className="text-red pb-5 flex  text-md font-medium">
                  {" "}
                  <IoIosInformationCircle color="red" size={22} /> PENDING SEO
                  WARNING
                </p>
              )}
              <div className="flex w-1/4 justify-center items-center">
                <CircularProgressbar
                  value={progressPercentage}
                  text={`${progressPercentage}%`}
                  styles={buildStyles({
                    textColor: "#004AAC",
                    pathColor: "#004AAC",
                    trailColor: "#D6D6D6",
                  })}
                />
              </div>
              <p className="text-primary text-lg font-medium">SEO SCORE</p>
              <div className="flex flex-col self-start w-full">
                {formData.title.length > 80 && (
                  <div className="text-red">
                    *{" "}
                    <span className="text-sm">
                      Title Length Should less than 80 charaters
                    </span>
                  </div>
                )}
                {formData.title.length < 10 && (
                  <div className="text-red">
                    *{" "}
                    <span className="text-sm text-black">
                      Title Length Should more than 10 charaters
                    </span>
                  </div>
                )}
                {formData.slugUrl.length > 70 && (
                  <div className="text-red">
                    *{" "}
                    <span className="text-sm">
                      slugUrl Length Should less than 80 charaters
                    </span>
                  </div>
                )}
                {formData.description.length > 200 && (
                  <div className="text-red">
                    *{" "}
                    <span className="text-sm text-black">
                      Description Length Should less than 200 charaters
                    </span>
                  </div>
                )}
                {formData.summary.length > 200 && (
                  <div className="text-red">
                    *{" "}
                    <span className="text-sm">
                      Summary Length Should less than 200 charaters
                    </span>
                  </div>
                )}
                {formData.tags === "" && (
                  <div className="text-red">
                    * <span className="text-sm">Tags Should be in Article</span>
                  </div>
                )}
                {formData.categoryId === 0 && (
                  <div className="text-red">
                    *{" "}
                    <span className="text-sm">
                      Primary Category Should be Selected{" "}
                    </span>
                  </div>
                )}
                {formData.content === "" && (
                  <div className="text-red">
                    *{" "}
                    <span className="text-sm">
                      Content Should conatin some Information
                    </span>
                  </div>
                )}
                {formData.focusKeyword.includes(formData.title) > 80 && (
                  <div className="text-red">
                    *{" "}
                    <span className="text-sm">
                      Focus keyword should have word from title{" "}
                    </span>
                  </div>
                )}
                {formData.headerImgUrl === "" && (
                  <div className="text-red">
                    * <span className="text-sm">Image must be in article </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddArticle;
