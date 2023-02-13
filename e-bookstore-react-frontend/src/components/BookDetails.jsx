import React from 'react'
import "../style/BookDetails.css"
import { Link } from 'react-router-dom';
import "../style/OneBook.css"
import {FaRegHeart, FaHeart} from "react-icons/fa"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {BsCurrencyExchange} from "react-icons/bs"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";


const BookDetails = ({book, addToCart, currentUser, favouriteBooks, deleteBook, addToFavourites, removeFromFavourites, favourite}) => {

  let navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  function handleInput(e){
    setQuantity(e.target.value);
  };


  function handle(e){
    addToCart(book.id, quantity);
  };

  function add(){
    if(currentUser != null){
      addToFavourites(book.id);
    }else{
      navigate("/login");
    }
    
  };

  function remove(){
    removeFromFavourites(book.id);
  };

  if(favouriteBooks != null){
    favouriteBooks.map((favBook) =>{
      if(favBook.book != null && favBook.book.id == book.id){
        favourite = true;
      }
    })
  };

  const [amount, setAmount] = useState(book.price);
  const [currency, setCurrency] = useState("EUR");

  const changeCurrency = () => {
    if(currency == "EUR"){
      const options = {
        method: 'GET',
        url: 'https://api.currencyapi.com/v3/latest?apikey=MsL8RyxxwkC73lbdR88WyaXwEXUWrxfcCbXObLxT&base_currency=EUR&currencies=USD',
        };
    
        axios.request(options).then(function (response) {
            console.log(response.data);
            setAmount((response.data.data.USD.value*amount).toFixed(2));
            setCurrency("USD");
    
        }).catch(function (error) {
            console.error(error);
        });
    }else{
      const options = {
        method: 'GET',
        url: 'https://api.currencyapi.com/v3/latest?apikey=MsL8RyxxwkC73lbdR88WyaXwEXUWrxfcCbXObLxT&base_currency=USD&currencies=EUR',
        };
    
        axios.request(options).then(function (response) {
            console.log(response.data);
            setAmount((response.data.data.EUR.value*amount).toFixed(2));
            setCurrency("EUR");
        }).catch(function (error) {
            console.error(error);
        });
    }
  }
  
  return (
    <section className='background'>
      <div className="container py-5 h-100" >
        <div className="row d-flex justify-content-center align-items-center h-100">
          <img className='details-img' src={book.image} alt="Photo"  />
          <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
              <div className="card bg-dark text-white" style={{borderRadius: 1+"rem"}}>
                <div className="card-body p-5 text-center">



                    <div className="mb-md-3 mt-md-2 pb-5">

                        
                        <p className="title" >{book.title}</p>


                        <div className="form-outline form-white mb-4">
                            <p className="author" >Author: {book.author.name}</p>
                        </div>

                        <div className="form-outline form-white mb-4">
                          <p className="cat" >Category: {book.category.name}</p>
                        </div>

                        <div className="form-outline form-white mb-4">
                          <p className="desc" >About: {book.description}</p>
                        </div>

                        <div className="form-outline form-white mb-4">
                          <p className="price">{amount + "\t" + currency}</p>
                        </div>

                        <button className="currency-button orm-outline form-white mb-4" onClick={changeCurrency} style={{display: "block", margin: "auto"}}>
                            Change currency <BsCurrencyExchange /> 
                        </button>

                        <div className='orm-outline form-white mb-4'>

                          {favourite ? 
                            <button className="book-button" onClick={remove}>
                              Remove from Favourites <FaHeart />
                            </button>
                          :
                            <button className="book-button" onClick={add}>
                              Add to Favourites <FaRegHeart/>
                            </button>
                          }
                        </div>

                        <div className='orm-outline form-white mb-4'>

                          <input type="number" name="quantity" className='quantity'
                                  min="1" max="20" step="1" defaultValue="1" onChange={handleInput}>
                          </input>
                          <button className="book-button" onClick={handle}>
                              Add to Cart <AiOutlineShoppingCart/>
                          </button>
                        
                        </div>

                    </div>

            </div>
            </div>
        </div>
        </div>
    </div>
    </section>




 
    
  )
}

export default BookDetails
