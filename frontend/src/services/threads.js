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


export async function createThread(thread){
    try{
        const result = await axios(createUrl('thread/new'),{
            method:'POST',
            data:thread
        })
        return result.data
    }
    catch(error){
        console.log(error)
        return createError(error);
    }
}