import { connectToDatabase } from '@/utils/database';
import { Prompt } from '@/models/prompt'

export const  GET = async (req) => {
    try{
        await connectToDatabase();
        
        const prompts = await Prompt.find({}).populate('creator').sort({ createdAt: -1 });
        return new Response(JSON.stringify(prompts),{
            status: 200
        });
    } catch(err){
        return new Response("Failed to fetch prompts"+err,{
            status: 500
        });
    }
}

// Search for a prompt by username / tag / prompt 
// ==> GET METHOD
export const  POST = async (req) => {
    try{
        await connectToDatabase();
        // recuper data from body
        const { searchText } = await req.json();
        const prompts = await Prompt.find({
            $or:[
                {prompt:{$regex: searchText, $options: 'i'}},
                {tag:{$regex: searchText, $options: 'i'}}
            ]
        }).populate('creator').sort({ createdAt: -1 });

        return new Response(JSON.stringify(prompts),{
            status: 200
        });
    } catch(err){
        return new Response("Failed to fetch prompts"+err,{
            status: 500
        });
    }
}

