import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { getTeamMembers } from "../ApiListener/teamMemberApi";

import { deleteTeamMember } from "../ApiListener/teamMemberApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { deleteTouristPlace, getTouristPlace } from "../ApiListener/touristPlace";



export default function TouristPlace() {
  const nevigate = useNavigate();
  
  const [touristPlace, setTouristPlace] = useState([]);
  const [isDisable, setisDisable] = useState(false);
  const [count, setCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  
  const handleClick = () => {
    nevigate("/admin/tourist-place/add-tourist-place");
  };

  const [activeLink, setActiveLink] = useState(1);

  const previousHandler = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const nextHandler = () => {
    setCount(count + 1);
  };

  const notify = () =>
    toast.success("Place Delete Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const deletePlaceHandler = (id) => {
    deleteTouristPlace(id).then((resp) => {
      
      if (resp.data===true) {
      notify()
      }
    });
  };

  const seachPlaceHandler = (e) => {
    e.preventDefault();
 
    const filterPlace = touristPlace.filter((item) =>
      item.placeName.toLowerCase().includes(searchInput)
    );

    setTouristPlace(filterPlace);
  };

  const handleEdit = (id) => {
    nevigate(`/admin/tourist-place/add-tourist-place/${encodeURIComponent(id)}`);
  };

  useEffect(() => {
    getTouristPlace(count)
      .then((response) => {
       
        setTouristPlace(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count,searchInput]);

  const click = (linkId) => {
    setActiveLink(linkId);
  };

  useEffect(() => {
    
    const filterPlace = touristPlace.filter((item) =>
      item.placeName.toLowerCase().includes(searchInput)
    );

    setTouristPlace(filterPlace);
  }, [searchInput]);

  

  return (
    <div className="bg-slate-200 w-full  overflow-auto ">
      <section className="bg-[#f1f5f9] my-4 ">
        <div className="flex flex-row	justify-between">
          <div className="my-2 font-semibold text-lg mx-2 ">Tourist Place</div>
          <div className="mt-3 me-2">
            <button
              onClick={handleClick}
              type="button"
              className="py-1 px-4 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-primary rounded-full  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white "
            >
              {" "}
              Add Tourist Place
            </button>
          </div>
        </div>

        <div className="flex flex-row  ">
          <div className="flex">
            <Link
              to="#"
              onClick={() => click(1)}
              className={` ${
                activeLink == 1 && `border-b text-primary`
              } text-gray-300 hover:bg-gray-700 hover:text-blue  px-3 py-2 text-sm font-medium  : `}
            >
              All
            </Link>
            <Link
              to="/admin/team/create"
              onClick={() => click(2)}
              className={` ${
                activeLink == 2 && `border-b text-primary`
              } text-gray-300 hover:bg-gray-700 hover:text-blue  px-3 py-2 text-sm font-medium  : `}
            >
              Owner
            </Link>
            <Link
              to="#"
              onClick={() => click(3)}
              className={` ${
                activeLink == 3 && `border-b text-primary`
              } text-gray-300 hover:bg-gray-700 hover:text-blue  px-3 py-2 text-sm font-medium  : `}
            >
              Admin
            </Link>
            <Link
              to="#"
              onClick={() => click(4)}
              className={` ${
                activeLink == 4 && `border-b text-primary`
              } text-gray-300 hover:bg-gray-700 hover:text-blue  px-3 py-2 text-sm font-medium  : `}
            >
              Editor
            </Link>
            <Link
              to="#"
              onClick={() => click(5)}
              className={` ${
                activeLink == 5 && `border-b text-primary`
              } text-gray-300 hover:bg-gray-700 hover:text-blue  px-3 py-2 text-sm font-medium  : `}
            >
              Content Writer
            </Link>
            <Link
              to="#"
              onClick={() => click(6)}
              className={` ${
                activeLink == 6 && `border-b text-primary`
              } text-gray-300 hover:bg-gray-700 hover:text-blue  px-3 py-2 text-sm font-medium  : `}
            >
              Contributor
            </Link>
          </div>
        </div>
      </section>

      <div className="flex flex-row justify-between bg-[#f1f5f9] mb-4 mx-2">
        <div className="mt-3  mx-2 font-medium">10 Tourist Place are Listed</div>

        <div className="my-2 mx-2">
          <div
            className="relative flex "
            data-twe-input-wrapper-init
            data-twe-input-group-ref
          >
            <input
              type="text"
              placeholder="Search Place Name"
              className=" outline-none peer block min-h-[auto] w-full rounded border border-indigo-600  bg-transparent px-3 py-[0.2rem] leading-[1.6]  transition-all duration-200 ease-linear "
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="relative z-[2] -ms-0.5 flex items-center rounded-e bg-primary px-5  text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              type="button"
              id="button-addon1"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={seachPlaceHandler}
            >
              <span className="[&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-2 overflow-x-auto  ">
        <table className=" w-full ">
          <thead className="bg-[#F3F4F6] border-b-2 border-indigo-500">
            <tr className="">
              <th className=" text-center p-3">ID</th>
              <th className=" text-center p-3">Place Name</th>
              <th className=" text-center p-3">Slug Url</th>
              <th className=" text-center p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAEAF8] 	 ">
            {touristPlace?.map((place, index) => (
              <tr>
                <td className=" text-center p-3">{place.id}</td>
                <td className=" text-center p-3">{place.placeName
}</td>
                <td className=" text-center p-3">{place.slugUrl}</td>
                <td className=" text-center p-3 flex justify-center items-center">
                  <div
                    className="me-2 flex justify-center cursor-pointer"
                    onClick={() => handleEdit(place.id)}
                  >
                    <i>
                      <FiEdit className="text-red" />
                    </i>
                  </div>
                  <button className="ms-2">
                    <i>
                      <RiDeleteBinLine
                        className="text-red"
                        onClick={() => deletePlaceHandler(place.id)}
                      />
                    </i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" h-20 my-2 flex justify-between items-center">
        <button
          className="bg-primary p-2 px-4 text-white font-semibold mx-4"
          onClick={previousHandler}
        >
          Previous
        </button>
        <button
          className="bg-primary p-2 px-4 text-white font-semibold mx-4"
          onClick={nextHandler}
        >
          Next
        </button>
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
        theme="dark"
      />
    </div>
  );
}
