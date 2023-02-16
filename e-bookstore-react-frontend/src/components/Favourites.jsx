import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import OneBook from './OneBook';

const Favourites = ({readMore,seeAuthor,seeCategories,addToCart, deleteBook, token, currentUser, favouriteBooks, addToFavourites, removeFromFavourites}) => {



  return (
    <div className="all-books">
        {favouriteBooks==null ? <></> :  favouriteBooks.map((favBook)=>(
            <OneBook  
                book={favBook.book} 
                key={favBook.id} 
                readMore={readMore} 
                addToCart={addToCart} 
                deleteBook={deleteBook}
                currentUser={currentUser} 
                addToFavourites={addToFavourites} 
                removeFromFavourites={removeFromFavourites} 
                favourite={true}
            />
        ))}
    </div>
  )
}

export default Favourites