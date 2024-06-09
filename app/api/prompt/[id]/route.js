import { connectToDatabase } from '@/utils/database';
import { Prompt } from '@/models/prompt'

// GET
export const  GET = async (req , { params }) => {
    try{
        await connectToDatabase();
        const prompt = await Prompt.findById(params.id)
        if(!prompt) return new Response("Prompt Not Found",{
            status: 404
        });
        return new Response(JSON.stringify(prompt),{
            status: 200
        });
    } catch(err){
        return new Response("Failed to fetch prompt"+err,{
            status: 500
        });
    }
}

// PATCH
export const  PATCH = async (req , { params , body }) => {
    const { prompt , tag } = await req.json();

    try {
        await connectToDatabase();
        const existingPrompt = await Prompt.findById(params.id)

        if(!existingPrompt) return new Response("Prompt Not Found",{
            status: 404
        });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{
            status: 200
        });
    } catch (error) {
        return new Response("Failed to update prompt"+err,{
            status: 500
        });
    }
}
// DELETE
export const DELETE = async (req , { params }) => {
    try {
        await connectToDatabase();
        const prompt = await Prompt.findById(params.id)

        if(!prompt) return new Response("Prompt Not Found",{
            status: 404
        });

        prompt.delete();

        return new Response(JSON.stringify(prompt),{
            status: 200
        });
    } catch (error) {
        return new Response("Failed to delete prompt"+err,{
            status: 500
        });
    }
}