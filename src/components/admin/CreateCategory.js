import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userInfo } from '../../utilities/auth';
import { showError, showSuccess } from '../../utilities/massages';
import Layout from '../Layout';
import { createCategory } from './apiAdmin';

const CreateCategory = () => {
   
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        loading:false
    });

    const { name, error, success,loading } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({
            ...values,
                error:false,
                success:true,
                loading:false,

        })
        const {token} = userInfo();
        createCategory(token,{name:name})
        .then(response=>{
            setValues({
                ...values,
                success:true,
                loading:false,
                error:false
            })
        })
        .catch(err=>{
            if(err.response){
                setValues({
                    ...values,
                    success:false,
                    loading:false,
                    error:err.response.data
                })

            }
            else{
                setValues({
                    ...values,
                    success:false,
                    loading:false,
                    error:"Something went wrong!!"
                })
            }

        })
    }

    const handleChange = (e) => {
        setValues({
            ...values, [e.target.name]: e.target.value,error:false
        })
    }
    return (
        <Layout title='Create Category' className="container">
            <div className="row">
                <div className="col-md-8 ofset-md-2">
                    {/* // showError function called from utlities => message.js */}
                    {showError(error,error)}
                      {/* // showSuccess function called from utlities => message.js */}
                    {showSuccess(success,'Category Created Successfully')}
                {/* .....Create category form........ */}
                    <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                        name="name"
                        type="text"
                        onChange={handleChange}
                        value={name}
                        autoFocus
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary">Create Category</button>
            </form>
            {/* .........For go admin dashboard............... */}
            <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Go to Dashboard</Link>
            </div>

                </div>
            </div>

        </Layout>
    );
};

export default CreateCategory;