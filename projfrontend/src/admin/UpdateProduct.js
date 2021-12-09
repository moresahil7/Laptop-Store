import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategories ,updateProduct , getProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({match}) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    updatedProduct: "",
    getRedirect: "",
    formData: "",
  });
  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    loading,
    error,
    updatedProduct,
    getRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();

        setValues({ 


            ...values,

            name : data.name,
            description: data.description,
            price: data.price,
            category: data.category_id,
            stock: data.stock,
            formData: new FormData()
         });
        
      }
    });
  };
  useEffect(() => {
    preload(match.params.productId);
  }, []);
  const preloadCategories = () => {
      getAllCategories().then(data => {
          if(data.error){
        setValues({ ...values, error: data.error });
              
          }
          else{
              setValues({
                  categories: data, formData: new FormData()
              })

          }
      })
  }

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values , error:"", loading:true})


    updateProduct(match.params.productId,user._id, token,formData).then(data => {
      if(data.error){
        setValues({...values, error:data.error})
      }
      else{
        setValues({
          ...values,
          name:"",
          description:"",
          price:"",
          photo:"",
          stock:"",
          loading:false,
          updatedProduct : data.name
        });
      }
    });
  };
  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value; 
    formData.set(name, value);
    setValues({...values, [name]:value});
  };
  const successMessage =() =>{
    return(
    <div className="alert alert-success mt-3"
    style={{display : updatedProduct ? "" : "none" }}
    >

<h4>" {updatedProduct} " Updated Successfully </h4>
       

    </div>
    );
  }
  const errorMessage =() =>{
    return(
    <div className="alert alert-success mt-3"
    style={{display :error ? "" : "none" }}
    >

<h4> Failed to upate the product! . Try again! </h4>
       

    </div>
    );
  }

  const createProductForm = () => (
    <form>
      <span>Post a Photo</span>
      <div className="form-group  bg-success mb-2 ">
        <label className="btn btn-block btn-success ">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mb-2">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mb-2">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mb-2">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mb-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mb-2">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="text-white btn btn-outline-success mb-1"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add products here!!"
      description="Welcome in Add Products Section!!"
      className="container bg-info p-3"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-1">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded ">
        <div className="col-md-8 offset-md-2">
            {errorMessage()}
          {successMessage()}
          {createProductForm()}</div>
      </div>
    </Base>
  );
};
export default UpdateProduct;
