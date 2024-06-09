"use client"

import { useState , useEffect } from "react"

import PromptCard from "./PromptCard"

const PromptCardList = ({ data , handelTagClick }) =>{
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handelTagClick={handelTagClick}
                />
            ))}
        </div>
    )
}


const Feed = () => {
    const [searchText, setSearchText] = useState("")
    const [posts, setPosts] = useState([])

    const handelSearchChange = (e) =>{
        console.log(e.target.value);
        setSearchText(e.target.value);
    }
    
    useEffect(() => {
        const fetchPosts = async () =>{
            const response = await fetch('api/prompt');
            const data = await response.json();
            setPosts(data);
        }
        fetchPosts();
    },[]);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input 
                    type="text"
                    placeholder="Search for prompts"
                    value={searchText}
                    onChange={e => handelSearchChange(e)}    
                    required
                    className="search_input peer"
                />
            </form>

            <PromptCardList
                data={posts}
                handelTagClick={()=>{}}
            />
        </section>
    )
}

export default Feed
