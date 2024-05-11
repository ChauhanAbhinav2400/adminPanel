import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function AddPublisher() {
    const [content, setContent] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [color, setColor] = useState("#000000");
    const handleColorChange = (e) => {
        setColor(e.target.value)
    }
    return (
        <div className='w-full h-screen overflow-auto'>
            <section className='bg-[#f1f5f9]	 mt-4 mx-4 flex flex-row	justify-between items-center  '>
                <div className='mt-3 ms-3'>
                    <div className='font-medium text-md'><Link to="/admin/publisher/create/" className='text-gray px-1 bg-[#f1f5f9]	 text-xl ' >Publishers /</Link>Add Publisher</div>
                    <div className='my-2  flex gap-x-4 justify-start items-center'>
                        <i><FaArrowLeftLong /></i>
                        <div className='font-semibold text-lg'>Add Publisher</div>
                    </div>
                </div>
                <div className='mt-3 me-2'>

                    <button type="button" className="py-1 px-4 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-primary rounded-full  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white "> Save </button>
                </div>


            </section>

            <div className='mx-3'>
              <div className="mb-14">

                <div >
                    <div className=' text-center text-gray-700 md:text-left flex items-center  mb-2 font-sans  '>Name </div>
                    <input type="text" name="slug" placeholder='Enter  Name' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                </div>
                <div className=' grid grid-cols-2 gap-4  '>

                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>URL </div>
                        <input type="text" name="slug" placeholder='Enter URL' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>
                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Log Url </div>
                        <input type="text" name="slug" placeholder='Enter Log URL' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>
                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>fb Url </div>
                        <input type="text" name="slug" placeholder='Enter Fb Url' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>
                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Pub Type </div>
                        <input type="text" name="slug" placeholder='Enter Pub Url' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>




                </div>

                </div>



             <div className='mb-14'>
                <div >
                    <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Robots Txt </div>
                    <input type="text" name="slug" placeholder='Enter Robots Txt' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                </div>
                <div className=' grid grid-cols-2 gap-4  '>

                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Ga Script </div>
                        <input type="text" name="slug" placeholder='Enter Ga Script' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>
                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Title </div>
                        <input type="text" name="slug" placeholder='Enter Title' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>
                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Description </div>
                        <input type="text" name="slug" placeholder='Enter Description' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>
                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Fb Url </div>
                        <input type="text" name="slug" placeholder='Enter fb Url' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>

                </div>
                </div>

          
               <div className='mb-14'>
                <div >
                    <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Insta Url </div>
                    <input type="text" name="slug" placeholder='Enter Insta Url' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                </div>
                <div className=' grid grid-cols-2 gap-4  '>

                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>linkedin Url</div>
                        <input type="text" name="slug" placeholder='Enter linkedin Url' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>
                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Push Noti Url </div>
                        <input type="text" name="slug" placeholder='Enter Push Noti Url' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>
                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '> Push Noti Script </div>
                        <input type="text" name="slug" placeholder='Enter Push Noti Script ' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>
                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>News Letter Email Id </div>
                        <input type="text" name="slug" placeholder='Enter News Letter Email Id' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>




                </div>
                </div>



             <div className='mb-14'>
                <div >
                    <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Menu Json </div>
                    <input type="text" name="slug" placeholder='Enter Menu Json' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                </div>
                <div className=' grid grid-cols-2 gap-4  '>

                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Search Json </div>
                        <input type="text" name="slug" placeholder='Enter Search Json' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>
                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Media Json </div>
                        <input type="text" name="slug" placeholder='Enter Media Json' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>
                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Navigation Json </div>
                        <input type="text" name="slug" placeholder='Enter Navigation Json' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>
                    <div >
                        <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '> X url</div>
                        <input type="text" name="slug" placeholder='Enter xurl' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
                    </div>




                </div>
                </div>
            </div>




        </div>
    )
}


