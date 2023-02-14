import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


const CartPage = ({orderItems, books, totalPrice, removeFromCart}) => {

    let navigate = useNavigate();


    console.log(orderItems);

    function navigateToOrderPage(){
        navigate("/order");
    }
   
  return (
    <table className="table table-dark">
        <thead>
            <tr>
                <th></th>
                <th>Book</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {orderItems==null ? <></> :  orderItems.map((item)=>(
                
                
                    <tr className="table-active">
                        <td>{orderItems.indexOf(item)+1}</td>
                        <td>
                            {books==null ? <></> :  books.map((book)=>(
                                book.id == item.book_id ? book.title : <></>
                            ))}
                        </td>
                        <td>
                            {books==null ? <></> :  books.map((book)=>(
                                book.id == item.book_id ? book.price : <></>
                            ))} $
                        </td>
                        <td>{item.quantity}</td>
                        <td>
                            <button onClick={()=> removeFromCart(item.id)}>Remove</button>
                        </td>
                    </tr>
                ))}
            <tr>
            <td colSpan="2" scope="row" >Total price:</td>
            <td>{totalPrice.toFixed(2)} $</td>
            <td></td>
            <td>
                <button onClick={navigateToOrderPage}>Proceed to checkout</button>
            </td>
            </tr>
        </tbody>
    </table>
  )
}

export default CartPage