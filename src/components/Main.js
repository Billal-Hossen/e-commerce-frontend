import { Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";
const Main = () => {
 
    return (<div>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>

    </div>)
}

export default Main;