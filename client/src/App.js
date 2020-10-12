import React, { Component } from 'react';
import './App.css';
import BookSearch from './components/BookSearch';
import BookResults from './components/BookResults';
import BookNavigation from './components/BookNavigation';
import BACKEND_URL from './config';
import './bootstrap.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      page:0,
      totalPages:0,
      bookName:""
    }
  }

  searchBooks = (bookName) => {
    if ( bookName!==null && bookName!==""){
      const encodedValue = encodeURIComponent(bookName);
      let url = `${BACKEND_URL}?bookName=${encodedValue}`
      fetch(url)
      .then(res => res.json())
      .then( data => {
        this.setState({
          books: data.docs,
          bookName:bookName,
          page:1,
          totalPages:data.totalPages
        })
      })
      .catch( err => console.log(err))
    } else {
      this.setState({
        books: [],
        page:0,
        totalPages:0,
        bookName:""
     })
    }
    
  }

  nextPage = () => {
    if ( this.state.bookName!==null && this.state.bookName!==""){
      const encodedValue = encodeURIComponent(this.state.bookName);
      const page = encodeURIComponent(this.state.page+1);
      let url = `${BACKEND_URL}?bookName=${encodedValue}&page=${page}`;
      fetch(url)
      .then(res => res.json())
      .then( data => {
        this.setState({
          books: data.docs,
          page:data.page,
          totalPages:data.totalPages
        })
      })
      .catch( err => console.log(err))
    } else {
      this.setState({
        books: [],
        page:0,
        totalPages:0,
        bookName:""
     })
    }
    
  }

  prevPage = () => {
    if ( this.state.bookName!==null && this.state.bookName!==""){
      const encodedValue = encodeURIComponent(this.state.bookName);
      const page = encodeURIComponent(this.state.page-1);
      let url = `${BACKEND_URL}?bookName=${encodedValue}&page=${page}`;
      fetch(url)
      .then(res => res.json())
      .then( data => {
        this.setState({
          books: data.docs,
          page:data.page,
          totalPages:data.totalPages
        })
      })
      .catch( err => console.log(err))
    }  else {
      this.setState({
        books: [],
        page:0,
        totalPages:0,
        bookName:""
     })
    }
  }

  render(){
    return (
      <div className="center-align container mt-5">
        <div>
          <h1>Books Page</h1>
        </div>
        <div>
          <BookSearch searchBooks={this.searchBooks}/>
          { this.state.books.length > 0 &&
          <> 
          <BookResults books={this.state.books}/>
          <BookNavigation page={this.state.page} totalPages={this.state.totalPages} nextPage={this.nextPage} prevPage={this.prevPage}/>
          </>
          }
        </div>
      </div>
    );
  }
}

export default App;
