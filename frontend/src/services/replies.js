import axios  from "axios";
import { createError, createUrl } from "./utils";


export async function getRepliesByThreadId(threadID){
    try{
        const url = createUrl(`replies/${threadID}`);
        const result = await axios(url);
        console.log(result.data.data)
        return result.data
    }
    catch(error){
        console.log('Error fetching Replies', error.message)
        throw createError(error);
    }
}