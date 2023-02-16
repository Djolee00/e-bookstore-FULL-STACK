import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';
import { useState } from 'react';
import { showMessage } from '../services/Alerts';

const BookForm = ({book, authors, categories, reloadBooks}) => {

    console.log(book);
    console.log(authors);
    console.log(categories);

    let navigate = useNavigate();


    const[newBook, setNewBook] =useState({
        title: book != null ? book.title : "",
        description: book != null ? book.description : "",
        image: book != null ? book.image : "",
        author_id: book != null ? book.author.id : authors[1].id,
        category_id: book != null ? book.category.id : categories[1].id,
        price: book != null ? book.price : "",
    });
    function handleInput(e){
        let b=newBook;
        b[e.target.name]=e.target.value;
        setNewBook(b);
    }

    function handleSelected(e){
        let b=newBook;
        b[e.target.name]=e.target.selectedIndex;
        setNewBook(b);
    }

    function handleUpdate(e) {

        e.preventDefault();

        if(book == null){
            addNewBook();
        }else{
            updateBook();
        }

    }


    function addNewBook(){

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/books',
            headers: { 
            
            Authorization: "Bearer "+ window.sessionStorage.getItem("auth_token"),
            
            },

            data: newBook,
            
        };
    
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.success == true){
                reloadBooks();
                showMessage("Book stored successfully!", "success", "center", 3000, false);
                navigate("/books");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function updateBook(){

        var config = {
            method: 'put',
            url: 'http://127.0.0.1:8000/api/books/'+book.id,
            headers: { 
            
            Authorization: "Bearer "+ window.sessionStorage.getItem("auth_token"),
            
            },

            data: newBook,
            
        };
    
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.success == true){
                reloadBooks();
                showMessage("Book updated successfully!", "success", "center", 3000, false);
                navigate("/books");
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    }


  return (
      <>
        <form className="row g-3">
            <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">Title</label>
                <input type="text" className="form-control" id="inputTitle" name="title" defaultValue = {book == null ? "" : book.title} onInput={handleInput} />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Image</label>
                <input type="email" className="form-control" id="inputImage" name="image"  defaultValue = {book == null ? "" : book.image}  onInput={handleInput}/>
            </div>
            <div className="col-md-12">
                <label htmlFor="inputSurname" className="form-label">Description</label>
                <input type="text" className="form-control" id="inputDescription" name="description" defaultValue = {book == null ? "" : book.description} onInput={handleInput} />
            </div>
            <div className="col-6">
                <label htmlFor="inputAddress" className="form-label">Author</label>
                <select className="form-select" id="inputAuthor" name="author_id" defaultValue = {book == null ? authors[1].id : book.author.id} onChange={handleSelected}>
                    {authors.map((author) => {
                        return <option  key={author.id} value={author.id}>{author.name}</option>
                    })}
                    
                </select>
            </div>
            <div className="col-md-2">
                <label htmlFor="inputCity" className="form-label">Category</label>
                <select className="form-select" id="inputCategory" name="category_id" value = {book == null ? categories[1].id : book.category.id} onChange={handleSelected}>
                    {categories.map((category) => {
                        return <option  key={category.id} value={category.id}>{category.name}</option>
                    })}
                </select>
            </div>
            <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">Price</label>
                <input type="number" className="form-control" id="inputPrice" name="price" defaultValue = {book == null ? "" : book.price} onInput={handleInput}/>
            </div>

        </form>

        <Button handle={handleUpdate} btnName="Save"/>
      </>
  )
}

export default BookForm