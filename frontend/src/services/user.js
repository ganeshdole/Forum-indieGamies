import axios from "axios";
import { createError, createUrl } from "./utils";

export async function createUser(user) {
    try {
        const body = user;
        const result = await axios.post(createUrl("auth/register"), body);
        return result.data;
    }catch(error){
        console.log(error);
        return createError(error);
    }
}


export async function loginUser(user) {
    try {
        const body = user;
        const result = await axios.post(createUrl("auth/signin"), body);
        console.log(result.data);
        return result.data;
    }catch(error){
        console.log(error);
        return createError(error);
    }
}

