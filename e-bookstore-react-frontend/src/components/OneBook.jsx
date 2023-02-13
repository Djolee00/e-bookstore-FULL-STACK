import React from 'react'
import { Link } from 'react-router-dom';
import "../style/OneBook.css"
import {FaRegHeart, FaHeart} from "react-icons/fa"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {BsCurrencyExchange} from "react-icons/bs"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";



const OneBook = ({book,readMore,addToCart, currentUser, favouriteBooks, deleteBook, addToFavourites, removeFromFavourites, favourite}) => {

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

  function update(){
    readMore(book.id);
    navigate("/book-update");
  }

  const admin = () =>{
    if(currentUser != null){
      return currentUser.admin;
     }else{
       return false;
     }
  }

  if(favouriteBooks != null){
    favouriteBooks.map((favBook) =>{
      if(favBook.book != null && favBook.book.id == book.id){
        favourite = true;
      }
    })
  };

  const removeBook = () => {

    Swal.fire({
      text: "Are you sure you want to delete this book?",
      position: "center",
      icon: "question",
      title: "Delete",
      showConfirmButton: true,
      confirmButtonText: "Yes",
      showCancelButton: true
    }).then((result) =>  {
      if(result.isConfirmed){
        deleteBook(book.id);
      };
    });
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
    <div className='book'>
        <img className='book-img-top' src={book.image} alt="Book"/>
        <div className='book-body'>
            <h3 className='book-title'>{book.title}</h3>
            <h5 className='book-author'>{book.author.name}</h5> 
            <h5 className='book-price'>{amount + " " + currency}</h5>
            <button className="currency-button" onClick={changeCurrency}>
              <BsCurrencyExchange />
            </button>
            <Link to="/details" className='link' onClick={()=> readMore(book.id)}>Details</Link>
        </div>
        <div className='button-section'>
          {favourite ? 
            <button className="book-button" onClick={remove}>
              <FaHeart />
            </button>
          :
            <button className="book-button" onClick={add}>
              <FaRegHeart/>
            </button>
          };

          <input type="number" name="quantity" className='quantity'
                  min="1" max="20" step="1" defaultValue="1" onChange={handleInput}>
          </input>
          <button className="book-button" onClick={handle}>
              <AiOutlineShoppingCart/>
          </button>
        </div>
        {admin() ?
          <div className='admin-section' style={{textAlign:'center', padding:5}}>
            <button className='button'style={{backgroundColor:'transparent', color:'white'}} onClick={update}>Update</button>
            <button className='button'style={{marginLeft:15, backgroundColor:'transparent', color:'white'}} onClick={removeBook}>Delete</button>
          </div>
        :
          <></>
        }

    </div>

  )
}

export default OneBook













