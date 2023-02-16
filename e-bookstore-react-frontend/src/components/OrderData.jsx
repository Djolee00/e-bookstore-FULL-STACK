import React from 'react'

const OrderData = ({orderItems, books, totalPrice}) => {
  return (
    <table className="table table-dark">
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
            <tr>
            <td colSpan="2" scope="row" >Total price:</td>
            <td>{totalPrice.toFixed(2)} $</td>
            </tr>
        </tbody>
    </table>
  )
}

export default OrderData