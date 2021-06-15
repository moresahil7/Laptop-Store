import React from 'react';
import Menu from "./Menu";
import { Link } from "react-router-dom"



const Base = ({
    title="My Cars",
    description="My description",
    className = "text-white p-4",
    children
}) =>(


        <div>
            <Menu/>
            <div className="container-fluid">
                <div className="jumbotron text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
               <div className={className}>{children}</div>
            </div>
            <footer className="footer mt-auto p-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If any questions, feel free to reach me out</h4>
                    <a href="tel:8378831477">
                    <button type="button"  class="btn btn-warning">Contact</button>
                    </a>
                </div>
                <div className="container">
                    <span className="container text-white">
                        Developed by <a target="_blank " href="https://github.com/sahilmore-0412" > <strong>Sahil!</strong></a>
                    </span>
                </div>
            </footer>
        </div>

    )

 export default Base;