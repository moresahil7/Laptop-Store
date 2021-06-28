import React,{useState, useEffect} from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from "./Base" ;
import Card from './Card';
import { getProducts } from './helper/coreapicalls';
import { loadcart } from './helper/cartHelper';


const Cart= () =>  {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);


    useEffect(() => {
      setProducts(loadcart)
    }, [reload])






    const loadAllProducts = () =>{
        return(
            <div>
                <h2>
                    This is to load products
                </h2>
                {products.map((product, index) =>{
                    return(
                    <Card 
                    key = {index}
                    product = {product}
                    addtoCart = {false}
                    removeFromCart  = {true}
                    setReload= {setReload}
                    reload= {reload}
                    ></Card>
                    )
                })}
            </div>
        )
    }
    const loadCheckout = () =>{
        return(
            <div>
                <h2>
                    This is for checkout
                </h2>
            </div>
        )
    }



    


    

   




    return(
      <Base title="Cartpage" description="Ready to Checkout">
        
            <div className="row text-center">
                <div className="col-6">
                    {loadAllProducts()}
                    </div>
                <div className="col-6"> 
                {loadCheckout()}
                    

                </div>
            </div>
            
            
        
    </Base>
     
    );
}

export default Cart;