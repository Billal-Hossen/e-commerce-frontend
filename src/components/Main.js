import { Redirect, Route, Switch } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import CreateCategory from "./admin/CreateCategory";
import CreateProdect from "./admin/CreateProdect";
import Home from "./home/Home";
import ProductDetails from "./home/ProductDetails";
import Cart from "./order/Cart";
import Checkout from "./order/Checkout";
import ShippingAddress from "./order/ShippingAddress";
import { AdminRouter } from "./ProtectedRouters/AdminRouter";
import { PrivateRoute } from "./ProtectedRouters/PrivateRoute";
import Dashboard from "./user/Dashboard";
import Login from "./user/Login";
import Register from "./user/Register";
const Main = () => {
 
    return (<div>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/product/:id" component={ProductDetails}/>
            {/* <Route path="/cartItem" component={Cart}/> */}
            {/* <Route path="/checkout" component={ShippingAddress}/> */}
            <PrivateRoute path="/user/dashboard" >
                <Dashboard/>
            </PrivateRoute>
            <PrivateRoute path="/cart" >
               <Cart/>
            </PrivateRoute>
            <PrivateRoute path="/shippingAddress" >
               <ShippingAddress/>
            </PrivateRoute>
            <PrivateRoute path="/checkout" >
               <Checkout/>
            </PrivateRoute>
            <AdminRouter path="/admin/dashboard">
                <AdminDashboard/>
            </AdminRouter>
            <AdminRouter path="/create/category"> 
                <CreateCategory/>
            </AdminRouter>
            <AdminRouter path="/create/product"> 
                <CreateProdect/>
            </AdminRouter>
            
            <Redirect to="/"/>
        </Switch>

    </div>)
}

export default Main;