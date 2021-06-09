import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";

 const Routes = () => {
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Signup" exact component={Signup} />
            <Route path="/Signin" exact component={Signin} />
            <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />

            
        </Switch>
        </BrowserRouter>
    );
}

export default Routes;