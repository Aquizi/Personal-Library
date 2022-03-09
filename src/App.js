import React, { useState } from "react";

export default function App() {
  const RSS_URL = "https://www.goodreads.com/review/list_rss/114948169?key=gOgOrxMUjL-fYnazWbtnenEUIxUc6m9j_vDKfcxIerqxUMn7&shelf=%23ALL%23/";
  const [books, setBooks] = useState([]);

  const getFeed = async () => {
    const res = await fetch(`https://api.allorigins.win/get?url=${RSS_URL}`);
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const books = feed.querySelectorAll("item");
    const feedBooks = [...books].map((el) => ({
      bookId: el.querySelector("book_id").innerHTML,
      author: el.querySelector("author_name").innerHTML,
    }));
    setBooks(feedBooks);
  };

  getFeed();
  
  const library = books.map((book) => {
    return (
      <div>
        <h1>{book.author}</h1>
        <h1>{book.bookId}</h1>
      </div>
    )
  })

  return (
    <div className="App">
      {library}
    </div>
  );
}