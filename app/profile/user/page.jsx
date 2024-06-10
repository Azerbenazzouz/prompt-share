"use client"

import { useState , useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter , useSearchParams} from "next/navigation";

import Profile from '@/components/Profile'

const ProfileId = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const userId = useSearchParams().get('id').toString();
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);

    // check if user is logged in
    if(userId===null && !session?.user.id){
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

    },[userId,useSearchParams()]);

    return (
        <section>
            {
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
                            name={posts[0]?.creator?.name}
                            desc={"Welcome to "+posts[0]?.creator?.name+" profile"}
                            data={posts}
                        />
                    ):(
                        <h1 className="text-center text-3xl font-bold orange_gradient mt-16">
                            No Data...
                        </h1>
                    )
                )  
            }
        </section>
    )
}

export default ProfileId
