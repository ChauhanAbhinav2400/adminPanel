
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";


const itemsPerPage = 10;
const items = Array.from({ length: 30}, (_, i) => `Item ${i + 1}`);
const PublisherPagination = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  return (
    <div className='mx-2 overflow-x-auto '>
      <table className=" w-full">

<thead className='  bg-[#F3F4F6] border-b-2 border-indigo-500 '>

<tr className=' ' >
  <th className=" text-center flex  p-6">ID</th>
  <th className=" text-center p-3">Name</th>
  <th className=" text-center p-3">Slug</th>
  {/* <th className=" text-center p-3">Priority Order</th> */}
  <th className=" text-center flex-row-reverse	 ps-10">Actions</th>
</tr>
</thead>

<tbody className='divide-y divide-[#EAEAF8] 	 '>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td className=" text-center flex p-6">{startIndex + index + 1}</td>
              <td className=" text-center p-3">{item}</td>
              <td className=" text-center p-3">{item}</td>
              {/* <td className=" text-center p-3">{item}</td> */}
              <td className=" text-center flex-row-reverse	 ps-10 ">
              <button className='me-2'><i><FiEdit/></i></button>
                <button className='ms-2'><i><RiDeleteBinLine/></i></button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>
<div className='flex justify-end me-4 mt-2 mb-2'>
<ReactPaginate
  pageCount={pageCount}
  pageRangeDisplayed={5}
  marginPagesDisplayed={2}
  onPageChange={handlePageChange}
  containerClassName={'pagination flex justify-center'}
  activeClassName={'bg-white text-primary border border-primary rounded-lg px-3 py-1'}
  previousLabel={<GrFormPrevious className="h-5 w-5" />}
  nextLabel={< GrFormNext className="h-5 w-5" />}

  pageClassName={'mx-2 px-2'}
  previousClassName={'mx-2 px-2'}
  nextClassName={'mx-2 px-2'}
  breakClassName={'mx-2 px-2 '}
  disabledClassName={'text-gray px-2 py-0'}
/>


</div>

    </div>
  );
};

export default PublisherPagination ;

