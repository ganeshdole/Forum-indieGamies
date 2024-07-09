import axios from "axios";
import { createError, createUrl } from "./utils";

export async  function requestOtp(email){
    try {
        const body = {
            email
        }
        const result = await axios.post(createUrl("auth/send-otp"), body);
        return result.data;
    }catch(error){
        console.log(error);
        return createError(error);
    }
}

export async function verifyOtp(email, otp ){
    try{
        const body = {
            email,
            otp
        }
        const result = await axios.post(createUrl("auth/verify-otp"), body);
        return result.data;
    }catch(error){
        console.log(error);
        return createError(error);
    }
}

