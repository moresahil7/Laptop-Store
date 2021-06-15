import React from 'react';
import Base from '../core/Base';
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth/helper/index";



const AdminDashboard = () => {



    const{user: {name, email, role}} = isAuthenticated();
    const AdminLeft = () => {
        
        return (
            <div className="card">
                <h4 className="card-header  bg-dark text-white" >
                    Admin Navigation
                </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-info">
                        Create Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-info">
                        Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-info">
                        Manage Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-info">
                        Manage Orders
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
    const AdminRight = () => {
        return(
           <div className="card mb-4">
               <h4 className="card-header">
                   Admin Information
               </h4>
               <ul className="list-group">
                   <li className="list-group-item">
                       <h5><span className="badge bg-secondary  mr-2">
                           Name:</span>{name}</h5>
                       
                   </li>
                   <li className="list-group-item">
                       <h5><span className="badge bg-secondary  mr-2">
                           Email:</span>{email}</h5>
                       
                   </li>
                   <li className="list-group-item">
                   <h5><span class="badge bg-danger">Admin Property</span></h5>
                       
                   </li>
               </ul>
           </div>
        )
    }


    return (
       <Base title="Welcome to Admin area" description="Manage all your products here"
       className="container p-4">
       <div className="row">
           <div className="col-3">
           {AdminLeft()}

           </div>
           <div className="col-9">
               
{AdminRight()}
               </div>
       </div>

       </Base>
    );
};
export default AdminDashboard;
