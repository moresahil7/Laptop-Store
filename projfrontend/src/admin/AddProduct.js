import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategories ,createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
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
    createdProduct: "",
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
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    getAllCategories().then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        console.log("CATE:" ,categories);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values , error:"", loading:true})
    createProduct(user._id, token,formData).then(data => {
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
          createdProduct : data.name
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
    style={{display : createdProduct ? "" : "none" }}
    >

<h4>" {createdProduct} " Created Successfully </h4>
       

    </div>
    );
  }
  const errorMessage =() =>{
    return(
    
    
    <div class="alert alert-warning alert-dismissible fade show" role="alert"
    style={{display :error ? "" : "none" }} >
      <h5>Failed to create the product! Try Again!!</h5>




       

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
        Create Product
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
export default AddProduct;
