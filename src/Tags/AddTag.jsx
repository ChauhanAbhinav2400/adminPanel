import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { CKEditor ,CKEditorContext } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addTags } from '../ApiListener/tagsApi';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AddTag() {
    const [content, setContent] = useState("");
    const nevigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
    const [formData,setFormData]=useState({
      "id": 0,
      "name": "",
      "slugUrl": "",
      "metaTitle": "",
      "metaDescription": "",
      "heading": "",
      "content": "",
      "publisherId":userInfo.publisherId,
      "isActive": 1,
      "porder": 0
    })
 
    const notify = () => toast.success("Tag Successfully add", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      
      });
    
    const inputHandler=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
    }
   
    const saveTagHandler=(e)=>{
        e.preventDefault()
        addTags(formData).then((resp)=>{
         
         if(resp.status===200){
          notify()
         }else{
           alert("something went wrong !")
         }
        })
        setFormData({
          "id": 0,
          "name": "",
          "slugUrl": "",
          "metaTitle": "",
          "metaDescription": "",
          "heading": "",
          "content": "",
          "publisherId":0,
          "porder": 0
        })
    }

    useEffect(()=>{
     setFormData({...formData,content:content})
    },[content])

  return (
    <div className='w-full h-screen overflow-auto'>
      <section className='bg-[#f1f5f9]	 mt-4 mx-4 flex flex-row	justify-between items-center  '>
        <div className='mt-3 ms-3'>
          <div className='font-sm text-sm' ><Link to="/admin/tags/create/" className='text-gray px-1 bg-[#f1f5f9]	 text-lg ' >Tags /</Link>Add Tag</div>
          <div className='my-2  flex gap-x-4 justify-center items-center'>
            <i ><FaArrowLeftLong /></i>
            <div className='font-semibold text-lg'>Add Tag</div>
          </div>
        </div>
        <div className='mt-3 me-2'>

<button type="button" className="py-1 px-4 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-primary rounded-full  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white " onClick={saveTagHandler}  > Save Tag</button> 
</div>


      </section>


        <div className='mx-3  '>

          <div >
            <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Name <span className='text-red ps-1'>*</span></div>
            <input type="text" name="name" value={formData.name} onChange={inputHandler} placeholder='Enter Ctegory Name' maxLength={10} required className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
          </div>
           <div>
            <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Slug Url</div>
            <input type="text" name="slugUrl" placeholder='Slug Url' onChange={inputHandler} maxLength={10} required className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
          </div> 
          <div >
            <div className=' text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>  Meta Title </div>
            <input type="text" name="metaTitle" value={formData.metaTitle} onChange={inputHandler}  placeholder='Set Priority Order' maxLength={10} required className="border outline-none shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
            <p className='mb-2  text-sm text-gray'>Recommended title length: 50-60 characters| 0 characters</p>

          </div>
        
          <div className='w-full'>
            <div className='text-center text-gray-700 md:text-left flex items-center  my-2 font-sans  '>Meta Description</div>
            <textarea className="border shadow-md outline-none border-[#EAEAF8] p-2 w-full text-sm rounded-lg  " rows="3" name="metaDescription" value={formData.metaDescription} onChange={inputHandler} placeholder='Enter Meta Description ' ></textarea>
            <p className='mb-2 text-sm text-gray'>Recommended description length: 120-160 characters| 0 characters</p>

          </div>
          <div >
            <div className=' text-center text-gray-700 md:text-left flex items-center  mt-3 mb-2 font-sans  '>Heading</div>
            
            <input type="text" name="heading" placeholder='Heading' maxLength={10} required className="border shadow-md outline-none border-[#EAEAF8] p-2 w-full text-sm rounded-lg" value={formData.heading} onChange={inputHandler}  />
          <p className='my-2 text-sm text-gray'>Recommended length: 50-80 characters| 0 characters</p>
          </div>
         
          {/* <div className="flex flex-col my-2">
              <label htmlFor="ArticalDes" className='mb-2 mt-3' >Display Name</label>
              <CKEditor
                editor={ClassicEditor}
                data={displayName}
                
                onReady={(editor) => {
                //   console.log(
                //     "CKEditor5 React Component is ready to use!",
                //     editor
                //   );
                }}
                onChange={(event, editor) => {
                  setDisplayName(editor.getData());
                }}
              />
            </div> */}
          <div className="flex flex-col my-2">
              <label htmlFor="ArticalDes" className=' mt-3 mb-2'>Content</label>
              <CKEditor 
                editor={ClassicEditor}
                data={content}
                onReady={(editor) => {
                //   console.log(
                //     "CKEditor5 React Component is ready to use!",
                //     editor
                //   );
                }}
                onChange={(event, editor) => {
                  setContent(editor.getData());
                }}
              />
            </div>
{/*          
          <div >
            <div className=' text-center text-gray-700 md:text-left flex items-center   mt-3 mb-2 font-sans  '>Parent Tag</div>
            <input type="text" name="slug" placeholder=' Select Parent Category' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
          </div>
          <div  className='mb-3'>
            <div className=' text-center text-gray-700 md:text-left flex items-center   mt-3 mb-2  font-sans  '>Content Type</div>
            <input type="text" name="slug" placeholder='Select Content Type(Optional)' maxLength={10} required className="border shadow-md border-[#EAEAF8] p-2 w-full text-sm rounded-lg" />
          </div> */}




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
theme="colored"

/>


      </div>
  )
}
// change the type of input


