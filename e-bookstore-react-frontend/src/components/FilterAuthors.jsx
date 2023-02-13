import React from 'react'
import OneBook from './OneBook';

import "../style/OneBook.css"

const FilterAuthors = ({books}) => {

    

  return (
            <div className="all-books-page" >
              <div className="all-books">
                  {books==null ? <></> :  books.map((book)=>(
                      <OneBook  book={book} key={book.id} />
                  ))}
              </div>
            </div>
  )
}

export default FilterAuthors