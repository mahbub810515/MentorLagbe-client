import { json } from "better-auth";
import { stringify } from "querystring";

const BASE_URL = process.env.BETTER_AUTH_API_BASE_URL

export const createTuition =async (data:FormData)=>{
    const res = await fetch(`${BASE_URL}/tutor/tuitions`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    });
    return res.json();

}