import React, { useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { login } from '../../api/apiAuth';
import { authonticate, isAuthonticated, userInfo } from '../../utilities/auth';
import { showError, showLoading } from '../../utilities/massages';
import Layout from '../Layout';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false,
        loading: false,
        disabled: false,
        redirect: false
    });

    const { email, password, loading, error, redirect, disabled } = values;
    const handleChange=e=>{
        setValues({
            ...values,
            error: false,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit= e =>{
        e.preventDefault();
        setValues({
            ...values,
            error:false,
            loading:true,
            disabled:true
        })
        login({email,password})
        .then(response=>{
            authonticate(response.data.token,()=>{
                setValues({
                    email: '',
                    password: "",
                    loading:false,
                    disabled:false,
                    redirect:true,
                    
                })
            })
           
        })
        .catch(err=>{
            let errMsg="Somthing is Wrong!!";
            if(err){
                errMsg=err.response.data;

            }
            else{
                errMsg="Somthing is Wrong!!";
            }
            setValues({...values,error:errMsg,loading:false,disabled:false})
        })
    }
    return (
       <Layout className="container col-md-8 ofset-md-2">
           <h1>Login Here</h1>
           <hr />
           {
               loading && showLoading()
           }
           {
               !isAuthonticated() ? <Redirect to="/login"/> : <Redirect to="/"/>
           }
           {
               error && showError(error,error)
           }
           {
               redirect && <Redirect to={`${userInfo().role}/dashboard`}/>
           }
           <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input name='email' type="email" className="form-control"
                    value={email} required  onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input name="password" type="password" className="form-control"
                    value={password} required onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-outline-primary" disabled={disabled}>Login</button>
        </form>

       </Layout>
    );
};

export default Login;