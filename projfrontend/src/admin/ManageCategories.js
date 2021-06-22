import React from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
const ManageCategories = () => {
    const goBack = () => {
        return(
            <Link className = "btn btn-sm btn-info mb-3" to="/admin/dashboard">
                Admin Home
            </Link>
        )
    }
    return (
        <div>
            <Base>
            <h1 className="className text-white">
                Manage your Categories here
            </h1>
            {goBack()}
            </Base>
        </div>
    )
}


export default ManageCategories