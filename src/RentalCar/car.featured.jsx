import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { getFeaturedCar } from "../ApiListener/carRentalApi";
import { removeFeaturedCar } from "../ApiListener/carRentalApi";

const FeaturedCar = () => {
  const [FraturedCars, setFraturedCars] = useState([]);

  useEffect(() => {
    getFeaturedCar()
      .then((response) => {
        setFraturedCars(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (id) => {
    removeFeaturedCar(id)
      .then((response) => {
        if (response.data === true) {
          toast.success("Deleted SuccessFully");
          getFeaturedCar()
            .then((response) => {
              setFraturedCars(response.data);
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
      <table className="w-full table-auto">
        <thead className="">
          <tr className=" w-full h-14 border-b-8 border-gray/10 text-md font-medium  bg-white rounded-lg pb-2  ">
            <th className="px-4 py-2 text-left">Model Name</th>
          </tr>
        </thead>

        <tbody className=" w-full ">
          {FraturedCars?.map((Cars, index) => (
            <>
              <tr
                key={index}
                className={
                  "bg-white border-b-4 flex justify-between w-full items-center   border-gray/10"
                }
              >
                <td className="px-4 py-2  text-primary border-gray/10">
                  {Cars.modelNm}
                </td>
                <button
                  onClick={() => handleDelete(Cars.id)}
                  className=" hover:bg-red-600   border-l border-gray mr-5 text-white px-5 py-1 "
                >
                  <MdDelete size={22} color="red" />
                </button>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturedCar;
