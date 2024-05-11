import React from 'react'
import { useNavigate } from 'react-router-dom'
import PublisherPagination from './PublisherPagination';

export default function Publisher() {
    const nevigate = useNavigate()
    const handleClick = ()=>{
      nevigate("/admin/publisher/create/add-publisher")
    }
    
    
    
      return (
        <div className='bg-slate-200 w-full  overflow-auto'>
          <section className='bg-[#f1f5f9] my-4 '>
            <div className='flex flex-row	justify-between'>
              <div className='my-2 font-semibold text-lg mx-2 '>Publishers</div>
              <div className='mt-3 me-2'>
    
               <button  onClick = {handleClick} type="button" className="py-1 px-4 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-primary rounded-full  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white"> Add New Publishers</button> 
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
                  type="search"
                  placeholder='search Publisher'
                  className="  peer block min-h-[auto] w-full rounded border border-indigo-600  bg-transparent px-3 py-[0.2rem] leading-[1.6]  transition-all duration-200 ease-linear "
                />
                <button
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
    
    
          < PublisherPagination/>
    
    
        </div>
    
    
      )  
}
