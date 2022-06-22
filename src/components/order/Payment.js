import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initPayment } from '../../api/apiOrder';
const {userInfo}  = require("../../utilities/auth")

const Payment = () => {
    const [sessionSuccess,setSessionSuccess] = useState(false);
    const [failed,setFailed] = useState(false);
    const [gatewayUrl,setGatewayUrl] =useState('');

    useEffect(()=>{
        initPayment(userInfo().token)
        .then(res=>{
            if(res.data.status==='SUCCESS'){
                setSessionSuccess(true)
                setGatewayUrl(res.data.GatewayPageURL)
                setFailed(false)
            }
        })
        .catch(err=>{
            setFailed(false)
            setSessionSuccess(false)
        })
    },[])
    return (
        <>
        {
        sessionSuccess ? window.location=gatewayUrl : ''
        }
        {
            failed  ? <><p>Failed to start payment Session.......</p> 
            <Link to='/cart'> Go To Cart</Link>
            </> : ""
        }
        </>
    );
};

export default Payment;