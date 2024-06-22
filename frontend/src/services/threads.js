import axios  from "axios";
import { createError, createUrl } from "./utils";


export async function getAllThreads(){
    try{
        const result = await axios(createUrl('threads'));
        return result.data;
    }catch(error){
        console.log(error);
        return createError(error);
    }
}