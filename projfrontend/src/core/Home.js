import React,{useState, useEffect} from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from "./Base" ;
import Card from './Card';
import { getProducts } from './helper/coreapicalls';



const Home= () =>  {



    const [products, setProducts]= useState([]);
    const [error, setError]= useState(false);


    const loadAllProducts = () => {
        getProducts().then(data => {
            if(data?.error){
                setError(data?.error);
            }
            else{
                setProducts(data);
            }
        })
    }

    useEffect(() => {
        loadAllProducts()
    }, []);




    return(
      <Base title="Laptop Store" description="My Laptop Store">
        <div className="row text-center">
            <h3 className="text-white">All kind of Laptops available</h3>
            <div className="row">
                {products?.map((product , index) => {
                    return (
                        <div key={index} className="col-4 mb-4">
                            <Card product ={product} />

                        </div>
                    );
                })}
            </div>
            
            
        </div>
    </Base>
     
    );
}

export default Home