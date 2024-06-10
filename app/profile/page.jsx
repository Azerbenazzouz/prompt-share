"use client"

import { useState , useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter , useSearchParams} from "next/navigation";

import Profile from '@/components/Profile'

const MyProfile = () => {

    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [posts, setPosts] = useState([])
    const [ info , setInfo ] = useState({
        name : "My",
        desc : "Welcome to your profile",
        user_id : searchParams.get('id')??session?.user.id
    });

    // check if user is logged in
    if(searchParams.get('id')===null && !session?.user.id){
        router.push('/');
    }
    
    useEffect(() => {
        const fetchPosts = async () =>{
            const response = await fetch(`api/users/${info.user_id}/posts`);
            const data = await response.json();
            setPosts(data);
            //get the name of profile
            if(searchParams.get('id')!=null){
                setInfo({
                    ...info,
                    name : data[0]?.creator?.name,
                    desc : "Welcome to "+data[0]?.creator?.name+" profile"
                });
            }
        }
        if(info.user_id) fetchPosts();
    },[info,searchParams.get('id')]);

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
            name={info.name}
            desc={info.desc}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile
