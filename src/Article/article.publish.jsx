import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { IoFilter } from "react-icons/io5";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { GrEdit } from "react-icons/gr";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getArticleById } from "../redux/actions/action.edit";
import { toast } from "react-toastify";
import { getPublishedArtical } from "../ApiListener";
import { getDeleteArtical } from "../ApiListener";

const PublishArticle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredDate, setFilteredDate] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [publishedArticle, setPublishedArticle] = useState([]);
  const [firstvalue, setFirstValue] = useState(0);

  useEffect(() => {
    getPublishedArtical(firstvalue)
      .then((response) => {
        setPublishedArticle(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [firstvalue]);

  useEffect(() => {
    console.log("hit");
    if (filteredDate) {
      const filteredArticles = publishedArticle.filter(
        (article) => article.createdDt?.slice(0, 11) === filteredDate
      );
      setPublishedArticle(filteredArticles);
    }

    if (inputValue) {
      const filterByNameArray = publishedArticle.filter((article) => {
        return article.title.includes(inputValue);
      });

      setPublishedArticle(filterByNameArray);
    }
  }, [inputValue, filteredDate]);

  const handleDateFilter = (event) => {
    setFilteredDate(event.target.value);
  };

  const handlePrevious = () => {
    if (firstvalue > 0) {
      setFirstValue(firstvalue - 1);
    } else {
      toast.warn("You already on First Page");
    }
  };

  const handleNext = () => {
    if (firstvalue < 5) {
      setFirstValue(firstvalue + 1);
    } else {
      toast.warn("you reached max number of page limit");
    }
  };

  const handleEdit = (id) => {
    console.log(id);
    dispatch(getArticleById(id));
    navigate(`/admin/article/edit/${encodeURIComponent(id)}`);
  };

  const handleDelete = async (id) => {
    getDeleteArtical(id)
      .then((response) => {
        if (response.data === true) {
          toast.success("Deleted SuccessFully");
          getPublishedArtical(firstvalue)
            .then((response) => {
              setPublishedArticle(response.data.content);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-gray/10 relative gap-5 max-h-full overflow-y-auto  flex flex-col w-full p-4 ">
      <div className="w-full h-40 py-6 px-4 rounded-lg flex flex-col gap-5  bg-white ">
        <div className="w-full flex justify-between">
          <h1 className="text-xl font-medium rubik">Published</h1>
          <div className="flex justify-center items-center gap-6">
            <select
              className="border border-blue items-end  rounded-md px-8 py-2 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filteredDate}
              onChange={handleDateFilter}
            >
              <option value="">Choose dates</option>
              {[
                ...new Set(
                  publishedArticle.map((article) =>
                    article.createdDt?.slice(0, 11)
                  )
                ),
              ].map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <div className="text-blue self-center w-48  cursor-pointer flex  gap-2 text-xl rubik">
              <IoFilter size={25} /> Filters
            </div>
          </div>
        </div>
        <div className="flex  items-center gap-2 ">
          <div
            title="Filter"
            className="relative flex border bg-white border-gray-300 rounded-md px-4 py-2  border-primary focus:outline-none focus:ring-1 focus:ring-blue gap-2 w-full "
          >
            <GoSearch size={25} />
            <input
              type="text"
              value={inputValue}
              className=" w-full focus:outline-none "
              placeholder="Search for Draft Articles"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <table className="w-full table-auto">
        <thead className="">
          <tr className=" w-full h-20 border-b-8 border-gray/10 text-md font-medium  bg-white rounded-lg pb-2  ">
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Categories</th>
            <th className="px-4 py-2 text-left">Credits</th>
            <th className="px-4 py-2 text-left">Word Count</th>
            <th className="px-4 py-2 text-left">Seo Score</th>
            <th className="px-4 py-2 text-left">Timeline</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {publishedArticle?.map((article, index) => (
            <tr key={index} className={"bg-white border-b-4  border-gray/10"}>
              <td className="px-4 py-2 border-r-2 text-primary border-gray/10">
                {article.title}
              </td>
              <td className="px-4 py-2 border-r-2 border-gray/10">
                {article.categoryName}
              </td>
              <td className="px-4 py-2 border-r-2 border-gray/10">
                {article.authorName}
              </td>
              <td className="px-4 py-2 border-r-2 border-gray/10 text-left">
                {article.wordCount}
              </td>
              <td className="px-4 py-2 border-r-2 border-gray/10 text-left">
                {article.seoScore}
              </td>
              <td className="px-4 py-2 border-r-2 border-gray/10">
                {article.updatedDt?.slice(0, 11)}
              </td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <button className="bg-primary hover:bg-blue-600 text-white px-2 py-1 rounded-md">
                    <IoMdEye size={22} color="white" />
                  </button>
                  <button
                    onClick={() => handleEdit(article.id)}
                    className="bg-blue/70 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
                  >
                    <GrEdit size={22} color="white" />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="bg-red hover:bg-red-600 text-white px-2 py-1 rounded-md"
                  >
                    <MdDelete size={22} color="white" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full  h-14 relative   rounded-lg flex flex-col gap-5  bg-white ">
        <div className="flex gap-2 py-4 px-10 self-end">
          <button
            className="bg-blue hover:bg-blue-600 py-1 text-white  px-3  flex items-center gap-2"
            onClick={() => handlePrevious()}
          >
            <FaCaretLeft color="white" size={22} />
          </button>

          <button
            className="bg-blue hover:bg-blue-600 py-1 text-white  px-3  flex items-center gap-2"
            onClick={() => handleNext()}
          >
            <FaCaretRight color="white" size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishArticle;
