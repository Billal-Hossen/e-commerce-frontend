import axios from "axios"
import apiUrl from "../utilities/config"

export const getAllProduct=(sortBy,order,limit)=>{
  return  axios.get(`${apiUrl}/product?sortBy=${sortBy}&order=${order}&limit${limit}`)
}
export const getProductDetails=(id)=>{
    return axios.get(`${apiUrl}/product/${id}`)
}
export const getCategory=()=>{
    return axios.get(`${apiUrl}/category`)
}

export const getFilteredProducts=(sortBy,order,limit,skip,filters={})=>{
  const data={
    sortBy:sortBy,
    order:order,
    limit:limit,
    skip:skip,
    filters:{...filters}
  }
return   axios.post(`${apiUrl}/product/filter`,data,{
  headers:{
    "Content-Type"  :'application/json'
  }
})

}