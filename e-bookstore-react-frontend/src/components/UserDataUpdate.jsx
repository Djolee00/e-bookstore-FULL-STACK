import React from 'react'
import Button from './Button'
import UserDataForm from './UserDataForm'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const UserDataUpdate = ({currentUser, currentUserData, updateUserData}) => {

    let navigate=useNavigate();

    console.log(currentUser);
    console.log(currentUserData);

    const[userData, setUserData] =useState({
        name: currentUserData != null ? currentUserData.name : "",
        surname: currentUserData != null ? currentUserData.surname : "",
        email: currentUser != null ? currentUser.email : "",
        adress: currentUserData != null ? currentUserData.adress : "",
        city: currentUserData != null ? currentUserData.city : "",
        postal_code: currentUserData != null ? currentUserData.postal_code : "",
        phone_number: currentUserData != null ? currentUserData.phone_number : "",
        user_id: currentUser != null ? currentUser.id : null,
    });
    function handleInput(e){
        let newUserData=userData;
        newUserData[e.target.name]=e.target.value;
        setUserData(newUserData);
    }
    function handleUpdate(e) {

        e.preventDefault();

        if(currentUserData == null){
            addNewData();
        }else{
            updateData();
        }

    }

    const [error, setError] = useState();

    function addNewData(){
        axios.post("http://127.0.0.1:8000/api/data",userData).
                then((res)=>
                {
                    if(res.data.success===true) {
                        console.log(res.data);
                        updateUserData(res.data[1]);
                        navigate("/user-data");
                    }

                }).
                catch((e)=>{
                    console.log(e);
                    setError(e);
                });
    }

    function updateData(){
        axios.put("http://127.0.0.1:8000/api/data/"+currentUserData.id,userData).
                then((res)=>
                {
                    if(res.data.success===true) {
                        console.log(res.data);
                        updateUserData(res.data[1]);
                        navigate("/user-data");
                    }

                }).
                catch((e)=>{
                    console.log(e);
                    setError(e);
                });
    }

    const btnName = "Save";

  return (
      <div>
        <UserDataForm currentUser={currentUser} currentUserData={currentUserData} handleInput={handleInput} />
        <Button handle={handleUpdate} btnName={btnName}/>
      </div>
    
  )
}

export default UserDataUpdate