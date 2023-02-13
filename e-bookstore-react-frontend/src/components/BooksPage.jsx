import React from 'react'
import OneBook from './OneBook';
import axios from 'axios';
import { useState,useEffect } from 'react';
import "../style/OneBook.css"
import { Link } from 'react-router-dom';




const BooksPage = ({readMore,seeAuthor,seeCategories,addToCart, token, currentUser, deleteBook, favouriteBooks, addToFavourites, removeFromFavourites, authors, categories}) => {


    const [books, setBooks]=useState();
    useEffect(()=>{
        if(books==null){
            axios.get("http://127.0.0.1:8000/api/books").then((res)=>{
                console.log(res.data);
                setBooks(res.data.books);
            });
        }
    },[books]);

   
    
    const [sortedBooks, setSortedBooks]=useState();
    
    
    function sort(){
        books.sort((a,b)=>{
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
        setSortedBooks(books)
    }
    
    function admin(){
        if(token!=null){
            return currentUser.admin;
        }
    }

 
    return (
    
        <div className="all-books-page" >
            <h1 className='heading' >Books</h1>

            <div className='filters-position'>
                
                <div className='filters-section' >
                    <div>
                        <button className="btn btn-primary mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapse3" aria-expanded="false" aria-controls="multiCollapse3" style={{backgroundColor:"rgb(33, 37, 41)", marginLeft:20+"px"}}>
                            Categories
                        </button>
                        <div className="col" style={{width:270}}>
                            <div className="multi-collapse collapse " id="multiCollapse3" >
                                {categories==null ? <></> : categories.map((category) => (
                                    <li  key={category.id}>
                                        <Link to="/filterCategories" onClick={()=> seeCategories(category.id)} style={{background:'transparent', borderWidth:0+"px", color:"black"}} >
                                            {category.name}
                                        </Link>
                                    </li> ))}      
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary mb-1" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapse1" aria-expanded="false" aria-controls="multiCollapse1" style={{backgroundColor:"rgb(33, 37, 41)", marginLeft:20+"px"}}>
                            Authors
                        </button>
                        <div className="col" style={{width:270}}>
                            <div className="multi-collapse collapse " id="multiCollapse1" >
                                {authors==null ? <></> : authors.map((author) => (
                                    <li key={author.id}>
                                        <Link to="/filterAuthors" onClick={()=> seeAuthor(author.id)} style={{background:'transparent', borderWidth:0+"px", color:"black"}} >
                                            {author.name}
                                        </Link>
                                    </li>  ))}            
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary mb-1" type="button" onClick={sort} style={{backgroundColor:"rgb(33, 37, 41)", marginLeft:20+"px"}}>
                        Sort By Name
                    </button>
                    {admin() ? 
                        <button className="btn btn-primary mb-1" type="button" style={{backgroundColor:"rgb(33, 37, 41)", marginLeft:20+"px"}}>
                            <Link to="/book-update" onClick={()=> readMore(null)} style={{color:"white", textDecoration:"none"}}>
                                Add new book
                            </Link>
                        </button>
                    : 
                        <></>
                    }
                </div>
            </div>






            <div className="all-books">
                {books == null ? <></> : books.map(book => (
                    <OneBook  
                        book={book} 
                        key={book.id} 
                        currentUser={currentUser}
                        readMore={readMore} 
                        deleteBook={deleteBook}
                        addToCart={addToCart} 
                        admin={admin} 
                        favouriteBooks={favouriteBooks}
                        addToFavourites={addToFavourites} 
                        removeFromFavourites={removeFromFavourites} 
                        favourite={false}
                    />
                ))}
                
            </div>
        </div>
    )
}

export default BooksPage