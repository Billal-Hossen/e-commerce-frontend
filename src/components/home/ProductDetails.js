import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { addToCart } from '../../api/apiOrder';
import { getProductDetails } from '../../api/apiProduct';
import { isAuthonticated, userInfo } from '../../utilities/auth';
import apiUrl from '../../utilities/config';
import { showError, showSuccess } from '../../utilities/massages';
import Layout from '../Layout';

const ProductDetails = (props) => {
    const [product,setProduct] = useState([]);
    const [error, setError]= useState(false);
    const [success,setSuccess] = useState(false);
    useEffect(()=>{
        const id= props.match.params.id;
      
        getProductDetails(id)
        .then(res=>{
            
            setProduct(res.data)
        })
        .catch(err=>setError("prodat load to failed!!"))
    },[])

    const handleAddToCart=product=>()=>{
        if(isAuthonticated()){
            setSuccess(false);
            setError(false);
            const user=userInfo();
            const cartItem={
                user:user._id,
                product:product._id,
                price:product.price
            }
            addToCart(user.token,cartItem)
            .then(response=>setSuccess(true))
            .catch(err=>{
                if(err.response) setError(err.response.data);
                else setError("Adding to cart failed")
            })
        }
        else{
            setSuccess(false);
            setError("First need to login!")
        }
    }

    return (
        <Layout title='Product Details' className="container">
             <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item"><a href="#">Product</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{product.category ? product.category.name : ""}</li>
                </ol>
            </nav>
            <div>
                {showSuccess(success, 'Item Added to Cart!')}
                {showError(error, error)}
            </div>
            <div className="row container">
                <div className="col-6">
                    <img
                        src={`${apiUrl}/product/photo/${product?._id}`}
                        alt={product.name}
                        width="100%"
                    />
                </div>
                <div className="col-6">
                    <h3>{product.name}</h3>
                    <span style={{ fontSize: 20 }}>&#2547;</span>{product.price}
                    <p>{product.quantity ? (<span class="badge badge-pill badge-primary">In Stock</span>) : (<span class="badge badge-pill badge-danger">Out of Stock</span>)}</p>
                    <p>{product.description}</p>
                    {product.quantity ? <>
                        &nbsp;<button onClick={handleAddToCart(product)} className="btn btn-outline-primary btn-md">Add to Cart</button>
                    </> : ""}
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;