import axios  from "axios";
import { createError, createUrl } from "./utils";


export async function getRepliesByThreadId(threadID){
    try{
        const url = createUrl(`replies/${threadID}`);
        const result = await axios(url);
        return result.data
    }
    catch(error){
        console.log('Error fetching Replies', error.message)
        throw createError(error);
    }
}

export async function createReply(reply, token){
    try{
        const headers = {
            token: token
        }
        const url = createUrl(`replies/new`);
        const result = await axios.post(url, reply, {headers});
        return result.data;
    }catch(error){
        console.log('Error creating Reply', error.message)
        throw createError(error);
    }
}
