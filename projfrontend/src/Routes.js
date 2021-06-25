import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageCategories from './admin/ManageCategories';
import ManageProducts from './admin/ManageProducts';
import ManageOrders from './admin/Orders';
import UpdateProduct from './admin/UpdateProduct';


 const Routes = () => {
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Signup" exact component={Signup} />
            <Route path="/Signin" exact component={Signin} />
            <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            <AdminRoute path="/admin/create/category" exact component={AddCategory} />
            <AdminRoute path="/admin/categories" exact component={ManageCategories} />
            <AdminRoute path="/admin/create/product" exact component={AddProduct} />
            <AdminRoute path="/admin/products" exact component={ManageProducts} />
            <AdminRoute path="/admin/orders" exact component={ManageOrders} />
            <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />

            
        </Switch>
        </BrowserRouter>
    );
}

export default Routes;