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
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handelSearchSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

        const response =!e.target.value || e.target.value === "" ?  await fetch('api/prompt') : await fetch('api/prompt',{
            method:'POST',
            body: JSON.stringify({
                searchText: e.target.value,
            })
        });

        const data = await response.json();

        setPosts(data);
        setLoading(false)
    }

    const handelSearchChange = (e) => {
        setSearchText(e.target.value);
        handelSearchSubmit(e);
    }
    useEffect(() => {
        const fetchPosts = async () =>{
            setLoading(true)
            const response = await fetch('api/prompt');
            const data = await response.json();
            setPosts(data);
            setLoading(false)
        }
        fetchPosts();
    },[]);
    return (
        <section className="feed">
            <form className="relative w-full flex-center" onSubmit={e => handelSearchSubmit(e)}>
                <input 
                    type="text"
                    placeholder="Search for prompts"
                    value={searchText}
                    onChange={e => handelSearchChange(e)} 
                    className="search_input peer"
                />
            </form>
            {
                loading ? 
                (
                    <div className="text-center mt-16 text-2xl blue_gradient">
                        Loading...
                    </div>
                ) : (
                    posts.length !=0 && loading==false ? (
                        <PromptCardList
                            data={posts}
                            handelTagClick={()=>{}}
                        />
                    ) : (
                        <h1 className="text-center mt-16 text-2xl orange_gradient">No Posts...</h1>
                    )
                )
            }
        </section>
    )
}

export default Feed
