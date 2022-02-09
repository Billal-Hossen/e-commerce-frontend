import axios from "axios"
import apiUrl from "../../utilities/config"



export const createCategory=(token,data)=>{
  return   axios.post(`${apiUrl}/category`,data,{
        headers:{
            "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        }
    })
}
export const getCategory=()=>{
    return axios.get(`${apiUrl}/category`)
}

export const createProduct=( token,data)=>{
    return axios.post(`${apiUrl}/product`,data,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
}

