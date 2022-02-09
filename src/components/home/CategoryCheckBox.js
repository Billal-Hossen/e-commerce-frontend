import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

const CategoryCheckBox = ({categories,handleFilters}) => {
    const [checked,setChecked]= useState([])
    const foundIds=[...checked]
    const handleChecked=(id)=>{
        // return -1 or first iNDEX
        const foundId= checked.indexOf(id);
        if(foundId === -1){
            foundIds.push(id)
        }
        else{
            foundIds.splice(foundId,1)
        }
        setChecked(foundIds);
        handleFilters(foundIds);

    }
    useEffect(()=>{
        // alert(JSON.stringify(checked))

    },[checked])
    return (
      <>
      {
          categories.map(category=><li key={category._id} className='list-unstlied'>
              <input
              type="checkbox"
               name="" id="" 
               className='form-check-input' 
               onChange={()=>handleChecked(category._id)}
               value={checked?.indexOf(category._id===-1)}
               />
              <label className='form-check-label'>{category.name}</label>

          </li>)
      }
      </>
    );
};

export default CategoryCheckBox;