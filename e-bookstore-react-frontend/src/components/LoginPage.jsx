import React from 'react'
import { useState } from 'react'
import axios from "axios"
import "../style/LoginPage.css"
import Mbooks from "../Mbooks.png"
import { useNavigate } from 'react-router-dom'
import UserData from './UserData'


const LoginPage = ({addToken, addUser}) => {

    let navigate=useNavigate();

    const[userData, setUserData] =useState({
        email:"",
        password:"",
    });

    function handleInput(e){
        let newUserData=userData;
        newUserData[e.target.name]=e.target.value;
       setUserData(newUserData);
    }

    function handleLogin(e){
        e.preventDefault();
       
        axios.post("http://127.0.0.1:8000/api/login",userData).
        then((res)=>
        {
            console.log(res.data);
            if(res.data.success===true) {
               window.sessionStorage.setItem("auth_token",res.data.access_token);
                console.log(res.data);
                addToken(res.data.access_token);
                addUser(userData);
                navigate("/books");
            }

        }).
        catch((e)=>{console.log(e);});
    }

return (
  
    <section className="vh-100 gradient-custom">
    
    <div className="container py-5 h-100" >
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius: 1+"rem"}}>
            <div className="card-body p-5 text-center">

                <form onSubmit={handleLogin}>
                    <div className="mb-md-5 mt-md-4 pb-5">

                        <img src={Mbooks} alt="Logo" style={{height:130+"px", width:130+"px" }}></img>
                        <p className="text-white-50 mb-5">Please enter your email and password</p>


                        <div className="form-outline form-white mb-4">
                            <label className="form-label" htmlFor="typeEmailX" >Email</label>
                            <input type="text" id="typeEmailX" className="form-control form-control-lg" name="email" onInput={handleInput} /> 
                        </div>

                        <div className="form-outline form-white mb-4">
                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                            <input type="password" id="typePasswordX" className="form-control form-control-lg" name="password" onInput={handleInput} />
                        </div>

                        <button className="btn btn-outline-light btn-lg px-5" type="submit" >Login</button>   

                    </div>

                    <div>
                        <p className="mb-0">Don't have an account?  <a href="/register" className="text-white-50 fw-bold">Sign Up</a></p>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>


  )
}

export default LoginPage



