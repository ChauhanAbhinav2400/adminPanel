import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { deleteCategory, getCategory } from '../ApiListener/categoryApi';
import { useDispatch } from "react-redux";


export default function Category() {

  const nevigate = useNavigate();
  const dispatch = useDispatch();
const [categories,setCategories]=useState([])
const [count,setCount]=useState(0)
const [searchInput, setSearchInput] = useState("");
 

const handleClick = ()=>{
  nevigate("/admin/category/create/add-category")
}

const previousHandler = () => {
  if (count > 0) {
    setCount(count - 1);
  }
};
const nextHandler = () => {
  setCount(count + 1);
};

const categoryDeleteHandler=(id)=>{
  deleteCategory(id).then((resp)=>{
     console.log(resp)
  })
}

const seachMemberHandler = () => {
 
  
  const filterCategory =categories.filter((item) =>
    item.name.toLowerCase().includes(searchInput)
  );
 
  setCategories(filterCategory );
};


const handleEdit = (id) => {
  dispatch(editCategory(id));
  nevigate(`/admin/category/create/edit-category/${encodeURIComponent(id)}`);
};



useEffect(()=>{
  getCategory(count).then((resp)=>{
     if(resp){
       setCategories(resp)
     }
    
  })
  

},[count,searchInput])

useEffect(() => {
  
  const filterCategory = categories.filter((item) =>
    item.name.toLowerCase().includes(searchInput)
  );

  setCategories(filterCategory );
}, [searchInput]);

  return (
    <div className='bg-slate-200 w-full  overflow-auto'>
      <section className='bg-[#f1f5f9] my-4 '>
        <div className='flex flex-row	justify-between'>
          <div className='my-2 font-semibold text-lg mx-2 '>Categories</div>
          <div className='mt-3 me-2'>

           <button  onClick = {handleClick} type="button" className="py-1 px-4 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-primary rounded-full  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white"> Add New category</button> 
          </div>
        </div>

      </section>



      <div className='flex flex-row justify-end bg-[#f1f5f9] mb-4 mx-2'>


        <div className='my-2 mx-2'>

          <div
            className="relative flex "
            data-twe-input-wrapper-init
            data-twe-input-group-ref>
            <input
              type="text"
              placeholder='search Category Name'
              className="  peer block min-h-[auto] w-full rounded border border-indigo-600  bg-transparent px-3 py-[0.2rem] leading-[1.6]  transition-all duration-200 ease-linear "
              value={searchInput}
              onChange={(e)=>setSearchInput(e.target.value)}
            />
            <button
            onClick={seachMemberHandler}
              className="relative z-[2] -ms-0.5 flex items-center rounded-e bg-primary px-5  text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              type="button"
              id="button-addon1"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              <span className="[&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </span>
            </button>
          </div>


        </div>



      </div>

      <div className='mx-2 overflow-x-auto '>
      <table className=" w-full ">

<thead className='bg-[#F3F4F6] border-b-2 border-indigo-500'>

<tr className='' >
  <th className=" text-center p-3">ID</th>
  <th className=" text-center p-3">Name</th>
  <th className=" text-center p-3">Slug</th>
  <th className=" text-center p-3">Priority Order</th>
  <th className=" text-center p-3">Actions</th>
</tr>
</thead>

<tbody className='divide-y divide-[#EAEAF8] 	 '>
          {categories.map((item, index) => (
            <tr key={index}>
              <td className=" text-center p-3">{item.id}</td>
              <td className=" text-center p-3">{item.name}</td>
              <td className=" text-center p-3">{item.slugUrl}</td>
              <td className=" text-center p-3">{item.
porder}</td>
              <td className=" text-center p-3 flex justify-center items-center">
              <div
                    className="me-2 flex justify-center cursor-pointer"
                    onClick={() => handleEdit(item.id)}
                  >
                    <i>
                      <FiEdit className="text-red" />
                    </i>
                  </div>
                <button className='ms-2'><i><RiDeleteBinLine className='text-red' onClick={categoryDeleteHandler}/></i></button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>
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
    </div>


    </div>


  )
}
