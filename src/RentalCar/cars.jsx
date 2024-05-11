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
import { toast } from "react-toastify";
import { getCars } from "../ApiListener/carRentalApi";
import { deleteRentalCar } from "../ApiListener/carRentalApi";
import { getCarRentalById } from "../redux/actions/action.edit";

const PublishCars = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredDate, setFilteredDate] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [cars, setCars] = useState([]);
  const [firstvalue, setFirstValue] = useState(0);

  useEffect(() => {
    getCars(firstvalue)
      .then((response) => {
        setCars(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [firstvalue]);

  useEffect(() => {
    console.log("hit");
    if (filteredDate) {
      const filteredCars = cars.filter(
        (car) => car.createdDt?.slice(0, 11) === filteredDate
      );
      setCars(filteredCars);
    }

    if (inputValue) {
      const filterByNameArray = cars.filter((car) => {
        return car.title.includes(inputValue);
      });

      setCars(filterByNameArray);
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

  const handleEdit = (id, title) => {
    console.log(id);
    dispatch(getCarRentalById(id));
    navigate(`/admin/car-rental/edit/${encodeURIComponent(id)}`);
  };

  const handleDelete = async (id) => {
    deleteRentalCar(id)
      .then((response) => {
        if (response.data === true) {
          toast.success("Deleted SuccessFully");
          getCars(firstvalue)
            .then((response) => {
              setCars(response.data.content);
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
          <h1 className="text-xl font-medium rubik">Cars</h1>
          <div className="flex justify-center items-center gap-6">
            <select
              className="border border-blue items-end  rounded-md px-8 py-2 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filteredDate}
              onChange={handleDateFilter}
            >
              <option value="">Choose dates</option>
              {/* {[
                ...new Set(
                  cars.map((car) =>
                    car.createdDt?.slice(0, 11)
                  )
                ),
              ].map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))} */}
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
              placeholder="Search for Draft cars"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <table className="w-full table-auto">
        <thead className="">
          <tr className=" w-full h-20 border-b-8 border-gray/10 text-md font-medium  bg-white rounded-lg pb-2  ">
            <th className="px-4 py-2 text-left">Vendor</th>
            <th className="px-4 py-2 text-left">Car Model</th>
            <th className="px-4 py-2 text-left">Per KM Price</th>
            <th className="px-4 py-2 text-left">City</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {cars?.map((car, index) => (
            <tr key={index} className={"bg-white border-b-4  border-gray/10"}>
              <td className="px-4 py-2 border-r-2 text-primary border-gray/10">
                {car.vendorNm}
              </td>
              <td className="px-4 py-2 border-r-2 border-gray/10">
              {car.oemNm} {car.modelNm}
              </td>
              <td className="px-4 py-2 border-r-2 border-gray/10">
                {car.perKmPrice}
              </td>
              <td className="px-4 py-2 border-r-2 border-gray/10">
                {car.cityNm}
              </td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <button className="bg-primary hover:bg-blue-600 text-white px-2 py-1 rounded-md">
                    <IoMdEye size={22} color="white" />
                  </button>
                  <button
                    onClick={() => handleEdit(car.id)}
                    className="bg-blue/70 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
                  >
                    <GrEdit size={22} color="white" />
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
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

export default PublishCars;
