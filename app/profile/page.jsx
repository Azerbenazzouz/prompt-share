"use client"

import { useState , useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from '@/components/profile'

const MyProfile = () => {

    const { data: session } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () =>{
            const response = await fetch(`api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if(session?.user.id) fetchPosts();
    },[]);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const response = await fetch(`api/prompt/${post._id}`,{
            method:'DELETE'
        });

        if(response.ok){
            const data = await response.json();
            setPosts(posts.filter(p => p._id !== data._id));
        }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your profile"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile
