import React, { useState } from "react";

export default function Library() {
    const RSS_URL = "https://www.goodreads.com/review/list_rss/114948169?key=gOgOrxMUjL-fYnazWbtnenEUIxUc6m9j_vDKfcxIerqxUMn7&shelf=%23ALL%23";
    const [books, setBooks] = useState([]);

    const getFeed = async () => {
        
        const res = await fetch(`https://api.allorigins.win/get?url=${RSS_URL}`);
        const { contents } = await res.json();
        const feed = new window.DOMParser().parseFromString(contents, "text/xml");
        const books = feed.querySelectorAll("item");
        const feedBooks = [...books].map((el) => ({
            author: el.querySelector("author_name").innerHTML,
            title: el.querySelector("title").innerHTML.substring(9).slice(0, -3),
            img: el.querySelector("book_medium_image_url").innerHTML.substring(9).slice(0, -3),
        }));
        setBooks(feedBooks);
    };

    return (
        <div>
        <button onClick={getFeed}>CLICK</button>
        {books.map((book) => {
            return (
                <div>
                    <h1>{book.title}</h1>
                    <h1>{book.author}</h1>
                    <img src={book.img}></img>
                </div>
            )
        })}
        </div>
    );
}