import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteCatItem, getCartItems, updateCartItem } from '../../api/apiOrder';
import { userInfo } from '../../utilities/auth';
import Layout from '../Layout';
import CartItem from './CartItem';

const Cart = () => {
    const [cartItems, setCartItems]= useState([]);
    const [error, setError] = useState(false)
    const loadCart=()=>{
        getCartItems(userInfo().token)
        .then(res=>setCartItems(res.data))
        .catch(err=>setError("Failed to load Data!!"))
    }
    useEffect(()=>{
        loadCart()
 
    },[])

    /// .......Cart PRODUCT INCREMENT FUNCTION........
    const increaseCartItem=(item)=>{
     
        if(item.count===5) return
        const cartItem={
            ...item,
            count:item.count+1
        }
        console.log(item.count);
        console.log(cartItem);
     
        updateCartItem(userInfo().token,cartItem)
        .then(res=>loadCart())
        .catch(err=>setError("Cart Item is not increase!"))
       
    }
     /// .......Cart PRODUCT DECREMENT FUNCTION........
    const decreaseCartItem=(item)=>{
      
        if(item.count===1) return
        const cartItem={
            ...item,
            count:item.count-1
        }
        console.log(item.count);
        console.log(cartItem);
        updateCartItem(userInfo().token,cartItem)
        .then(res=>loadCart())
        .catch(err=>setError("Cart Item is not increase!"))
       
    }
/// ................TOTAL PRICE CALCULATION fUNCTION...............
    const getTotal=()=>{
        const arr= cartItems.map(item=>item.price*item.count);
        let total=arr.reduce((previous,current)=>previous+current,0);
        return total;
    }
    /// ................REMOVE PRODUCT FROM CART fUNCTION.............
    const removeCartItem=(cartItems)=>{
        if(!window.confirm("Are You Want to Remove this Item?")) return
        deleteCatItem(userInfo().token,cartItems)
        .then(res=>{loadCart()})
        .catch(err=>{
            if(err.res){
               setError(err.res.details.data)
            }
            else{
                setError("Data is not found")
            }
        })
    }
    return (
        <Layout title="Your Cart" description="Hurry up! Place your order!" className="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Order</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Cart</li>
                </ol>
            </nav>
            <div className="container my-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" width="15%">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col" align="right">Price</th>
                            <th scop="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             cartItems.map((item,i)=><CartItem 
                             item={item}
                              serial={i+1}
                               key={item._id}
                               increaseCartItem={increaseCartItem}
                               decreaseCartItem={decreaseCartItem}
                               removeCartItem={removeCartItem}
                               error={error}
                               />)
                        }
                        <tr>
                            <th scope="row" />
                            <td colSpan={3}>Total</td>
                            <td align="right">৳ {getTotal()} </td>
                            <td />
                        </tr>
                        <tr>
                            <th scope="row" />
                            <td colSpan={5} className="text-right">
                                <Link to="/"><button className="btn btn-warning mr-4">Continue Shoping</button></Link>
                                <Link to="/shippingAddress" className="btn btn-success mr-4">Proceed To Checkout</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Cart;