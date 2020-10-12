import React from 'react';
function BookSearch(props) {
    
    const searchBooks  = (e) => {
        props.searchBooks(e.target.value)
    }

    return(
        <div className="border mt-5 search-container">
            <div className="form-group mt-3 mb-3 ml-5 mr-5">
                <input type="text" name="query" id="query" className="form-control form-control-lg" placeholder="Search Book Name" onChange={searchBooks}/>
            </div>
        </div>
    )
}

export default BookSearch;