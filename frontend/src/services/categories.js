import axios  from "axios";
import { createError, createUrl } from "./utils";


export async function getAllCategories(){
    try{
        const result = await axios(createUrl('categories'));
        return result.data;
    }catch(error){
        console.log(error);
        return createError(error);
    }
}

export async function getCategoryById(id){
    try{
        const result = await axios(createUrl(`categories/${id}`));
        return result.data;
    }catch(error){
        console.log(error)
        return createError(error)
    }
}