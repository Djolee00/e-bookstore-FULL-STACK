import React from 'react'
import OneBook from './OneBook';
import { useEffect,useState } from 'react';
import axios from 'axios';

const FavBooks = ({token,readMore}) => {

    let header= {
        headers: {'Authorization': "Bearer " + token}
    };

    const [books, setBooks]=useState();
    useEffect(()=>{
        if(books==null){
            axios.get("http://127.0.0.1:8000/api/favbooks", header).then((res)=>{
                console.log(res.data);
                setBooks(res.data.books);
            });
        }
    },[books]);

  return (
    
            <div className="all-books">
                <h1>FavBooks</h1>
                {books==null ? <></> :  books.map((book)=>(
                    <OneBook  book={book} key={book.id} readMore={readMore} />
                ))}
            </div>
  )
}

export default FavBooks