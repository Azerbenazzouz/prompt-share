"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";
const CreatePrompt = () => {
    const router = useRouter();
    const { data : session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [Post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try{
            const response = await fetch('api/prompt/new',{
                method:'POST',
                body: JSON.stringify({
                    prompt: Post.prompt,
                    userId: session?.user.id,
                    tag:Post.tag
                })
            })

            if(response.ok){
                router.push('/');
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
            type="Create"
            onSubmit={createPrompt}
            setPost={setPost}
            Post={Post}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt
