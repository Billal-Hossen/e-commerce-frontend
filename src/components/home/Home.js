import React, { useEffect, useState } from 'react';
import { addToCart } from '../../api/apiOrder';
import { getAllProduct, getCategory, getFilteredProducts } from '../../api/apiProduct';
import { isAuthonticated, userInfo } from '../../utilities/auth';
import { showError, showSuccess } from '../../utilities/massages';
import { prices } from '../../utilities/price';
import Layout from '../Layout';
import Card from './Card';
import CategoryCheckBox from './CategoryCheckBox';
import Radio from './Radio';

const Home = () => {
    const [products,setProducts] = useState([]);
    const [categories,setCategories]= useState([]);
    const [error, setError]= useState(false);
    const [success,setSuccess] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('desc');
    const [limit, setLimit] = useState(20);
    const [skip,setSkip] = useState(0);
    const [filters,setFilters]= useState({category:[],price:[]});

    useEffect(()=>{
        getAllProduct(sortBy,order,limit)
        .then(res=>setProducts(res.data))
        .catch(err=>setError("Failed to load Product"));

        getCategory()
        .then(res=>setCategories(res.data))
        .catch(err=>setError("Failed to load categories"));

console.log(products);
    },[])


    // const handleAddToCart = product => () => {
    //     if (isAuthonticated()) {
    //         setError(false);
    //         setSuccess(false);
    //         const user = userInfo();
    //         const cartItem = {
    //             user: user._id,
    //             product: product._id,
    //             price: product.price,
    //         }
    //         addToCart(user.token, cartItem)
    //             .then(reponse => setSuccess(true))
    //             .catch(err => {
    //                 if (err.response) setError(err.response.data);
    //                 else setError("Adding to cart failed!");
    //             })
    //     } else {
    //         setSuccess(false);
    //         setError("Please Login First!");
    //     }
    // }

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

    const handleFilters=(myFilter,filterBy)=>{
        const newFilter={...filters}

        if(filterBy==="category"){
            newFilter[filterBy]= myFilter;
        }
        if(filterBy==="price"){
         const data= prices;
         let array=[];
           for (let i in data) {
               if(data[i].id===parseInt(myFilter)){
                   array=data[i].arr;
               }
             
           }
           newFilter[filterBy]=array;
        }
        setFilters(newFilter)
        getFilteredProducts(sortBy,order,limit,skip,newFilter)
        .then(res=>setProducts(res.data))
        .catch(err=>setError("Fail to load product"))
    }

    //Handle add to cart functionality
    // const handleAddToCart=(product)=>()=>{
    //     if(isAuthonticated()){
    //         setSuccess(false)
    //         setError(false)
    //         const user= userInfo();
    //         console.log(user.token);
    //         const cartItem={
    //             user:user._id,
    //             product:product._id,
    //             price:product.price

    //         }
    //         addToCart(user.token,cartItem)
    //         .then(res=>setSuccess(true))
    //         .catch(err=>{
    //             if(err.res) setError(err.res.data);
    //             else setError("Adding to car failed!")
    //         })
    //     }
    //     else{
    //         setSuccess(false)
    //         setError("please login first!")
        
    //     }
    // }
    return (
       <Layout title='Home page' className="container">
           {/* categories wish Filter */}
           <div className="row">
               <div className="col-sm-3">
                   <h5>Filtered by Categories:</h5>
                   <ul>
                       <CategoryCheckBox categories={categories}
                        handleFilters={(myFilter)=>handleFilters(myFilter,"category")}/>
                   </ul>
                  
               </div>
               <div className="col-sm-5">
                   <h5>Filter Bt Price</h5>
                   <div className="row">
                       <Radio prices={prices}  handleFilters={(myFilter)=>handleFilters(myFilter,"price")} />
                   </div>
               </div>
           </div>
           <div className="w-100">
               {showError(error,error)}
               {showSuccess(success,"Add to car product")}
           </div>
           <div className="row">
               {
                   products && products.map(product=><Card 
                 
                    key={product._id} 
                    product={product}
                    handleAddToCart={handleAddToCart(product)}
                    />)
               }
           </div>

       </Layout>
    );
};

export default Home;