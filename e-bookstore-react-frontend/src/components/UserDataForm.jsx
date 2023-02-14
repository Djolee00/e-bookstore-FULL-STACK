import React from 'react'


const UserDataForm = ({currentUser, currentUserData, handleInput}) => {

    function defaultValue(){
        if (currentUserData != null){
            return currentUserData;
        }else{
            return "";
        }
    }

    function readOnly(){
        if (currentUserData != null){
            return true;
        }else{
            return false;
        }
    }


  return (
      
    <form className="row g-3">
         <div className="col-md-6">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input type="text" className="form-control" id="inputName" name="name" defaultValue = {defaultValue().name} onInput={handleInput} />
        </div>
        <div className="col-md-6">
            <label htmlFor="inputSurname" className="form-label">Surname</label>
            <input type="text" className="form-control" id="inputSurname" name="surname" defaultValue = {defaultValue().surname} onInput={handleInput} />
        </div>
        <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4" name="email"  
                defaultValue = {currentUser != null ? currentUser.email : ""} onInput={handleInput} readOnly={readOnly()} />
        </div>
        <div className="col-6">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" name="adress" defaultValue = {defaultValue().adress}  onInput={handleInput}/>
        </div>
        <div className="col-md-2">
            <label htmlFor="inputCity" className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity" name="city" defaultValue = {defaultValue().city} onInput={handleInput}/>
        </div>
        <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">Zip</label>
            <input type="text" className="form-control" id="inputZip" name="postal_code" defaultValue = {defaultValue().postal_code} onInput={handleInput}/>
        </div>
        <div className="col-md-6">
            <label htmlFor="inputPhone" className="form-label">Phone number</label>
            <input type="tel" className="form-control" id="inputPhone" name="phone_number" defaultValue = {defaultValue().phone_number} onInput={handleInput}/>
        </div>

    </form>
    
  )
}

export default UserDataForm