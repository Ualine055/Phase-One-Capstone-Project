// lab3/fetchBooks.js
export async function fetchBooks(query = "javascript") {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`;
    // fetch data from the API
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();

    //   map data to simplified book objects
      return data.docs.map(book => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://via.placeholder.com/150x200?text=No+Cover",
      }));

      // error handling
    } catch (err) {
      console.error("Error fetching books:", err);
      return [];
    }
  }
  