import React, {useState , useEffect} from 'react'
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import {getmeToken , processPayment} from './helper/paymentbhelper'
import {createOrder} from './helper/orderHelper'
import { isAuthenticated } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react';

const Paymentb = ({products, setReload = f =>f , reload = undefined}) => {
    
    
    const [info, setInfo] = useState({
        loading : false,
        success: false,
        clientToken: null,
        error: "",
        instance:{}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId , token) =>{
        getmeToken(userId , token).then(info => {
            // console.log("INFORMATION" , info);
            if(info.error){
                setInfo({...info  , erroe: info.error})
            }
            else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    };


    const showbtdropIn = () => {
        return(
            <div>
                {info.clientToken !==null && products.length > 0? (
                    <div>
                    <DropIn
                      options={{ authorization: info.clientToken }}
                      onInstance={(instance) => (info.instance = instance)}
                    />
                    <div class="d-grid gap-2">
                    <button className="btn btn-block btn-outline-success" 
                    onClick={onPurchase}>Buy</button>
                  </div>
                  </div>
                ) : (
                    <h4>Please Login or add something to cart</h4>

                )}
            </div>
        )
    }


    useEffect(() => {
       getToken(userId , token)
    }, []);
    
    const onPurchase = () => {
        setInfo({
            loading : true
        })
        let nonce;
        let getNonce = info?.instance?.requestPaymentMethod()
         .then(data => {
             nonce = data.nonce
             const paymentData = {
                 paymentMethodNonce : nonce,
                 amount:getAmount()
             };
             processPayment(userId , token , paymentData)
             .then(response => {
                 setInfo({...info , success:response.success , loading : false})
                 console.log("Payment Success")
                 //TODO: empty cart
                 //TODO: Force Reload
             })
             .catch(error => {
                 setInfo({loading : false , success: false})
                 console.log("Payment Failed")

             })
         })
    }
    const getAmount = () => {
        let amount = 0
        products.map(p => {
            amount = amount + p.price
        })
        return amount

    }
    return (
        <div>
            <h5>Your Bill is {getAmount()}</h5>
            {showbtdropIn()}
        </div>
    )
}


export default Paymentb;