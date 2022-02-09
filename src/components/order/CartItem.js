import React from 'react';
import apiUrl from '../../utilities/config';

const CartItem = ({ item,serial,increaseCartItem,decreaseCartItem,removeCartItem,error}) => {
    return (
     
   
        <tr>
              {
         error && <h3 className='alert alert-danger'>{error}</h3>
             }
            <th scope="row">{serial}</th>
            <th> <img width="30px" src={`${apiUrl}/product/photo/${item.product._id}`} alt={item.name} /></th>
            <td>{item.product.name ? item.product.name : ""}</td>
            <td>
                <button className="btn btn-outline-primary btn-sm" onClick={()=>decreaseCartItem(item)}>-</button>
                &nbsp;&nbsp;{item.count}&nbsp;&nbsp;
                <button className="btn btn-outline-primary btn-sm" onClick={()=>increaseCartItem(item)}>+</button>
            </td>
            <td align="right">৳ {item.price * item.count} </td>
            <td><button className="btn btn-danger btn-sm" onClick={()=>removeCartItem(item)}>Remove From Cart</button></td>
        </tr>)
     
};


export default CartItem;