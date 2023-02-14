import React from 'react'
import { useState } from 'react'
import axios from "axios"
import "../style/LoginPage.css"
import Mbooks from "../Mbooks.png"
import { useNavigate } from 'react-router-dom'


const RegisterPage = () => {

    let navigate=useNavigate();

    const[userData, setUserData] =useState({
        name:"",
        email:"",
        password:"",
    });

    function handleInput(e){
        let newUserData=userData;
        newUserData[e.target.name]=e.target.value;
       setUserData(newUserData);
    }

    function handleRegister(e){
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/register",userData).
        then((res)=>
        {
            console.log(res.data);
           navigate("/login")

        }).
        catch((e)=>{console.log(e);});
    }


  return (
    <section className="vh-100 gradient-custom">
    
    <div className="container py-3 h-50" >
        <div className="row d-flex justify-content-center align-items-center h-90">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius: 1+"rem"}}>
            <div className="card-body p-4 text-center">

                <form onSubmit={handleRegister}>
                    <div className="mb-md-5 mt-md-4 pb-5">

                        <img src={Mbooks} alt="Logo" style={{height:130+"px", width:130+"px" }}></img>
                        <p className="text-white-50 mb-5">Please enter your information</p>


                        <div className="form-outline form-white mb-4">
                            <label className="form-label" htmlFor="typeNameX" >Name</label>
                            <input type="text" id="typeNameX" className="form-control form-control-lg" name="name" onInput={handleInput} /> 
                        </div>

                        <div className="form-outline form-white mb-4">
                            <label className="form-label" htmlFor="typeEmailX" >Email</label>
                            <input type="text" id="typeEmailX" className="form-control form-control-lg" name="email" onInput={handleInput} /> 
                        </div>

                        <div className="form-outline form-white mb-4">
                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                            <input type="password" id="typePasswordX" className="form-control form-control-lg" name="password" onInput={handleInput} />
                        </div>

                        <button className="btn btn-outline-light btn-lg px-5" type="submit" >Register</button>   

                    </div>

                    <div>
                        <p className="mb-0" >Already have an account?  <a href="/login" className="text-white-50 fw-bold">Login</a></p>
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

export default RegisterPage