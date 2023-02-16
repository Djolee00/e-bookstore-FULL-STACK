
import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import NavBar from './components/NavBar';
import { useState,useEffect } from 'react';
import BooksPage from './components/BooksPage';
import BookDetails from './components/BookDetails';
import axios from 'axios';
import Contact from './components/Contact';
import FilterAuthors from "./components/FilterAuthors"
import FilterCategory from './components/FilterCategory';
import CartPage from './components/CartPage';
import OrderPage from './components/OrderPage';
import UserData from './components/UserData';
import UserDataUpdate from './components/UserDataUpdate';
import OrderPreview from './components/OrderPreview';
import Favourites from './components/Favourites';
import BookForm from './components/BookForm';
import { showMessage } from './services/Alerts';
import AdminPage from './components/AdminPage';

function App() {
    const [token,setToken]=useState();

    function addToken(auth_token){
        setToken(auth_token);
    }

    function removeToken(){
        setToken(null);
        setCurrentUser(null);
        setCurrentUserData(null);
    }

    const [users, setUsers]=useState();
    useEffect(()=>{
        if(users==null){
            axios.get("http://127.0.0.1:8000/api/users").then((res)=>{
                console.log(res.data);
                setUsers(res.data.users);
            });
        }
    },[users]);

    const [userData, setUserData] = useState();
    useEffect(()=>{
        if(userData==null){
            axios.get("http://127.0.0.1:8000/api/data").then((res)=>{
                console.log(res.data);
                setUserData(res.data.userData);
            });
        }
    },[userData]);

    //logged user data
    const [currentUserData, setCurrentUserData] = useState();

    
    //logged user
    const [currentUser, setCurrentUser] = useState();

    function addUser(u){ 
        if(users != null){
            users.map((user) =>{
                if(user.email == u.email){
                    setCurrentUser(user);
                    console.log(user);
                    console.log(user.user_data);
                    setCurrentUserData(user.user_data);
                    loadFavourites();
                };
            });
        };
    }




    function updateUserData(newData){
        setCurrentUserData(newData);
        if(currentUser != null){
            let newUser = currentUser;
            if(currentUser.user_data == null){
                newUser.user_data = newData.id;
            }
            newUser.email = newData.email;
            newUser.name = newData.name;
            newUser.user_data = newData.id
            setCurrentUser(newUser);

            /*var config = {
                method: 'put',
                url: 'http://127.0.0.1:8000/api/update-user',
                headers: { 
                
                Authorization: "Bearer "+ window.sessionStorage.getItem("auth_token"),

                data: newUser
                },
                
            };

            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if(response.data.success == 'true'){
                    setCurrentUser(newUser);
                }
            })
            .catch(function (error) {
                console.log(error);
            });*/

        }
    }


    const [books, setBooks]=useState();
    useEffect(()=>{
        if(books==null){
            axios.get("http://127.0.0.1:8000/api/books").then((res)=>{
                console.log(res.data);
                setBooks(res.data.books);
            });
        }
    },[books]);

    
    const [bookDetails, setBookDetails] = useState();
    const readMore = (id) => {
        if(id == null){
            setBookDetails(null);
        }else{
            books.map((book) => {
                if(book.id === id){
                    setBookDetails(book);
                }
            });
        }   
    }

    const reloadBooks = () => {
        axios.get("http://127.0.0.1:8000/api/books").then((res)=>{
                console.log(res.data);
                setBooks(res.data.books);
            });
    }

    const deleteBook = (id) =>{

        var config = {
          method: 'delete',
          url: 'http://127.0.0.1:8000/api/books/'+ id,
          headers: { 
          
          Authorization: "Bearer "+ window.sessionStorage.getItem("auth_token"),
          },
          
          };
  
      axios(config)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
          showMessage("Book successfully deleted!", "success", "center", 2000, false);
          favouriteBooks.map((favBook) =>{
              if(favBook.book.id == id){
                  removeFromFavourites(id);
              }
          })
      })
      .catch(function (error) {
          console.log(error);
      });
    };


  //favourite books
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  function loadFavourites() {

    var data = currentUser;

    var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/favbooks',
        headers: { 
        
        Authorization: "Bearer "+ window.sessionStorage.getItem("auth_token"),
        },
        
        data : data,
    };
    
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        setFavouriteBooks(response.data.fav_books);
    })
    .catch(function (error) {
        console.log(error);
    });

    };

  const addToFavourites = (id) => {
      console.log(id);
      
      
      var data = {
        book_id: id,
      }

      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/favbooks',
        headers: { 
        
        Authorization: "Bearer "+ window.sessionStorage.getItem("auth_token"),
        },
        
        data : data,
        };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        setFavouriteBooks(favouriteBooks => [...favouriteBooks, response.data[1]]);
    })
    .catch(function (error) {
        console.log(error);
    });
    
  };

  const removeFromFavourites = (id) => {
    let favBook_id = null;

      if(favouriteBooks != null){
          favouriteBooks.map((favBook) =>{
            if(favBook.book.id == id){
                favBook_id = favBook.id;
            }
          })
      }

      var config = {
        method: 'delete',
        url: 'http://127.0.0.1:8000/api/favbooks/'+ favBook_id,
        headers: { 
        
        Authorization: "Bearer "+ window.sessionStorage.getItem("auth_token"),
        },
        
        };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        loadFavourites();
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  const [authors, setAuthors]=useState();
    useEffect(()=>{
        if(authors==null){
            axios.get("http://127.0.0.1:8000/api/authors").then((res)=>{
                console.log(res.data);
                setAuthors(res.data.authors);
            });
        }
    },[authors]);

    const [categories, setCategories]=useState();
    useEffect(()=>{
        if(categories==null){
            axios.get("http://127.0.0.1:8000/api/categories").then((res)=>{
                console.log(res.data);
                setCategories(res.data.categories);
            });
        }
    },[categories]);

    const [authorBooks, setAuthorBooks]=useState([]);
    const seeAuthor = (id) => {
        
        books.map((book) => {
        if(book.author.id === id){
            authorBooks.push(book);
        }
        });
    }

  
    const [categoryBooks, setCategoryBooks]=useState([]);
    const seeCategories = (id) => {
        
        books.map((book) => {
        if(book.category.id === id){
            categoryBooks.push(book);
        }
        });
    }
    
    //number of items in the cart
    const [cartNum, setCartNum] = useState(0); 
    //total price
    const [totalPrice, setTotalPrice] = useState(0);
    //array of order items 
    const[orderItems, setOrderItems] = useState([]);

    //on click add to cart (book id)
    const addToCart = (id, quantity) => {
        console.log('add');

        setCartNum(cartNum+1);
        const length = orderItems.length;

        //creating the object order item
        const item = {
            id: length + 1,
            order_id: 0,
            book_id: id,
            quantity: quantity
        }

        //adding object to array
        setOrderItems(orderItems => [...orderItems, item]);

        //total price +
        books == null ? <></> : books.map((book)=>(
            book.id == id ? setTotalPrice(totalPrice+(book.price*item.quantity)) : <></>
        ));

        console.log(orderItems);
    };

    //on click remove from cart (item id)
    const removeFromCart = (id) => {
        
        //cart number
        setCartNum(cartNum-1);

        //total price
        let removedItem = null; 
        orderItems.map((item) => (
            item.id == id ? removedItem = item : <></>
        ));
        console.log(removedItem);
        if(books != null){
            books.map((book) => (
                book.id == removedItem.book_id ? setTotalPrice(totalPrice-(book.price*removedItem.quantity)) : <></>
            ));
        };

        //removing from array
        const newArray = orderItems.filter((item) => item.id !== id);
        setOrderItems(newArray);
        
    };

    function refresh(){
        setOrderItems([]);
        setCartNum(0);
        setTotalPrice(0);
    };

    return (
    <BrowserRouter className="App">
        <Routes>
            <Route path="/" element={<NavBar token={token} removeToken={removeToken} cartNum={cartNum} currentUser={currentUser}/>}>

                <Route path="/login" element={<LoginPage addToken={addToken} addUser={addUser} />}/>  
            
                <Route path="/register" element={<RegisterPage/>}/> 
            
                <Route path="books" element={
                                    <BooksPage
                                        readMore={readMore} 
                                        seeAuthor={seeAuthor} 
                                        seeCategories={seeCategories} 
                                        addToCart={addToCart} 
                                        deleteBook={deleteBook}                                        
                                        currentUser={currentUser} 
                                        token={token} 
                                        favouriteBooks={favouriteBooks}
                                        addToFavourites={addToFavourites} 
                                        removeFromFavourites={removeFromFavourites}
                                        authors={authors} 
                                        categories={categories} 
                                    />}
                /> 

                <Route path="/book-update" element={<BookForm book={bookDetails} authors={authors} categories={categories} reloadBooks={reloadBooks} />}/> 

                <Route path="/details" element = {
                                        <BookDetails 
                                            book={bookDetails}
                                            currentUser={currentUser}
                                            deleteBook={deleteBook}
                                            addToCart={addToCart}  
                                            favouriteBooks={favouriteBooks}
                                            addToFavourites={addToFavourites} 
                                            removeFromFavourites={removeFromFavourites} 
                                            favourite={false}
                                        />}
                /> 

                <Route path="favourites" element={
                                        <Favourites 
                                            readMore={readMore} 
                                            seeAuthor={seeAuthor} 
                                            seeCategories={seeCategories} 
                                            addToCart={addToCart} 
                                            deleteBook={deleteBook}
                                            currentUser={currentUser} 
                                            token={token} 
                                            favouriteBooks={favouriteBooks} 
                                            addToFavourites={addToFavourites} 
                                            removeFromFavourites={removeFromFavourites}
                                        />}
                /> 

                <Route path="/filterAuthors" element = {<FilterAuthors books={authorBooks} />}/>
                
                <Route path="/filterCategories" element = {<FilterCategory books={categoryBooks} />}/> 

                <Route path="/cart" element = {<CartPage orderItems={orderItems} books={books} totalPrice={totalPrice} removeFromCart={removeFromCart}/>}/> 

                <Route path="/order" element = {
                                    <OrderPage 
                                        currentUser={currentUser} 
                                        currentUserData={currentUserData} 
                                        updateUserData={updateUserData} 
                                        orderItems={orderItems} 
                                        totalPrice={totalPrice} 
                                        books={books} 
                                        cartNum={cartNum} 
                                    />}
                />
         
                <Route path="/order-preview" element = {
                                            <OrderPreview 
                                                currentUser={currentUser} 
                                                currentUserData={currentUserData} 
                                                orderItems={orderItems} 
                                                totalPrice={totalPrice} 
                                                books={books} 
                                                cartNum={cartNum} 
                                                refresh={refresh} 
                                            />}
                />

                <Route path="/contact" element={<Contact /> }/>

                <Route path="/user-data" element={<UserData currentUser={currentUser} currentUserData={currentUserData} /> }/>

                <Route path="/user-data-update" element={
                                                <UserDataUpdate 
                                                    currentUser={currentUser} 
                                                    currentUserData={currentUserData} 
                                                    updateUserData={updateUserData}
                                                /> }
                />

                <Route path="/admin" element={<AdminPage /> }/>

            </Route>

        </Routes>
        

    </BrowserRouter>
    )
}

export default App;
