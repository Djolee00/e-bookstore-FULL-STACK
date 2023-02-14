import React from 'react'
import { Link } from "react-router-dom";

const UserData = ({currentUser, currentUserData}) => {

    console.log(currentUserData);

  return (
    <form className="row g-3">
         <div className="col-md-6">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input type="text" className="form-control" id="inputName" value = {currentUserData != null ? currentUserData.name : ""} readOnly />
        </div>
        <div className="col-md-6">
            <label htmlFor="inputSurname" className="form-label">Surname</label>
            <input type="text" className="form-control" id="inputSurname" value = {currentUserData != null ? currentUserData.surname : ""} readOnly />
        </div>
        <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4" value = {currentUser != null ? currentUser.email : ""} readOnly/>
        </div>
        <div className="col-6">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" value = {currentUserData != null ? currentUserData.adress : ""} readOnly />
        </div>
        <div className="col-md-2">
            <label htmlFor="inputCity" className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity" value = {currentUserData != null ? currentUserData.city : ""} readOnly/>
        </div>
        <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">Zip</label>
            <input type="text" className="form-control" id="inputZip" value = {currentUserData != null ? currentUserData.postal_code : ""} readOnly/>
        </div>
        <div className="col-md-6">
            <label htmlFor="inputPhone" className="form-label">Phone number</label>
            <input type="tel" className="form-control" id="inputPhone" value = {currentUserData != null ? currentUserData.phone_number : ""} readOnly/>
        </div>
        <div className="col-12">
            <Link to='/user-data-update' className="nav-link">Update</Link>
        </div>
    </form>
  )
}

export default UserData