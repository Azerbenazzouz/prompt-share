"use client"

import { useState , useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from '@/components/Profile'

const MyProfile = () => {

    const { data: session } = useSession();
    const router = useRouter();
    const userId = session?.user.id;

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);

    // check if user is logged in
    if(userId===null){
        router.push('/');
    }
    
    useEffect(() => {
        const fetchPosts = async () =>{
            setLoading(true);
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        }
        if(userId) fetchPosts();
    },[userId]);

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
        loading ? 
                (
                    <h1 
                        className="text-center text-3xl font-bold green_gradient mt-16"
                    >
                        Loading...
                    </h1>
                ) : (
                    posts.length != 0 ? (
                        <Profile
                            name="My"
                            desc="Welcome to your profile"
                            data={posts}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ):(
                        <h1 className="text-center text-3xl font-bold orange_gradient mt-16">
                            No Data...
                        </h1>
                    )
                )
    )
}

export default MyProfile
