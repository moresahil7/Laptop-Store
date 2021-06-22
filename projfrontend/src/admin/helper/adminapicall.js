import { API } from "../../backend";


//Category Calls
export const createCategory = (userId , token , category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method : "POST",
        headers : {
            Accept: "application/json",
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })   
    .catch(err => 
        console.log(err));
    
} ;
//get all categories
export const getAllCategories = ()  =>{
    return fetch(`${API}/categories`,{
        method : "GET"
    }).then(response =>{
        return response.json();
    }).catch(err=>console.log(err))
}

//product calls
export const createProduct = (userId , token , product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method:'POST',
        headers: {
            Accept: "application/json",
            Authorization : `Bearer ${token}`
        },
        body: product

    }).then(response =>{
        return response.json()
    }).catch(err =>console.log(err))
}
  


//get all products
export const getAllProducts = ()  =>{
    return fetch(`${API}/products`,{
        method : "GET"
    }).then(response =>{
        return response.json();
    }).catch(err=>console.log(err))
}

//delete a product
export const deleteProduct = (productId ,userId, token) =>{
    return fetch(`{API}/product/${productId}/${userId}`,{
        method : "DELETE",
        headers : {
            Accept: "application/json",
            Authorization: `Beare ${token}`
        }
        
    }).then(response => {
        return response.json();
        }).catch(err => console.log(err));
}


//get single product

 
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}` ,{
        method : "GET"
    }).then(response =>{
        return response.json();
    }).catch(err => console.log(err));
}





//update a product
                                                    

export const updateroduct = (productId, userId , token , product) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
        body: product
    }).then(response =>{
        return response.json();
    }).catch(err => console.log(err))
}