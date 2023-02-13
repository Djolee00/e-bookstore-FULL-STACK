import React from 'react'
import Mbooks from "../Mbooks.png"
import "../style/NavBar.css"
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import { Link } from "react-router-dom"


const NavBar = ({token, cartNum, currentUser, removeToken}) => {


    function handleLogout(){

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/logout',
            headers: { 
            
            Authorization: "Bearer "+ window.sessionStorage.getItem("auth_token"),
            
            },
            
        };
        
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.sessionStorage.setItem("auth_token",null);
            removeToken();
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    const admin = () =>{
        if(currentUser != null){
          return currentUser.admin;
         }else{
           return false;
         }
      }

  return (
    <div>
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
            <link rel="stylesheet" href="NavBar.css"></link>
            <div className="container-fluid">
            <img src={Mbooks} style={{height:70+"px", width:70+"px" }} />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDark" aria-controls="navbarDark" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse show" id="navbarDark">
                <ul className="navbar-nav me-auto mb-2 mb-xl-0">
                    <li className="nav-item">
                        <Link to='/books'className="nav-link active" aria-current="page" >Books</Link>
                    </li>
                {token != null ?
                    <li className="nav-item">
                        <Link to='/favourites' className="nav-link ">Favourites</Link>
                    </li>
                :
                    <></>    
                }    
                    <li className="nav-item">
                        <Link to='/cart' className="nav-link">Cart {cartNum}</Link>
                    </li> 
                    {admin() ? (
                         <li className="nav-item">
                            <Link to='/admin' className="nav-link">Orders</Link>
                        </li> 
                    ):
                        <></>
                    }
                    <li className="nav-item">
                        <Link to='/contact' className="nav-link">Contact</Link>
                    </li>       
                </ul>
                <ul className="navbar-nav me-auto mb-10 mb-xl-0" id='responsive' >
                
                {token!=null ? (
                    <li className="nav-item">
                        <Link to='/user-data' className="nav-link">Profile</Link>
                    </li>
                ):
                    <></>
                }
                
                {token==null ? (
                        <>
                            <li className="nav-item">
                                <Link to='/login' className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/register' className="nav-link">Register</Link>
                            </li>
                        </>
                ):(      
                        <li className="nav-item">
                            <Link to='/books' className="nav-link" onClick={handleLogout}>Logout</Link>
                        </li>
                )}

                </ul>
                </div>
            </div>
        </nav>
        <Outlet/>
    </div>
  )
}

export default NavBar