import React , {useState , useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper';
import { createCategory, getAllCategories , removeCategory } from './helper/adminapicall';

const ManageCategories = () => {

    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();
  
    const preload = () => {
        getAllCategories().then(data => {
        if (data?.error) {
          console.log(data.error);
        } else {
            setCategories(data);
        }
      });
    };
  
    useEffect(() => {
      preload();
    }, []);

    const deleteThisCategory = categoryId => {
        removeCategory(categoryId, user._id, token).then(data => {
          if (data && data.error) {
            console.log(data.error);
          } else {
            preload();
          }
        });
      };
    
  

      return (
        <Base title="Welcome admin" description="Manage Categories here">
          <h2 className="mb-4">All Categories:</h2>
          <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
          </Link>
          <div className="row">
            <div className="col-12">
              <h2 className="text-center text-white my-3">Total Categories</h2>
    
              {categories.map((category, index) => {
                return (
                  <div key={index} className="row text-center mb-2 ">
                    <div className="col-4">
                      <h3 className="text-white text-left">{category.name}</h3>
                    </div>
                    <div className="col-4">
                      <Link
                        className="btn btn-success"
                        to={`/admin/category/update/${category._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-4">
                      <button
                        onClick={() => {
                          deleteThisCategory(category._id)
                        }}
                        className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Base>
      )
            }
export default ManageCategories
