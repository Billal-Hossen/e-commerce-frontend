import axios from "axios"
import apiUrl from "../utilities/config"


export const register=user=>{
    return axios.post(`${apiUrl}/user/signup`,user,{
        headers: {"Content-Type": "application/json"}
    })
}
export const login=user=>{
    return axios.post(`${apiUrl}/user/signin`,user,{
        headers: {"Content-Type": "application/json"}
    })
}