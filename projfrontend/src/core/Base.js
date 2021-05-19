import React from 'react';

const Base = ({
    title="My Cars",
    description="My description",
    className="bg-dark text-white p-4",
    children
}) => (
    
        <div>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
               <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center">
                    <h4>Feel free to reach ,e out!</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>

                </div>
                <div className="container">
                    <span className="text-muted">An amaing <span className="text-white">MERN</span> Bootcamp</span>

                </div>

            </footer>
        </div>
            );

export default Base;
