import axios from "axios"
import apiUrl from "../utilities/config"


export const addToCart=(token,cartItem)=>{
    return axios.post(`${apiUrl}/cart`,cartItem,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
}

export const getCartItems=(token)=>{
    return axios.get(`${apiUrl}/cart`,{
        headers:{
            
            "Authorization" : `Bearer ${token}`
        }
    })
}

export const updateCartItem=(token,cartItem)=>{
    return axios.put(`${apiUrl}/cart`,cartItem,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization"  : `Bearer ${token}`
        }
    })
}

export const deleteCatItem=(token,cartItem)=>{
    console.log(cartItem._id);
 return axios.delete(`${apiUrl}/cart/${cartItem._id}`,{
     headers:{
      
        "Authorization"  : `Bearer ${token}`
     }
 })
}





export const getProfile = token => {
    return axios.get(`${apiUrl}/profile`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const updateProfile = (token, data) => {
    return axios.post(`${apiUrl}/profile`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}