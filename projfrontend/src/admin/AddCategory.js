import React,{useState} from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';


const AddCategory = ()=> {
    
    const [name, setName] = useState("");
    const [error , setError] = useState(false);
    const [success , setSuccess] = useState(false);


    const {user, token} = isAuthenticated();

    const goBack = () => {
        return(
            <Link className = "btn btn-sm btn-info mb-3" to="/admin/dashboard">
                Admin Home
            </Link>
        )
    }
    const handleChange = event =>{
        setError("");
        setName(event.target.value)
    }
    const onSubmit = event =>{
        event.preventDefault();
        setError("");
        setSuccess(false);



        //backend req.
        createCategory(user._id, token, {name})
        .then(data => {
        if(data.error){
        setError(true)

            }
            else{
                setError("")
                setSuccess(true)
                setName("")
            }

        }).catch()
    }
    const successMessage  = () =>{
        if(success){
            return(
                <h4 className="text-success"> Successfully Created the Category</h4>
            )
        }
    };
    const errorMessage  = () =>{
        if(error){
        return(
            
            <h4 className="text-success">Unable to create</h4>
            
        )
        }
    }
    const myCategoryForm = () => {
        return(
            <form>
                <div className="form-group">
                    <p className="lead my-1">Enter Category</p>
                    <input 
                    type="text" 
                    clasName="form-control my-1"
                    autoFocus
                    onChange = {handleChange}
                    value = {name}
                    required
                    placeholder = "For ex. Luxurious" /><br/>
                    <button onClick={onSubmit} className="btn btn-outline-info  my-2">Create Category</button>
                </div>

            </form>
        )
    }
    return (
        <div>
           <Base title="Create Categories here" 
           description="Create all your Categories for your cars here" 
           className="container bg-info p-3">
               <div className="row bg-white rounded">
                   <div className="col-md-8 offset-md-2">
                       {successMessage()}
                       {errorMessage()}
                       {myCategoryForm()}
                       {goBack()}
                       
                   </div>
               </div>

           </Base>
        </div>
    )
    
}
export default AddCategory;