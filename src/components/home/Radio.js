import React from 'react';

const Radio = ({prices,handleFilters}) => {
    const handleChange=(e)=>{
        handleFilters(e.target.value)
    }
    return (
      <>
      {
          prices.map(price=> <div className='col-sm-6' key={price.id}>
          <input onChange={handleChange} type="radio" name="filter_name" value={price.id} className="mr-2"/>
          <label className='form-check-label'>{price.name}</label>
          
      </div>)
      }
      </>
    );
};

export default Radio;