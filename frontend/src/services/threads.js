import axios  from "axios";
import { createError, createUrl } from "./utils";

export async function getAllThreads(){
    try{
        const result = await axios(createUrl('threads'),{});
        return result.data;
    }catch(error){
        console.log(error);
        return createError(error);
    }
}
export async function getThreadById(threadId){
    try{
        const result = await axios(createUrl(`threads/thread/${threadId}`))
        return result.data
    }catch(error){
        console.log(error)
        return createError(error);
    }
}
export async function getThreadsBYCategory(categoryId){
    try{
        const result = await axios(createUrl(`threads/${categoryId}`))
        return result.data
    }catch(error){
        console.log(error)
        return createError(error);
    }
}


export async function createThread(thread, token){
    try{
        const headers = {
                token
        }
        const result = await axios(createUrl('threads/thread/new'),{
            method:'POST',
            data:thread, headers
        })
        return result.data
    }
    catch(error){
        console.log(error)
        return createError(error);
    }
}

//Function to update thread view
export async function updateThread(threadId, newThread){
    try{
        const body = newThread;
        const result = await axios.put(createUrl(`threads/thread/${threadId}`), body)
        return result.data
    }catch(error){
        console.log(error)
        return createError(error);
    }
}

