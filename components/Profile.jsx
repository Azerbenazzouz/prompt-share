"use client"

import PromptCard from "./PromptCard"
import ModelDelete from './ModelDelete';
import { useState } from "react";

const Profile = ({
    name,
    desc,
    data,
    handleEdit,
    handleDelete,
}) => {
    const [open , setOpen] = useState(false);
    const [ postInfo , setPostInfo] = useState();

    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} Profile</span>
            </h1>
            <p className="desc text-left">{desc}</p>

            <div className="mt-10 prompt_layout">
                {data.map((post) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handelEdit={() => handleEdit && handleEdit(post)}
                        handelDelete={() => setPostInfo(post)}
                        open={open}
                        setOpen={setOpen}
                    />
                ))}
            </div>
            <ModelDelete open={open} onClose={()=>setOpen(false)}>
                    <div class="p-4 md:p-5 text-center">
                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this prompt?</h3>
                        <button 
                            type="button" 
                            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            onClick={()=>{handleDelete && handleDelete(postInfo);setOpen(false)}}
                        >
                            Yes, I&#39;m sure
                        </button>
                        <button  
                            type="button" 
                            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={()=>setOpen(false)}
                        >
                            No, cancel
                        </button>
                    </div>
            </ModelDelete>
        </section>
    )
}

export default Profile
