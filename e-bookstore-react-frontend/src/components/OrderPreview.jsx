import React from 'react'
import axios from 'axios';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import "../style/OrderPreview.css";
import {showMessage} from "../services/Alerts";

const OrderPreview = ({currentUser, currentUserData, orderItems, totalPrice, books, cartNum, refresh}) => {

    let btnName = "Submit";
    let navigate = useNavigate();

    function handleOrder(e){
        e.preventDefault();
    
        const order = {
          price_total: totalPrice,   
          item_count: cartNum,
          user_data_id: currentUserData.id,
        }

        axios.post("http://127.0.0.1:8000/api/orders",order).
                then((res)=>
                {
                    console.log(res.data);
                    if(res.data.success===true) {
                        console.log(res.data);
                        handleOrderItems(res.data[1].id);
                        refresh();
                        showMessage("Order successfully submited!", "success", "center", 3000, false);
                        navigate("/books");
                    }
    
                }).
                catch((e)=>{
                    console.log(e);
                    showMessage("Error!", "error", "center", 3000, true);
                });

      };

      function handleOrderItems(order_id){
        orderItems.map((item)=>{
            let newItem = {
                order_id: order_id,
                book_id: item.book_id,
                quantity: item.quantity
            }
            axios.post("http://127.0.0.1:8000/api/items",newItem).
                then((res)=>
                {
                    console.log(res.data);
                    if(res.data.success===true) {
                        console.log(res.data);
                    }
    
                }).
                catch((e)=>{console.log(e);});
            });
      }

  return (
    <div className='order-preview'>
        <div className='user-data'>
            <p>Name: {currentUserData.name}</p>
            <p>Surname: {currentUserData.surname}</p>
            <p>Email: {currentUserData.email}</p>
            <p>Adress: {currentUserData.adress}</p>
            <p>City: {currentUserData.city}</p>
            <p>Zip: {currentUserData.postal_code}</p>
            <p>Phone number: {currentUserData.phone_number}</p>
        </div>
        <div className='order-data'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Book</th>
                        <th>Price</th>
                        <th>Quantity</th>
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
                            </tr>
                        ))}
                    
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2" scope="row" >Total price:</td>
                        <td id='total'>{totalPrice.toFixed(2)} $</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div className='submit'>
            <Button handle={handleOrder} btnName={btnName}/>
        </div>
    </div>
  )
}

export default OrderPreview