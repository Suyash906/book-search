import React from 'react';
function BookResults({books}) {
    // const books = []
    console.log(books)
    const bookListItems = books.map( (book, index) => 
        <div className="col-3 mt-3 mb-3"  key={index}>
            <div className="border product">
                <div></div>
                <div><b>{book.bookName}</b></div>
                <div>{book.authorName}</div>
            </div>
        </div>
    );

    return(
        <div className="mt-5">
            <div className="row mb-5 results-container ">
                {bookListItems}
            </div>
        </div>
    )
}

export default BookResults;