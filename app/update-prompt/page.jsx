"use client"

import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";
const UpdatePrompt = () => {
    const router = useRouter();
    const promptId = router.query?.id;

    const [submitting, setSubmitting] = useState(false);
    const [Post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    useEffect(() => {
        const getPromptDetails = async () =>{
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt : data.prompt,
                tag : data.tag
            })
        }
        getPromptDetails();
    },[promptId]);

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try{
            const response = await fetch(`api/prompt/${promptId}`,{
                method:'PATCH',
                body: JSON.stringify({
                    prompt: Post.prompt,
                    tag:Post.tag
                })
            })

            if(response.ok){
                router.push('/profile');
            }else{
                alert("error")
            }
        } catch(err){
            console.log(err)
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <Form
            type="Update"
            onSubmit={createPrompt}
            setPost={setPost}
            Post={Post}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default UpdatePrompt
