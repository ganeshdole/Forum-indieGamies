import axios  from "axios";
import { createError, createSuccess, createUrl } from "./utils";


export async function getAllCategories(){
    try{
        const result = await axios(createUrl('categories'));
        return result.data;
    }catch(error){
        console.log(error);
        return createError(error);
    }
}