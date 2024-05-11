import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { getFeaturedTour } from "../ApiListener";
import { removeFeaturedTour } from "../ApiListener";
import { toast } from "react-toastify";

const FeaturedTour = () => {
  const [FraturedTour, setFraturedTour] = useState([]);

  useEffect(() => {
    getFeaturedTour(0)
      .then((response) => {
        setFraturedTour(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (id) => {
    removeFeaturedTour(id)
      .then((response) => {
        if (response.data === true) {
          toast.success("Deleted SuccessFully");
          getFeaturedTour(0)
            .then((response) => {
              setFraturedTour(response.data);
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
            <th className="px-4 py-2 text-left">Title</th>
          </tr>
        </thead>

        <tbody className=" w-full ">
          {FraturedTour?.map((tour, index) => (
            <>
              <tr
                key={index}
                className={
                  "bg-white border-b-4 flex justify-between w-full items-center   border-gray/10"
                }
              >
                <td className="px-4 py-2  text-primary border-gray/10">
                  {tour.title}
                </td>
                <button
                  onClick={() => handleDelete(tour.id)}
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

export default FeaturedTour;
