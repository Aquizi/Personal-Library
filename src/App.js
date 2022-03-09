import React, { useState } from "react";

export default function App() {
  const [rssUrl, setRssUrl] = useState("");
  const [items, setItems] = useState([]);

  const getRss = async (e) => {
    e.preventDefault();
    const urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    if (!urlRegex.test(rssUrl)) {
      return;
    }
    const res = await fetch(`https://api.allorigins.win/get?url=${rssUrl}`);
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const items = feed.querySelectorAll("item");
    const feedItems = [...items].map((el) => ({
      bookID: el.querySelector("book_id").innerHTML,
      author: el.querySelector("author_name").innerHTML,
    }));
    setItems(feedItems);
  };

  return (
    <div className="App">
      <form onSubmit={getRss}>
        <div>
          <label> rss url</label>
          <br />
          <input onChange={(e) => setRssUrl(e.target.value)} value={rssUrl} />
        </div>
        <input type="submit" />
      </form>
      {items.map((item) => {
        return (
          <div>
            <h1>{item.bookID}</h1>
            <h1>{item.author}</h1>
          </div>
        );
      })}
    </div>
  );
}
